import React, { useState } from 'react';
import { CartItem, Coupon } from '../types';
import { Trash2, ArrowRight, CreditCard, Banknote, Ticket, X, ChevronRight, Check, Percent, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_COUPONS, MOCK_USER } from '../constants';
import { validateCoupon } from '../utils/coupon';
import { motion, AnimatePresence } from 'framer-motion';

interface CartProps {
  items: CartItem[];
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, updateQty, removeItem, clearCart }) => {
  const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [loading, setLoading] = useState(false);
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [showCouponSheet, setShowCouponSheet] = useState(false);

  const navigate = useNavigate();

  // Basic Totals
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Logic: Shipping is 100 if subtotal < 1000, else free. If coupon is free_shipping, shipping is 0.
  let shipping = subtotal > 0 && subtotal < 1000 ? 100 : 0;
  if (appliedCoupon?.type === 'free_shipping') {
    shipping = 0;
  }
  
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyCoupon = (code: string = couponCode) => {
    setCouponError('');
    const coupon = MOCK_COUPONS.find(c => c.code === code);
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
      setDiscountAmount(0);
      return;
    }

    // Use mock user or null (in real app, use auth context)
    const result = validateCoupon(coupon, subtotal, items, MOCK_USER);

    if (result.isValid) {
      setAppliedCoupon(coupon);
      setDiscountAmount(result.discountAmount);
      setCouponCode(code);
      setShowCouponSheet(false);
    } else {
      setCouponError(result.error || 'Coupon cannot be applied');
      setAppliedCoupon(null);
      setDiscountAmount(0);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode('');
    setCouponError('');
  };

  const handlePayment = () => {
    setLoading(true);
    // Simulate Razorpay opening
    setTimeout(() => {
        const rzp = confirm(`Simulating Razorpay Payment Gateway.\n\nClick OK to Pay ₹${total}\nClick Cancel to Fail Transaction`);
        setLoading(false);
        if(rzp) {
            clearCart();
            navigate('/track'); // Redirect to tracking on success
        }
    }, 1500);
  };

  if (items.length === 0 && step === 'cart') {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Ticket size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-2 text-charcoal-900">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">It looks like you haven't added any items yet.</p>
            <Link to="/shop" className="bg-charcoal-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gold-600 transition-colors">Start Shopping</Link>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
        {/* Progress */}
        <div className="flex justify-between mb-8 text-sm font-medium text-gray-400 border-b border-gray-100 pb-4">
            <span className={step === 'cart' ? 'text-charcoal-900 font-bold' : ''}>1. Cart</span>
            <span className={step === 'address' ? 'text-charcoal-900 font-bold' : ''}>2. Address</span>
            <span className={step === 'payment' ? 'text-charcoal-900 font-bold' : ''}>3. Payment</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                {step === 'cart' && (
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-xl flex gap-4 shadow-sm border border-gray-100">
                                <img src={item.image} className="w-20 h-20 object-cover rounded-lg bg-gray-50" alt={item.name} />
                                <div className="flex-1">
                                    <h3 className="font-bold text-charcoal-900 line-clamp-1">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">₹{item.price}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center border rounded-lg bg-gray-50">
                                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100 rounded-l-lg font-bold">-</button>
                                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100 rounded-r-lg font-bold">+</button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                                <div className="font-bold text-lg">₹{item.price * item.quantity}</div>
                            </div>
                        ))}
                    </div>
                )}

                {step === 'address' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h3 className="font-bold text-lg mb-4 text-charcoal-900">Shipping Address</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input type="text" placeholder="Full Name" className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-gold-500 transition-colors" />
                            <input type="text" placeholder="Address Line 1" className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-gold-500 transition-colors" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="City" className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-gold-500 transition-colors" />
                                <input type="text" placeholder="Pincode" className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-gold-500 transition-colors" />
                            </div>
                            <input type="tel" placeholder="Phone Number" className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-gold-500 transition-colors" />
                        </div>
                    </div>
                )}

                {step === 'payment' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h3 className="font-bold text-lg mb-4 text-charcoal-900">Select Payment Method</h3>
                        <div className="border p-4 rounded-xl flex items-center gap-4 bg-gold-50/50 border-gold-500 cursor-pointer">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gold-600 shadow-sm">
                                <CreditCard size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-charcoal-900">Pay via Razorpay</p>
                                <p className="text-xs text-gray-500">UPI, Credit/Debit Card, Netbanking</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-4 border-gold-500"></div>
                        </div>
                        <div className="border p-4 rounded-xl flex items-center gap-4 opacity-50 cursor-not-allowed border-gray-200 bg-gray-50">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
                                <Banknote size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-500">Cash on Delivery</p>
                                <p className="text-xs text-gray-400">Currently unavailable due to high demand</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="md:col-span-1">
                <div className="bg-white border border-white shadow-lg shadow-gray-100 p-6 rounded-2xl sticky top-24">
                    {/* Coupon Section */}
                    {step === 'cart' && (
                        <div className="mb-6">
                            {!appliedCoupon ? (
                                <div>
                                    <button 
                                        onClick={() => setShowCouponSheet(true)}
                                        className="w-full bg-gradient-to-r from-gold-50 to-white border border-dashed border-gold-400 text-charcoal-900 py-3 rounded-xl font-bold flex items-center justify-between px-4 hover:brightness-95 transition-all mb-3 shadow-sm"
                                    >
                                        <span className="flex items-center gap-2 text-sm"><Ticket size={16} className="text-gold-600" /> Apply Coupon</span>
                                        <ChevronRight size={16} className="text-gray-400" />
                                    </button>
                                    
                                    {/* Inline Input fallback */}
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            placeholder="Enter Code" 
                                            value={couponCode}
                                            onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(''); }}
                                            className="flex-1 p-3 rounded-xl border border-gray-200 outline-none uppercase font-bold text-sm focus:border-charcoal-900 transition-colors"
                                        />
                                        <button 
                                            onClick={() => handleApplyCoupon()}
                                            disabled={!couponCode}
                                            className="bg-charcoal-900 text-white px-4 rounded-xl font-bold text-sm disabled:opacity-50 hover:bg-gold-600 transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {couponError && <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1"><X size={12}/> {couponError}</p>}
                                </div>
                            ) : (
                                <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-start justify-between relative overflow-hidden">
                                    <div className="relative z-10">
                                        <p className="text-green-800 font-bold flex items-center gap-2 text-sm">
                                            <Check size={14} strokeWidth={3} /> '{appliedCoupon.code}' Applied
                                        </p>
                                        <p className="text-xs text-green-700 mt-1 font-medium">
                                            You saved ₹{discountAmount} on this order!
                                        </p>
                                    </div>
                                    <button onClick={removeCoupon} className="text-green-400 hover:text-red-500 relative z-10 p-1">
                                        <X size={16} />
                                    </button>
                                    {/* Decor */}
                                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-green-100 rounded-full blur-xl"></div>
                                </div>
                            )}
                        </div>
                    )}

                    <h3 className="font-serif font-bold text-xl mb-4 text-charcoal-900">Order Summary</h3>
                    <div className="space-y-3 text-sm text-gray-600 mb-6 border-b border-gray-100 pb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium">₹{subtotal}</span>
                        </div>
                        {appliedCoupon && (
                            <div className="flex justify-between text-green-600 font-medium bg-green-50 p-2 rounded-lg -mx-2">
                                <span>Coupon Discount</span>
                                <span>- ₹{discountAmount}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            {shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : <span className="font-medium">₹{shipping}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-xl mb-8 text-charcoal-900 items-end">
                        <span>Total Payable</span>
                        <span>₹{total}</span>
                    </div>

                    {step === 'cart' && (
                        <button onClick={() => setStep('address')} className="w-full bg-charcoal-900 text-white py-4 rounded-xl font-bold hover:bg-gold-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-charcoal-900/10 hover:shadow-gold-500/20 hover:-translate-y-0.5">
                            Checkout <ArrowRight size={18} />
                        </button>
                    )}
                    {step === 'address' && (
                        <button onClick={() => setStep('payment')} className="w-full bg-charcoal-900 text-white py-4 rounded-xl font-bold hover:bg-gold-600 transition-all shadow-xl shadow-charcoal-900/10 hover:shadow-gold-500/20 hover:-translate-y-0.5">
                            Proceed to Pay
                        </button>
                    )}
                    {step === 'payment' && (
                        <button onClick={handlePayment} disabled={loading} className="w-full bg-gold-500 text-charcoal-900 py-4 rounded-xl font-bold hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2">
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-charcoal-900 border-t-transparent rounded-full animate-spin"></div>
                            ) : `Pay ₹${total}`}
                        </button>
                    )}
                    
                    <div className="mt-4 flex justify-center items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                         <ShieldCheck className="text-green-500" size={14} /> 100% Secure Payment
                    </div>
                </div>
            </div>
        </div>

        {/* Coupons Bottom Sheet / Modal */}
        <AnimatePresence>
            {showCouponSheet && (
                <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCouponSheet(false)}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        className="bg-white w-full md:max-w-md md:rounded-3xl rounded-t-3xl p-6 relative z-10 max-h-[85vh] overflow-y-auto"
                    >
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden"></div>
                        
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-serif font-bold text-xl">Available Coupons</h3>
                            <button onClick={() => setShowCouponSheet(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Manual Entry in Sheet */}
                        <div className="flex gap-2 mb-8">
                             <input 
                                type="text" 
                                placeholder="Enter Code" 
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                className="flex-1 p-3 rounded-xl border border-gray-200 outline-none uppercase font-bold text-sm"
                             />
                             <button 
                                onClick={() => handleApplyCoupon()}
                                className="bg-charcoal-900 text-white px-4 rounded-xl font-bold text-sm"
                             >
                                Check
                             </button>
                        </div>

                        <div className="space-y-4">
                            {MOCK_COUPONS.filter(c => c.isActive).map(coupon => {
                                const validation = validateCoupon(coupon, subtotal, items, MOCK_USER);
                                return (
                                    <div 
                                        key={coupon.id} 
                                        className={`border rounded-xl p-4 relative overflow-hidden transition-all ${
                                            validation.isValid 
                                            ? 'border-gray-200 bg-white hover:border-gold-300' 
                                            : 'border-gray-100 bg-gray-50 opacity-60'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="bg-gray-100 px-3 py-1 rounded-md text-xs font-bold font-mono tracking-wider text-charcoal-900 border border-gray-200 border-dashed">
                                                {coupon.code}
                                            </div>
                                            {validation.isValid ? (
                                                <button 
                                                    onClick={() => handleApplyCoupon(coupon.code)}
                                                    className="text-gold-600 font-bold text-sm hover:underline"
                                                >
                                                    APPLY
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-400 font-medium">N/A</span>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-sm mb-1">{coupon.name}</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed mb-3">{coupon.description}</p>
                                        
                                        {!validation.isValid && validation.error && (
                                            <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                                                <X size={10} /> {validation.error}
                                            </p>
                                        )}

                                        {/* Visual flair */}
                                        <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-gold-100 rounded-full blur-xl opacity-50"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};
import { ShieldCheck } from 'lucide-react';
