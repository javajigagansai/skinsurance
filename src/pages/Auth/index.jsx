import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { Button } from '../../components/ui/Button';
import { FaKey, FaEnvelope, FaEye, FaEyeSlash, FaApple, FaGoogle, FaMicrosoft, FaPlus, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

export const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showHints, setShowHints] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) return;
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setIsRegister(false);
      setEmail(regEmail);
      setRegName('');
      setRegEmail('');
      setRegPassword('');
    }, 2000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      setErrorMsg('');
      navigate('/dashboard');
    } else {
      setErrorMsg(t('invalid_credentials'));
    }
  };

  const autofill = (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setErrorMsg('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-navy-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Split Grid Card */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row glass-panel dark:glass-panel-gold rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-slate-200/50 dark:border-gold-400/20">
        
        {/* Left pane: Video Background with branding overlay */}
        <div className="w-full md:w-[45%] p-6 sm:p-8 flex flex-col items-center justify-center text-white min-h-[280px] md:min-h-[500px] relative overflow-hidden">
          
          {/* Background Loop Video */}
          <video 
            className="absolute inset-0 w-full h-full object-cover z-0" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/login.mp4" type="video/mp4" />
            {/* High-quality abstract stock fallback */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-particles-background-loop-42867-large.mp4" type="video/mp4" />
          </video>

          {/* Dark Glassy Overlay to preserve logo contrast */}
          <div className="absolute inset-0 bg-navy-950/50 dark:bg-navy-950/65 z-10 backdrop-blur-[1.5px]" />
          
          {/* Floating Logo overlay */}
          <div className="text-center space-y-1 relative z-20">
            <h1 className="text-5xl font-black tracking-tight leading-none text-white drop-shadow-md">
              S<span className="text-gold-500">K</span>
            </h1>
            <p className="text-xs uppercase tracking-widest font-extrabold text-slate-200 drop-shadow">
              Investments
            </p>
          </div>
        </div>

        {/* Right pane: Form fields */}
        <div className="w-full md:w-[55%] p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-navy-950 relative z-10 text-left">
          <div>
            {/* Sign In / Register Tab Selector */}
            <div className="flex p-1 bg-slate-100 dark:bg-navy-900/60 rounded-2xl mb-6 text-xs sm:text-sm border border-slate-200/40 dark:border-white/5">
              <button
                type="button"
                onClick={() => { setIsRegister(false); setErrorMsg(''); }}
                className={`flex-1 py-2 px-4 rounded-xl font-bold text-center transition-all duration-300 transform cursor-pointer hover:scale-[1.02] active:scale-95 ${
                  !isRegister
                    ? 'bg-white dark:bg-navy-950 text-navy-950 dark:text-white shadow-md'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsRegister(true); setErrorMsg(''); }}
                className={`flex-1 py-2 px-4 rounded-xl font-bold text-center transition-all duration-300 transform cursor-pointer hover:scale-[1.02] active:scale-95 ${
                  isRegister
                    ? 'bg-white dark:bg-navy-950 text-navy-950 dark:text-white shadow-md'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                Register
              </button>
            </div>

            {/* Error Message Panel */}
            {errorMsg && !isRegister && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/30 rounded-xl flex items-center space-x-2 text-red-600 dark:text-red-400 text-xs animate-shake">
                <FaExclamationTriangle className="shrink-0 text-base" />
                <p className="font-medium">{errorMsg}</p>
              </div>
            )}

            {/* Registration Success Overlay */}
            {registerSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-500/30 rounded-xl flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs animate-fadeIn">
                <FaInfoCircle className="shrink-0 text-base" />
                <p className="font-medium">Registration successful! Redirecting to sign in...</p>
              </div>
            )}

            {/* CONDITIONAL FORMS WITH ANIMATIONS */}
            <AnimatePresence mode="wait">
              {!isRegister ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                        Client ID or Email
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                          <FaEnvelope />
                        </span>
                        <input
                          required
                          type="text"
                          placeholder="Enter your Client ID"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                        Secure Password
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                          <FaKey />
                        </span>
                        <input
                          required
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-9 pr-10 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button type="submit" variant="gold" className="w-full py-2.5 font-bold tracking-wider">
                        {t('sign_in')}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                        Full Legal Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Your Name"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="Enter Email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                        Secure Password
                      </label>
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 text-xs"
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" variant="gold" className="w-full py-2.5 font-bold tracking-wider">
                        Register Account
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            {/* Quick Demo Assist Link */}
            <div className="mt-4 text-center">
              <button 
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="inline-flex items-center text-[10px] font-bold text-gold-500 hover:underline cursor-pointer"
              >
                <FaInfoCircle className="mr-1 text-xs" />
                {showHints ? 'Hide Credentials Assist' : 'Show Credentials Assist'}
              </button>
              
              {showHints && (
                <div className="mt-2 p-2.5 bg-slate-50 dark:bg-navy-900 rounded-xl border border-slate-200/50 dark:border-white/5 grid grid-cols-3 gap-2 text-center text-[9px] animate-fadeIn">
                  <button 
                    type="button"
                    onClick={() => autofill('customer@mail.com', 'customer@123')}
                    className="p-1 bg-white dark:bg-navy-950 rounded border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold hover:border-gold-500 cursor-pointer"
                  >
                    Customer
                  </button>
                  <button 
                    type="button"
                    onClick={() => autofill('manager1@mail.com', 'manager1@123')}
                    className="p-1 bg-white dark:bg-navy-950 rounded border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold hover:border-gold-500 cursor-pointer"
                  >
                    Manager
                  </button>
                  <button 
                    type="button"
                    onClick={() => autofill('admin@mail.com', 'admin@123')}
                    className="p-1 bg-white dark:bg-navy-950 rounded border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold hover:border-gold-500 cursor-pointer"
                  >
                    Admin
                  </button>
                </div>
              )}
            </div>

            {/* Social Logins */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/10" />
              </div>
              <span className="relative px-3 text-[9px] uppercase text-slate-400 bg-white dark:bg-navy-950 font-bold">
                Social Logins
              </span>
            </div>

            <div className="flex justify-center space-x-3">
              <button type="button" className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-navy-900 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer">
                <FaApple className="text-sm" />
              </button>
              <button type="button" className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-navy-900 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer">
                <FaGoogle className="text-sm" />
              </button>
              <button type="button" className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-navy-900 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer">
                <FaMicrosoft className="text-sm" />
              </button>
              <button type="button" className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-navy-900 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer">
                <FaPlus className="text-sm" />
              </button>
            </div>

            {/* Tagline */}
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider text-center mt-5 uppercase">
              Personalised. Secure. Invest in you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
