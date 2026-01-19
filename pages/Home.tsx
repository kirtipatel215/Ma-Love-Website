import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, TESTIMONIALS, BENEFITS, INGREDIENTS_FEATURE, USAGE_STEPS, HERO_SLIDES, CONCERNS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Play, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleConcernClick = (concernId: string) => {
    // Navigate to shop with the concern selected
    navigate(`/shop?concern=${concernId}`);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="bg-cream-50 overflow-hidden">
      
      {/* 1. HERO SLIDER SECTION */}
      <section className="relative h-[95vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              alt={HERO_SLIDES[currentSlide].title} 
              className="w-full h-full object-cover"
            />
            
            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                   initial={{ y: 30, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.3 }}
                >
                    <span className="inline-block glass-panel bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white mb-6 border border-white/20">
                      {HERO_SLIDES[currentSlide].subtitle}
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight hero-text-shadow">
                      {HERO_SLIDES[currentSlide].title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-xl mx-auto">
                      {HERO_SLIDES[currentSlide].desc}
                    </p>
                    
                    <div className="flex flex-col items-center gap-6">
                        <Link 
                            to="/shop" 
                            className="bg-gold-500 text-charcoal-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-400 transition-all shadow-xl hover:shadow-gold-500/30 flex items-center gap-2"
                        >
                            {HERO_SLIDES[currentSlide].cta} <ArrowRight size={20} />
                        </Link>
                        
                        {HERO_SLIDES[currentSlide].offer && (
                            <div className="glass-panel bg-black/40 border-white/10 px-6 py-3 rounded-xl">
                                <p className="text-gold-200 text-sm font-bold tracking-wider uppercase">
                                    {HERO_SLIDES[currentSlide].offer}
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/10 transition-colors hidden md:block">
            <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/10 transition-colors hidden md:block">
            <ChevronRight size={24} />
        </button>
        
        {/* Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {HERO_SLIDES.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-12 bg-gold-500' : 'w-4 bg-white/50'}`}
                />
            ))}
        </div>
      </section>

      {/* 2. CHOOSE YOUR OIL (DIAGNOSIS) SECTION */}
      <section className="py-24 px-4 bg-olive-50 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-200/20 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
                <span className="text-gold-600 font-bold tracking-widest uppercase text-xs mb-3 block">Diagnosis</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-olive-900 mb-6">Choose Your Oil</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Select your primary hair or scalp concern to find the specialized ayurvedic formulation crafted just for you.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {CONCERNS.map((concern, idx) => (
                    <motion.button
                        key={concern.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleConcernClick(concern.id)}
                        className="group bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gold-300 text-left flex flex-col justify-between h-full hover:-translate-y-1"
                    >
                        <div className="w-12 h-12 bg-olive-100 group-hover:bg-gold-100 rounded-full flex items-center justify-center mb-4 transition-colors">
                            <concern.icon className="text-olive-800 group-hover:text-gold-700 transition-colors" size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="font-bold text-charcoal-900 text-lg group-hover:text-gold-700 transition-colors leading-tight">
                                {concern.label}
                            </h3>
                            <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-gold-600 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                Find Remedy <ArrowRight size={14} className="ml-2" />
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
      </section>

      {/* 3. BEST SELLERS SCROLL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal-900">Recommended Rituals</h2>
                    <p className="text-gray-500 mt-2">Our most loved formulations.</p>
                </div>
                <Link to="/shop" className="hidden md:flex items-center gap-2 text-gold-600 font-medium hover:gap-3 transition-all border-b border-gold-200 pb-1">
                    Shop All Oils <ArrowRight size={18} />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.slice(0, 4).map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Link to={`/product/${product.id}`} className="group block">
                            <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5] bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {idx === 0 && (
                                    <span className="absolute top-3 left-3 bg-gold-500 text-charcoal-900 text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg">
                                        Best Seller
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button className="w-full bg-white/95 backdrop-blur text-charcoal-900 py-3 rounded-xl font-medium shadow-lg hover:bg-charcoal-900 hover:text-white transition-colors">
                                        Quick View
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg text-charcoal-900 group-hover:text-gold-600 transition-colors">{product.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{product.tagline}</p>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-charcoal-900">₹{product.price}</span>
                                {product.price < product.mrp && (
                                    <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
            
            <Link to="/shop" className="md:hidden mt-8 flex items-center justify-center gap-2 bg-charcoal-900 text-white py-4 rounded-xl font-bold">
                Shop All Oils <ArrowRight size={18} />
            </Link>
        </div>
      </section>

      {/* 4. VIDEO SECTION */}
      <section className="py-20 px-4 bg-cream-100">
        <div className="max-w-6xl mx-auto">
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-panel p-4 rounded-3xl relative overflow-hidden group cursor-pointer shadow-2xl"
             >
                <div className="aspect-video bg-charcoal-800 rounded-2xl overflow-hidden relative">
                    <img 
                        src="https://images.unsplash.com/photo-1556228720-19876d7564d6?q=80&w=2070&auto=format&fit=crop" 
                        alt="Brand Story" 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform shadow-2xl">
                            <Play fill="white" className="text-white ml-2" size={40} />
                        </div>
                    </div>
                    
                    <div className="absolute bottom-8 left-8 text-white">
                         <p className="text-sm font-bold uppercase tracking-widest text-gold-400 mb-2">Our Story</p>
                         <h2 className="text-3xl font-serif font-bold">Crafted with MA LOVE</h2>
                    </div>
                </div>
             </motion.div>
        </div>
      </section>

      {/* 5. PRODUCT BENEFITS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-3xl font-serif font-bold mb-16 text-olive-900">Why Your Hair Loves Us</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {BENEFITS.map((benefit, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="text-center group p-6 rounded-2xl hover:bg-cream-50 transition-colors"
                    >
                        <div className="w-20 h-20 mx-auto bg-olive-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold-100 transition-colors shadow-inner">
                            <benefit.icon size={32} className="text-olive-800 group-hover:text-gold-700" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-charcoal-900">{benefit.title}</h3>
                        <p className="text-sm text-gray-500">{benefit.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 6. INGREDIENTS & PURITY */}
      <section className="py-20 bg-olive-900 text-white overflow-hidden relative">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                     <div className="absolute inset-0 border-2 border-gold-500/30 rounded-3xl translate-x-4 translate-y-4"></div>
                     <img 
                        src="https://images.unsplash.com/photo-1611080541599-8c6dbde6edb8?q=80&w=2073&auto=format&fit=crop" 
                        alt="Natural Ingredients" 
                        className="rounded-3xl shadow-2xl relative z-10 w-full"
                     />
                </div>
                <div>
                    <span className="text-gold-400 font-bold tracking-widest uppercase text-xs mb-4 block">From The Source</span>
                    <h2 className="text-4xl font-serif font-bold mb-8">Ingredients You Can Trust</h2>
                    <div className="space-y-6">
                        {INGREDIENTS_FEATURE.map((ing, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-white/5 p-5 rounded-xl flex items-center gap-5 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center text-gold-500 font-serif font-bold">
                                    {i+1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">{ing.name}</h4>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">{ing.origin} • {ing.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <Link to="/shop" className="inline-block mt-10 text-white font-bold border-b-2 border-gold-500 hover:text-gold-400 transition-colors pb-1">
                        Explore Full Ingredient List
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* 7. SOCIAL PROOF */}
      <section className="py-24 bg-cream-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-3xl font-serif font-bold mb-16 text-charcoal-900">Stories of Transformation</h2>
            
            <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
                {TESTIMONIALS.map((t, i) => (
                    <div key={i} className="min-w-[300px] md:min-w-[400px] snap-center bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex gap-1 text-gold-500 mb-6">
                            {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-600 italic mb-8 leading-relaxed text-lg">"{t.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center font-bold text-olive-800 text-lg">
                                {t.name[0]}
                            </div>
                            <div>
                                <p className="font-bold text-charcoal-900">{t.name}</p>
                                <p className="text-xs text-gray-400 uppercase tracking-wider">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 8. HOW TO USE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <span className="text-gold-600 font-bold tracking-widest uppercase text-xs">The Ritual</span>
                <h2 className="text-3xl font-serif font-bold text-charcoal-900 mt-2">How to Use</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {USAGE_STEPS.map((step, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="bg-cream-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group hover:-translate-y-2 border border-transparent hover:border-gold-200"
                    >
                        <div className="text-6xl font-serif font-bold text-gray-200 absolute top-4 right-4 group-hover:text-gold-200 transition-colors">
                            {step.step}
                        </div>
                        <div className="relative z-10 pt-8">
                            <h3 className="font-bold text-xl mb-3 text-olive-900">{step.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-24 px-4 text-center bg-olive-900 text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Because Care Is the Greatest Gift.</h2>
            <p className="text-gray-300 mb-12 text-lg md:text-xl font-light">Give yourself or your loved ones the purity they deserve.</p>
            <Link 
                to="/shop" 
                className="inline-flex items-center gap-3 bg-white text-olive-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-gold-500 hover:text-charcoal-900 hover:scale-105 transition-all shadow-xl"
            >
                Shop Now <ArrowRight />
            </Link>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-gold-500">The Priceless Present</p>
        </div>
      </section>

    </div>
  );
};
