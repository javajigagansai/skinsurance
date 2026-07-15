import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../context/LanguageContext';
import { FaAward, FaCalendarAlt, FaShieldAlt, FaUsers, FaChartLine, FaRegClock, FaTimes, FaSearchPlus, FaHeartbeat, FaHome } from 'react-icons/fa';

export const About = () => {
  const [selectedAward, setSelectedAward] = useState(null);
  const { t } = useTranslation();

  const stats = [
    { label: 'Financial Advisory Experience', value: '22+ Years', icon: FaAward },
    { label: 'Kanchipuram HQ Opened', value: '07-04-2025', icon: FaCalendarAlt },
    { label: 'Happy Families Covered', value: '5,000+', icon: FaUsers },
    { label: 'Assets Under Management', value: '150Cr+', icon: FaChartLine }
  ];

  const [awards] = useState(() => {
    const saved = localStorage.getItem('about_awards');
    if (saved) return JSON.parse(saved);
    const defaults = [
      { title: 'Excellence in Financial Planning', desc: 'Recognized for outstanding client portfolio management and wealth creation advisory.', img: '/IMG-20260714-WA0061.jpg' },
      { title: 'Best Insurance Distributor', desc: 'Commended for seamless claim settlement support and strategic insurance guidance.', img: '/IMG-20260714-WA0062.jpg' },
      { title: 'Trusted Mutual Fund Advisory', desc: 'Honored for delivering goal-based growth and custom risk mitigation strategies.', img: '/IMG-20260714-WA0063.jpg' },
      { title: 'Financial Literacy Contributor', desc: 'Recognized for public education campaigns on investment strategies and retirement savings.', img: '/IMG-20260714-WA0064.jpg' }
    ];
    localStorage.setItem('about_awards', JSON.stringify(defaults));
    return defaults;
  });

  // Framer Motion staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 85,
        damping: 14
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
          {t('about_firm')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white mt-2">
          {t('about_hero_title')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {t('about_hero_subtitle')}
        </p>
      </div>

      {/* Main Info Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left text section */}
        <div className="space-y-6 text-left">
          <h2 className="text-2xl font-bold text-navy-950 dark:text-white border-l-4 border-gold-500 pl-3">
            {t('about_founders_title')}
          </h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            <p>
              {t('about_founder_story_1')}
            </p>
            <p>
              {t('about_founder_story_2')}
            </p>
            <p>
              {t('about_founder_story_3')}
            </p>
          </div>
        </div>

        {/* Right Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={idx} 
                className="glass-panel dark:glass-panel-gold rounded-2xl p-5 border border-slate-200/50 dark:border-white/5 text-center flex flex-col items-center justify-center space-y-3 hover:scale-105 transition-transform duration-300 shadow-md"
              >
                <div className="p-3 bg-navy-50 dark:bg-navy-900 rounded-xl text-gold-500">
                  <Icon className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-navy-950 dark:text-white">{st.value}</h3>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mt-1">{st.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Awards & Recognition Gallery */}
      <div className="space-y-8 text-center pt-8 border-t border-slate-200/50 dark:border-white/5">
        <div className="space-y-2">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
            {t('milestones_recognition')}
          </span>
          <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
            {t('award_winning_service')}
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {t('awards_desc')}
          </p>
        </div>

        {/* Staggered Animated Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
        >
          {awards.map((aw, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              onClick={() => setSelectedAward(aw)}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/5 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-zoom-in group relative"
            >
              {/* Image slot */}
              <div className="h-48 w-full bg-slate-100 dark:bg-navy-900 overflow-hidden relative flex items-center justify-center border-b border-slate-200/40 dark:border-white/5">
                <img 
                  src={aw.img} 
                  alt={aw.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Click Zoom Indicator Icon */}
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="p-2.5 bg-white/90 dark:bg-navy-900/90 rounded-full text-gold-500 shadow-md">
                    <FaSearchPlus className="text-sm" />
                  </span>
                </div>
              </div>

              {/* Text info */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-white dark:bg-navy-950/30">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wide">
                    {aw.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                    {aw.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Executive Leadership Section */}
      <div className="space-y-8 text-center pt-8 border-t border-slate-200/50 dark:border-white/5">
        <div className="space-y-2">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
            Our Leadership
          </span>
          <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
            Executive Leadership
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Meet the leaders guiding our strategic investments and underwriting advisory.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="glass-panel dark:glass-panel-gold rounded-3xl p-6 border border-slate-200/40 dark:border-white/5 flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-navy-900 border-2 border-gold-500 flex items-center justify-center text-gold-500 text-3xl font-extrabold font-serif shadow-lg">
              PG
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-950 dark:text-white">Prakash Gajendiran</h3>
              <p className="text-xs text-gold-500 font-bold uppercase tracking-widest mt-0.5">Managing Director</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Steering SK Smart Investments toward digital-first underwriting excellence with comprehensive insurance distribution networks.
            </p>
            <div className="text-xs space-y-1.5 text-slate-500 dark:text-slate-300 font-semibold pt-2 border-t border-slate-200/30 w-full">
              <p>📞 Phone: +91 98407 23956</p>
              <p>✉️ Email: Skinvestments2025@gmail.com</p>
              <p>📍 Office: # 104, MD Plaza, 1st Floor, West Raja Street, Kanchipuram - 631502.</p>
            </div>
          </div>
        </div>
      </div>

      {/* What is Insurance Section */}
      <div className="glass-panel dark:glass-panel-gold rounded-3xl p-8 sm:p-10 border border-slate-200/50 dark:border-white/5 space-y-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
            {t('fl_101')}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white mt-2">
            {t('what_is_ins_title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            {t('what_is_ins_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Card 1: What is Insurance */}
          <div className="p-5 bg-white dark:bg-navy-900/40 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="h-10 w-10 bg-rose-500/10 text-rose-500 rounded-xl flex items-center justify-center text-lg">
              <FaShieldAlt />
            </div>
            <h3 className="text-sm font-bold text-navy-950 dark:text-white">{t('card_1_title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('card_1_desc')}
            </p>
          </div>

          {/* Card 2: Health Cover */}
          <div className="p-5 bg-white dark:bg-navy-900/40 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="h-10 w-10 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center text-lg">
              <FaHeartbeat />
            </div>
            <h3 className="text-sm font-bold text-navy-950 dark:text-white">{t('card_2_title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('card_2_desc')}
            </p>
          </div>

          {/* Card 3: Life Insurance */}
          <div className="p-5 bg-white dark:bg-navy-900/40 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="h-10 w-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center text-lg">
              <FaAward />
            </div>
            <h3 className="text-sm font-bold text-navy-950 dark:text-white">{t('card_3_title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('card_3_desc')}
            </p>
          </div>

          {/* Card 4: Motor & General */}
          <div className="p-5 bg-white dark:bg-navy-900/40 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="h-10 w-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center text-lg">
              <FaHome />
            </div>
            <h3 className="text-sm font-bold text-navy-950 dark:text-white">{t('card_4_title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('card_4_desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Overlay */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 backdrop-blur-sm p-4 cursor-zoom-out" 
            onClick={() => setSelectedAward(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-3xl w-full bg-white dark:bg-navy-900 rounded-3xl overflow-hidden shadow-2xl p-4 border border-gold-400/20 text-left space-y-4 relative cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setSelectedAward(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer z-10"
              >
                <FaTimes />
              </button>

              <img 
                src={selectedAward.img} 
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow" 
                alt={selectedAward.title} 
              />
              <div className="px-2 pb-2">
                <h3 className="text-sm font-bold text-navy-950 dark:text-white uppercase tracking-wider">{selectedAward.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedAward.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default About;
