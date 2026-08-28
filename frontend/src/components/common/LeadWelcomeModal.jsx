import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  FaUser, 
  FaCalendarAlt,
  FaEnvelope, 
  FaCheckCircle, 
  FaArrowRight, 
  FaSpinner, 
  FaLock,
  FaCheck
} from 'react-icons/fa';
import { saveLead } from '../../services/api';

export const LeadWelcomeModal = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if lead was already submitted or if current path is admin/auth
  useEffect(() => {
    const isExcludedPath = location.pathname.startsWith('/dashboard') || location.pathname === '/login';
    const hasLead = localStorage.getItem('sk_lead_submitted');

    if (!hasLead && !isExcludedPath) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};

    // 1. Full Name Verification
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      newErrors.fullName = 'Full name is required';
    } else if (nameTrimmed.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(nameTrimmed)) {
      newErrors.fullName = 'Please enter a valid full name';
    }

    // 2. Date of Birth (DOB) Verification
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      if (isNaN(birthDate.getTime()) || birthDate >= today) {
        newErrors.dob = 'Please enter a valid past birth date';
      } else {
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 0 || age > 115) {
          newErrors.dob = 'Please enter a realistic date of birth';
        }
      }
    }

    // 3. Mobile Number Verification (10 Digits)
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required for quotes';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid mobile number starting with 6-9';
    }

    // 4. Email Verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        dob: formData.dob,
        phone: formData.phone.replace(/\D/g, ''),
        email: formData.email.trim(),
        submittedAt: new Date().toISOString()
      };

      await saveLead(payload);
      localStorage.setItem('sk_lead_submitted', JSON.stringify(payload));

      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsOpen(false);
      }, 900);
    } catch (err) {
      console.error('Error saving visitor lead:', err);
      localStorage.setItem('sk_lead_submitted', JSON.stringify(formData));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsOpen(false);
      }, 800);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] h-screen w-full overflow-hidden flex items-center justify-center p-3 sm:p-6 lg:p-8 selection:bg-amber-300 selection:text-slate-950">
        
        {/* Soft Ambient Light Glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black/40 backdrop-blur-md">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[650px] h-[650px] bg-slate-800/40 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-300/10 rounded-full blur-[160px]" />
        </div>

        {/* Centered Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10 max-w-lg w-full"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl sm:rounded-[2rem] p-5 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.25)] space-y-4">
            
            {/* Header */}
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                Welcome to SK Smart Investments
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-white/80 uppercase tracking-wider ml-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-600 transition-colors">
                    <FaUser className="text-xs" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isSubmitting || isSuccess}
                    className={`w-full pl-10 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border ${
                      errors.fullName ? 'border-rose-400 ring-2 ring-rose-400/20' : 'border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'
                    } rounded-xl text-xs sm:text-sm font-medium text-white placeholder:text-white/50 focus:outline-none transition-all`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-rose-300 font-semibold pl-1">{errors.fullName}</p>
                )}
              </div>

              {/* Date of Birth (DOB) */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-white/80 uppercase tracking-wider ml-1">
                  Date of Birth (DOB) <span className="text-amber-400">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-600 transition-colors">
                    <FaCalendarAlt className="text-xs" />
                  </div>
                  <input
                    type="date"
                    name="dob"
                    max={new Date().toISOString().split('T')[0]}
                    value={formData.dob}
                    onChange={handleChange}
                    disabled={isSubmitting || isSuccess}
                    className={`w-full pl-10 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border ${
                      errors.dob ? 'border-rose-400 ring-2 ring-rose-400/20' : 'border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'
                    } rounded-xl text-xs sm:text-sm font-medium text-white placeholder:text-white/50 focus:outline-none transition-all [color-scheme:dark]`}
                  />
                </div>
                {errors.dob && (
                  <p className="text-[11px] text-rose-300 font-semibold pl-1">{errors.dob}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-white/80 uppercase tracking-wider ml-1">
                  Mobile / WhatsApp Number <span className="text-amber-400">*</span>
                </label>
                <div className="relative group flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none space-x-1 text-white/80 text-[11px] font-bold">
                    <span className="text-white/90 font-extrabold">+91</span>
                    <div className="w-[1px] h-3.5 bg-white/30 ml-1" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting || isSuccess}
                    className={`w-full pl-14 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border ${
                      errors.phone ? 'border-rose-400 ring-2 ring-rose-400/20' : 'border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'
                    } rounded-xl text-xs sm:text-sm font-medium text-white placeholder:text-white/50 focus:outline-none transition-all`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-300 font-semibold pl-1">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-white/80 uppercase tracking-wider ml-1">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-600 transition-colors">
                    <FaEnvelope className="text-xs" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting || isSuccess}
                    className={`w-full pl-10 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border ${
                      errors.email ? 'border-rose-400 ring-2 ring-rose-400/20' : 'border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'
                    } rounded-xl text-xs sm:text-sm font-medium text-white placeholder:text-white/50 focus:outline-none transition-all`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-rose-300 font-semibold pl-1">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <motion.button
                  whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.015 }}
                  whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.985 }}
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full py-3 sm:py-3.5 px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-[0_6px_20px_rgba(245,158,11,0.25)] flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-80 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

                  {isSubmitting ? (
                    <span className="flex items-center space-x-2 font-bold">
                      <FaSpinner className="animate-spin text-sm" />
                      <span>Unlocking website access...</span>
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center space-x-2 text-slate-950 font-black">
                      <FaCheckCircle className="text-base" />
                      <span>Welcome! Entering SK Smart Investments...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>Get Started</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Assurance */}
              <div className="text-center flex items-center justify-center space-x-1.5 text-[10px] text-white/50 font-medium pt-0.5">
                <FaLock className="text-amber-600 text-[10px]" />
                <span>100% Privacy Protected • IRDAI Licensed Advisors • Zero Spam</span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeadWelcomeModal;
