import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useTranslation } from '../../context/LanguageContext';
import { Button } from '../../components/ui/Button';
import { FaShieldAlt, FaHeartbeat, FaCar, FaUserShield, FaHandshake, FaAward, FaStar, FaTrophy, FaChevronDown, FaUsers, FaPhoneAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
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
      <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-center snap-start pt-24 pb-12 sm:pt-28 sm:pb-16 bg-slate-50 dark:bg-neutral-950 overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-accent/5 dark:bg-brand-accent/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Side: Interactive Pinterest-Style Stacked Card Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              {/* Pinterest-Style Stacked Card Carousel */}
              <PinterestCardCarousel />

              {/* Actions Bar */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  onClick={() => navigate('/appointment')}
                  className="px-9 py-4 rounded-2xl bg-brand-accent text-neutral-950 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5 cursor-pointer"
                >
                  <FaPhoneAlt className="text-xs" />
                  <span>Book a Free Call</span>
                </button>
              </div>


            </motion.div>

            {/* Right Side: Dynamic Insurance Flyers Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-6 w-full"
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
      <section id="calculator" className="w-full min-h-screen flex flex-col justify-center snap-start border-t border-black/5 dark:border-white/5 bg-neutral-50/50 dark:bg-neutral-950/40">
        <Calculator isEmbedded={true} />
      </section>



      </div>
    </div>
  );
};
export default Home;
