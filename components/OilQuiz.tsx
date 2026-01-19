import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';
import { CONCERNS, PRODUCTS } from '../constants';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

export const OilQuiz: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Start, 1: Selection, 2: Loading, 3: Result
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const toggleConcern = (id: string) => {
    setSelectedConcerns(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const calculateResult = () => {
    setStep(2);
    // Simulate complex algorithm delay
    setTimeout(() => {
      // Logic: Find product with most matching tags
      let bestMatch = PRODUCTS[0];
      let maxMatches = 0;

      PRODUCTS.forEach(product => {
        const matches = product.concern.filter(c => selectedConcerns.includes(c)).length;
        if (matches > maxMatches) {
          maxMatches = matches;
          bestMatch = product;
        }
      });

      setRecommendedProduct(bestMatch);
      setStep(3);
    }, 1500);
  };

  const resetQuiz = () => {
    setSelectedConcerns([]);
    setStep(0);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-gold-600 font-bold tracking-widest uppercase text-xs mb-2 block">Personalized Diagnosis</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-900 mb-4">Discover Your Perfect Ritual</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Ayurveda is specific. Answer a few questions about your hair health, and we'll formulate the perfect regimen for you.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 md:p-12 min-h-[500px] flex items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-500">

          <AnimatePresence mode="wait">
            {/* STEP 0: INTRO */}
            {step === 0 && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center w-full"
              >
                <div className="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
                  ✨
                </div>
                <h3 className="text-2xl font-bold mb-4">Ready to transform your hair?</h3>
                <p className="text-gray-500 mb-8">Takes less than 30 seconds.</p>
                <button
                  onClick={() => setStep(1)}
                  className="bg-charcoal-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                >
                  Start Diagnosis <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {/* STEP 1: SELECTION */}
            {step === 1 && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <h3 className="text-xl font-bold mb-6 text-center">What are your primary hair concerns?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {CONCERNS.map((concern) => (
                    <button
                      key={concern.id}
                      onClick={() => toggleConcern(concern.id)}
                      className={`p-6 rounded-2xl border text-center transition-all duration-300 ${
                        selectedConcerns.includes(concern.id)
                          ? 'border-gold-500 bg-gold-50 shadow-md scale-105'
                          : 'border-gray-200 hover:border-gold-300 hover:bg-white/50'
                      }`}
                    >
                      <div className="text-3xl mb-3 flex justify-center"><concern.icon size={32} /></div>
                      <div className="font-medium text-sm text-charcoal-800">{concern.label}</div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button onClick={() => setStep(0)} className="text-gray-400 hover:text-charcoal-900 px-4">Back</button>
                  <button
                    onClick={calculateResult}
                    disabled={selectedConcerns.length === 0}
                    className="bg-charcoal-900 text-white px-8 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-600 transition-colors"
                  >
                    Analyze My Hair
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: LOADING */}
            {step === 2 && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-16 h-16 border-4 border-gray-200 border-t-gold-500 rounded-full mx-auto mb-6"
                />
                <h3 className="text-xl font-medium">Consulting our Ayurvedic texts...</h3>
                <p className="text-gray-400 text-sm mt-2">Matching ingredients to your profile.</p>
              </motion.div>
            )}

            {/* STEP 3: RESULT */}
            {step === 3 && recommendedProduct && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="relative group">
                    <div className="absolute inset-0 bg-gold-200 rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 opacity-50"></div>
                    <img
                        src={recommendedProduct.image}
                        alt={recommendedProduct.name}
                        className="rounded-2xl shadow-xl w-full object-cover aspect-square relative z-10"
                    />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                    <CheckCircle size={14} /> Best Match
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">{recommendedProduct.name}</h3>
                  <p className="text-gold-600 italic mb-4">{recommendedProduct.tagline}</p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    Based on your concerns ({selectedConcerns.map(id => CONCERNS.find(c => c.id === id)?.label).join(", ")}),
                    this formula is designed to target root causes effectively.
                  </p>
                  <div className="flex gap-4">
                    <button
                        onClick={() => navigate(`/product/${recommendedProduct.id}`)}
                        className="flex-1 bg-charcoal-900 text-white py-3 rounded-xl font-medium hover:bg-gold-600 transition-colors shadow-lg shadow-gold-200/50"
                    >
                      View Product
                    </button>
                    <button
                        onClick={resetQuiz}
                        className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500"
                    >
                        <RefreshCw size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};