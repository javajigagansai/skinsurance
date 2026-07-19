import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../context/LanguageContext';
import { Button } from '../../components/ui/Button';
import { FaShieldAlt, FaHeartbeat, FaCar, FaUserShield, FaHandshake, FaAward, FaStar } from 'react-icons/fa';
import { PLANS } from '../../services/mockData';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [monthlyInvest, setMonthlyInvest] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(10);
  const [partnerFilter, setPartnerFilter] = useState('ALL');

  // Highlight only top 3 popular plans
  const featuredPlans = PLANS.slice(0, 3);

  const partnerBrands = [
    { name: 'Tata AIA', type: 'Life', logo: '/logos/tata_aia.png', onlineLogo: '' },
    { name: 'ICICI Prudential', type: 'Life', logo: '/logos/icici_prudential.png', onlineLogo: '' },
    { name: 'HDFC Life', type: 'Life', logo: '/logos/hdfc_life.png', onlineLogo: '' },
    { name: 'SBI Life', type: 'Life', logo: '/logos/sbi_life.png', onlineLogo: 'https://logo.clearbit.com/sbilife.co.in' },
    { name: 'Bajaj Allianz', type: 'General', logo: '/logos/bajaj_allianz.png', onlineLogo: 'https://logo.clearbit.com/bajajallianz.com' },
    { name: 'Axis Max', type: 'Life', logo: '/logos/axis_max.png', onlineLogo: 'https://logo.clearbit.com/maxlifeinsurance.com' },
    { name: 'Policybazaar', type: 'Aggregator', logo: '/logos/policybazaar.png', onlineLogo: 'https://logo.clearbit.com/policybazaar.com' },
    { name: 'AE Alliance', type: 'General', logo: '/logos/ae_alliance.png', onlineLogo: '' },
    { name: 'Niva Bupa', type: 'Health', logo: '/logos/niva_bupa.png', onlineLogo: 'https://logo.clearbit.com/nivabupa.com' },
    { name: 'LIC India', type: 'Life', logo: '/logos/lic.png', onlineLogo: 'https://logo.clearbit.com/licindia.in' },
    { name: 'ManipalCigna', type: 'Health', logo: '/logos/manipal_cigna.png', onlineLogo: 'https://logo.clearbit.com/manipalcigna.com' },
    { name: 'Care Health', type: 'Health', logo: '/logos/care_health.png', onlineLogo: 'https://logo.clearbit.com/careinsurance.com' },
    { name: 'Star Health', type: 'Health', logo: '/logos/star_health.png', onlineLogo: 'https://logo.clearbit.com/starhealth.in' },
    { name: 'Oriental Insurance', type: 'General', logo: '/logos/oriental_insurance.png', onlineLogo: 'https://logo.clearbit.com/orientalinsurance.org.in' }
  ];

  const handleImageError = (e, b) => {
    if (e.target.src.includes('clearbit')) {
      e.target.src = b.logo;
    } else {
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'block';
    }
  };

  const stats = [
    { number: '98.7%', label: t('claims_rate') },
    { number: '₹420M+', label: t('claims_disbursed') },
    { number: '150,000+', label: t('clients_protected') },
    { number: '4.9 / 5', label: t('avg_rating') }
  ];

  const values = [
    {
      title: 'Digital-First Simplicity',
      description: 'Scans, quotes, and payouts managed seamlessly via client portals with instant status tracker feeds.',
      icon: FaUserShield
    },
    {
      title: 'Underwriting Integrity',
      description: 'Transparent calculators reflecting genuine actuarial risk tables with zero surprise charges.',
      icon: FaHandshake
    },
    {
      title: 'Award-Winning Underwriting',
      description: 'Highly commended boutique operations recognized globally for custom risk modeling options.',
      icon: FaAward
    }
  ];

  const testimonials = [
    {
      quote: "I am grateful for the opportunity to complete my internship with this organization. During this internship, I gained valuable knowledge about the insurance industry, customer relationship management, and financial planning. The mentors and staff members were supportive and guided me throughout.",
      author: "Harini Harini",
      role: "1 review • a month ago"
    },
    {
      quote: "My internship at sk smart investment company was a valuable learning experience. I improved my communication skill, learned about insurance products and gained practical knowledge about the corporate work environment.",
      author: "Dhivya Kumaran",
      role: "1 review • a month ago"
    },
    {
      quote: "The mentors and staff members were supportive and guided me throughout the internship, which made the learning experience more comfortable and effective.",
      author: "Manimozhi E",
      role: "1 review • a month ago"
    }
  ];

  return (
    <div className="relative">
      {/* Full-width Fixed Background Video Banner at the Top */}
      <section className="relative w-full h-screen overflow-hidden">
        <video 
          className="fixed top-0 left-0 w-full h-screen object-cover -z-20 pointer-events-none" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/hero_background.mp4" type="video/mp4" />
        </video>


      </section>

      {/* Parallax Content Overlay Wrap - Scrolls up over the fixed video */}
      <div className="relative bg-white dark:bg-navy-950 z-10 pt-16 pb-0 space-y-24 border-t border-slate-200/50 dark:border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.4)]">
        {/* Hero Text & Table Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-left"
          >
            <span className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full border border-gold-500/20 animate-pulse">
              {t('securing_legacies')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-navy-950 dark:text-white">
              {t('hero_title')}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="gold" size="lg" onClick={() => navigate('/calculator')}>
                {t('hero_cta_calc')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-navy-950 text-navy-950 hover:bg-navy-950/10 dark:border-white dark:text-white dark:hover:bg-white/10" 
                onClick={() => navigate('/plans')}
              >
                {t('hero_cta_plans')}
              </Button>
            </div>
          </motion.div>

          {/* Right: Glassmorphic Guarantee Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel dark:glass-panel-gold rounded-3xl p-6 sm:p-8 space-y-6 max-w-md mx-auto text-navy-950 dark:text-white border border-slate-200/50 dark:border-white/5 shadow-xl"
          >
            <div className="flex items-center space-x-2 text-gold-500">
              <FaShieldAlt className="text-2xl" />
              <h3 className="text-lg font-bold">SK Smart Guarantee</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-left">
              Get an instant coverage recommendation based on standard variables. Try our simple risk assessment.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs py-2.5 border-b border-slate-200/50 dark:border-white/5">
                <span className="text-slate-400">Claims Decision Period</span>
                <span className="font-semibold text-right text-navy-950 dark:text-slate-200">&lt; 24 Hours</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2.5 border-b border-slate-200/50 dark:border-white/5">
                <span className="text-slate-400">Cashless Garages & Hospitals</span>
                <span className="font-semibold text-right text-navy-950 dark:text-slate-200">15,000+ Worldwide</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2.5 border-b border-slate-200/50 dark:border-white/5">
                <span className="text-slate-400">Multi-policy Savings Discount</span>
                <span className="font-bold text-gold-500 text-right">Up to 20% Off</span>
              </div>
            </div>

            <Button variant="gold" className="w-full" onClick={() => navigate('/calculator')}>
              Estimate My Policy
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Counters Stats Strip */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel dark:glass-panel-gold rounded-3xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 shadow-xl">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white gold-gradient-text">
                {stat.number}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Section: What is Insurance & Types */}
      <section className="max-w-7xl mx-auto px-4 py-8 text-left space-y-12">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
            {t('fl_101')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
            {t('what_is_ins_title')}
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            {t('what_is_ins_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <div className="p-3 bg-navy-500/10 text-navy-950 dark:text-white rounded-xl inline-block">
              <FaShieldAlt className="text-xl text-gold-500" />
            </div>
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">{t('card_1_title')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('card_1_desc')}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <div className="p-3 bg-navy-500/10 text-navy-950 dark:text-white rounded-xl inline-block">
              <FaHeartbeat className="text-xl text-gold-500" />
            </div>
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">{t('card_2_title')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('card_2_desc')}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <div className="p-3 bg-navy-500/10 text-navy-950 dark:text-white rounded-xl inline-block">
              <FaUserShield className="text-xl text-gold-500" />
            </div>
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">{t('card_3_title')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('card_3_desc')}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <div className="p-3 bg-navy-500/10 text-navy-950 dark:text-white rounded-xl inline-block">
              <FaCar className="text-xl text-gold-500" />
            </div>
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">{t('card_4_title')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('card_4_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Trust Values Section */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <div className="text-center">
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full">
            Our Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white mt-2">
            Why SK Smart is Chosen by Global Executives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300 border border-slate-200/40 dark:border-white/5 group"
              >
                <div className="p-3 bg-navy-50 dark:bg-navy-900 text-gold-500 rounded-xl inline-block group-hover:scale-110 transition-transform">
                  <Icon className="text-xl" />
                </div>
                <h3 className="text-base font-bold text-navy-950 dark:text-white">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trusted Insurance Partners Section */}
      <section className="py-12 border-t border-slate-200/50 dark:border-white/5 overflow-hidden">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 text-center mb-6">
          <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full">
            Authorized Distribution Partners
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white mt-2">
            Trusted by India's Leading Insurance Providers
          </h2>
        </div>

        {/* Scrolling Container */}
        <div className="relative w-full overflow-hidden py-6 bg-slate-50/50 dark:bg-navy-950/30 border-y border-slate-200/40 dark:border-white/5">
          {/* Left/Right fading gradients to look premium */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 dark:from-navy-955 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 dark:from-navy-955 to-transparent z-10 pointer-events-none" />

          {/* Marquee Inner Flex */}
          <div className="animate-marquee gap-8 items-center flex">
            {/* First Set of Logos */}
            {partnerBrands.map((b, idx) => (
              <div 
                key={`p1-${idx}`} 
                className="flex flex-col items-center justify-center p-3 bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-white/5 h-20 w-44 shrink-0 transition-all duration-300 hover:scale-105 hover:border-gold-500/50 dark:hover:border-gold-400/30 group"
              >
                <div className="flex-1 flex items-center justify-center w-full overflow-hidden p-1 bg-white rounded-lg">
                  <img 
                    src={b.onlineLogo || b.logo} 
                    alt={b.name} 
                    className="max-h-11 max-w-full object-contain grayscale opacity-60 dark:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                    onError={(e) => handleImageError(e, b)}
                  />
                </div>
                <span className="text-[6px] font-extrabold text-gold-500 uppercase tracking-widest mt-1 opacity-75 group-hover:text-navy-950 dark:group-hover:text-gold-400 transition-colors shrink-0">{b.type}</span>
              </div>
            ))}
            {/* Second Set of Logos (duplicate for seamless loop) */}
            {partnerBrands.map((b, idx) => (
              <div 
                key={`p2-${idx}`} 
                className="flex flex-col items-center justify-center p-3 bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-white/5 h-20 w-44 shrink-0 transition-all duration-300 hover:scale-105 hover:border-gold-500/50 dark:hover:border-gold-400/30 group"
              >
                <div className="flex-1 flex items-center justify-center w-full overflow-hidden p-1 bg-white rounded-lg">
                  <img 
                    src={b.onlineLogo || b.logo} 
                    alt={b.name} 
                    className="max-h-11 max-w-full object-contain grayscale opacity-60 dark:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                    onError={(e) => handleImageError(e, b)}
                  />
                </div>
                <span className="text-[6px] font-extrabold text-gold-500 uppercase tracking-widest mt-1 opacity-75 group-hover:text-navy-950 dark:group-hover:text-gold-400 transition-colors shrink-0">{b.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plans Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <div className="text-center">
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full">
            Tailored Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white mt-2">
            Explore Featured Insurance Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPlans.map((plan) => (
            <div
              key={plan.id}
              className="glass-panel rounded-3xl p-6 flex flex-col justify-between border border-slate-200/40 dark:border-white/5 relative overflow-hidden group hover:shadow-xl transition-all"
            >
              {plan.badge && (
                <span className="absolute top-4 right-4 bg-gold-400 text-navy-950 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              
              <div className="space-y-4 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded">
                  {plan.category}
                </span>
                <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[48px]">
                  {plan.description}
                </p>
                <div className="pt-2">
                  <p className="text-slate-400 text-[10px] uppercase font-bold leading-none">Starting from</p>
                  <p className="text-navy-950 dark:text-white font-extrabold text-2xl mt-1">
                    ₹{plan.premiumMonthly}<span className="text-xs font-normal text-slate-500"> / month</span>
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  variant="gold"
                  className="w-full"
                  onClick={() => navigate('/calculator')}
                >
                  Configure & Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive SIP Calculator */}
      <section className="max-w-7xl mx-auto px-4 py-8 text-left space-y-12">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
            {t('fl_101')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
            {t('sip_title')}
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            {t('sip_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sliders Container (2 cols) */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200/40 dark:border-white/5 space-y-6">
            {/* Monthly Investment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">{t('sip_monthly')}</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                  <input 
                    type="number"
                    value={monthlyInvest}
                    onChange={(e) => setMonthlyInvest(Math.max(500, Number(e.target.value)))}
                    className="w-28 pl-6 pr-2 py-1 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg text-right font-bold text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
              <input 
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyInvest}
                onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-navy-900 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>₹500</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Expected Return Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">{t('sip_rate')}</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Math.max(1, Number(e.target.value)))}
                    className="w-20 pr-5 pl-2 py-1 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg text-right font-bold text-xs focus:outline-none focus:border-gold-500"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-navy-900 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Time Period */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">{t('sip_period')}</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                    className="w-24 pr-8 pl-2 py-1 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg text-right font-bold text-xs focus:outline-none focus:border-gold-500"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold">Years</span>
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-navy-900 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>1 Year</span>
                <span>40 Years</span>
              </div>
            </div>
          </div>

          {/* Results Summary (1 col) */}
          <div className="glass-panel-gold rounded-3xl p-6 border border-gold-300/35 flex flex-col justify-between text-navy-950 dark:text-white relative overflow-hidden">
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider">{t('sip_summary')}</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-navy-900/10 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-300">{t('sip_invested')}</span>
                  <span className="font-bold">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(monthlyInvest * years * 12)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-navy-900/10 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-300">{t('sip_est_returns')}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    +{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
                      (monthlyInvest * ((Math.pow(1 + ((expectedReturn / 100) / 12), years * 12) - 1) / ((expectedReturn / 100) / 12)) * (1 + ((expectedReturn / 100) / 12))) - (monthlyInvest * years * 12)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-500 dark:text-slate-300 font-semibold">{t('sip_total_value')}</span>
                  <span className="font-extrabold text-xl text-gold-500">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
                      monthlyInvest * ((Math.pow(1 + ((expectedReturn / 100) / 12), years * 12) - 1) / ((expectedReturn / 100) / 12)) * (1 + ((expectedReturn / 100) / 12))
                    )}
                  </span>
                </div>
              </div>

              {/* Progress bar comparison */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase">
                  <span>{t('sip_invested').split(' ')[0]}</span>
                  <span>Returns</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-navy-900 rounded-full flex overflow-hidden">
                  <div 
                    style={{ width: `${((monthlyInvest * years * 12) / (monthlyInvest * ((Math.pow(1 + ((expectedReturn / 100) / 12), years * 12) - 1) / ((expectedReturn / 100) / 12)) * (1 + ((expectedReturn / 100) / 12)))) * 100}%` }}
                    className="h-full bg-navy-800 dark:bg-navy-700" 
                  />
                  <div 
                    style={{ width: `${(((monthlyInvest * ((Math.pow(1 + ((expectedReturn / 100) / 12), years * 12) - 1) / ((expectedReturn / 100) / 12)) * (1 + ((expectedReturn / 100) / 12))) - (monthlyInvest * years * 12)) / (monthlyInvest * ((Math.pow(1 + ((expectedReturn / 100) / 12), years * 12) - 1) / ((expectedReturn / 100) / 12)) * (1 + ((expectedReturn / 100) / 12)))) * 100}%` }}
                    className="h-full bg-gold-500" 
                  />
                </div>
              </div>
            </div>

            <Button variant="gold" className="w-full py-2.5 font-bold mt-6" onClick={() => navigate('/calculator')}>
              {t('sip_cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Strip */}
      <section className="bg-navy-950 py-16 text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Reviews</span>
            <h2 className="text-2xl sm:text-3xl font-bold">{t('reviews_title')}</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {t('reviews_subtitle')}
            </p>
            <div className="flex justify-center space-x-1 pt-1 text-gold-400 text-sm">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-navy-900/60 border border-white/5 rounded-2xl p-6 text-left space-y-4 flex flex-col justify-between">
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-white/5">
                  <h4 className="text-xs font-bold text-white">{t.author}</h4>
                  <p className="text-[10px] text-slate-500 mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};
export default Home;
