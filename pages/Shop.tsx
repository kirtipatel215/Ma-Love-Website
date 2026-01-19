import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRODUCTS, CONCERNS } from '../constants';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Shop: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterConcern, setFilterConcern] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular'>('popular');
  
  const location = useLocation();

  // Read query params for filters (e.g. from Home page quiz)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const concernParam = params.get('concern');
    if (concernParam) {
        setFilterConcern(concernParam);
    }
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (filterCategory !== 'All') {
      result = result.filter(p => p.category === filterCategory);
    }
    if (filterConcern !== 'All') {
      result = result.filter(p => p.concern.includes(filterConcern));
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    // popular assumes mock order

    return result;
  }, [filterCategory, filterConcern, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-charcoal-900 mb-2">Shop All</h1>
          <p className="text-gray-500">Curated formulas for hair and skin.</p>
        </div>

        {/* Filters Toolbar */}
        <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-24 z-30">
          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
             <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mr-2">
                <SlidersHorizontal size={18} /> Filters:
             </div>
             
             <select 
                className="bg-transparent border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:border-gold-500 outline-none"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
             >
                <option value="All">All Categories</option>
                <option value="Hair">Hair</option>
                <option value="Skin">Skin</option>
                <option value="Body">Body</option>
             </select>

             <select 
                className="bg-transparent border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:border-gold-500 outline-none"
                value={filterConcern}
                onChange={(e) => setFilterConcern(e.target.value)}
             >
                <option value="All">All Concerns</option>
                {CONCERNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
             </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
             <ArrowDownUp size={18} className="text-gray-500" />
             <select 
                className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
             >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
             </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
             <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group bg-white rounded-2xl p-4 hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-gold-100"
             >
                <Link to={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                         {product.price < product.mrp && (
                            <span className="absolute top-2 right-2 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-md border border-red-100">
                                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                            </span>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">{product.tagline}</p>
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                                <span className="text-lg font-bold text-charcoal-900">₹{product.price}</span>
                            </div>
                            <button className="bg-charcoal-900 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                +
                            </button>
                        </div>
                    </div>
                </Link>
             </motion.div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <button 
                    onClick={() => { setFilterCategory('All'); setFilterConcern('All'); }}
                    className="mt-4 text-gold-600 underline"
                >
                    Clear Filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
