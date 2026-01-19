import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  isLoggedIn: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartCount, isLoggedIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect for glass navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-charcoal-900 selection:bg-gold-200">
      {/* Sticky Glass Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen || location.pathname === '/login' || location.pathname === '/dashboard' ? 'glass-panel shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-widest">MA LOVE</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600">The Priceless Present</span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className={`text-sm font-medium hover:text-gold-600 transition-colors ${location.pathname === '/' ? 'text-gold-600' : ''}`}>Home</Link>
              <Link to="/shop" className={`text-sm font-medium hover:text-gold-600 transition-colors ${location.pathname === '/shop' ? 'text-gold-600' : ''}`}>Shop</Link>
              <Link to="/track" className={`text-sm font-medium hover:text-gold-600 transition-colors ${location.pathname === '/track' ? 'text-gold-600' : ''}`}>Track Order</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button className="text-charcoal-900 hover:text-gold-600 transition-transform hover:scale-110">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={handleUserClick}
                className={`transition-transform hover:scale-110 ${isLoggedIn ? 'text-gold-600' : 'text-charcoal-900'}`}
              >
                <User size={20} strokeWidth={1.5} fill={isLoggedIn ? 'currentColor' : 'none'} />
              </button>
              <Link to="/cart" className="relative text-charcoal-900 hover:text-gold-600 transition-transform hover:scale-110">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-charcoal-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden text-charcoal-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium py-2 border-b border-gray-50">Home</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium py-2 border-b border-gray-50">Shop Collections</Link>
                <Link to="/track" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium py-2 border-b border-gray-50">Track Order</Link>
                <button onClick={() => { handleUserClick(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-lg font-medium py-2 text-gold-600">
                  {isLoggedIn ? 'My Dashboard' : 'Login / Sign Up'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <span className="text-2xl font-serif font-bold tracking-widest block mb-2">MA LOVE</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 block mb-6">The Priceless Present</span>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nourish beyond care. Pure, natural oils crafted to protect what matters most.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gold-500">Shop</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/shop" className="hover:text-white transition-colors">All Oils</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Hair Care</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Skin Radiance</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Wellness</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gold-500">Support</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/track" className="hover:text-white transition-colors">Track Order</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gold-500">Stay Updated</h4>
              <div className="flex bg-white/10 rounded-lg p-1">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="bg-transparent border-none outline-none text-white text-sm px-4 flex-grow placeholder-gray-500"
                />
                <button className="bg-gold-500 text-charcoal-900 px-4 py-2 rounded-md font-medium text-sm hover:bg-gold-400 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2024 MA LOVE. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
