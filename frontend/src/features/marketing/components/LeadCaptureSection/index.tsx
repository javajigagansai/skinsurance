import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaPhoneAlt, FaEnvelope, FaListAlt, 
  FaCheckCircle, FaSpinner, FaShieldAlt, FaLock, 
  FaClock, FaHeadset 
} from 'react-icons/fa';
import { submitConsultationLead } from '../../../../services/api';

const REQUIREMENTS = [
  'Health Insurance Cover',
  'Term Life & Family Protection',
  'SIP & Mutual Fund Wealth Creation',
  'Motor & Vehicle Insurance',
  'Retirement & Pension Planning',
  'Child Education Fund',
  'General / Commercial Asset Insurance',
  'Existing Policy Claim Assistance'
];

import { useAuth } from '../../../auth/contexts/AuthContext';

export const LeadCaptureSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const { user } = useAuth();

  const [formData, setFormData] = useState(() => {
    const initial = {
      name: '',
      phone: '',
      email: '',
      requirement: REQUIREMENTS[0]
    };
    try {
      const savedAuth = localStorage.getItem('sk_auth_user') || sessionStorage.getItem('sk_auth_user');
      const savedLead = localStorage.getItem('sk_lead_submitted') || sessionStorage.getItem('sk_lead_submitted');
      let name = '';
      let phone = '';
      let email = '';
      if (savedAuth) {
        const u = JSON.parse(savedAuth);
        name = u.name || u.fullName || u.displayName || u.username || '';
        phone = u.phone || u.mobile || u.phoneNumber || '';
        email = u.email || '';
      }
      if (savedLead) {
        const l = JSON.parse(savedLead);
        if (!name) name = l.fullName || l.name || '';
        if (!phone) phone = l.phone || l.mobile || '';
        if (!email) email = l.email || '';
      }
      if (name) initial.name = name;
      if (phone) initial.phone = phone;
      if (email) initial.email = email;
    } catch (e) {}
    return initial;
  });

  useEffect(() => {
    let name = user?.name || user?.fullName || user?.displayName || '';
    let phone = user?.phone || user?.mobile || user?.phoneNumber || '';
    let email = user?.email || '';

    if (!name || !phone || !email) {
      try {
        const savedAuth = localStorage.getItem('sk_auth_user') || sessionStorage.getItem('sk_auth_user');
        if (savedAuth) {
          const u = JSON.parse(savedAuth);
          if (!name) name = u.name || u.fullName || u.displayName || u.username || '';
          if (!phone) phone = u.phone || u.mobile || u.phoneNumber || '';
          if (!email) email = u.email || '';
        }
      } catch (e) {}
    }

    if (!name || !phone || !email) {
      try {
        const savedLead = localStorage.getItem('sk_lead_submitted') || sessionStorage.getItem('sk_lead_submitted');
        if (savedLead) {
          const l = JSON.parse(savedLead);
          if (!name) name = l.fullName || l.name || '';
          if (!phone) phone = l.phone || l.mobile || '';
          if (!email) email = l.email || '';
        }
      } catch (e) {}
    }

    if (name || phone || email) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || name || '',
        phone: prev.phone || phone || '',
        email: prev.email || email || ''
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await submitConsultationLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        requirement: formData.requirement,
        source: 'Home Lead Capture',
        createdAt: new Date().toISOString()
      });

      try {
        localStorage.setItem('sk_lead_submitted', JSON.stringify({
          fullName: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          submittedAt: new Date().toISOString()
        }));
      } catch (e) {}

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        requirement: REQUIREMENTS[0]
      });
    } catch (err: any) {
      setError('Failed to submit. Please check your connection or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-24 border-t border-black/5 dark:border-white/5 bg-slate-900 text-white overflow-hidden"
    >
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ── Left Column: Value Proposition & Reassurances ── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -25 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-black text-brand-accent uppercase tracking-widest">
                <FaHeadset className="text-xs" />
                <span>DIRECT ADVISOR GUIDANCE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                LET'S PLAN YOUR <br className="hidden sm:block" />
                <span className="text-brand-accent">PROTECTION</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-medium max-w-lg leading-relaxed">
                Get personalized guidance from an SK Smart Investments advisor. We analyze the market across all leading insurers to recommend only what truly benefits your family.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-accent/15 border border-brand-accent/30 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                  <FaShieldAlt className="text-sm" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">100% Unbiased IRDAI Advice</h4>
                  <p className="text-xs text-slate-400 font-normal">We work for you, not the insurance companies. Transparent comparisons with zero sales pressure.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-accent/15 border border-brand-accent/30 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                  <FaClock className="text-sm" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Fast 15-Minute Turnaround</h4>
                  <p className="text-xs text-slate-400 font-normal">Our dedicated advisory desk in Kanchipuram will review your profile and connect swiftly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-accent/15 border border-brand-accent/30 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                  <FaLock className="text-sm" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Confidential & Spam-Free</h4>
                  <p className="text-xs text-slate-400 font-normal">Your personal contact details are kept strictly private and never shared with third-party telemarketers.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Lead Capture Card Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 25 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl text-slate-900 dark:text-white relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-500 mx-auto flex items-center justify-center text-3xl shadow-lg">
                    <FaCheckCircle />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                    Consultation Requested!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto font-medium">
                    Thank you! An SK Smart Investments senior advisor has received your request and will connect with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-brand-accent hover:text-neutral-950 transition-all cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      Request a Consultation
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Fill out the details below to receive a customized portfolio recommendation.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold">
                      {error}
                    </div>
                  )}

                  {/* 1. Name Field */}
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full pl-9 pr-3.5 py-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-brand-accent text-xs font-bold text-slate-900 dark:text-white transition-all placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* 2. Phone Field */}
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                        <FaPhoneAlt />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 99944 51300"
                        className="w-full pl-9 pr-3.5 py-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-brand-accent text-xs font-bold text-slate-900 dark:text-white transition-all placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* 3. Email Field */}
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rajesh@example.com"
                        className="w-full pl-9 pr-3.5 py-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-brand-accent text-xs font-bold text-slate-900 dark:text-white transition-all placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* 4. Requirement Field */}
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Requirement / Goal *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                        <FaListAlt />
                      </div>
                      <select
                        name="requirement"
                        value={formData.requirement}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-brand-accent text-xs font-bold text-slate-900 dark:text-white transition-all cursor-pointer"
                      >
                        {REQUIREMENTS.map((req) => (
                          <option key={req} value={req}>
                            {req}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-brand-accent text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-950 hover:text-brand-accent dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin text-sm" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <span>Request a Consultation</span>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium text-center pt-1">
                    <FaLock className="text-[9px]" />
                    <span>Your information is encrypted and visible to SK Advisors only.</span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default LeadCaptureSection;
