import React, { useState, useEffect } from 'react';
import { Printer, CheckCircle, Clock } from 'lucide-react';
import { RestaurantConfig } from '../data';
import { subscribeToOpenOrders, markOrderAsPaid, Order } from '../firebaseUtils';

interface CounterViewProps {
  currentLang: 'en' | 'mr';
  onBack: () => void;
  config: RestaurantConfig;
}

export default function CounterView({ currentLang, onBack, config }: CounterViewProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const t = config.translations[currentLang];

  useEffect(() => {
    const unsubscribe = subscribeToOpenOrders(config.id, (fetchedOrders) => {
      setOrders(fetchedOrders);
      if (selectedOrder) {
        const updatedSelected = fetchedOrders.find(o => o.id === selectedOrder.id);
        if (updatedSelected) {
          setSelectedOrder(updatedSelected);
        } else {
          setSelectedOrder(null);
        }
      }
    });

    return () => unsubscribe();
  }, [selectedOrder]);

  const handlePrint = () => {
    window.print();
  };

  const handleMarkPaid = async (orderId: string) => {
    if (window.confirm("Mark this order as paid?")) {
      await markOrderAsPaid(config.id, orderId);
      setSelectedOrder(null);
    }
  };

  const calculateTotal = (order: Order) => {
    return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-24">
      <div className="pt-4 flex justify-between items-center mb-6 print:hidden">
        <button onClick={onBack} className="text-red-700 hover:underline font-medium">
          &larr; {t.backToRoles}
        </button>
        <h2 className="text-2xl font-serif font-bold text-stone-800">{t.openOrders}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:hidden">
        {/* Orders List */}
        <div className="lg:col-span-1 space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 text-center text-stone-500">
              {t.noOpenOrders}
            </div>
          ) : (
            orders.map(order => (
              <div 
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedOrder?.id === order.id 
                    ? 'bg-red-50 border-red-300 shadow-md' 
                    : 'bg-white border-stone-200 hover:border-red-200 hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-stone-800">{t.table} {order.tableNo}</h3>
                  <span className="text-sm font-medium text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {order.updatedAt ? new Date(order.updatedAt.toMillis()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-stone-600">
                  <span>{t.waiter}: {order.waiterName}</span>
                  <span className="font-semibold text-red-700">₹{calculateTotal(order)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Details (Bill) */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden sticky top-24">
              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-serif font-bold text-stone-800 mb-2">{t.billTitle}</h2>
                  <div className="flex justify-center gap-4 text-sm text-stone-500 mb-4">
                    <span>{t.tableNo}: <strong className="text-stone-800">{selectedOrder.tableNo}</strong></span>
                    <span>|</span>
                    <span>{t.waiter}: <strong className="text-stone-800">{selectedOrder.waiterName}</strong></span>
                  </div>
                </div>

                <div className="border-t border-b border-stone-200 py-4 mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-stone-500">
                        <th className="pb-3 font-medium">{t.item}</th>
                        <th className="pb-3 font-medium text-center">{t.qty}</th>
                        <th className="pb-3 font-medium text-right">{t.price}</th>
                      </tr>
                    </thead>
                    <tbody className="text-stone-800">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx} className="border-t border-stone-100">
                          <td className="py-3 pr-4">{item[currentLang]}</td>
                          <td className="py-3 text-center">{item.quantity}</td>
                          <td className="py-3 text-right">₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-2 text-right">
                  <div className="flex justify-between text-stone-600">
                    <span>{t.subtotal}:</span>
                    <span>₹{calculateTotal(selectedOrder)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>{t.tax}:</span>
                    <span>₹{Math.round(calculateTotal(selectedOrder) * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-stone-900 pt-4 border-t border-stone-200 mt-4">
                    <span>{t.grandTotal}:</span>
                    <span>₹{calculateTotal(selectedOrder) + Math.round(calculateTotal(selectedOrder) * 0.05)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-6 flex gap-4 border-t border-stone-200">
                <button 
                  onClick={handlePrint}
                  className="flex-1 bg-white text-stone-800 border border-stone-300 py-3 rounded-xl font-semibold hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-5 h-5" />
                  {t.printBill}
                </button>
                <button 
                  onClick={() => handleMarkPaid(selectedOrder.id!)}
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <CheckCircle className="w-5 h-5" />
                  {t.markAsPaid}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 rounded-3xl border border-stone-200 h-full min-h-[400px] flex items-center justify-center text-stone-400">
              Select an order to view details
            </div>
          )}
        </div>
      </div>

      {/* Print Area */}
      {selectedOrder && (
        <div id="print-area" className="hidden print:block p-8 bg-white text-black font-mono">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold uppercase">{t.billTitle}</h1>
            <p className="text-sm">{t.subtitle}</p>
            <div className="border-b-2 border-dashed border-gray-400 my-4"></div>
            <div className="flex justify-between text-sm mb-2">
              <span>{t.date}: {new Date().toLocaleDateString()}</span>
              <span>{t.time}: {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span>{t.tableNo}: {selectedOrder.tableNo}</span>
              <span>{t.waiter}: {selectedOrder.waiterName}</span>
            </div>
            <div className="border-b-2 border-dashed border-gray-400 my-4"></div>
          </div>
          
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="text-left py-2">{t.item}</th>
                <th className="text-center py-2">{t.qty}</th>
                <th className="text-right py-2">{t.price}</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-2">{item[currentLang]}</td>
                  <td className="text-center py-2">{item.quantity}</td>
                  <td className="text-right py-2">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="border-t-2 border-dashed border-gray-400 pt-4">
            <div className="flex justify-between mb-2">
              <span>{t.subtotal}:</span>
              <span>₹{calculateTotal(selectedOrder)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>{t.tax}:</span>
              <span>₹{Math.round(calculateTotal(selectedOrder) * 0.05)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 border-t border-gray-400 pt-2">
              <span>{t.grandTotal}:</span>
              <span>₹{calculateTotal(selectedOrder) + Math.round(calculateTotal(selectedOrder) * 0.05)}</span>
            </div>
          </div>
          <div className="text-center mt-8 text-sm italic">
            {t.footer}
          </div>
        </div>
      )}
    </div>
  );
}
