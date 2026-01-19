import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Smartphone, ArrowRight, User as UserIcon } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      onLogin(MOCK_USER);
      navigate('/dashboard');
    }, 1500);
  };

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOtpSent(true);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-olive-50 flex items-center justify-center p-4 pt-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gold-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-olive-200/40 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/50 bg-white/60">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-charcoal-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to access your curated ritual.</p>
          </div>

          {/* Toggle Method */}
          <div className="flex bg-gray-100/50 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setMethod('email')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === 'email' ? 'bg-white shadow-sm text-charcoal-900' : 'text-gray-400'}`}
            >
              Email & Password
            </button>
            <button 
              onClick={() => setMethod('otp')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === 'otp' ? 'bg-white shadow-sm text-charcoal-900' : 'text-gray-400'}`}
            >
              Mobile OTP
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence mode="wait">
              {method === 'email' ? (
                <motion.div 
                  key="email"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-gold-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="password" 
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-gold-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="text-xs text-gold-600 font-bold hover:underline">Forgot Password?</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {!otpSent ? (
                     <div className="space-y-4">
                       <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+91</span>
                        <input 
                          type="tel" 
                          placeholder="Mobile Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          className="w-full pl-14 pr-4 py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-gold-500 outline-none transition-all tracking-wider font-medium"
                          maxLength={10}
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={handleSendOtp}
                        disabled={phone.length !== 10 || loading}
                        className="w-full py-3 bg-gray-100 text-charcoal-900 font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Sending...' : 'Get OTP'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                       <p className="text-xs text-center text-gray-500">OTP sent to +91 {phone}</p>
                       <input 
                          type="text" 
                          placeholder="• • • • • •"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                          className="w-full text-center py-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-gold-500 outline-none transition-all text-2xl tracking-[0.5em] font-bold"
                          maxLength={6}
                          autoFocus
                        />
                        <button 
                          type="button" 
                          onClick={() => { setOtpSent(false); setOtp(''); }} 
                          className="text-xs text-gold-600 font-bold block w-full text-center"
                        >
                          Change Number?
                        </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={loading || (method === 'otp' && otp.length !== 6)}
              className="w-full bg-charcoal-900 text-white py-4 rounded-xl font-bold shadow-xl hover:bg-gold-600 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>

          {/* Social / Footer */}
          <div className="mt-8">
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-widest">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>
            
            <button className="w-full mt-4 bg-white border border-gray-200 text-charcoal-900 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Google
            </button>

            <p className="text-center mt-6 text-sm text-gray-500">
              New to Ma Love? <button className="text-gold-600 font-bold hover:underline">Create Account</button>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
