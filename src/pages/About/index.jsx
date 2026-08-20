import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import {
  FaAward, FaShieldAlt, FaUsers, FaChartLine, FaTimes,
  FaSearchPlus, FaSearchMinus, FaUndo, FaExpand,
  FaArrowRight, FaArrowLeft, FaCheckCircle, FaPhoneAlt, FaCalendarAlt,
  FaFileContract, FaHandshake, FaMedal, FaExternalLinkAlt,
  FaMapMarkerAlt, FaEnvelope, FaChevronLeft, FaChevronRight,
  FaLightbulb, FaUserTie
} from 'react-icons/fa';
import { useTranslation } from '../../context/LanguageContext';

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

/* ─── Real Awards Data (17 Verified Honors) ─── */
const AWARDS_DATA = [
  {
    id: 1,
    title: 'Dream Agency Elite Aspirant Award',
    tag: 'INDUSTRY LEADERSHIP',
    year: '2024',
    desc: 'Recognized for remarkable progress, commitment to advisory excellence, and continuous professional development.',
    img: '/Awards_JPG/IMG_3623.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'MDRT Aspirant Achievement',
    tag: 'GLOBAL BENCHMARK',
    year: '2023',
    desc: 'Honored for successfully qualifying for the Million Dollar Round Table Aspirant milestone, reflecting world-class fiduciary standards.',
    img: '/Awards_JPG/IMG_3631.jpg',
    featured: true
  },
  {
    id: 3,
    title: 'InfinPro Consultant Excellence',
    tag: 'CONSULTING MERIT',
    year: '2023',
    desc: 'Presented in appreciation of outstanding consultant performance and quality portfolio guidance.',
    img: '/Awards_JPG/IMG_3624.jpg'
  },
  {
    id: 4,
    title: 'Tambaram Branch Performance Excellence',
    tag: 'BRANCH LEADERSHIP',
    year: '2023',
    desc: 'Recognized as a top-performing branch for outstanding business growth, customer satisfaction, and leadership.',
    img: '/Awards_JPG/IMG_3634.jpg'
  },
  {
    id: 5,
    title: 'Dronacharya Branch Excellence Award',
    tag: 'TATA AIA RECOGNITION',
    year: '2022',
    desc: 'Awarded by Tata AIA Life Insurance for outstanding branch leadership, business excellence, and consistent advisory performance.',
    img: '/Awards_JPG/IMG_3619.jpg'
  },
  {
    id: 6,
    title: 'Outstanding Performer Award',
    tag: 'ANNUAL EXCELLENCE',
    year: '2022',
    desc: 'Recognized as a consistent top performer for exceptional business achievements and client service excellence.',
    img: '/Awards_JPG/IMG_3628.jpg'
  },
  {
    id: 7,
    title: 'Million Dollar Club Qualifier',
    tag: 'SALES EXCELLENCE',
    year: '2022',
    desc: 'Qualified for the prestigious Million Dollar Club in recognition of outstanding sales performance and client trust.',
    img: '/Awards_JPG/IMG_3638.jpg'
  },
  {
    id: 8,
    title: 'Pragati Business Growth Excellence',
    tag: 'INNOVATION & GROWTH',
    year: '2021',
    desc: 'Recognized for achieving exceptional business growth, innovation, and consistent client-focused financial advisory services.',
    img: '/Awards_JPG/IMG_3620.jpg'
  },
  {
    id: 9,
    title: 'Family Inspiration Recognition',
    tag: 'COMMUNITY IMPACT',
    year: '2021',
    desc: 'A special recognition celebrating dedication, family support, and commitment behind entrepreneurial success.',
    img: '/Awards_JPG/IMG_3626.jpg'
  },
  {
    id: 10,
    title: 'Malaysia Training Conclave Qualifier',
    tag: 'INTERNATIONAL MERIT',
    year: '2020',
    desc: 'Qualified to participate in the exclusive Malaysia Training Conclave, recognizing outstanding business achievement.',
    img: '/Awards_JPG/IMG_3643.jpg'
  },
  {
    id: 11,
    title: 'Dream Agency Aspirant Recognition',
    tag: 'HIGH POTENTIAL',
    year: '2020',
    desc: 'Honored as a high-potential advisor demonstrating exceptional dedication, leadership, and business performance.',
    img: '/Awards_JPG/IMG_3622.jpg'
  },
  {
    id: 12,
    title: 'Leadership Appreciation Certificate',
    tag: 'ORGANIZATIONAL LEADERSHIP',
    year: '2019',
    desc: 'Presented in recognition of leadership, professional integrity, and continuous contribution to organizational success.',
    img: '/Awards_JPG/IMG_3629.jpg'
  },
  {
    id: 13,
    title: 'Donautsav Business Excellence Award',
    tag: 'BUSINESS EXCELLENCE',
    year: '2019',
    desc: 'Honored for exceptional business performance, customer commitment, and continued professional growth.',
    img: '/Awards_JPG/IMG_3639.jpg'
  },
  {
    id: 14,
    title: 'Business Growth Achievement Certificate',
    tag: 'CAPACITY BUILDING',
    year: '2018',
    desc: 'Awarded for successfully completing the Aim For Your Business Growth leadership workshop.',
    img: '/Awards_JPG/IMG_3625.jpg'
  },
  {
    id: 15,
    title: 'MDRT Aspirant Excellence Award',
    tag: 'PERFORMANCE BENCHMARK',
    year: '2018',
    desc: 'Awarded for outstanding commitment toward achieving Million Dollar Round Table performance benchmarks.',
    img: '/Awards_JPG/IMG_3633.jpg'
  },
  {
    id: 16,
    title: 'AI & Technology Learning Certificate',
    tag: 'DIGITAL INNOVATION',
    year: '2024',
    desc: 'Successfully completed advanced AI learning programs focused on improving modern advisory practices.',
    img: '/Awards_JPG/IMG_3627.jpg'
  },
  {
    id: 17,
    title: 'Dream Agency Branch Champion',
    tag: 'BRANCH EXCELLENCE',
    year: '2021',
    desc: 'Awarded for exceptional branch management, operational excellence, and sustained business performance.',
    img: '/Awards_JPG/IMG_3636.jpg'
  }
];

export const About = () => {
  const { t } = useTranslation();
  const [selectedAwardIndex, setSelectedAwardIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoomLevel(1);
  const handleToggleZoom = () => setZoomLevel((prev) => (prev === 1 ? 2 : 1));

  // Navigation handlers
  const handlePrevAward = useCallback(() => {
    setZoomLevel(1);
    setSelectedAwardIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : AWARDS_DATA.length - 1));
  }, []);

  const handleNextAward = useCallback(() => {
    setZoomLevel(1);
    setSelectedAwardIndex((prev) => (prev !== null && prev < AWARDS_DATA.length - 1 ? prev + 1 : 0));
  }, []);

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
    if (zoomLevel > 1) return; // Ignore swipe if user is zoomed in
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNextAward();
    } else if (distance < -minSwipeDistance) {
      handlePrevAward();
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('company-foundation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 6 Core Pillars of Mission (What Drives Us)
  const missionPillars = [
    {
      num: '01',
      title: 'Personalized Solutions',
      desc: 'Deliver tailored insurance and wealth preservation blueprints aligned with individual family milestones.',
      icon: FaLightbulb,
      colorClass: 'text-amber-800 dark:text-amber-300',
      cardBg: 'bg-amber-500/15 dark:bg-amber-500/20 border-2 border-amber-500/40 dark:border-amber-400/40',
      iconBg: 'bg-amber-500/25 text-amber-800 dark:text-amber-300'
    },
    {
      num: '02',
      title: 'Premium Products',
      desc: 'Curate top-tier policies from India’s leading insurers with maximum claim clearance and competitive premiums.',
      icon: FaShieldAlt,
      colorClass: 'text-blue-800 dark:text-blue-300',
      cardBg: 'bg-blue-500/15 dark:bg-blue-500/20 border-2 border-blue-500/40 dark:border-blue-400/40',
      iconBg: 'bg-blue-500/25 text-blue-800 dark:text-blue-300'
    },
    {
      num: '03',
      title: 'Expert Guidance',
      desc: 'Simplify complex clauses through unbiased advice from certified advisors with over 22 years of field expertise.',
      icon: FaUserTie,
      colorClass: 'text-emerald-800 dark:text-emerald-300',
      cardBg: 'bg-emerald-500/15 dark:bg-emerald-500/20 border-2 border-emerald-500/40 dark:border-emerald-400/40',
      iconBg: 'bg-emerald-500/25 text-emerald-800 dark:text-emerald-300'
    },
    {
      num: '04',
      title: 'Seamless Digital Support',
      desc: 'Ensure rapid policy issuance, digital onboarding, annual portfolio reviews, and frictionless renewals.',
      icon: FaFileContract,
      colorClass: 'text-purple-800 dark:text-purple-300',
      cardBg: 'bg-purple-500/15 dark:bg-purple-500/20 border-2 border-purple-500/40 dark:border-purple-400/40',
      iconBg: 'bg-purple-500/25 text-purple-800 dark:text-purple-300'
    },
    {
      num: '05',
      title: 'Claims Advocacy',
      desc: 'Provide dedicated on-ground hospitalization coordination and end-to-end claim settlement assistance.',
      icon: FaMedal,
      colorClass: 'text-rose-800 dark:text-rose-300',
      cardBg: 'bg-rose-500/15 dark:bg-rose-500/20 border-2 border-rose-500/40 dark:border-rose-400/40',
      iconBg: 'bg-rose-500/25 text-rose-800 dark:text-rose-300'
    },
    {
      num: '06',
      title: 'Visionary Leadership',
      desc: 'Lead with absolute integrity, ethical governance, and a steadfast commitment to generational security.',
      icon: FaHandshake,
      colorClass: 'text-indigo-800 dark:text-indigo-300',
      cardBg: 'bg-indigo-500/15 dark:bg-indigo-500/20 border-2 border-indigo-500/40 dark:border-indigo-400/40',
      iconBg: 'bg-indigo-500/25 text-indigo-800 dark:text-indigo-300'
    }
  ];

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
      title: 'MD Plaza HQ and Digital Suite',
      desc: 'Inaugurates premier corporate headquarters at #104, West Raja Street, Kanchipuram, introducing digital planning suites.'
    }
  ];

  // Leadership Data
  const leaders = [
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
    },
    {
      name: "Mr. Prakash Gajendiran",
      role: "Founder & Managing Director",
      bio: "Certified Financial Consultant, Proud BNI Member, and Senior Business Associate Leader with over 22 years of seasoned expertise, guiding thousands of families toward robust financial security and disciplined wealth creation.",
      image: "/prakash_gajendiran.jpg",
      bniBadge: "/images.jpg",
      stats: [
        { val: 22, suffix: "+", label: "Years Experience" },
        { val: 5000, suffix: "+", label: "Families Guided" },
        { val: 3, suffix: "x", label: "Aura Achiever" }
      ],
      points: ["Certified Financial Planner", "Proud BNI Member", "MDRT Aspirant Leader", "Lifelong Claims Advocate"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300 font-sans selection:bg-brand-accent selection:text-neutral-950">

      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION: Confident, Spacious, Established
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden border-b border-black/5 dark:border-white/5">

        {/* Soft Ambient Radial Glows */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-amber-400/10 via-amber-300/5 to-transparent blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left flex flex-col items-start">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-neutral-950 dark:text-white max-w-5xl leading-[1.08] text-left font-['Plus_Jakarta_Sans',sans-serif]"
          >
            SECURING WEALTH, EMPOWERING FUTURES.
          </motion.h1>

          {/* Trust Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-4xl mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              { val: 22, suffix: '+', label: 'Years of Trust' },
              { val: 5000, suffix: '+', label: 'Families Protected' },
              { val: 150, prefix: '₹', suffix: 'Cr+', label: 'Protection Managed' },
              { val: 4.9, suffix: ' / 5', label: 'Client Rating' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start text-left">
                <div className="text-3xl sm:text-4xl lg:text-4xl font-black text-neutral-900 dark:text-brand-accent tracking-tight tabular-nums font-['Plus_Jakarta_Sans',sans-serif]">
                  <AnimatedStat value={stat.val} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. FOUNDATION OF OUR LEGACY (Who We Are)
      ═══════════════════════════════════════════════════════════ */}
      <section id="company-foundation" className="py-16 sm:py-20 lg:py-24 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Authentic Company Story */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5 text-left"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                THE FOUNDATION OF OUR LEGACY
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed font-['Inter',sans-serif]">
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
                <div className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                  <FaCheckCircle className="text-rose-500 text-base shrink-0" />
                  <span>IRDAI Compliant</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                  <FaCheckCircle className="text-amber-400 text-base shrink-0" />
                  <span>Multi-Partner Choice</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                  <FaCheckCircle className="text-emerald-500 text-base shrink-0" />
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
              className="lg:col-span-5 space-y-4"
            >
              {[
                {
                  icon: FaUsers,
                  title: 'Tailored Advisory',
                  desc: 'Every family carries unique aspirations. We customize life, health, and wealth blueprints to fit your cash flow without forcing unnecessary policies.',
                  iconColor: 'text-amber-600 dark:text-amber-400',
                  iconBg: 'bg-amber-500/10 dark:bg-amber-500/20'
                },
                {
                  icon: FaShieldAlt,
                  title: 'Institutional Assurance',
                  desc: 'Official partner with India’s foremost insurers including Tata AIA, HDFC Life, SBI Life, and Star Health for rock-solid claim settlement.',
                  iconColor: 'text-blue-600 dark:text-blue-400',
                  iconBg: 'bg-blue-500/10 dark:bg-blue-500/20'
                },
                {
                  icon: FaHandshake,
                  title: 'Lifelong Care & Advocacy',
                  desc: 'From initial policy issuance to cashless emergency hospitalization coordination and annual portfolio reviews, we stand by your side.',
                  iconColor: 'text-emerald-600 dark:text-emerald-400',
                  iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center text-lg shrink-0 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-neutral-950 transition-all duration-300`}>
                        <Icon />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white tracking-tight mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
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
          3. WHERE WE'RE HEADED (Vision Statement)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-6 font-['Plus_Jakarta_Sans',sans-serif]">
              WHERE WE'RE HEADED
            </h2>

            <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-black/5">
              <div className="text-4xl sm:text-5xl font-serif text-brand-accent mb-3 leading-none">“</div>
              <p className="text-lg sm:text-2xl md:text-3xl text-neutral-800 dark:text-neutral-100 font-bold leading-relaxed tracking-tight max-w-3xl mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
                Making financial protection simpler, more transparent, and reliably accessible for every family and enterprise across India.
              </p>
              <div className="w-16 h-1 bg-brand-accent mx-auto mt-6 rounded-full" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. WHAT DRIVES US (Our Mission - 6 Core Pillars)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              WHAT DRIVES US
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {missionPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.06 * idx }}
                  className={`relative rounded-3xl p-6 sm:p-7 ${pillar.cardBg} shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full`}
                >
                  <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
                    {/* Top Row: Icon and Step Number */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-all duration-300`}>
                        <Icon className="text-xl" />
                      </div>
                      <span className={`text-2xl sm:text-3xl font-black ${pillar.colorClass} opacity-60 tracking-tighter font-['Plus_Jakarta_Sans',sans-serif]`}>
                        {pillar.num}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed font-['Inter',sans-serif]">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. GUIDING PRINCIPLES (How We Work)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              OUR GUIDING PRINCIPLES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {principles.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * idx }}
                  className={`p-6 sm:p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between hover:-translate-y-1.5 ${principle.hoverBg} transition-all duration-300 h-full group cursor-pointer`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-2xs transition-all duration-300 group-hover:scale-110 mb-4 ${principle.iconBg} ${principle.colorClass}`}>
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
          6. MILESTONES (Interactive Timeline)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-black/5 dark:border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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
                <div className="w-full p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between flex-1 text-left transition-all duration-300 group-hover:border-brand-accent/50 dark:group-hover:border-brand-accent/40 group-hover:shadow-[0_12px_25px_rgba(0,0,0,0.06)] dark:group-hover:shadow-[0_12px_25px_rgba(0,0,0,0.35)] relative overflow-hidden">
                  {/* Top Accent Line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-amber-800 dark:text-brand-accent block mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                      {m.tag}
                    </span>
                    <h4 className="text-sm sm:text-[15px] font-extrabold text-neutral-950 dark:text-white tracking-tight leading-snug mb-2 font-['Plus_Jakarta_Sans',sans-serif] group-hover:text-amber-800 dark:group-hover:text-brand-accent transition-colors duration-200">
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
            {/* Animated Vertical Line */}
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
                {/* Timeline Bullet Node with Glow */}
                <div className="absolute -left-[30px] sm:-left-[46px] top-4 flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-accent border-4 border-slate-50 dark:border-neutral-950 shadow-md group-hover:scale-125 transition-transform duration-300 group-hover:ring-4 group-hover:ring-brand-accent/30" />
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2 transition-all duration-300 group-hover:border-brand-accent/50 dark:group-hover:border-brand-accent/40 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)] dark:group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-accent text-neutral-950 font-extrabold text-xs font-['Plus_Jakarta_Sans',sans-serif] shadow-2xs group-hover:scale-105 transition-transform">
                      {m.year}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400 font-['Plus_Jakarta_Sans',sans-serif]">
                      {m.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-neutral-950 dark:text-white tracking-tight pt-1 font-['Plus_Jakarta_Sans',sans-serif] group-hover:text-amber-800 dark:group-hover:text-brand-accent transition-colors">
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
      <section className="py-16 sm:py-20 lg:py-24 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              AWARDS & ACHIEVEMENTS
            </h2>
          </div>

          {/* Featured Spotlight Award Card */}
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-brand-accent/40 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div
              className="md:col-span-5 h-[240px] sm:h-[290px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-950 p-3 flex items-center justify-center border border-slate-200 dark:border-white/10 group cursor-pointer"
              onClick={() => { setSelectedAwardIndex(0); setZoomLevel(1); }}
            >
              <img
                src={AWARDS_DATA[0].img}
                alt={AWARDS_DATA[0].title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="md:col-span-7 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent text-neutral-950 text-xs font-black uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
                <FaAward className="text-xs" />
                <span>FEATURED SPOTLIGHT RECOGNITION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                {AWARDS_DATA[0].title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed font-['Inter',sans-serif]">
                {AWARDS_DATA[0].desc} Honoring sustained leadership benchmarks in ethical distribution and client-first financial architecture.
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

          {/* Gallery Grid of All Verified Certificates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {AWARDS_DATA.map((award, idx) => (
              <motion.div
                key={award.id}
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
                <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 dark:text-brand-accent block mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                      {award.tag}
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
          8. VISIONARY LEADERSHIP (Human-Centered Profiles)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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
                className="relative p-5 sm:p-10 lg:p-12 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.3)] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center overflow-hidden"
              >
                {/* Top-Right BNI Member Badge */}
                {leader.bniBadge && (
                  <div className="absolute top-3 right-3 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-20 flex flex-col items-center">
                    <div className="w-13 h-13 xs:w-16 xs:h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-md sm:shadow-lg border-2 border-red-600/30 bg-white hover:scale-105 transition-transform duration-300">
                      <img
                        src={leader.bniBadge}
                        alt="Proud BNI Member"
                        className="w-full h-full object-contain p-0.5"
                      />
                    </div>
                  </div>
                )}

                {/* Leader Photograph (Circle Shape) */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-slate-100 dark:bg-neutral-950 border-4 border-brand-accent/60 shadow-2xl group ring-4 sm:ring-8 ring-brand-accent/15">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Leader Narrative & Credentials */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
                  <div className="space-y-1.5 sm:space-y-2 pr-12 sm:pr-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-brand-accent text-[11px] sm:text-xs font-black uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
                        <FaAward className="text-[10px] sm:text-xs shrink-0" />
                        <span>{leader.role}</span>
                      </div>

                      {leader.bniBadge && (
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-red-600/10 dark:bg-red-600/20 border border-red-600/30 text-red-700 dark:text-red-400 text-[11px] sm:text-xs font-black uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
                          <span>PROUD BNI MEMBER</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      {leader.name}
                    </h3>
                  </div>

                  {/* Executive Pull-Quote Bio */}
                  <div className="border-l-2 border-brand-accent/80 pl-3.5 sm:pl-4 py-1">
                    <p className="text-xs xs:text-sm sm:text-base lg:text-[17px] text-neutral-700 dark:text-neutral-200 font-normal leading-relaxed italic font-['Outfit',sans-serif]">
                      "{leader.bio}"
                    </p>
                  </div>

                  {/* Key Focus Highlights */}
                  {leader.points && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {leader.points.map((pt, pIdx) => (
                        <span
                          key={pIdx}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-100 dark:bg-neutral-800/90 border border-slate-200/90 dark:border-white/10 text-neutral-900 dark:text-neutral-100 text-[11px] sm:text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] shadow-2xs"
                        >
                          <FaCheckCircle className="text-emerald-500 text-[10px] sm:text-xs shrink-0" />
                          <span>{pt}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quantitative Stats */}
                  {leader.stats && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3.5 sm:pt-4 border-t border-slate-200/90 dark:border-white/10">
                      {leader.stats.map((st, sIdx) => (
                        <div key={sIdx} className="space-y-0.5">
                          <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 dark:text-brand-accent tabular-nums font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                            {st.val}{st.suffix}
                          </div>
                          <div className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-black text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif] leading-tight">
                            {st.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action CTA */}
                  <div className="pt-2">
                    <Link
                      to="/appointment"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-brand-accent text-neutral-950 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 font-['Plus_Jakarta_Sans',sans-serif] cursor-pointer text-center"
                    >
                      <FaCalendarAlt className="text-xs" />
                      <span>Consult with {leader.name.replace(/^(Mr\.|Mrs\.|Dr\.)\s+/i, '').split(' ')[0]}</span>
                    </Link>
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
                  className="px-8 py-4 rounded-2xl bg-brand-accent text-neutral-950 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                  <FaPhoneAlt className="text-xs" />
                  <span>Book a Free Consultation</span>
                </Link>

                <Link
                  to="/careers"
                  className="px-8 py-4 rounded-2xl bg-white/10 text-white border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                  <span>Explore Careers</span>
                  <FaArrowRight className="text-xs" />
                </Link>

                <Link
                  to="/support"
                  className="px-8 py-4 rounded-2xl bg-white/5 text-neutral-300 border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider hover:text-white hover:border-white/30 transition-all duration-300 flex items-center gap-2"
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
                <a
                  href="https://maps.google.com/?q=MD+Plaza+West+Raja+Street+Kanchipuram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-brand-accent transition-colors"
                >
                  <FaMapMarkerAlt className="text-brand-accent text-xs" />
                  <span>#104, MD Plaza, West Raja Street, Kanchipuram - 631 502</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          10. FULL-SCREEN INTERACTIVE AWARDS LIGHTBOX MODAL
      ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedAwardIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 select-none"
            onClick={handleCloseLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Floating Control Bar */}
            <div
              className="relative z-30 flex items-center justify-between w-full max-w-5xl mx-auto py-2 px-4 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-md shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Counter & Tag */}
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-brand-accent text-neutral-950 font-black text-xs font-['Plus_Jakarta_Sans',sans-serif]">
                  {selectedAwardIndex + 1} / {AWARDS_DATA.length}
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 hidden sm:inline-block font-['Plus_Jakarta_Sans',sans-serif]">
                  {AWARDS_DATA[selectedAwardIndex].tag}
                </span>
              </div>

              {/* Center: Image Controls (Zoom In, Zoom Out, Reset) */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
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
                  src={AWARDS_DATA[selectedAwardIndex].img}
                  alt={AWARDS_DATA[selectedAwardIndex].title}
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
                    {AWARDS_DATA[selectedAwardIndex].tag}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-xs font-black text-white">
                    Year {AWARDS_DATA[selectedAwardIndex].year}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  {AWARDS_DATA[selectedAwardIndex].title}
                </h3>
                <p className="text-xs text-neutral-300 font-normal leading-relaxed font-['Inter',sans-serif] max-w-2xl">
                  {AWARDS_DATA[selectedAwardIndex].desc}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => window.open(AWARDS_DATA[selectedAwardIndex].img, '_blank')}
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
