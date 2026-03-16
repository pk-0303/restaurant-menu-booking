import React, { useState, useEffect } from 'react';
import { Printer, CheckCircle, Clock, Download, Plus, X, Search, Minus } from 'lucide-react';
import { RestaurantConfig } from '../data';
import { subscribeToOpenOrders, markOrderAsPaid, getPaidOrders, createOrUpdateOrder, Order, OrderItem } from '../firebaseUtils';

interface CounterViewProps {
  currentLang: 'en' | 'mr';
  onBack: () => void;
  config: RestaurantConfig;
}

export default function CounterView({ currentLang, onBack, config }: CounterViewProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [confirmPaidId, setConfirmPaidId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const [isAddingItems, setIsAddingItems] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsToAdd, setItemsToAdd] = useState<OrderItem[]>([]);
  const [isSavingItems, setIsSavingItems] = useState(false);

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
    try {
      await markOrderAsPaid(config.id, orderId);
      setSelectedOrder(null);
      setConfirmPaidId(null);
      setNotification({ message: "Order marked as paid!", type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error marking as paid:", error);
      setNotification({ message: "Error marking order as paid.", type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const calculateTotal = (order: Order) => {
    return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const addToItemsToAdd = (item: any) => {
    setItemsToAdd(prev => [...prev, { id: item.id, en: item.en, mr: item.mr, price: item.price, quantity: 1 }]);
  };

  const updateItemToAddQuantity = (id: string, delta: number) => {
    setItemsToAdd(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleSaveAddedItems = async () => {
    if (!selectedOrder || itemsToAdd.length === 0) return;
    setIsSavingItems(true);
    try {
      await createOrUpdateOrder(config.id, selectedOrder.tableNo, selectedOrder.waiterName, itemsToAdd);
      setNotification({ message: "Items added successfully!", type: 'success' });
      setTimeout(() => setNotification(null), 3000);
      setIsAddingItems(false);
      setItemsToAdd([]);
      setSearchQuery('');
    } catch (error) {
      console.error("Error adding items:", error);
      setNotification({ message: "Error adding items.", type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsSavingItems(false);
    }
  };

  const handleExportPaidOrders = async () => {
    try {
      const paidOrders = await getPaidOrders(config.id);
      if (paidOrders.length === 0) {
        setNotification({ message: "No paid orders to export.", type: 'error' });
        setTimeout(() => setNotification(null), 3000);
        return;
      }

      const headers = ['Order ID', 'Date', 'Time', 'Table No', 'Waiter', 'Subtotal (₹)', 'Tax (₹)', 'Grand Total (₹)', 'Items'];
    const rows = paidOrders.map(order => {
      const date = order.updatedAt ? new Date(order.updatedAt.toMillis()).toLocaleDateString() : '';
      const time = order.updatedAt ? new Date(order.updatedAt.toMillis()).toLocaleTimeString() : '';
      const subtotal = calculateTotal(order);
      const tax = Math.round(subtotal * 0.05);
      const grandTotal = subtotal + tax;
      const itemsStr = order.items.map(i => `${i.quantity}x ${i.en}`).join('; ');
      
      return [
        order.id,
        date,
        time,
        order.tableNo,
        order.waiterName,
        subtotal,
        tax,
        grandTotal,
        `"${itemsStr}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${config.id}_paid_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setNotification({ message: "Export successful!", type: 'success' });
    setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Export error:", error);
      setNotification({ message: "Error exporting orders.", type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-24">
      {notification && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-lg text-white font-medium animate-in slide-in-from-top-4 fade-in ${notification.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {notification.message}
        </div>
      )}
      <div className="pt-4 flex justify-between items-center mb-6 print:hidden">
        <button onClick={onBack} className="text-red-700 hover:underline font-medium">
          &larr; {t.backToRoles}
        </button>
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-serif font-bold text-stone-800">{t.openOrders}</h2>
          <button 
            onClick={handleExportPaidOrders}
            className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export History
          </button>
        </div>
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
                  <div className="mt-4 flex justify-center print:hidden">
                    <button 
                      onClick={() => setIsAddingItems(true)}
                      className="flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Items
                    </button>
                  </div>
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
                {confirmPaidId === selectedOrder.id ? (
                  <div className="flex-1 flex gap-2">
                    <button 
                      onClick={() => handleMarkPaid(selectedOrder.id!)}
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => setConfirmPaidId(null)}
                      className="flex-1 bg-stone-200 text-stone-800 py-3 rounded-xl font-semibold hover:bg-stone-300 transition-colors flex items-center justify-center gap-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setConfirmPaidId(selectedOrder.id!)}
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {t.markAsPaid}
                  </button>
                )}
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

      {/* Add Items Modal */}
      {isAddingItems && (
        <div className="fixed inset-0 z-[70] flex justify-center items-center p-4 print:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddingItems(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-stone-200">
              <h3 className="text-xl font-bold text-stone-800">Add Items to Table {selectedOrder?.tableNo}</h3>
              <button onClick={() => setIsAddingItems(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>
            <div className="p-4 border-b border-stone-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder || "Search menu..."}
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {config.menuData.filter(item => item[currentLang].toLowerCase().includes(searchQuery.toLowerCase())).map(item => {
                const addedItem = itemsToAdd.find(i => i.id === item.id);
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 hover:bg-stone-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-stone-800">{item[currentLang]}</h4>
                      <p className="text-sm text-stone-500">₹{item.price}</p>
                    </div>
                    {addedItem ? (
                      <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-1">
                        <button onClick={() => updateItemToAddQuantity(item.id, -1)} className="p-1 hover:bg-red-100 rounded text-red-700"><Minus className="w-4 h-4" /></button>
                        <span className="w-6 text-center font-medium text-red-700">{addedItem.quantity}</span>
                        <button onClick={() => updateItemToAddQuantity(item.id, 1)} className="p-1 hover:bg-red-100 rounded text-red-700"><Plus className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToItemsToAdd(item)}
                        className="px-3 py-1.5 bg-white border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50"
                      >
                        Add
                      </button>
                    )}
                  </div>
                );
              })}
              {config.menuData.filter(item => item[currentLang].toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <div className="text-center py-8 text-stone-500">
                  No items found.
                </div>
              )}
            </div>
            {itemsToAdd.length > 0 && (
              <div className="p-4 border-t border-stone-200 bg-stone-50">
                <button 
                  onClick={handleSaveAddedItems}
                  disabled={isSavingItems}
                  className="w-full bg-red-700 text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors disabled:opacity-50"
                >
                  {isSavingItems ? "Saving..." : `Save ${itemsToAdd.reduce((sum, i) => sum + i.quantity, 0)} Items`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
