import React, { useState } from 'react';
import { Search, Package, Truck, Check, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found'>('idle');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
        setStatus('found');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-serif font-bold text-charcoal-900 mb-4">Track Your Order</h1>
            <p className="text-gray-500">Enter your Order ID sent via SMS/Email.</p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-2 mb-12">
            <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Order ID (e.g., OD12345678)"
                className="flex-1 p-4 rounded-xl border border-gray-200 focus:border-gold-500 outline-none shadow-sm"
                required
            />
            <button type="submit" className="bg-charcoal-900 text-white px-6 rounded-xl font-bold hover:bg-gold-600 transition-colors">
                <Search />
            </button>
        </form>

        {status === 'loading' && (
            <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-gold-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500">Fetching details from Shiprocket...</p>
            </div>
        )}

        {status === 'found' && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
                <div className="flex justify-between items-start mb-8 border-b pb-4">
                    <div>
                        <h3 className="font-bold text-lg">Order #{orderId || 'OD12345678'}</h3>
                        <p className="text-sm text-gray-500">Expected Delivery: <span className="text-green-600 font-bold">Tomorrow</span></p>
                    </div>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">In Transit</span>
                </div>

                <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                    <div className="relative">
                        <div className="absolute -left-[35px] w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white ring-4 ring-white">
                            <Check size={14} />
                        </div>
                        <h4 className="font-bold text-charcoal-900">Order Placed</h4>
                        <p className="text-xs text-gray-500">Oct 24, 10:30 AM</p>
                    </div>

                    <div className="relative">
                        <div className="absolute -left-[35px] w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white ring-4 ring-white">
                            <Package size={14} />
                        </div>
                        <h4 className="font-bold text-charcoal-900">Packed & Shipped</h4>
                        <p className="text-xs text-gray-500">Oct 25, 02:15 PM • Courier: Bluedart</p>
                    </div>

                    <div className="relative">
                        <div className="absolute -left-[35px] w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center text-white ring-4 ring-white shadow-lg shadow-gold-200">
                            <Truck size={14} />
                        </div>
                        <h4 className="font-bold text-gold-600">Out for Delivery</h4>
                        <p className="text-xs text-gray-500">Today, 09:00 AM • Mumbai Hub</p>
                        <p className="mt-2 text-sm bg-gray-50 p-2 rounded">Your package is with the delivery agent.</p>
                    </div>

                    <div className="relative opacity-50">
                        <div className="absolute -left-[35px] w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white ring-4 ring-white">
                            <MapPin size={14} />
                        </div>
                        <h4 className="font-bold text-gray-500">Delivered</h4>
                        <p className="text-xs text-gray-500">Estimated: Oct 26</p>
                    </div>
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
};
