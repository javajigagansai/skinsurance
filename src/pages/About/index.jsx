import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { 
  FaAward, FaShieldAlt, FaUsers, FaChartLine, FaTimes, 
  FaSearchPlus, FaLinkedin, FaInstagram, FaArrowRight, 
  FaArrowLeft, FaCheckCircle, FaPhoneAlt, FaCalendarAlt,
  FaFileContract, FaHandshake, FaMedal, FaExternalLinkAlt,
  FaMapMarkerAlt, FaEnvelope, FaChevronLeft, FaChevronRight,
  FaLightbulb, FaHeartbeat, FaBalanceScale, FaUserTie
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

/* ─── Section Eyebrow Tag ─── */
const SectionEyebrow = ({ children, className = "" }) => (
  <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-amber-800 dark:text-brand-accent text-[11px] font-black uppercase tracking-[0.2em] mb-4 shadow-2xs ${className}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
    <span>{children}</span>
  </div>
);

/* ─── Real Awards Data ─── */
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
  const [awardCategory, setAwardCategory] = useState('ALL');

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedAwardIndex === null) return;
      if (e.key === 'Escape') setSelectedAwardIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedAwardIndex((prev) => (prev !== null && prev < AWARDS_DATA.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedAwardIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : AWARDS_DATA.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAwardIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAwardIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAwardIndex]);

  const scrollToStory = () => {
    const el = document.getElementById('company-foundation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 6 Core Pillars of Mission
  const missionPillars = [
    {
      num: '01',
      title: 'Personalized Solutions',
      desc: 'Deliver tailored insurance and wealth preservation blueprints aligned with individual family milestones.',
      icon: FaLightbulb
    },
    {
      num: '02',
      title: 'Premium Products',
      desc: 'Curate top-tier policies from India’s leading insurers with maximum claim clearance and competitive premiums.',
      icon: FaShieldAlt
    },
    {
      num: '03',
      title: 'Expert Guidance',
      desc: 'Simplify complex clauses through unbiased advice from certified advisors with over 22 years of field expertise.',
      icon: FaUserTie
    },
    {
      num: '04',
      title: 'Seamless Digital Support',
      desc: 'Ensure rapid policy issuance, digital onboarding, annual portfolio reviews, and frictionless renewals.',
      icon: FaFileContract
    },
    {
      num: '05',
      title: 'Claims Advocacy',
      desc: 'Provide dedicated on-ground hospitalization coordination and end-to-end claim settlement assistance.',
      icon: FaMedal
    },
    {
      num: '06',
      title: 'Visionary Leadership',
      desc: 'Lead with absolute integrity, ethical governance, and a steadfast commitment to generational security.',
      icon: FaHandshake
    }
  ];

  // Guiding Principles
  const principles = [
    {
      title: 'Absolute Transparency',
      desc: 'Zero hidden clauses, clear deductible guides, and upfront premium definitions for complete peace of mind.',
      icon: FaShieldAlt
    },
    {
      title: 'Actuarial Precision',
      desc: 'Goal-based wealth planners and SIP models engineered using real-time market data and compounding indices.',
      icon: FaChartLine
    },
    {
      title: 'Community Advocacy',
      desc: 'Empowering Kanchipuram and wider Tamil Nadu families with accessible, localized, and fiduciary financial coaching.',
      icon: FaUsers
    },
    {
      title: 'Dedicated Claims Desk',
      desc: 'Pre-sales clarity and lifetime post-sales assistance to secure top-tier cashless clearance and reimbursement speed.',
      icon: FaAward
    }
  ];

  // Authentic Timeline Milestones
  const milestones = [
    {
      year: '2004',
      tag: 'INDEPENDENT ADVISORY',
      title: 'Advisory Foundation',
      desc: 'Founder & MD Prakash Gajendiran begins independent financial and insurance advisory in Kanchipuram, dedicated to family protection.'
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

  // Leadership Data
  const leaders = [
    {
      name: "Mrs. Kumutha Krishnamoorthy",
      role: "CEO & Founder",
      bio: "Visionary CEO & Founder of SK Smart Investments, driving the firm's growth with a steadfast commitment to customer trust, ethical transparency, and institutional excellence across Tamil Nadu.",
      image: "/kumutha_krishnamoorthy.jpg",
      points: ["Strategic Governance", "Operational Integrity", "Client-First Culture"]
    },
    {
      name: "Mr. Prakash Gajendiran",
      role: "Founder & Managing Director",
      bio: "Certified Financial Consultant and Senior Business Associate Leader with over 22 years of seasoned expertise, guiding thousands of families toward robust financial security and disciplined wealth creation.",
      image: "/prakash_gajendiran.jpg",
      stats: [
        { val: 22, suffix: "+", label: "Years Experience" },
        { val: 5000, suffix: "+", label: "Families Guided" },
        { val: 3, suffix: "x", label: "Aura Achiever" }
      ],
      points: ["Certified Financial Planner", "MDRT Aspirant Leader", "Lifelong Claims Advocate"]
    }
  ];

  const filteredAwards = awardCategory === 'ALL' 
    ? AWARDS_DATA 
    : AWARDS_DATA.filter(a => a.tag.toLowerCase().includes(awardCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300 font-sans selection:bg-brand-accent selection:text-neutral-950">

      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION: Confident, Spacious, Established
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 overflow-hidden border-b border-black/5 dark:border-white/5">
        
        {/* Soft Ambient Radial Glows */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-amber-400/10 via-amber-300/5 to-transparent blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionEyebrow>OUR JOURNEY & STORY</SectionEyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-neutral-900 dark:text-white max-w-5xl leading-[1.08] mt-2"
          >
            SECURING WEALTH,{' '}
            <span className="text-brand-accent">EMPOWERING FUTURES.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 max-w-3xl text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed"
          >
            Building stronger financial futures through trusted advisory, comprehensive risk protection, and disciplined generational planning across Tamil Nadu.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={scrollToStory}
              className="px-8 py-4 rounded-2xl bg-brand-accent text-neutral-950 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <span>Explore Our Journey</span>
              <FaArrowRight className="text-xs" />
            </button>

            <Link
              to="/appointment"
              className="px-8 py-4 rounded-2xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-brand-accent hover:text-brand-accent transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <FaCalendarAlt className="text-xs text-brand-accent" />
              <span>Book Free Advisory</span>
            </Link>
          </motion.div>

          {/* Trust Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="w-full max-w-4xl mt-14 sm:mt-20 pt-10 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              { val: 22, suffix: '+', label: 'Years of Trust' },
              { val: 5000, suffix: '+', label: 'Families Protected' },
              { val: 150, prefix: '₹', suffix: 'Cr+', label: 'Protection Managed' },
              { val: 4.9, suffix: ' / 5', label: 'Client Rating' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl lg:text-4xl font-black text-neutral-900 dark:text-brand-accent tracking-tight tabular-nums">
                  <AnimatedStat value={stat.val} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-xs sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-bold uppercase tracking-wider">
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
      <section id="company-foundation" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/5 dark:border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Company Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <SectionEyebrow>WHO WE ARE</SectionEyebrow>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
              THE FOUNDATION OF OUR LEGACY
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
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

            <div className="pt-2 flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                <FaCheckCircle className="text-brand-accent text-base" />
                <span>IRDAI Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                <FaCheckCircle className="text-brand-accent text-base" />
                <span>Multi-Partner Choice</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                <FaCheckCircle className="text-brand-accent text-base" />
                <span>Zero Commission Bias</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Impact Legacy Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            {[
              {
                icon: FaUsers,
                title: 'Tailored Advisory',
                desc: 'Every family carries unique aspirations. We customize life, health, and wealth blueprints to fit your cash flow without forcing unnecessary policies.'
              },
              {
                icon: FaShieldAlt,
                title: 'Institutional Assurance',
                desc: 'Official partner with India’s foremost insurers including Tata AIA, HDFC Life, SBI Life, and Star Health for rock-solid claim settlement.'
              },
              {
                icon: FaHandshake,
                title: 'Lifelong Care & Advocacy',
                desc: 'From initial policy issuance to cashless emergency hospitalization coordination and annual portfolio reviews, we stand by your side.'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 text-amber-600 dark:text-brand-accent flex items-center justify-center text-xl shrink-0 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-neutral-950 transition-all duration-300">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. WHERE WE'RE HEADED (Vision Statement)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-6">
              WHERE WE'RE HEADED
            </h2>

            <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-black/5">
              <div className="text-4xl sm:text-5xl font-serif text-brand-accent mb-4 leading-none">“</div>
              <p className="text-lg sm:text-2xl md:text-3xl text-neutral-800 dark:text-neutral-100 font-bold leading-relaxed tracking-tight max-w-3xl mx-auto">
                Making financial protection simpler, more transparent, and reliably accessible for every family and enterprise across India.
              </p>
              <div className="w-16 h-1 bg-brand-accent mx-auto mt-6 rounded-full" />
              <p className="mt-4 text-xs sm:text-sm uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-400">
                Fostering Generational Financial Independence
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. WHAT DRIVES US (Our Mission - 6 Core Pillars)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/5 dark:border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            WHAT DRIVES US
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            Six foundational pillars that guide every client interaction, portfolio audit, and claims advocacy process.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {missionPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * idx }}
                className="relative rounded-3xl p-7 sm:p-8 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                {/* Accent number in top right */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 text-amber-600 dark:text-brand-accent flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-neutral-950 transition-all duration-300">
                    <Icon />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-300 dark:text-neutral-700 tracking-tighter">
                    {pillar.num}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. GUIDING PRINCIPLES (How We Work)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/5 dark:border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <SectionEyebrow>HOW WE WORK</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            OUR GUIDING PRINCIPLES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {principles.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-white text-brand-accent dark:text-neutral-950 flex items-center justify-center text-xl shrink-0 shadow-sm">
                  <Icon />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white tracking-tight mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. MILESTONES (Interactive Timeline)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/5 dark:border-white/5 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <SectionEyebrow>OUR EVOLUTION</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            MILESTONES THAT MATTER
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            Two decades of disciplined growth, expanding institutional partnerships, and protecting generations of families.
          </p>
        </div>

        {/* Desktop / Large Screens: Horizontal Connected Flow */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative">
          
          {/* Continuous Timeline Track */}
          <div className="absolute top-7 left-12 right-12 h-1 bg-slate-200 dark:bg-neutral-800 z-0" />

          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 * idx }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Year Node Badge */}
              <div className="w-14 h-14 rounded-full bg-brand-accent text-neutral-950 font-black text-sm flex items-center justify-center shadow-lg border-4 border-white dark:border-neutral-950 mb-6 transition-transform duration-300 hover:scale-110">
                {m.year}
              </div>

              {/* Milestone Card */}
              <div className="w-full p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between min-h-[220px] text-left">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-800 dark:text-brand-accent block mb-1">
                    {m.tag}
                  </span>
                  <h4 className="text-base font-black text-neutral-900 dark:text-white tracking-tight mb-2">
                    {m.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet View: Purpose-Built Vertical Timeline */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-8 border-l-2 border-brand-accent/40 dark:border-brand-accent/30 ml-3 sm:ml-4">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="relative"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-brand-accent border-4 border-slate-50 dark:border-neutral-950 shadow-md" />

              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-brand-accent text-neutral-950 font-black text-xs">
                    {m.year}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    {m.tag}
                  </span>
                </div>
                <h4 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight pt-1">
                  {m.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. AWARDS & ACHIEVEMENTS: Premium Gallery & Lightbox
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/5 dark:border-white/5">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionEyebrow>INDUSTRY RECOGNITION</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            AWARDS & ACHIEVEMENTS
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            Every honor reflects the trust placed in us by thousands of families and benchmark performance acknowledged by India’s top insurance institutions.
          </p>
        </div>

        {/* Featured Spotlight Award Card */}
        <div className="mb-12 p-6 sm:p-10 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-brand-accent/40 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 h-[260px] sm:h-[320px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-950 p-3 flex items-center justify-center border border-slate-200 dark:border-white/10 group cursor-pointer" onClick={() => setSelectedAwardIndex(0)}>
            <img 
              src={AWARDS_DATA[0].img} 
              alt={AWARDS_DATA[0].title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="md:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent text-neutral-950 text-xs font-black uppercase tracking-wider">
              <FaAward className="text-xs" />
              <span>FEATURED SPOTLIGHT RECOGNITION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {AWARDS_DATA[0].title}
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
              {AWARDS_DATA[0].desc} Honoring sustained leadership benchmarks in ethical distribution and client-first financial architecture.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSelectedAwardIndex(0)}
                className="px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-brand-accent hover:text-neutral-950 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FaSearchPlus className="text-xs" />
                <span>View Full Certificate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid of All Verified Certificates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AWARDS_DATA.map((award, idx) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
              onClick={() => setSelectedAwardIndex(idx)}
              className="group rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-brand-accent/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame with Aspect Ratio Preservation */}
              <div className="relative w-full h-52 bg-slate-100 dark:bg-neutral-950 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-white/5">
                <img
                  src={award.img}
                  alt={award.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="w-10 h-10 rounded-full bg-brand-accent text-neutral-950 flex items-center justify-center shadow-lg">
                    <FaSearchPlus className="text-sm" />
                  </div>
                </div>
              </div>

              {/* Award Details */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-2">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 dark:text-brand-accent block mb-1">
                    {award.tag}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-2 leading-snug">
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
      </section>

      {/* ═══════════════════════════════════════════════════════════
          8. VISIONARY LEADERSHIP (Human-Centered Profiles)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/5 dark:border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionEyebrow>LEADERSHIP TEAM</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            VISIONARY LEADERSHIP
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            Meet the experienced leaders guiding SK Smart Investments with fiduciary integrity, community commitment, and long-term vision.
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-12 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.3)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Leader Photograph */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 dark:bg-neutral-950 border-2 border-brand-accent/30 shadow-2xl group">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-black uppercase tracking-widest text-brand-accent">
                      {leader.role}
                    </p>
                    <p className="text-lg font-black text-white">
                      {leader.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Leader Narrative & Credentials */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                    {leader.name}
                  </h3>
                  <p className="text-sm font-bold text-amber-700 dark:text-brand-accent uppercase tracking-widest mt-1">
                    {leader.role}
                  </p>
                </div>

                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                  "{leader.bio}"
                </p>

                {/* Key Focus Highlights */}
                {leader.points && (
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {leader.points.map((pt, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold"
                      >
                        <FaCheckCircle className="text-brand-accent text-xs" />
                        <span>{pt}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Quantitative Stats if available */}
                {leader.stats && (
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                    {leader.stats.map((st, sIdx) => (
                      <div key={sIdx}>
                        <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-brand-accent tabular-nums">
                          {st.val}{st.suffix}
                        </div>
                        <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-0.5">
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent text-neutral-950 text-xs font-black uppercase tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <FaCalendarAlt className="text-xs" />
                    <span>Consult with {leader.name.split(' ')[1] || leader.name}</span>
                  </Link>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          9. JOIN OUR NETWORK: Complete CTA & Social Strip
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white p-8 sm:p-14 lg:p-20 text-center border-2 border-brand-accent/30 shadow-2xl overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-block text-xs font-black uppercase tracking-[0.25em] text-brand-accent">
              CONNECT & COLLABORATE
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              READY TO SECURE YOUR FAMILY'S FUTURE?
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-medium leading-relaxed max-w-2xl mx-auto">
              Whether you are seeking customized insurance portfolios, a second opinion on existing policies, or exciting career opportunities in financial advisory — let’s build together.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/appointment"
                className="px-8 py-4 rounded-2xl bg-brand-accent text-neutral-950 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                <FaPhoneAlt className="text-xs" />
                <span>Book a Consultation</span>
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

            {/* Direct Social / Address Strip */}
            <div className="pt-10 mt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-400 font-medium">
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
                <span>#104, MD Plaza, Kanchipuram</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          10. INTERACTIVE AWARDS LIGHTBOX MODAL
      ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedAwardIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedAwardIndex(null)}
          >
            {/* Modal Dialog Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">
                    {AWARDS_DATA[selectedAwardIndex].tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight line-clamp-1">
                    {AWARDS_DATA[selectedAwardIndex].title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedAwardIndex((prev) => (prev > 0 ? prev - 1 : AWARDS_DATA.length - 1))}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous Award"
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>
                  <button
                    onClick={() => setSelectedAwardIndex((prev) => (prev < AWARDS_DATA.length - 1 ? prev + 1 : 0))}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next Award"
                  >
                    <FaChevronRight className="text-sm" />
                  </button>
                  <button
                    onClick={() => setSelectedAwardIndex(null)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
                    aria-label="Close Lightbox"
                  >
                    <FaTimes className="text-base" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Aspect-Preserved Large Image */}
              <div className="p-4 sm:p-8 flex-1 flex items-center justify-center overflow-hidden max-h-[60vh]">
                <img
                  src={AWARDS_DATA[selectedAwardIndex].img}
                  alt={AWARDS_DATA[selectedAwardIndex].title}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                />
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 sm:p-6 bg-neutral-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-neutral-300 font-medium text-center sm:text-left">
                  {AWARDS_DATA[selectedAwardIndex].desc}
                </p>
                <div className="shrink-0 text-xs font-bold text-neutral-400">
                  {selectedAwardIndex + 1} / {AWARDS_DATA.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default About;
