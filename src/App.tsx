import React, { useState, useEffect } from 'react';
import { Languages, UtensilsCrossed, LogIn, UserCircle, LogOut } from 'lucide-react';
import { getRestaurantConfig, RestaurantConfig } from './data';
import WaiterView from './components/WaiterView';
import CounterView from './components/CounterView';
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'en' | 'mr'>('en');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [role, setRole] = useState<'waiter' | 'counter' | null>(null);
  const [config, setConfig] = useState<RestaurantConfig | null>(null);
  
  // Waiter specific state
  const [tableNo, setTableNo] = useState('');
  const [waiterName, setWaiterName] = useState('');

  useEffect(() => {
    if (currentLang === 'mr') {
      document.body.classList.add('lang-mr');
    } else {
      document.body.classList.remove('lang-mr');
    }
  }, [currentLang]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setConfig(getRestaurantConfig(currentUser?.email));
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setRole(null);
      setTableNo('');
      setWaiterName('');
      setConfig(getRestaurantConfig(null));
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleStartOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableNo.trim() && waiterName.trim()) {
      setRole('waiter');
    }
  };

  if (!isAuthReady || !config) {
    return <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] text-stone-500">Loading...</div>;
  }

  const t = config.translations[currentLang];

  return (
    <div className="min-h-screen text-stone-900 font-sans selection:bg-red-200 selection:text-red-900 bg-[#fdfbf7]">
      {/* Header (Always visible except when printing) */}
      <header className="pt-10 pb-6 px-4 text-center relative print:hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-red-700"></div>
        
        <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
          {user && (
            <button 
              onClick={handleLogout}
              className="bg-white/90 backdrop-blur text-stone-600 border border-stone-200 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:bg-stone-50 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
          )}
          <button 
            onClick={() => setCurrentLang(l => l === 'en' ? 'mr' : 'en')}
            className="bg-white/90 backdrop-blur text-red-700 border border-red-200 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Languages className="w-4 h-4" />
            <span>{t.langBtn}</span>
          </button>
        </div>

        <div className="max-w-3xl mx-auto fade-in">
          <div className="flex justify-center mb-3 text-red-700">
            <UtensilsCrossed className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-red-700 uppercase mb-2">
            {t.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-stone-500 font-serif italic text-base">
            <span className="w-8 h-px bg-stone-300"></span>
            <span>{t.subtitle}</span>
            <span className="w-8 h-px bg-stone-300"></span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {!user ? (
        // Login Screen
        <div className="max-w-md mx-auto px-4 mt-12 text-center fade-in">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-200">
            <UserCircle className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">{t.loginRequired}</h2>
            <p className="text-stone-500 mb-8">Please sign in to access the Restaurant POS system.</p>
            <button 
              onClick={handleLogin}
              className="w-full bg-red-700 text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-700/20"
            >
              <LogIn className="w-5 h-5" />
              {t.loginWithGoogle}
            </button>
          </div>
        </div>
      ) : !role ? (
        // Role Selection Screen
        <div className="max-w-4xl mx-auto px-4 mt-8 fade-in">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 text-center mb-8">
            {t.roleSelection}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Waiter Role Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-700">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-800">{t.waiterRole}</h3>
              </div>
              
              <form onSubmit={handleStartOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1">{t.tableNoPrompt}</label>
                  <input 
                    type="text" 
                    required
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                    placeholder="e.g. 12 or A4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1">{t.waiterNamePrompt}</label>
                  <input 
                    type="text" 
                    required
                    value={waiterName}
                    onChange={(e) => setWaiterName(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                    placeholder="e.g. Rahul"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-red-700 text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors shadow-lg shadow-red-700/20 mt-4"
                >
                  {t.startOrder}
                </button>
              </form>
            </div>

            {/* Counter Role Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone-200 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700">
                  <UserCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-800">{t.counterRole}</h3>
              </div>
              <p className="text-stone-500 mb-8 flex-1">
                Access the dashboard to view all open orders, print bills, and process payments.
              </p>
              <button 
                onClick={() => setRole('counter')}
                className="w-full bg-stone-800 text-white py-3 rounded-xl font-semibold hover:bg-stone-900 transition-colors shadow-lg shadow-stone-800/20"
              >
                Open Dashboard
              </button>
            </div>
          </div>
        </div>
      ) : role === 'waiter' ? (
        <WaiterView 
          currentLang={currentLang} 
          tableNo={tableNo} 
          waiterName={waiterName} 
          onBack={() => setRole(null)} 
          config={config}
        />
      ) : (
        <CounterView 
          currentLang={currentLang} 
          onBack={() => setRole(null)} 
          config={config}
        />
      )}
    </div>
  );
}
