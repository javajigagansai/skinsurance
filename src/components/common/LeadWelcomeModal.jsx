import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaArrowRight, 
  FaSpinner, 
  FaLock,
  FaStar,
  FaCheck,
  FaCalculator,
  FaCalendarAlt,
  FaHandHoldingHeart
} from 'react-icons/fa';
import { saveLead } from '../../services/api';

const GENDER_OPTIONS = [
  { id: 'Male', label: 'Male' },
  { id: 'Female', label: 'Female' },
  { id: 'Other', label: 'Other' },
];

const PREVIEW_PAGES = [
  {
    icon: FaShieldAlt,
    title: 'Comprehensive Insurance Plans',
    desc: 'Compare top-rated Term Life, Health, Motor & Retirement plans from LIC, Tata AIA & HDFC Life.',
    tag: 'Plans'
  },
  {
    icon: FaCalculator,
    title: 'Smart Premium & SIP Calculator',
    desc: 'Instant premium calculations and tax deduction estimates under Section 80C & 80D.',
    tag: 'Calculator'
  },
  {
    icon: FaCalendarAlt,
    title: '1-on-1 Advisory Consultations',
    desc: 'Personalized advisory sessions with Certified Financial Planner Prakash Gajendiran.',
    tag: 'Advisory'
  },
  {
    icon: FaHandHoldingHeart,
    title: 'Priority Cashless Claims Support',
    desc: 'Fast, dedicated claim settlement guidance and policy document assistance.',
    tag: '24/7 Support'
  }
];

export const LeadWelcomeModal = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required for quotes';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Valid 10-digit number required';
    }

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

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
    if (errors.gender) {
      setErrors(prev => ({ ...prev, gender: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        gender: formData.gender,
        phone: formData.phone.trim(),
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
      <div className="fixed inset-0 z-[999999] h-screen w-full bg-slate-50/60 text-slate-900 overflow-hidden flex items-center justify-center p-3 sm:p-6 lg:p-8 selection:bg-amber-300 selection:text-slate-950">
        
        {/* Soft Ambient Light Glows on White Canvas */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-white">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[650px] h-[650px] bg-slate-100/80 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-50/30 rounded-full blur-[160px]" />
        </div>

        {/* MAIN CONTAINER: Full Viewport 2-Column Clean Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-h-full"
        >
          
          {/* LEFT COLUMN: Clean White Lead Capture Form Card */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl sm:rounded-[2rem] p-5 sm:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.06)] space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold mb-1.5 shadow-2xs">
                <span>Welcome to SK Smart Investments</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Let's Personalize Your <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Experience</span>
              </h1>
              <p className="text-xs text-slate-600 mt-1 leading-normal">
                Enter your details to unlock customized insurance plans, tax calculators, and advisory.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              {/* 1. Full Name */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">
                  Full Name <span className="text-amber-600">*</span>
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
                    className={`w-full pl-10 pr-3 py-2.5 sm:py-2.5 bg-slate-50/80 border ${
                      errors.fullName ? 'border-rose-500 ring-2 ring-rose-400/20' : 'border-slate-200 focus:border-amber-500 focus:ring-3 focus:ring-amber-400/15'
                    } rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-inner`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 font-medium pl-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* 2. Gender Selection */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">
                  Gender <span className="text-amber-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {GENDER_OPTIONS.map((g) => {
                    const isSelected = formData.gender === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        disabled={isSubmitting || isSuccess}
                        onClick={() => handleGenderSelect(g.id)}
                        className={`py-2 px-2.5 rounded-xl border flex items-center justify-center space-x-1.5 text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/30 scale-[1.02]'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <span>{g.label}</span>
                        {isSelected && <FaCheck className="text-[9px] text-white ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
                {errors.gender && (
                  <p className="text-[11px] text-rose-600 font-medium pl-1">{errors.gender}</p>
                )}
              </div>

              {/* 3. Phone Number with +91 Badge */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">
                  Mobile / WhatsApp Number <span className="text-amber-600">*</span>
                </label>
                <div className="relative group flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none space-x-1 text-slate-800 text-[11px] font-bold">
                    <span className="text-slate-600 font-extrabold">+91</span>
                    <div className="w-[1px] h-3.5 bg-slate-300 ml-1" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting || isSuccess}
                    className={`w-full pl-14 pr-3 py-2.5 sm:py-2.5 bg-slate-50/80 border ${
                      errors.phone ? 'border-rose-500 ring-2 ring-rose-400/20' : 'border-slate-200 focus:border-amber-500 focus:ring-3 focus:ring-amber-400/15'
                    } rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-inner`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 font-medium pl-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* 4. Email Address */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">
                  Email Address <span className="text-amber-600">*</span>
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
                    className={`w-full pl-10 pr-3 py-2.5 sm:py-2.5 bg-slate-50/80 border ${
                      errors.email ? 'border-rose-500 ring-2 ring-rose-400/20' : 'border-slate-200 focus:border-amber-500 focus:ring-3 focus:ring-amber-400/15'
                    } rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-inner`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-rose-600 font-medium pl-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit CTA Button */}
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
                      <span>Unlock Website & Explore Plans</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Assurance Text */}
              <div className="text-center flex items-center justify-center space-x-1.5 text-[10px] text-slate-500 font-medium pt-0.5">
                <FaLock className="text-amber-600 text-[10px]" />
                <span>100% Privacy Protected • IRDAI Licensed Advisors • Zero Spam</span>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Pages Showcase on Clean Canvas */}
          <div className="lg:col-span-6 space-y-3.5 flex flex-col justify-center">
            {/* Header / Intro */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-extrabold">
                <FaStar className="text-amber-500 text-[9px]" />
                <span>Explore What Awaits You Inside</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Trusted by <span className="text-amber-600">2,500+ Families</span> in Tamil Nadu
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Here is a preview of the dedicated financial services and tools you can freely access on our website:
              </p>
            </div>

            {/* List of Key Pages & Features */}
            <div className="space-y-2 sm:space-y-2.5">
              {PREVIEW_PAGES.map((page, idx) => {
                const Icon = page.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-amber-300 transition-all flex items-start space-x-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-sm shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-amber-800 transition-colors">
                          {page.title}
                        </h4>
                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                          {page.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal mt-0.5 line-clamp-2">
                        {page.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Footer note */}
            <div className="p-3 rounded-2xl bg-slate-100/90 border border-slate-200 text-slate-800 text-[11px] flex items-center justify-between shadow-2xs">
              <span className="font-semibold">Official Insurance Partners: LIC • Tata AIA • HDFC Life • Star Health</span>
              <span className="font-extrabold text-amber-700 hidden sm:inline">15+ Years Trust</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeadWelcomeModal;
