import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useTranslation } from '../../context/LanguageContext';
import { Button } from '../../components/ui/Button';
import { FaShieldAlt, FaHeartbeat, FaCar, FaUserShield, FaHandshake, FaAward, FaStar, FaTrophy, FaChevronDown, FaUsers, FaPhoneAlt, FaArrowRight, FaCheckCircle, FaCopy, FaWhatsapp, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { subscribeToCollection } from '../../services/firebaseService';

import { useRef } from 'react';
import { StickyStackedCards } from '../../features/marketing/components/StickyStackedCards';
import { PremiumEditorialStats } from '../../features/marketing/components/PremiumEditorialStats';
import { EditorialTrustValues } from '../../features/marketing/components/EditorialTrustValues';
import { StaggerTestimonials } from '../../components/ui/stagger-testimonials';
import { HowItWorks } from '../../features/marketing/components/HowItWorks';

import { Calculator } from '../Calculator';
import { HeroFlyerCarousel } from '../../features/marketing/components/HeroFlyerCarousel';
import { PinterestCardCarousel } from '../../features/marketing/components/PinterestCardCarousel';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [monthlyInvest, setMonthlyInvest] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(10);
  const [partnerFilter, setPartnerFilter] = useState('ALL');
  const [plans, setPlans] = useState([]);
  const [showCallModal, setShowCallModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleBookCall = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (typeof window !== 'undefined' && window.innerWidth < 768);
    if (isMobile) {
      window.location.href = 'tel:+919840723956';
    } else {
      setShowCallModal(true);
    }
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('+91 98407 23956');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    // Listen to plans in real-time and sort by displayOrder
    const unsubscribe = subscribeToCollection('plans', (data) => {
      const sorted = [...data].sort((a, b) => {
        const orderA = a.displayOrder !== undefined ? parseInt(a.displayOrder) : 999;
        const orderB = b.displayOrder !== undefined ? parseInt(b.displayOrder) : 999;
        return orderA - orderB;
      });
      setPlans(sorted);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (window.location.hash === '#calculator') {
      setTimeout(() => {
        const el = document.getElementById('calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  const defaultPartners = [
    {
      name: 'Postal Office',
      type: 'Government / PLI',
      logo: '/logos/Postal Office.png',
      onlineLogo: '/logos/Postal Office.png',
      tag: 'INDIA POST TRUST',
      desc: 'Government of India postal life insurance with lowest premiums & maximum bonus rates.'
    },
    {
      name: 'Future Generali',
      type: 'General & Health',
      logo: '/logos/Future Generali.jpg',
      onlineLogo: '/logos/Future Generali.jpg',
      tag: 'FAST TRACK CLAIMS',
      desc: 'Global insurance expertise with instant digital policy issuance & hassle-free claim settlement.'
    },
    {
      name: 'Bajaj Allianz',
      type: 'General Insurance',
      logo: '/logos/bajaj_allianz.png',
      onlineLogo: 'https://logo.clearbit.com/bajajallianz.com',
      tag: 'GLOBAL ASSIST',
      desc: 'Worldwide emergency care, travel, & personal accident cover.'
    },
    {
      name: 'Aditya Birla Sun Life',
      type: 'Life & Savings',
      logo: '/logos/Aditya Birla Sun Life.jpg',
      onlineLogo: '/logos/Aditya Birla Sun Life.jpg',
      tag: 'WEALTH SHIELD',
      desc: 'Flexible savings and market-linked returns to fulfill family goals & milestones.'
    },
    {
      name: 'Oriental Insurance',
      type: 'General & Property',
      logo: '/logos/oriental_insurance.png',
      onlineLogo: '/logos/oriental_insurance.png',
      tag: 'PUBLIC SECTOR TRUST',
      desc: 'Premier PSU insurer providing comprehensive fire, commercial & property coverage.'
    },
    {
      name: 'Tata AIA Life',
      type: 'Life & Term',
      logo: '/logos/tata_aia.png',
      onlineLogo: 'https://logo.clearbit.com/tataaia.com',
      tag: 'HIGH PAYOUT',
      desc: 'Comprehensive protection with wealth creation & monthly pension options.'
    },
    {
      name: 'ICICI Prudential / Lombard',
      type: 'General & Life',
      logo: '/logos/icici_prudential.png',
      onlineLogo: 'https://logo.clearbit.com/icicipruamc.com',
      tag: 'INSTANT CLAIMS',
      desc: 'Bumper-to-bumper protection with instant digital policy issuance & claim status tracker.'
    },
    {
      name: 'HDFC Life',
      type: 'Life & Health',
      logo: '/logos/hdfc_life.png',
      onlineLogo: 'https://logo.clearbit.com/hdfclife.com',
      tag: '4X COVER SHIELD',
      desc: 'Guaranteed payout protection plans with digital onboarding services.'
    },
    {
      name: 'SBI Life Insurance',
      type: 'Life & ULIP',
      logo: '/logos/sbi_life.png',
      onlineLogo: 'https://logo.clearbit.com/sbilife.co.in',
      tag: 'SOVEREIGN BANK TRUST',
      desc: 'Trusted sovereign financial security backed by State Bank of India.'
    },
    {
      name: 'Niva Bupa Health',
      type: 'Health Insurance',
      logo: '/logos/niva_bupa.png',
      onlineLogo: 'https://logo.clearbit.com/nivabupa.com',
      tag: 'CRITICAL SHIELD',
      desc: 'Comprehensive medical coverage with direct hospital desk approval.'
    },
    {
      name: 'Allianz Care',
      type: 'Global Health',
      logo: '/logos/bajaj_allianz.png',
      onlineLogo: 'https://logo.clearbit.com/allianz.com',
      tag: 'WORLDWIDE COVER',
      desc: 'International travel & healthcare protection for global professionals.'
    },
    {
      name: 'Kotak Mahindra Life',
      type: 'Life Insurance',
      logo: '/logos/Kotak Mahindra Life.jpg',
      onlineLogo: '/logos/Kotak Mahindra Life.jpg',
      tag: 'WEALTH PROTECTION',
      desc: 'Guaranteed income plans for lifelong financial independence & security.'
    },
    {
      name: 'PNB MetLife',
      type: 'Life Insurance',
      logo: '/logos/PNB MetLife.png',
      onlineLogo: '/logos/PNB MetLife.png',
      tag: 'FUTURE SECURITY',
      desc: 'Tailored financial security plans for you and your family.'
    },
    {
      name: 'ManipalCigna Health',
      type: 'Health Insurance',
      logo: '/logos/ManipalCigna Health.png',
      onlineLogo: '/logos/ManipalCigna Health.png',
      tag: 'WELLNESS FIRST',
      desc: 'Restoration benefit and preventive healthcare checkups included.'
    },
    {
      name: 'Star Health Insurance',
      type: 'Health Insurance',
      logo: '/logos/star_health.png',
      onlineLogo: 'https://logo.clearbit.com/starhealth.in',
      tag: 'CASHLESS CARE',
      desc: '100% Cashless network with zero co-pay at 14,000+ top hospitals.'
    },
    {
      name: 'Max Life / Axis',
      type: 'Life & Term',
      logo: '/logos/axis_max.png',
      onlineLogo: '/logos/axis_max.png',
      tag: 'TOP CLAIM RATIO',
      desc: 'Industry leading 99.5% claim settlement ratio with swift payouts.'
    }
  ];

  const defaultTestimonials = [
    {
      quote: "I am grateful for the opportunity to complete my internship with this organization. During this internship, I gained valuable knowledge about the insurance industry, customer relationship management, and financial planning.",
      author: "Harini",
      role: "Verified Client"
    },
    {
      quote: "My internship at sk smart investment company was a valuable learning experience. I improved my communication skill, learned about insurance products and gained practical knowledge.",
      author: "Dhivya Kumaran",
      role: "Verified Client"
    },
    {
      quote: "The mentors and staff members were supportive and guided me throughout the internship, which made the learning experience more comfortable and effective.",
      author: "Manimozhi E",
      role: "Verified Client"
    },
    {
      quote: "The personalized financial planning advice I received was exceptional. They really took the time to understand my family's goals and set us up for long-term success.",
      author: "Priya Sharma",
      role: "Verified Client"
    },
    {
      quote: "Excellent customer service and very transparent processes. Getting my general insurance renewed took less than 10 minutes online with their assistance.",
      author: "Arun Venkatesh",
      role: "Verified Client"
    },
    {
      quote: "SK Smart Investments helped me find the perfect health insurance plan for my parents. The team explained everything clearly and ensured I got the best coverage.",
      author: "Rajesh Kumar",
      role: "Verified Client"
    },
    {
      quote: "Seamless digital onboarding and instant policy downloads. True integrity in modern financial and risk advisory.",
      author: "Vikram Rajan",
      role: "Verified Client"
    }
  ];

  const [partnersList, setPartnersList] = useState(defaultPartners);
  const [testimonials, setTestimonials] = useState(() => defaultTestimonials.map((t, index) => ({
    testimonial: t.quote,
    by: `${t.author}, ${t.role}`,
    imgSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent(t.author)}&background=random`
  })));

  useEffect(() => {
    // Listen to partners in real-time
    const unsubscribePartners = subscribeToCollection('partners', (data) => {
      if (data && data.length > 0) setPartnersList(data);
    });
    // Listen to testimonials in real-time
    const unsubscribeTestimonials = subscribeToCollection('testimonials', (data) => {
      if (data && data.length > 0) {
        const mapped = data.map((t, index) => {
          const authorName = t.name || t.author || '';
          return {
            testimonial: t.text || t.quote || '',
            by: authorName + (t.role ? `, ${t.role}` : ''),
            imgSrc: t.imgSrc || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`
          };
        });
        setTestimonials(mapped);
      }
    });
    return () => {
      unsubscribePartners();
      unsubscribeTestimonials();
    };
  }, []);

  const handleImageError = (e, b) => {
    if (e.target.src.includes('clearbit')) {
      e.target.src = b.logo;
    } else {
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'block';
    }
  };

  const stats = [
    { number: '98.7%', label: 'Claims Settlement Rate', icon: FaShieldAlt, size: 'text-[54px]' },
    { number: '₹420L+', label: 'Claims Disbursed', icon: FaUserShield, size: 'text-[52px]' },
    { number: '150,000+', label: 'Lives Secured', icon: FaUsers, size: 'text-[50px]' },
    { number: '4.9 / 5', label: 'Customer Rating', icon: FaAward, size: 'text-[50px]' }
  ];

  const values = [
    {
      title: 'Flexible Advisory',
      description: 'Choose between comprehensive life, health, motor, and SIP investment plans with zero commission bias. Learn and decide at your own pace.',
      icon: FaShieldAlt
    },
    {
      title: 'Verified Insurers',
      description: 'All policies are backed by IRDAI-licensed top institutions including Tata AIA, HDFC Life, SBI Life, and Star Health. Protect your family with confidence.',
      icon: FaHandshake
    },
    {
      title: 'Personalized Sessions',
      description: 'One-on-one advisory attention tailored to your family goals and health history. Get dedicated cashless claim assistance whenever you need.',
      icon: FaUserShield
    }
  ];

  return (
    <div className="relative">
      {/* Modern 2-Column Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center snap-start pt-20 pb-8 sm:pt-24 sm:pb-12 bg-white dark:bg-neutral-950 overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        
        <div className="relative z-10 w-full pl-4 sm:pl-6 lg:pl-10 xl:pl-16 pr-0 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
            
            {/* Left Side: Interactive Pinterest-Style Stacked Card Carousel (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 space-y-4 text-center max-w-xl mx-auto lg:max-w-none w-full pr-4 sm:pr-6 lg:pr-0"
            >
              {/* Pinterest-Style Stacked Card Carousel */}
              <PinterestCardCarousel />

              {/* Actions Bar - Placed Centered Directly Under Middle of Cards */}
              <div className="flex items-center justify-center w-full pt-2 sm:pt-4">
                <button
                  onClick={handleBookCall}
                  className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl sm:rounded-2xl bg-brand-accent text-neutral-950 text-xs sm:text-sm font-extrabold uppercase tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5 cursor-pointer"
                >
                  <FaPhoneAlt className="text-xs sm:text-sm" />
                  <span>Book a Free Call</span>
                </button>
              </div>
            </motion.div>

            {/* Right Side: Larger, Immersive Term Insurance Hero Frame (7 cols extended to right edge) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-7 w-full flex items-center justify-end pr-0 overflow-visible"
            >
              <HeroFlyerCarousel />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="relative bg-white dark:bg-neutral-1000 z-10 transition-colors duration-300">

      {/* WHY SK SMART INVESTMENTS - Directly below the hero section */}
      <EditorialTrustValues values={values} />

      {/* Counters Stats Strip */}
      <PremiumEditorialStats stats={stats} />

      {/* Educational Section: What is Insurance & Types */}
      <StickyStackedCards />

      {/* 4-Step Process Section: How It Works */}
      <HowItWorks />

      {/* Testimonials Strip */}
      <StaggerTestimonials testimonials={testimonials} />

      {/* Interactive Insurance Premium & SIP Calculator Section */}
      <section id="calculator" className="w-full min-h-screen lg:h-screen flex flex-col justify-center snap-start border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-neutral-950/40 overflow-hidden">
        <Calculator isEmbedded={true} />
      </section>

      </div>

      {/* ── Desktop Call Popup Modal ── */}
      <AnimatePresence>
        {showCallModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCallModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCallModal(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes className="text-sm" />
              </button>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-brand-accent flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm">
                <FaPhoneAlt />
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif] mb-1.5">
                Direct Call Consultation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-6">
                Connect instantly with our certified senior insurance advisor.
              </p>

              {/* Phone Number Display Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700/80 mb-6 flex flex-col items-center justify-center gap-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-neutral-400">
                  Senior Advisor Hotline
                </span>
                <span className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
                  +91 98407 23956
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available Now for Instant Consultation
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="tel:+919840723956"
                    className="py-3 px-4 rounded-xl bg-brand-accent text-neutral-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FaPhoneAlt className="text-xs" />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={handleCopyNumber}
                    className="py-3 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaCopy className="text-xs" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <a
                  href="https://wa.me/919840723956?text=Hi%2C%20I%20would%20like%20to%20book%20a%20free%20consultation%20call%20with%20SK%20Smart%20Investments."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setShowCallModal(false);
                    navigate('/appointment');
                  }}
                  className="py-2.5 px-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <FaCalendarAlt className="text-[11px]" />
                  <span>Or schedule a detailed 1-on-1 meeting</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Home;
