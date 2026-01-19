import React, { useState } from 'react';
import { User, Order, Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, MapPin, User as UserIcon, LogOut, 
  Heart, Settings, ChevronRight, Home, Headphones,
  CreditCard, LayoutDashboard, Truck, ArrowRight,
  Phone, Mail, MessageCircle, ChevronDown, CheckCircle2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { PRODUCTS, FAQS } from '../constants';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'wishlist' | 'support' | 'profile'>('home');
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const getProduct = (id: string) => PRODUCTS.find(p => p.id === id);

  // --- Mobile Bottom Nav ---
  const BottomNavItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center justify-center p-2 flex-1 transition-all duration-300 relative ${activeTab === id ? 'text-charcoal-900 scale-105' : 'text-gray-400'}`}
    >
      <div className={`relative ${activeTab === id ? '-translate-y-1' : ''} transition-transform duration-300`}>
        <Icon size={24} strokeWidth={activeTab === id ? 2 : 1.5} fill={activeTab === id ? "currentColor" : "none"} className={activeTab === id ? "text-gold-600" : ""} />
        {activeTab === id && (
          <motion.div 
            layoutId="nav-indicator"
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-charcoal-900 rounded-full"
          />
        )}
      </div>
      <span className="text-[10px] font-medium mt-1">{label}</span>
    </button>
  );

  // --- Desktop Sidebar ---
  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? 'bg-charcoal-900 text-white shadow-lg' 
          : 'text-gray-500 hover:bg-white hover:text-charcoal-900'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  // --- Components ---

  const OrderCard = ({ order, minimal = false }: { order: Order, minimal?: boolean }) => (
    <motion.div 
        layout
        className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 mb-4"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-charcoal-900">#{order.id.split('-')[1]}</span>
                {minimal && (
                   <span className={`w-2 h-2 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-500' : 
                      order.status === 'Cancelled' ? 'bg-red-500' : 'bg-gold-500'
                   }`} />
                )}
            </div>
            <p className="text-xs text-gray-500">{order.date}</p>
        </div>
        {!minimal && (
            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
            order.status === 'Delivered' ? 'bg-green-50 text-green-700 border border-green-100' :
            order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border border-red-100' :
            'bg-gold-50 text-gold-700 border border-gold-100'
            }`}>
            {order.status}
            </span>
        )}
        {minimal && <ChevronRight size={16} className="text-gray-300" />}
      </div>
      
      {!minimal && (
          <div className="space-y-3 border-t border-gray-50 pt-3">
             {order.items.map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-gray-50" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                </div>
             ))}
          </div>
      )}
      
      <div className={`flex justify-between items-center ${!minimal ? 'mt-4 pt-3' : 'mt-2'}`}>
         <span className="font-bold text-charcoal-900">₹{order.total}</span>
         {!minimal && (
            <div className="flex gap-3">
               <button onClick={() => navigate('/track')} className="text-xs font-bold text-charcoal-900 bg-gray-100 px-3 py-1.5 rounded-lg">Track</button>
               <button className="text-xs font-bold text-gold-600 bg-gold-50 px-3 py-1.5 rounded-lg">Invoice</button>
            </div>
         )}
         {minimal && <span className="text-xs text-gold-600 font-medium">{order.status}</span>}
      </div>
    </motion.div>
  );

  const ProductListCard = ({ productId, onAdd }: { productId: string, onAdd?: () => void }) => {
      const p = getProduct(productId);
      if(!p) return null;
      return (
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 items-center">
              <img src={p.image} className="w-16 h-16 rounded-xl object-cover bg-gray-50" alt={p.name} />
              <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-charcoal-900 truncate">{p.name}</h4>
                  <p className="text-xs text-gray-500 truncate mb-2">{p.tagline}</p>
                  <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">₹{p.price}</span>
                      {onAdd && <button className="text-[10px] font-bold bg-charcoal-900 text-white px-2 py-1 rounded-lg">ADD</button>}
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0 md:pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* DESKTOP LAYOUT (Grid) */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="col-span-1">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-gold-500 p-1" />
                <div>
                  <h3 className="font-serif font-bold text-lg leading-none mb-1">{user.name}</h3>
                  <p className="text-xs text-gray-500 truncate w-32">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <SidebarItem id="home" icon={Home} label="Home" />
                <SidebarItem id="orders" icon={Package} label="My Orders" />
                <SidebarItem id="wishlist" icon={Heart} label="Wishlist" />
                <SidebarItem id="support" icon={Headphones} label="Support" />
                <SidebarItem id="profile" icon={Settings} label="Profile" />
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all">
                    <LogOut size={18} /> <span className="font-medium">Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
          {/* Desktop Content Area */}
          <div className="col-span-3">
             {/* Content rendered below is shared but styled mobile-first, adapting to desktop via max-width/grid */}
             {/* We will render the active view here for desktop */}
             {activeTab === 'home' && <HomeView user={user} />}
             {activeTab === 'orders' && <OrdersView user={user} />}
             {activeTab === 'wishlist' && <WishlistView user={user} getProduct={getProduct} />}
             {activeTab === 'support' && <SupportView />}
             {activeTab === 'profile' && <ProfileView user={user} onLogout={handleLogout} />}
          </div>
        </div>

        {/* MOBILE LAYOUT (Full width, no sidebar) */}
        <div className="md:hidden pt-20">
             <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'home' && <HomeView user={user} />}
                    {activeTab === 'orders' && <OrdersView user={user} />}
                    {activeTab === 'wishlist' && <WishlistView user={user} getProduct={getProduct} />}
                    {activeTab === 'support' && <SupportView />}
                    {activeTab === 'profile' && <ProfileView user={user} onLogout={handleLogout} />}
                </motion.div>
             </AnimatePresence>
        </div>

      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-white/50 pb-safe z-50 px-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-3xl">
        <div className="flex justify-between items-center h-20 max-w-sm mx-auto">
            <BottomNavItem id="home" icon={Home} label="Home" />
            <BottomNavItem id="orders" icon={Package} label="Orders" />
            <BottomNavItem id="wishlist" icon={Heart} label="Saved" />
            <BottomNavItem id="support" icon={Headphones} label="Help" />
            <BottomNavItem id="profile" icon={Settings} label="Profile" />
        </div>
      </div>
    </div>
  );
};

// --- SUB-VIEWS ---

const HomeView = ({ user }: { user: User }) => {
    const navigate = useNavigate();
    const lastOrder = user.orders[0];

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-charcoal-900">Hello, {user.name.split(' ')[0]}</h1>
                    <p className="text-sm text-gray-500">Welcome back to your ritual.</p>
                </div>
                <button onClick={() => navigate('/cart')} className="bg-white p-2 rounded-full shadow-sm border border-gray-100 relative">
                     <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                     <Package size={20} className="text-charcoal-900" />
                </button>
            </header>

            {/* Exclusive Offer */}
            <div className="relative overflow-hidden rounded-3xl bg-charcoal-900 text-white p-6 shadow-xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/20 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                 <span className="bg-gold-500 text-charcoal-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-3 inline-block">Exclusive</span>
                 <h3 className="text-xl font-serif font-bold mb-1">Restock Your Favorites</h3>
                 <p className="text-sm text-gray-400 mb-4">Get 15% off on your next order.</p>
                 <button className="bg-white text-charcoal-900 px-4 py-2 rounded-full text-xs font-bold">Use Code: REPEAT15</button>
            </div>

            {/* Order Status */}
            {lastOrder && (
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-charcoal-900">Order Status</h3>
                        <Link to="/track" className="text-xs font-bold text-gold-600">Track</Link>
                    </div>
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center text-gold-600">
                                <Truck size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Arriving Tomorrow</p>
                                <p className="text-xs text-gray-500">Order #{lastOrder.id.split('-')[1]}</p>
                            </div>
                         </div>
                         <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </div>
            )}

            {/* Recently Viewed */}
            <div>
                 <h3 className="font-bold text-charcoal-900 mb-3">Recently Viewed</h3>
                 <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
                     {user.recentlyViewed.map(id => {
                        const p = PRODUCTS.find(prod => prod.id === id);
                        if (!p) return null;
                        return (
                            <Link to={`/product/${id}`} key={id} className="min-w-[140px] bg-white rounded-2xl p-3 border border-gray-100 shadow-sm block">
                                <img src={p.image} className="w-full aspect-square rounded-xl object-cover mb-3 bg-gray-50" alt={p.name} />
                                <h4 className="font-bold text-xs truncate mb-1">{p.name}</h4>
                                <p className="text-xs text-gray-500">₹{p.price}</p>
                            </Link>
                        );
                     })}
                 </div>
            </div>
        </div>
    );
};

const OrdersView = ({ user }: { user: User }) => (
    <div className="space-y-4">
        <h1 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">My Orders</h1>
        {user.orders.map(order => (
            // Reusing a simplified version of OrderCard logic directly here for control
            <div key={order.id} className="bg-white p-5 rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100">
                <div className="flex justify-between mb-4">
                    <div>
                        <span className="block font-bold text-charcoal-900">Order #{order.id.split('-')[1]}</span>
                        <span className="text-xs text-gray-500">{order.date}</span>
                    </div>
                    <span className={`h-fit px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gold-100 text-gold-700'
                    }`}>{order.status}</span>
                </div>
                {order.items.map((item, i) => (
                    <div key={i} className="flex gap-3 mb-3 last:mb-0">
                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover bg-gray-50" alt={item.name} />
                        <div>
                            <p className="text-sm font-bold text-charcoal-900">{item.name}</p>
                            <p className="text-xs text-gray-500">₹{item.price} x {item.quantity}</p>
                        </div>
                    </div>
                ))}
                <div className="border-t border-gray-100 mt-4 pt-3 flex justify-between items-center">
                    <span className="font-bold text-sm">Total: ₹{order.total}</span>
                    <button className="text-xs font-bold bg-charcoal-900 text-white px-4 py-2 rounded-full">Track Order</button>
                </div>
            </div>
        ))}
    </div>
);

const WishlistView = ({ user, getProduct }: { user: User, getProduct: (id: string) => Product | undefined }) => (
    <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">Saved Items</h1>
        <div className="grid grid-cols-2 gap-4">
            {user.wishlist.map(id => {
                const p = getProduct(id);
                if (!p) return null;
                return (
                    <div key={id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 relative group">
                        <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm text-red-500 z-10">
                            <Heart size={14} fill="currentColor" />
                        </button>
                        <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 mb-3 relative">
                             <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                        </div>
                        <h3 className="font-bold text-sm truncate mb-1">{p.name}</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-charcoal-900">₹{p.price}</span>
                            <button className="bg-charcoal-900 text-white p-1.5 rounded-lg">
                                <Package size={14} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

const SupportView = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">Help & Support</h1>
                <p className="text-sm text-gray-500">How can we help you today?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:bg-green-50 transition-colors group">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-200">
                        <MessageCircle size={20} />
                    </div>
                    <span className="font-bold text-sm">WhatsApp</span>
                </button>
                <button className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 transition-colors group">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-200">
                        <Phone size={20} />
                    </div>
                    <span className="font-bold text-sm">Call Us</span>
                </button>
                <button className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:bg-gold-50 transition-colors group col-span-2">
                    <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 group-hover:bg-gold-200">
                        <Mail size={20} />
                    </div>
                    <span className="font-bold text-sm">Email Support</span>
                </button>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                    {FAQS.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            <button 
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full flex justify-between items-center p-4 text-left"
                            >
                                <span className="font-bold text-sm text-charcoal-900">{faq.q}</span>
                                <ChevronDown size={16} className={`transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openFaq === idx && (
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="p-4 pt-0 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProfileView = ({ user, onLogout }: { user: User, onLogout: () => void }) => (
    <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-gold-500 p-0.5" />
            <div className="flex-1">
                <h2 className="font-bold text-lg text-charcoal-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <button className="text-xs text-gold-600 font-bold mt-1">Edit Profile</button>
            </div>
        </div>

        <div className="space-y-3">
            {[
                { label: 'My Addresses', icon: MapPin },
                { label: 'Payment Methods', icon: CreditCard },
                { label: 'Notifications', icon: Settings },
            ].map((item, i) => (
                <button key={i} className="w-full bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-charcoal-900">
                            <item.icon size={18} />
                        </div>
                        <span className="font-medium text-sm text-charcoal-900">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                </button>
            ))}
        </div>

        <div className="bg-gold-50 p-6 rounded-3xl border border-gold-100">
            <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gold-600 shadow-sm">
                     <Package size={20} />
                 </div>
                 <div>
                     <h4 className="font-bold text-charcoal-900 mb-1">Refer a Friend</h4>
                     <p className="text-xs text-gray-600 mb-3">Earn ₹500 for every friend who joins the MA LOVE ritual.</p>
                     <button className="bg-charcoal-900 text-white px-4 py-2 rounded-lg text-xs font-bold">Share Link</button>
                 </div>
            </div>
        </div>

        <button 
            onClick={onLogout} 
            className="w-full bg-white border border-red-100 text-red-500 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-8"
        >
            <LogOut size={18} /> Logout
        </button>

        <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest pt-4">Version 1.2.0</p>
    </div>
);
