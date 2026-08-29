import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../context/LanguageContext';
import { 
  FaClock, FaEnvelope, FaMapMarkerAlt, 
  FaWhatsapp, FaInstagram, FaLinkedin, FaCalendarAlt, FaChevronDown, 
  FaPhoneAlt, FaArrowRight, FaShieldAlt, FaHeadset, FaFacebook
} from 'react-icons/fa';
import { subscribeToCollection } from '../../services/firebaseService';

const DEFAULT_FAQS = [
  {
    id: 1,
    question: "How do I choose the right insurance plan for my family?",
    answer: "Our certified advisors assess your financial milestones, income stability, and health history to curate a bespoke portfolio matching your exact requirements."
  },
  {
    id: 2,
    question: "What is the cashless hospitalization procedure?",
    answer: "Simply inform our dedicated claims desk or present your policy card at any network hospital. We assist in getting your cashless approvals processed smoothly."
  },
  {
    id: 3,
    question: "How can I book an in-person consultation in Kanchipuram?",
    answer: "You can schedule a consultation online via our Book Appointment page or visit our corporate office at #104, MD Plaza, West Raja Street, Kanchipuram."
  },
  {
    id: 4,
    question: "Do you assist with claims for existing policies bought elsewhere?",
    answer: "Yes, our advisors provide full claims guidance, policy audits, and documentation assistance even if the policy was purchased through another provider."
  }
];

export const Support = () => {
  const { t } = useTranslation();
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToCollection('faqs', (data) => {
      if (data && data.length > 0) {
        setFaqs(data);
      } else {
        setFaqs(DEFAULT_FAQS);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-24 pb-20 font-sans transition-colors duration-300 selection:bg-brand-accent selection:text-neutral-950">

      {/* ── 1. HERO SECTION ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-6 pb-12 text-center overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-accent/15 dark:bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-3xl mx-auto space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-accent text-neutral-950 text-[11px] sm:text-xs font-black uppercase tracking-[0.20em] font-['Plus_Jakarta_Sans',sans-serif] shadow-xs">
            OFFICIAL ADVISORY & SUPPORT DESK
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl uppercase font-black text-neutral-950 dark:text-white tracking-tight [word-spacing:0.22em] leading-[1.12] font-['Plus_Jakarta_Sans',sans-serif]">
            TALK TO A REAL<br />INSURANCE ADVISOR.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-medium max-w-xl mx-auto leading-relaxed font-['Inter',sans-serif]">
            {t('support_subtitle') || 'Browse our frequently asked questions, log a support ticket, or connect with our support underwriting agents directly.'}
          </p>

          <div className="pt-2 flex justify-center">
            <a 
              href="https://wa.me/919994451300?text=Hi%20SK%20Smart%20Investments%2C%20I%20have%20a%20query%20about%20your%20services."
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black uppercase tracking-wider text-xs rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 font-['Plus_Jakarta_Sans',sans-serif]"
            >
              <FaWhatsapp className="text-base" />
              <span>Chat With Us Now</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. QUICK CONTACT STRIP (All 5 Channels) ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-10 border-t border-b border-slate-200/80 dark:border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Facebook */}
          <a 
            href="https://www.facebook.com/profile.php?id=61592452371528" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 hover:border-blue-600/50 hover:shadow-md transition-all group text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FaFacebook className="text-lg" />
              </div>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest mb-1 font-['Plus_Jakarta_Sans',sans-serif]">Facebook</h3>
              <p className="text-sm font-extrabold text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">Join Community</p>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Connect with us</p>
          </a>

          {/* Phone */}
          <a 
            href="tel:+919994451300" 
            className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 hover:border-brand-accent hover:shadow-md transition-all group text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-700 dark:text-brand-accent mb-4 group-hover:bg-brand-accent group-hover:text-neutral-950 transition-colors">
                <FaPhoneAlt className="text-sm" />
              </div>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest mb-1 font-['Plus_Jakarta_Sans',sans-serif]">Call Us Directly</h3>
              <p className="text-sm font-extrabold text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">Speak to an Advisor</p>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Mon – Sat, closes 6:30 pm</p>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/919994451300" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 hover:border-[#25D366]/50 hover:shadow-md transition-all group text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <FaWhatsapp className="text-lg" />
              </div>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest mb-1 font-['Plus_Jakarta_Sans',sans-serif]">WhatsApp</h3>
              <p className="text-sm font-extrabold text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">Chat Instantly</p>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Fastest response time</p>
          </a>

          {/* Email */}
          <a 
            href="mailto:skinvestments2025@gmail.com" 
            className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 hover:border-red-500/50 hover:shadow-md transition-all group text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <FaEnvelope className="text-sm" />
              </div>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest mb-1 font-['Plus_Jakarta_Sans',sans-serif]">Email Address</h3>
              <p className="text-sm font-extrabold text-neutral-950 dark:text-white truncate font-['Plus_Jakarta_Sans',sans-serif]">Send an Email</p>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Replies within 24 hrs</p>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/sk_smartinvestments/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-5 hover:border-[#E1306C]/50 hover:shadow-md transition-all group text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C] mb-4 group-hover:bg-[#E1306C] group-hover:text-white transition-colors">
                <FaInstagram className="text-lg" />
              </div>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest mb-1 font-['Plus_Jakarta_Sans',sans-serif]">Instagram</h3>
              <p className="text-sm font-extrabold text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">View our Profile</p>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-medium">Follow for updates</p>
          </a>

        </div>
      </section>

      {/* ── 3. OFFICE LOCATION + APPOINTMENT + TRUST PILLARS (Unified in One Page Block) ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12 border-b border-slate-200/80 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: Office Details & Map Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-700 dark:text-brand-accent shrink-0">
                  <FaMapMarkerAlt className="text-base" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest font-['Plus_Jakarta_Sans',sans-serif]">
                    Corporate Office
                  </h3>
                  <p className="text-sm sm:text-base font-extrabold text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                    MD Plaza, Kanchipuram
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-3.5 font-medium leading-relaxed font-['Inter',sans-serif]">
                1st Floor, MD Plaza, No: 104, West Raja Street, Kanchipuram, Tamil Nadu 631502
              </p>
              
              {/* Embedded Google Map */}
              <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-inner">
                <iframe
                  src="https://maps.google.com/maps?q=104%20MD%20Plaza%20West%20Raja%20Street%20Kanchipuram%20631502&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SK Smart Investments Google Map"
                  className="w-full h-full"
                />
                <a 
                  href="https://maps.google.com/?q=104+MD+Plaza+West+Raja+Street+Kanchipuram+631502"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/85 hover:bg-brand-accent hover:text-neutral-950 text-white text-[10px] font-black uppercase rounded-xl border border-white/20 backdrop-blur-md transition-all shadow-md font-['Plus_Jakarta_Sans',sans-serif]"
                >
                  View in Google Maps ↗
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-white/5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-amber-700 dark:text-brand-accent shrink-0">
                <FaClock className="text-sm" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">Mon – Sat</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Closes 6:30 pm daily</p>
              </div>
            </div>
          </div>

          {/* Right: Appointment Consultation & Trust Pillars (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            
            {/* Consultation Banner */}
            <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white border-2 border-brand-accent/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between text-left flex-1">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-brand-accent flex items-center justify-center text-neutral-950 shrink-0">
                    <FaCalendarAlt className="text-xs" />
                  </div>
                  <span className="text-brand-accent text-xs font-black uppercase tracking-widest font-['Plus_Jakarta_Sans',sans-serif]">
                    Book a Session
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight [word-spacing:0.18em] text-white leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  PREFER A SCHEDULED 1-ON-1 CONSULTATION?
                </h2>

                <p className="text-neutral-300 text-xs sm:text-sm font-medium leading-relaxed font-['Inter',sans-serif]">
                  Pick a date and time that works for you, and our certified financial planners will walk through your policy options or claims in detail.
                </p>
              </div>

              <div className="relative z-10 pt-4 mt-4 border-t border-white/10">
                <Link
                  to="/appointment"
                  className="w-full sm:w-fit px-7 py-3.5 bg-brand-accent text-neutral-950 font-black uppercase tracking-wider text-xs rounded-2xl shadow-md hover:bg-brand-accent active:bg-brand-accent focus:bg-brand-accent flex items-center justify-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]"
                >
                  <span>BOOK A FREE APPOINTMENT</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>

            {/* Integrated Trust Strip (2 Core Pillars) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-xs text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 dark:text-brand-accent shrink-0 text-base">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-neutral-950 dark:text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                    LICENSED & TRUSTED
                  </h4>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium leading-tight mt-0.5 font-['Inter',sans-serif]">
                    Working with 16+ leading insurers to get you the right cover.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-xs text-left">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white shrink-0 text-base">
                  <FaHeadset />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-neutral-950 dark:text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                    REAL HUMAN SUPPORT
                  </h4>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium leading-tight mt-0.5 font-['Inter',sans-serif]">
                    No bots, no call centres — you speak directly with our advisors.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 5. FAQS SECTION ── */}
      {faqs && faqs.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 sm:py-16 border-b border-slate-200/80 dark:border-white/10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              Got <span className="text-amber-600 dark:text-brand-accent">Questions?</span>
            </h2>
          </div>

          <div className="space-y-3 text-left">
            {faqs.map((faq, idx) => (
              <div 
                key={faq.id || idx} 
                className={`bg-white dark:bg-neutral-900 rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                  openFaq === idx 
                    ? 'border-brand-accent/60 dark:border-brand-accent/50 shadow-md' 
                    : 'border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 sm:py-5 flex items-center justify-between text-neutral-950 dark:text-white font-bold text-xs sm:text-sm cursor-pointer text-left focus:outline-none"
                >
                  <span className="pr-6 font-['Plus_Jakarta_Sans',sans-serif]">{faq.question}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    openFaq === idx 
                      ? 'bg-brand-accent text-neutral-950 rotate-180' 
                      : 'bg-slate-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                  }`}>
                    <FaChevronDown className="text-[10px]" />
                  </div>
                </button>

                {openFaq === idx && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed font-['Inter',sans-serif] whitespace-pre-line"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. FINAL CTA BANNER ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 sm:pt-16">
        <div className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl border-2 border-brand-accent/30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-accent/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
              STILL HAVE QUESTIONS?
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-medium leading-relaxed font-['Inter',sans-serif]">
              Our team is one message away. Reach out and we'll get back to you the same day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a 
                href="https://wa.me/919994451300?text=Hi%20SK%20Smart%20Investments%2C%20I%20have%20a%20query%20about%20your%20services."
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black uppercase tracking-wider text-xs rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]"
              >
                <FaWhatsapp className="text-sm" />
                <span>Message Us</span>
              </a>
              <a 
                href="tel:+919994451300"
                className="px-8 py-3.5 bg-white/10 hover:bg-white hover:text-neutral-950 border border-white/20 text-white font-black uppercase tracking-wider text-xs rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]"
              >
                <FaPhoneAlt className="text-xs" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Support;
