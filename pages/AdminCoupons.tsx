import React, { useState } from 'react';
import { MOCK_COUPONS } from '../constants';
import { Coupon, CouponType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Edit2, Trash2, CheckCircle, XCircle, Copy } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Coupon>>({
    code: '',
    name: '',
    type: 'flat',
    value: 0,
    minCartValue: 0,
    isActive: true,
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCoupons(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } as Coupon : c));
    } else {
      const newCoupon: Coupon = {
        ...formData,
        id: `cpn_${Date.now()}`,
        usedCount: 0,
        usageLimit: 1000,
      } as Coupon;
      setCoupons(prev => [newCoupon, ...prev]);
    }
    setShowModal(false);
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
        code: '',
        name: '',
        type: 'flat',
        value: 0,
        minCartValue: 0,
        isActive: true,
        validFrom: new Date().toISOString().split('T')[0],
        validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    });
  };

  const openEdit = (coupon: Coupon) => {
    setEditingId(coupon.id);
    setFormData(coupon);
    setShowModal(true);
  };

  const toggleStatus = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const filteredCoupons = coupons.filter(c => {
    if (filter === 'active') return c.isActive;
    if (filter === 'inactive') return !c.isActive;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-charcoal-900">Coupon Management</h1>
            <p className="text-gray-500">Create, edit and track offers.</p>
          </div>
          <button 
            onClick={() => { resetForm(); setEditingId(null); setShowModal(true); }}
            className="bg-charcoal-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gold-600 transition-colors flex items-center gap-2 shadow-lg shadow-gold-200/50"
          >
            <Plus size={18} /> Create Coupon
          </button>
        </div>

        {/* Filters & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold">Total Active</p>
                <p className="text-2xl font-bold text-green-600">{coupons.filter(c => c.isActive).length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold">Total Redemptions</p>
                <p className="text-2xl font-bold text-gold-600">{coupons.reduce((acc, c) => acc + c.usedCount, 0)}</p>
            </div>
            <div className="md:col-span-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                <Search className="text-gray-400 ml-2" size={20} />
                <input type="text" placeholder="Search coupons..." className="flex-1 p-2 outline-none bg-transparent" />
                <div className="flex bg-gray-100 rounded-lg p-1">
                    {(['all', 'active', 'inactive'] as const).map((f) => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 rounded-md text-xs font-bold capitalize transition-all ${filter === f ? 'bg-white shadow text-charcoal-900' : 'text-gray-500'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoupons.map((coupon) => (
                <motion.div 
                    layout
                    key={coupon.id}
                    className={`bg-white p-6 rounded-2xl shadow-sm border-2 relative overflow-hidden group ${coupon.isActive ? 'border-transparent' : 'border-gray-100 opacity-75'}`}
                >
                    <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {coupon.isActive ? 'Active' : 'Inactive'}
                    </div>

                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-gray-50 px-4 py-2 rounded-lg border border-dashed border-gray-300 font-mono font-bold text-lg tracking-wider text-charcoal-900">
                            {coupon.code}
                        </div>
                    </div>

                    <h3 className="font-bold text-charcoal-900 mb-1">{coupon.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 h-10 line-clamp-2">{coupon.description}</p>

                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-6">
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase">Discount</span>
                            <span className="font-bold text-gold-600">
                                {coupon.type === 'flat' ? `₹${coupon.value}` : 
                                 coupon.type === 'percentage' ? `${coupon.value}%` : 'Free Ship'}
                            </span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase">Min Cart</span>
                            <span className="font-bold">₹{coupon.minCartValue}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase">Used</span>
                            <span className="font-bold">{coupon.usedCount} / {coupon.usageLimit}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase">Expires</span>
                            <span className="font-bold">{new Date(coupon.validUntil).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                        <button 
                            onClick={() => openEdit(coupon)}
                            className="flex-1 flex items-center justify-center gap-2 bg-charcoal-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-gold-600 transition-colors"
                        >
                            <Edit2 size={14} /> Edit
                        </button>
                        <button 
                            onClick={() => toggleStatus(coupon.id)}
                            className={`p-2 rounded-lg border ${coupon.isActive ? 'border-red-100 text-red-500 hover:bg-red-50' : 'border-green-100 text-green-500 hover:bg-green-50'}`}
                        >
                           {coupon.isActive ? <XCircle size={18} /> : <CheckCircle size={18} />}
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="text-2xl font-serif font-bold mb-6">
                            {editingId ? 'Edit Coupon' : 'Create New Coupon'}
                        </h2>
                        
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Coupon Code</label>
                                    <input 
                                        type="text" 
                                        value={formData.code}
                                        onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-gold-500 outline-none font-mono"
                                        placeholder="SUMMER20"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Internal Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-gold-500 outline-none"
                                        placeholder="Summer Sale Campaign"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Type</label>
                                    <select 
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value as CouponType})}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-gold-500 outline-none bg-white"
                                    >
                                        <option value="flat">Flat Amount (₹)</option>
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="free_shipping">Free Shipping</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Value</label>
                                    <input 
                                        type="number" 
                                        value={formData.value}
                                        onChange={(e) => setFormData({...formData, value: Number(e.target.value)})}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-gold-500 outline-none"
                                        disabled={formData.type === 'free_shipping'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Min Cart Value</label>
                                    <input 
                                        type="number" 
                                        value={formData.minCartValue}
                                        onChange={(e) => setFormData({...formData, minCartValue: Number(e.target.value)})}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-gold-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Description (Customer Facing)</label>
                                <textarea 
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-gold-500 outline-none h-20"
                                    placeholder="Brief details about the offer..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Valid From</label>
                                    <input 
                                        type="date" 
                                        value={formData.validFrom}
                                        onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-gold-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Valid Until</label>
                                    <input 
                                        type="date" 
                                        value={formData.validUntil}
                                        onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-gold-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 py-3 rounded-xl bg-charcoal-900 text-white font-bold hover:bg-gold-600 transition-colors"
                                >
                                    {editingId ? 'Update Coupon' : 'Create Coupon'}
                                </button>
                            </div>

                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};
