import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Star, Truck, ShieldCheck, Leaf, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductDetailProps {
  addToCart: (product: any, qty: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = PRODUCTS.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'use'>('desc');

  // Reset state when product changes
  useEffect(() => {
    setQty(1);
    setActiveTab('desc');
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return <div className="p-20 text-center">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden relative">
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                 <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/80 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {product.category}
                    </span>
                 </div>
            </div>
            {/* Thumbnails would go here */}
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full justify-center"
          >
            <div className="mb-2 flex items-center gap-2">
                <div className="flex text-gold-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className={i >= Math.floor(product.rating) ? 'text-gray-300' : ''} />)}
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            <h1 className="text-4xl font-serif font-bold text-charcoal-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-500 mb-6">{product.tagline}</p>

            <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-bold text-charcoal-900">₹{product.price}</span>
                <span className="text-xl text-gray-400 line-through mb-1">₹{product.mrp}</span>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-2">
                    Save ₹{product.mrp - product.price}
                </span>
            </div>

            <div className="border-t border-b border-gray-100 py-6 mb-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Leaf className="text-green-600" size={20} />
                    <span>100% Ayurvedic & Toxin Free</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="text-blue-600" size={20} />
                    <span>Free Shipping on Prepaid Orders</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck className="text-gold-600" size={20} />
                    <span>Authenticity Guaranteed</span>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-xl">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-gray-50 rounded-l-xl"><Minus size={16}/></button>
                    <span className="w-12 text-center font-medium">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-gray-50 rounded-r-xl"><Plus size={16}/></button>
                </div>
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-white border-2 border-charcoal-900 text-charcoal-900 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                    Add to Cart
                </button>
                <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-charcoal-900 text-white rounded-xl font-bold hover:bg-gold-600 transition-colors shadow-lg shadow-gold-200/50"
                >
                    Buy Now
                </button>
            </div>

            {/* Tabs */}
            <div className="mt-4">
                <div className="flex gap-8 border-b border-gray-200 mb-4">
                    <button onClick={() => setActiveTab('desc')} className={`pb-2 text-sm font-bold uppercase tracking-wider ${activeTab === 'desc' ? 'border-b-2 border-charcoal-900' : 'text-gray-400'}`}>Description</button>
                    <button onClick={() => setActiveTab('ingredients')} className={`pb-2 text-sm font-bold uppercase tracking-wider ${activeTab === 'ingredients' ? 'border-b-2 border-charcoal-900' : 'text-gray-400'}`}>Ingredients</button>
                    <button onClick={() => setActiveTab('use')} className={`pb-2 text-sm font-bold uppercase tracking-wider ${activeTab === 'use' ? 'border-b-2 border-charcoal-900' : 'text-gray-400'}`}>How to Use</button>
                </div>
                <div className="text-gray-600 leading-relaxed min-h-[100px]">
                    {activeTab === 'desc' && <p>{product.description}</p>}
                    {activeTab === 'ingredients' && <p>{product.ingredients}</p>}
                    {activeTab === 'use' && <p>{product.howToUse}</p>}
                </div>
            </div>

          </motion.div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-t border-gray-100 pt-16"
            >
                <h2 className="text-3xl font-serif font-bold text-charcoal-900 mb-8">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((rp) => (
                        <Link key={rp.id} to={`/product/${rp.id}`} className="group block">
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4">
                                <img
                                    src={rp.image}
                                    alt={rp.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {rp.price < rp.mrp && (
                                    <span className="absolute top-2 right-2 bg-white/90 backdrop-blur text-red-600 text-[10px] font-bold px-2 py-1 rounded">
                                        -{Math.round(((rp.mrp - rp.price) / rp.mrp) * 100)}%
                                    </span>
                                )}
                            </div>
                            <h3 className="font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors truncate">{rp.name}</h3>
                            <p className="text-xs text-gray-500 mb-2 truncate">{rp.tagline}</p>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-charcoal-900">₹{rp.price}</span>
                                <span className="text-xs text-gray-400 line-through">₹{rp.mrp}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
};