import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import {
  FaAward, FaShieldAlt, FaUsers, FaChartLine, FaTimes,
  FaSearchPlus, FaSearchMinus, FaUndo, FaExpand,
  FaArrowRight, FaArrowLeft, FaCheckCircle, FaPhoneAlt, FaCalendarAlt,
  FaFileContract, FaHandshake, FaMedal, FaExternalLinkAlt,
  FaMapMarkerAlt, FaEnvelope, FaChevronLeft, FaChevronRight,
  FaLightbulb, FaUserTie, FaBuilding
} from 'react-icons/fa';
import { useTranslation } from '../../context/LanguageContext';
import { getAwards, DEFAULT_AWARDS_DATA } from '../../services/api';
import { subscribeToCollection } from '../../services/firebaseService';
import { WhatDrivesUs } from '../../features/marketing/components/WhatDrivesUs';
import lionsClubLogo from '../../assets/lions_club_logo.png';
import bniBadgeLogo from '../../assets/bni_badge.jpg';

/* ─── Smooth Animated Stat Number ─── */
const AnimatedStat = ({ value, suffix = "", prefix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const num = typeof value === 'number' ? value : parseFloat(value) || 0;
    const controls = animate(0, num, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        if (ref.current) {
          const formatted = Math.round(latest).toLocaleString('en-IN');
          setDisplay(`${prefix}${formatted}${suffix}`);
        }
      }
    });
    return () => controls.stop();
  }, [isInView, value, prefix, suffix]);

  return <span ref={ref}>{display}</span>;
};

export const About = () => {
  const { t } = useTranslation();
  const [awards, setAwards] = useState(DEFAULT_AWARDS_DATA);
  const [selectedAwardIndex, setSelectedAwardIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  useEffect(() => {
    getAwards().then(data => {
      if (data && data.length > 0) {
        setAwards(data.filter(a => a.status !== 'Inactive'));
      }
    });

    const unsubscribe = subscribeToCollection('awards', (data) => {
      if (data && data.length > 0) {
        setAwards(data.filter(a => a.status !== 'Inactive'));
      }
    });

    return () => unsubscribe();
  }, []);

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoomLevel(1);
  const handleToggleZoom = () => setZoomLevel((prev) => (prev === 1 ? 2 : 1));

  // Navigation handlers
  const handlePrevAward = useCallback(() => {
    setZoomLevel(1);
    setSelectedAwardIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : awards.length - 1));
  }, [awards.length]);

  const handleNextAward = useCallback(() => {
    setZoomLevel(1);
    setSelectedAwardIndex((prev) => (prev !== null && prev < awards.length - 1 ? prev + 1 : 0));
  }, [awards.length]);

  const handleCloseLightbox = useCallback(() => {
    setSelectedAwardIndex(null);
    setZoomLevel(1);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedAwardIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextAward();
      if (e.key === 'ArrowLeft') handlePrevAward();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0' || e.key === 'r' || e.key === 'R') handleResetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAwardIndex, handleCloseLightbox, handleNextAward, handlePrevAward]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAwardIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAwardIndex]);

  // Touch Swipe Handlers for mobile devices
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (zoomLevel > 1) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNextAward();
    } else if (distance < -minSwipeDistance) {
      handlePrevAward();
    }
  };

  // Guiding Principles
  const principles = [
    {
      title: 'Absolute Transparency',
      desc: 'Zero hidden clauses, clear deductible guides, and upfront premium definitions for complete peace of mind.',
      icon: FaShieldAlt,
      colorClass: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
      hoverBg: 'hover:bg-blue-500/15 dark:hover:bg-blue-500/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-xl'
    },
    {
      title: 'Actuarial Precision',
      desc: 'Goal-based wealth planners and SIP models engineered using real-time market data and compounding indices.',
      icon: FaChartLine,
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      hoverBg: 'hover:bg-emerald-500/15 dark:hover:bg-emerald-500/20 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:shadow-xl'
    },
    {
      title: 'Community Advocacy',
      desc: 'Empowering Kanchipuram and wider Tamil Nadu families with accessible, localized, and fiduciary financial coaching.',
      icon: FaUsers,
      colorClass: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-500/10 dark:bg-purple-500/20',
      hoverBg: 'hover:bg-purple-500/15 dark:hover:bg-purple-500/20 hover:border-purple-500/50 dark:hover:border-purple-400/50 hover:shadow-xl'
    },
    {
      title: 'Dedicated Claims Desk',
      desc: 'Pre-sales clarity and lifetime post-sales assistance to secure top-tier cashless clearance and reimbursement speed.',
      icon: FaAward,
      colorClass: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
      hoverBg: 'hover:bg-amber-500/15 dark:hover:bg-amber-500/20 hover:border-amber-500/50 dark:hover:border-amber-400/50 hover:shadow-xl'
    }
  ];

  // Authentic Timeline Milestones
  const milestones = [
    {
      year: '2004',
      tag: 'INDEPENDENT ADVISORY',
      title: 'Advisory Foundation',
      desc: 'Founder and MD Prakash Gajendiran begins independent financial and insurance advisory in Kanchipuram, dedicated to family protection.'
    },
    {
      year: '2012',
      tag: 'INSTITUTIONAL EXPANSION',
      title: 'Multi-Insurer Partnerships',
      desc: 'Secures primary partnership certifications with India’s leading life and general insurers including Tata AIA, LIC, and HDFC Life.'
    },
    {
      year: '2018',
      tag: 'CLIENT REPUTATION',
      title: '2,500+ Families Protected',
      desc: 'Crosses major community milestones, managing comprehensive long-term portfolios with consistent regional awards.'
    },
    {
      year: '2022',
      tag: 'FIDUCIARY BENCHMARK',
      title: '5,000+ Families Secured',
      desc: 'Expands advisory reach across Tamil Nadu, launching a dedicated emergency cashless claims support desk.'
    },
    {
      year: '2025',
      tag: 'CORPORATE HEADQUARTERS',
      title: 'MD Plaza HQ & Digital Suite',
      desc: 'Inaugurates premier corporate headquarters at #104, West Raja Street, Kanchipuram, introducing digital planning suites.'
    }
  ];

  // Leadership Data (1st: Mr. Prakash Gajendiran, 2nd: Mrs. Kumutha Krishnamoorthy)
  const leaders = [
    {
      name: "Mr. Prakash Gajendiran",
      role: "Founder & Managing Director",
      bio: "Certified Financial Consultant, Proud BNI Member, Lions Club Member, and Senior Business Associate Leader with over 22 years of seasoned expertise, guiding thousands of families toward robust financial security and disciplined wealth creation.",
      image: "/prakash_gajendiran.jpg",
      bniBadge: bniBadgeLogo,
      lionsBadge: lionsClubLogo,
      stats: [
        { val: 22, suffix: "+", label: "Years Experience" },
        { val: 5000, suffix: "+", label: "Families Guided" },
        { val: 3, suffix: "x", label: "Aura Achiever" }
      ],
      points: ["Certified Financial Planner", "Proud BNI Member", "Lions Club International", "MDRT Aspirant Leader", "Lifelong Claims Advocate"],
      showConsultBtn: true
    },
    {
      name: "Mrs. Kumutha Krishnamoorthy",
      role: "CEO & Founder",
      bio: "Visionary CEO & Founder of SK Smart Investments, driving institutional growth with an unyielding commitment to customer trust, ethical transparency, and disciplined financial architecture across Tamil Nadu.",
      image: "/kumutha_krishnamoorthy.jpg",
      stats: [
        { val: 18, suffix: "+", label: "Years Governance" },
        { val: 100, suffix: "%", label: "Fiduciary Trust" },
        { val: 24, suffix: "/7", label: "Client Advocacy" }
      ],
      points: ["Strategic Governance", "Operational Integrity", "Client-First Culture"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300 font-sans selection:bg-brand-accent selection:text-neutral-950">

      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION: Full Viewport Presence
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-16 overflow-hidden border-b border-black/5 dark:border-white/5">

        {/* Soft Ambient Radial Glows */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-amber-400/10 via-amber-300/5 to-transparent blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left flex flex-col justify-between flex-1 w-full my-auto space-y-12 sm:space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full pt-4 sm:pt-8"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-neutral-950 dark:text-white w-full leading-[1.05] text-left font-['Plus_Jakarta_Sans',sans-serif]">
              SECURING WEALTH, <br className="hidden sm:inline" />
              EMPOWERING FUTURES.
            </h1>
          </motion.div>

          {/* Trust Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full pt-8 sm:pt-10 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10"
          >
            {[
              { val: 22, suffix: '+', label: 'Years of Trust' },
              { val: 5000, suffix: '+', label: 'Families Protected' },
              { val: 150, prefix: '₹', suffix: 'Cr+', label: 'Protection Managed' },
              { val: 4.9, suffix: ' / 5', label: 'Client Rating' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-brand-accent tracking-tight tabular-nums font-['Plus_Jakarta_Sans',sans-serif]">
                  <AnimatedStat value={stat.val} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. VISIONARY LEADERSHIP (Human-Centered Profiles)
      ═══════════════════════════════════════════════════════════ */}
      <section id="leadership" className="py-20 sm:py-24 lg:py-32 bg-white dark:bg-neutral-900/50 border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              VISIONARY LEADERSHIP
            </h2>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {leaders.map((leader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-white/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Top-Right Badges (BNI & Lions Club International) */}
                {(leader.bniBadge || leader.lionsBadge) && (
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-20 flex items-center gap-3 sm:gap-4">
                    {leader.bniBadge && (
                      <div 
                        className="w-14 h-14 sm:w-18 sm:h-18 lg:w-22 lg:h-22 rounded-full overflow-hidden shadow-lg border-2 border-red-600/30 bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center p-1 sm:p-1.5 group cursor-pointer"
                        title="Proud BNI Member"
                      >
                        <img
                          src={leader.bniBadge}
                          alt="Proud BNI Member"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    {leader.lionsBadge && (
                      <div 
                        className="w-14 h-14 sm:w-18 sm:h-18 lg:w-22 lg:h-22 rounded-full overflow-hidden shadow-lg border-2 border-amber-500/40 bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center p-1 sm:p-1.5 group cursor-pointer"
                        title="Lions Club International Member"
                      >
                        <img
                          src={leader.lionsBadge}
                          alt="Lions Club International"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Leader Photograph (Circle Shape) */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="relative w-52 h-52 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-slate-100 dark:bg-neutral-950 border-4 border-brand-accent/60 shadow-2xl group ring-4 sm:ring-8 ring-brand-accent/15">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Leader Narrative & Credentials */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
                  <div className="space-y-2 pr-32 sm:pr-44 lg:pr-52">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-brand-accent text-xs font-bold uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
                        <FaAward className="text-xs shrink-0" />
                        <span>{leader.role}</span>
                      </div>

                      {leader.bniBadge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 dark:bg-red-600/20 border border-red-600/30 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shrink-0" />
                          <span>PROUD BNI MEMBER</span>
                        </div>
                      )}

                      {leader.lionsBadge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                          <span>LIONS CLUB INTERNATIONAL</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      {leader.name}
                    </h3>
                  </div>

                  {/* Clean Executive Bio */}
                  <div className="border-l-3 border-brand-accent pl-4 py-1">
                    <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-200 font-normal leading-relaxed font-['Inter',sans-serif]">
                      "{leader.bio}"
                    </p>
                  </div>

                  {/* Key Focus Highlights */}
                  {leader.points && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {leader.points.map((pt, pIdx) => (
                        <span
                          key={pIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs font-semibold font-['Inter',sans-serif] shadow-xs"
                        >
                          <FaCheckCircle className="text-emerald-500 text-xs shrink-0" />
                          <span>{pt}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quantitative Stats */}
                  {leader.stats && (
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                      {leader.stats.map((st, sIdx) => (
                        <div key={sIdx} className="space-y-0.5">
                          <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 dark:text-brand-accent tabular-nums font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                            {st.val}{st.suffix}
                          </div>
                          <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif] leading-tight">
                            {st.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action CTA */}
                  {leader.showConsultBtn && (
                    <div className="pt-2">
                      <Link
                        to="/appointment"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-accent text-neutral-950 text-xs sm:text-sm font-extrabold uppercase tracking-wider hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 font-['Plus_Jakarta_Sans',sans-serif] cursor-pointer text-center"
                      >
                        <FaCalendarAlt className="text-xs" />
                        <span>Consult with {leader.name.replace(/^(Mr\.|Mrs\.|Dr\.)\s+/i, '').split(' ')[0]}</span>
                      </Link>
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. FOUNDATION OF OUR LEGACY (Who We Are)
      ═══════════════════════════════════════════════════════════ */}
      <section id="company-foundation" className="py-20 sm:py-24 lg:py-32 bg-slate-50 dark:bg-neutral-950 border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

            {/* Left Column: Authentic Company Story */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                THE FOUNDATION OF OUR LEGACY
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed font-['Inter',sans-serif]">
                <p>
                  At <strong className="text-neutral-950 dark:text-white font-extrabold">SK Smart Investments</strong>, we believe true financial resilience begins with transparent advice and lifelong fiduciary commitment.
                </p>
                <p>
                  Established by <strong className="text-neutral-950 dark:text-white font-bold">Mrs. Kumutha Krishnamoorthy</strong> and <strong className="text-neutral-950 dark:text-white font-bold">Mr. Prakash Gajendiran</strong>, our firm has grown from an independent advisory practice in Kanchipuram into one of Tamil Nadu's most respected risk-management and wealth consultancy hubs.
                </p>
                <p>
                  Whether designing a child’s higher-education fund, securing an umbrella health cover, or resolving emergency hospital claims, we provide institutional-grade protection tailored to your family's unique milestones.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                  <FaCheckCircle className="text-rose-500 text-sm sm:text-base shrink-0" />
                  <span>IRDAI Compliant</span>
                </div>
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                  <FaCheckCircle className="text-amber-400 text-sm sm:text-base shrink-0" />
                  <span>Multi-Partner Choice</span>
                </div>
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                  <FaCheckCircle className="text-emerald-500 text-sm sm:text-base shrink-0" />
                  <span>Zero Commission Bias</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: High-Impact Legacy Cards */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6 space-y-4"
            >
              {[
                {
                  icon: FaUsers,
                  title: 'Tailored Advisory',
                  desc: 'Every family carries unique aspirations. We customize life, health, and wealth blueprints to fit your cash flow without forcing unnecessary policies.',
                  iconColor: 'text-amber-600 dark:text-amber-400',
                  iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
                  hoverBg: 'hover:bg-amber-500/10 dark:hover:bg-amber-500/20 hover:border-amber-500/50 dark:hover:border-amber-400/50 hover:shadow-md'
                },
                {
                  icon: FaShieldAlt,
                  title: 'Institutional Assurance',
                  desc: 'Official partner with India’s foremost insurers including Tata AIA, HDFC Life, SBI Life, and Star Health for rock-solid claim settlement.',
                  iconColor: 'text-blue-600 dark:text-blue-400',
                  iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
                  hoverBg: 'hover:bg-blue-500/10 dark:hover:bg-blue-500/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-md'
                },
                {
                  icon: FaHandshake,
                  title: 'Lifelong Care & Advocacy',
                  desc: 'From initial policy issuance to cashless emergency hospitalization coordination and annual portfolio reviews, we stand by your side.',
                  iconColor: 'text-emerald-600 dark:text-emerald-400',
                  iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
                  hoverBg: 'hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:shadow-md'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-xs hover:-translate-y-1 ${item.hoverBg} transition-all duration-300 group text-left cursor-pointer`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center text-lg shrink-0 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-neutral-950 transition-all duration-300`}>
                        <Icon />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed font-['Inter',sans-serif]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. OUR VISION & FUTURE HORIZON (Vision, Mission & Pillars)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 lg:py-28 bg-slate-50/70 dark:bg-neutral-950/70 border-b border-black/5 dark:border-white/5 transition-colors relative overflow-hidden">
        
        {/* Subtle Background Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-accent/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-amber-900 dark:text-brand-accent text-xs font-black uppercase tracking-[0.2em] mb-4">
              <FaShieldAlt className="text-xs" />
              <span>Vision & Strategic Commitment</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-neutral-950 dark:text-white uppercase leading-none tracking-normal [word-spacing:0.22em] sm:[word-spacing:0.32em] font-['Plus_Jakarta_Sans',sans-serif]">
              OUR VISION & FUTURE HORIZON
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-4 leading-relaxed font-['Inter',sans-serif]">
              Pioneering transparent, ethical, and goal-aligned protection architectures for every family and enterprise across India.
            </p>
          </div>

          {/* Centerpiece Vision Manifesto Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-white via-white to-amber-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 border border-slate-200/90 dark:border-white/10 shadow-2xl shadow-black/5 mb-10 overflow-hidden text-center"
          >
            <div className="text-4xl sm:text-5xl font-serif text-brand-accent mb-3 leading-none select-none">“</div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-neutral-900 dark:text-neutral-50 font-black leading-snug tracking-tight max-w-4xl mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
              To build India's most trusted and empathetic insurance advisory ecosystem—empowering every family with generational wealth security and every business with resilient risk defense.
            </p>
            <div className="w-20 h-1 bg-brand-accent mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* 3 Strategic Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-10">
            
            {/* Pillar 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <FaShieldAlt />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Pillar 01</span>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                    100% Unbiased Advisory
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-['Inter',sans-serif]">
                  Objective policy comparisons across top IRDAI insurers with zero product bias, transparent disclosures, and data-backed fitment.
                </p>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <FaChartLine />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Pillar 02</span>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                    Seamless Digital Onboarding
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-['Inter',sans-serif]">
                  Frictionless paperless issuance, automated policy portfolio health reviews, and instant digital renewals anytime, anywhere.
                </p>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-brand-accent/30 text-amber-600 dark:text-brand-accent flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <FaHandshake />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-brand-accent">Pillar 03</span>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                    Lifetime Claim Concierge
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-['Inter',sans-serif]">
                  We stand by your family 24/7 with on-ground claim representation, direct cashless hospital desks, and swift settlement escalation.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Bottom Commitment Badges */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-md flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 text-base" />
              <span>100% Paperless Process</span>
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 text-base" />
              <span>IRDAI Compliant Partners</span>
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 text-base" />
              <span>Zero Commission Bias</span>
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500 text-base" />
              <span>24/7 Claim Concierge</span>
            </span>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. WHAT DRIVES US (Sticky Scroll-Driven In-Place Replacement)
      ═══════════════════════════════════════════════════════════ */}
      <WhatDrivesUs />

      {/* ═══════════════════════════════════════════════════════════
          5. GUIDING PRINCIPLES (How We Work)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 lg:py-32 bg-slate-50 dark:bg-neutral-950 border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              OUR GUIDING PRINCIPLES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
            {principles.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * idx }}
                  className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between hover:-translate-y-1.5 ${principle.hoverBg} transition-all duration-300 h-full group cursor-pointer text-left`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-2xs transition-all duration-300 group-hover:scale-110 mb-5 ${principle.iconBg} ${principle.colorClass}`}>
                      <Icon />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-neutral-950 dark:text-white tracking-tight mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                      {principle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed font-['Inter',sans-serif]">
                      {principle.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. MILESTONES (Interactive Connected Timeline)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white dark:bg-neutral-900/50 border-b border-black/5 dark:border-white/5 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              MILESTONES THAT MATTER
            </h2>
          </div>

          {/* Desktop: Horizontal Connected Flow */}
          <div className="hidden lg:grid grid-cols-5 gap-4 relative items-stretch">

            {/* Continuous Timeline Track */}
            <div className="absolute top-6 left-10 right-10 h-0.5 bg-slate-200 dark:bg-neutral-800 z-0 rounded-full" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-6 left-10 right-10 h-0.5 bg-gradient-to-r from-amber-400 via-brand-accent to-amber-500 z-0 origin-left rounded-full shadow-[0_0_10px_rgba(255,218,10,0.5)]"
            />

            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="relative z-10 flex flex-col items-center text-center group cursor-pointer h-full"
              >
                {/* Year Node Badge with glow */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-full bg-brand-accent/40 blur-md opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-brand-accent to-amber-400 text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center shadow-md border-3 border-white dark:border-neutral-950 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(255,218,10,0.6)] font-['Plus_Jakarta_Sans',sans-serif]">
                    {m.year}
                  </div>
                </div>

                {/* Milestone Card */}
                <div className="w-full p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between flex-1 text-left transition-all duration-300 group-hover:border-brand-accent/50 dark:group-hover:border-brand-accent/40 group-hover:shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-amber-800 dark:text-brand-accent block mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                      {m.tag}
                    </span>
                    <h4 className="text-sm sm:text-[15px] font-extrabold text-neutral-950 dark:text-white tracking-tight leading-snug mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                      {m.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-[1.6] font-['Inter',sans-serif]">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile & Tablet View: Purpose-Built Vertical Timeline */}
          <div className="lg:hidden relative pl-6 sm:pl-10 space-y-6 ml-3 sm:ml-6">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-brand-accent via-amber-400 to-brand-accent/20 origin-top"
            />

            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute -left-[30px] sm:-left-[46px] top-4 flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-accent border-4 border-slate-50 dark:border-neutral-950 shadow-md group-hover:scale-125 transition-transform duration-300 group-hover:ring-4 group-hover:ring-brand-accent/30" />
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2 transition-all duration-300 group-hover:border-brand-accent/50 dark:group-hover:border-brand-accent/40 relative overflow-hidden text-left">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-accent text-neutral-950 font-extrabold text-xs font-['Plus_Jakarta_Sans',sans-serif] shadow-2xs group-hover:scale-105 transition-transform">
                      {m.year}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400 font-['Plus_Jakarta_Sans',sans-serif]">
                      {m.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-neutral-950 dark:text-white tracking-tight pt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed font-['Inter',sans-serif]">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. AWARDS & ACHIEVEMENTS: Premium Gallery & Lightbox
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 lg:py-32 bg-slate-50 dark:bg-neutral-950 border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              AWARDS & ACHIEVEMENTS
            </h2>
          </div>

          {/* Featured Spotlight Award Card */}
          {awards.length > 0 && (
            <div className="mb-12 p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-brand-accent/40 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div
                className="lg:col-span-5 h-[240px] sm:h-[290px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-950 p-3 flex items-center justify-center border border-slate-200 dark:border-white/10 group cursor-pointer"
                onClick={() => { setSelectedAwardIndex(0); setZoomLevel(1); }}
              >
                <img
                  src={awards[0].img}
                  alt={awards[0].title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-7 space-y-3.5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent text-neutral-950 text-xs font-black uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
                  <FaAward className="text-xs" />
                  <span>FEATURED SPOTLIGHT RECOGNITION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  {awards[0].title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed font-['Inter',sans-serif]">
                  {awards[0].desc || 'Honoring sustained leadership benchmarks in ethical distribution and client-first financial architecture.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => { setSelectedAwardIndex(0); setZoomLevel(1); }}
                    className="px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-brand-accent hover:text-neutral-950 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    <span>View Full Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Grid of All Verified Certificates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
            {awards.map((award, idx) => (
              <motion.div
                key={award.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.06 }}
                onClick={() => { setSelectedAwardIndex(idx); setZoomLevel(1); }}
                className="group rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-xl hover:border-brand-accent/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between h-full"
              >
                {/* Image Frame */}
                <div className="relative w-full h-48 bg-slate-100 dark:bg-neutral-950 p-3 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-white/5">
                  <img
                    src={award.img}
                    alt={award.title}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Award Details */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-2 text-left">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 dark:text-brand-accent block mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                      {award.tag || award.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white line-clamp-2 leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
                      {award.title}
                    </h4>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-neutral-400 border-t border-slate-100 dark:border-white/5">
                    <span>Recognition Year</span>
                    <span className="text-neutral-900 dark:text-white font-black">{award.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════
          9. JOIN OUR NETWORK: Complete CTA & Address Strip
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white p-8 sm:p-12 lg:p-16 text-center border-2 border-brand-accent/30 shadow-2xl overflow-hidden">

            {/* Ambient Glow */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                READY TO SECURE YOUR FAMILY'S FUTURE?
              </h2>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                <Link
                  to="/appointment"
                  className="px-8 py-4 rounded-2xl bg-brand-accent text-neutral-950 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]"
                >
                  <FaPhoneAlt className="text-xs" />
                  <span>Book a Free Consultation</span>
                </Link>

                <Link
                  to="/careers"
                  className="px-8 py-4 rounded-2xl bg-white/10 text-white border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]"
                >
                  <span>Explore Careers</span>
                  <FaArrowRight className="text-xs" />
                </Link>

                <Link
                  to="/support"
                  className="px-8 py-4 rounded-2xl bg-white/5 text-neutral-300 border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider hover:text-white hover:border-white/30 transition-all duration-300 flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]"
                >
                  <span>Contact Us</span>
                </Link>
              </div>

              {/* Direct Address & Contact Strip */}
              <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-neutral-400 font-medium">
                <a
                  href="tel:+919994451300"
                  className="flex items-center gap-2 hover:text-brand-accent transition-colors"
                >
                  <FaPhoneAlt className="text-brand-accent text-xs" />
                  <span>+91 99944 51300</span>
                </a>

                <a
                  href="mailto:skinvestments2025@gmail.com"
                  className="flex items-center gap-2 hover:text-brand-accent transition-colors"
                >
                  <FaEnvelope className="text-brand-accent text-xs" />
                  <span>skinvestments2025@gmail.com</span>
                </a>

                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-brand-accent text-xs" />
                  <span>#104, MD Plaza, West Raja St, Kanchipuram - 631502</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          10. LIGHTBOX MODAL: Zoom & Inspection
      ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedAwardIndex !== null && awards[selectedAwardIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none"
            onClick={handleCloseLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Toolbar */}
            <div
              className="relative z-30 flex items-center justify-between w-full max-w-5xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Counter Indicator */}
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black tracking-wider uppercase font-['Plus_Jakarta_Sans',sans-serif] backdrop-blur-md">
                  {selectedAwardIndex + 1} / {awards.length}
                </div>
              </div>

              {/* Center: Zoom Controls */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <FaSearchMinus />
                </button>

                <button
                  onClick={handleResetZoom}
                  className="px-2.5 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-brand-accent hover:bg-white/10 transition-all cursor-pointer"
                  title="Reset Zoom (0 / R)"
                  aria-label="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <FaSearchPlus />
                </button>

                <button
                  onClick={handleToggleZoom}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-neutral-400 hover:text-white hover:bg-white/20 transition-all cursor-pointer ml-0.5"
                  title="Toggle 2x Zoom"
                  aria-label="Toggle Zoom"
                >
                  <FaExpand />
                </button>
              </div>

              {/* Right Side: Close Button */}
              <button
                onClick={handleCloseLightbox}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close (Esc)"
                aria-label="Close Lightbox"
              >
                <FaTimes className="text-base" />
              </button>
            </div>

            {/* Floating Prev Button (Left) */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevAward(); }}
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-neutral-900/80 hover:bg-brand-accent hover:text-neutral-950 text-white border border-white/20 flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
              title="Previous Award (← Arrow)"
              aria-label="Previous Award"
            >
              <FaChevronLeft className="text-base sm:text-lg" />
            </button>

            {/* Floating Next Button (Right) */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNextAward(); }}
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-neutral-900/80 hover:bg-brand-accent hover:text-neutral-950 text-white border border-white/20 flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
              title="Next Award (→ Arrow)"
              aria-label="Next Award"
            >
              <FaChevronRight className="text-base sm:text-lg" />
            </button>

            {/* Main Image Stage */}
            <div
              className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={handleToggleZoom}
            >
              <motion.div
                key={selectedAwardIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="max-h-[68vh] max-w-4xl flex items-center justify-center overflow-hidden rounded-2xl cursor-zoom-in"
                title="Double click to toggle 2x zoom"
              >
                <img
                  src={awards[selectedAwardIndex]?.img}
                  alt={awards[selectedAwardIndex]?.title}
                  className="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 ease-out"
                  style={{ transform: `scale(${zoomLevel})` }}
                  draggable={false}
                />
              </motion.div>
            </div>

            {/* Bottom Floating Info Strip */}
            <div
              className="relative z-30 w-full max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-md shadow-2xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent font-['Plus_Jakarta_Sans',sans-serif]">
                    {awards[selectedAwardIndex]?.tag || awards[selectedAwardIndex]?.category}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-xs font-black text-white">
                    Year {awards[selectedAwardIndex]?.year}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  {awards[selectedAwardIndex]?.title}
                </h3>
                <p className="text-xs text-neutral-300 font-normal leading-relaxed font-['Inter',sans-serif] max-w-2xl">
                  {awards[selectedAwardIndex]?.desc}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => window.open(awards[selectedAwardIndex]?.img, '_blank')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FaExternalLinkAlt className="text-[10px]" />
                  <span>Original</span>
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default About;
