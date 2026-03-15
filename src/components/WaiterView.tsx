import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Plus, Minus, X, Send } from 'lucide-react';
import { translations, categories, menuData } from '../data';
import { createOrUpdateOrder, OrderItem } from '../firebaseUtils';

interface WaiterViewProps {
  currentLang: 'en' | 'mr';
  tableNo: string;
  waiterName: string;
  onBack: () => void;
}

export default function WaiterView({ currentLang, tableNo, waiterName, onBack }: WaiterViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = translations[currentLang];

  const filteredMenu = useMemo(() => {
    if (searchQuery) {
      return menuData.filter(item =>
        item[currentLang].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return menuData.filter(item => item.categoryId === activeCategoryId);
  }, [searchQuery, activeCategoryId, currentLang]);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, en: item.en, mr: item.mr, price: item.price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendToKitchen = async () => {
    if (cart.length === 0) return;
    setIsSaving(true);
    try {
      await createOrUpdateOrder(tableNo, waiterName, cart);
      setCart([]);
      setIsCartOpen(false);
      alert(t.orderUpdated);
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Error saving order. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pb-24">
      <div className="max-w-4xl mx-auto px-4 pt-4 flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-red-700 hover:underline font-medium">
          &larr; {t.backToRoles}
        </button>
        <div className="text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm border border-stone-200">
          {t.table}: <span className="text-red-700">{tableNo}</span> | {t.waiter}: <span className="text-red-700">{waiterName}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto px-4 mb-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-red-600 transition-colors w-5 h-5" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 shadow-sm transition-all"
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4">
        {/* Category Navigation */}
        {!searchQuery && (
          <div className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md shadow-sm border-b border-stone-200 pt-3 pb-3 px-2 mb-8 -mx-4 md:mx-0 md:rounded-b-2xl overflow-x-auto no-scrollbar">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 min-w-max md:min-w-0 px-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeCategoryId === category.id
                      ? 'bg-red-700 text-white shadow-md ring-1 ring-red-700'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-red-700'
                  }`}
                >
                  {category[currentLang as keyof typeof category]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-stone-200 p-5 md:p-10 min-h-[500px]">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-stone-800 inline-block relative">
              <span>
                {searchQuery 
                  ? t.searchResults 
                  : categories.find(c => c.id === activeCategoryId)?.[currentLang as keyof typeof categories[0]]}
              </span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-red-600 rounded-full"></div>
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {filteredMenu.length === 0 ? (
              <div className="text-center py-16 text-stone-500 font-serif text-xl italic fade-in">
                <p>{t.noResults}</p>
              </div>
            ) : (
              filteredMenu.map((item, index) => {
                const cartItem = cart.find(i => i.id === item.id);
                const delay = index * 0.03;
                
                return (
                  <div 
                    key={item.id}
                    className="group flex items-center justify-between py-3 hover:bg-stone-50/50 -mx-2 px-2 md:-mx-4 md:px-4 rounded-lg transition-colors slide-up"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <div className="flex-shrink-0 max-w-[60%]">
                      <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 group-hover:text-red-700 transition-colors leading-tight">
                        {item[currentLang as keyof typeof item]}
                      </h3>
                      {searchQuery && (
                        <p className="text-[10px] md:text-xs font-sans text-stone-400 uppercase tracking-wider mt-1">
                          {categories.find(c => c.id === item.categoryId)?.[currentLang as keyof typeof categories[0]]}
                        </p>
                      )}
                    </div>
                    <div className="menu-leader hidden sm:block"></div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="font-sans font-semibold text-base md:text-lg text-stone-900">
                        ₹{item.price}
                      </div>
                      {cartItem ? (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-red-100 rounded text-red-700 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-medium text-red-700">{cartItem.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-red-100 rounded text-red-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart(item)}
                          className="px-3 py-1.5 bg-white border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                        >
                          {t.addToCart}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all hover:scale-105 flex items-center gap-3"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-red-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          </div>
          <span className="font-semibold hidden sm:inline">₹{cartTotal}</span>
        </button>
      )}

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-stone-200">
              <h2 className="text-2xl font-serif font-bold text-stone-800 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-red-700" />
                {t.cart}
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400">
                  <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
                  <p>{t.emptyCart}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-4 bg-stone-50 p-3 rounded-xl border border-stone-100">
                      <div className="flex-1">
                        <h4 className="font-medium text-stone-800 leading-tight mb-1">
                          {item[currentLang as keyof typeof item]}
                        </h4>
                        <p className="text-sm text-stone-500">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-stone-100 rounded text-stone-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-stone-100 rounded text-stone-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="w-16 text-right font-semibold text-stone-800">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 md:p-6 border-t border-stone-200 bg-stone-50">
                <div className="flex justify-between items-center mb-4 text-lg">
                  <span className="font-medium text-stone-600">{t.total}:</span>
                  <span className="font-bold text-2xl text-stone-900">₹{cartTotal}</span>
                </div>
                <button 
                  onClick={handleSendToKitchen}
                  disabled={isSaving}
                  className="w-full bg-red-700 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-700/20 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  {isSaving ? "Saving..." : t.sendToKitchen}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
