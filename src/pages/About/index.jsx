import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAward, FaCalendarAlt, FaShieldAlt, FaUsers, FaChartLine, FaRegClock, FaTimes, FaSearchPlus } from 'react-icons/fa';

export const About = () => {
  const [selectedAward, setSelectedAward] = useState(null);

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
          About Our Firm
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white mt-2">
          Securing Wealth, Empowering Futures
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          SK Smart Investments is a trusted financial services firm committed to helping individuals achieve their long-term financial goals through smart, objective planning.
        </p>
      </div>

      {/* Main Info Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left text section */}
        <div className="space-y-6 text-left">
          <h2 className="text-2xl font-bold text-navy-950 dark:text-white border-l-4 border-gold-500 pl-3">
            Our Founders & Story
          </h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            <p>
              <strong className="text-navy-950 dark:text-gold-400">SK Smart Investments</strong>, a trusted financial service, is helping individuals achieve their financial goals through smart investments. Founded by <strong className="text-navy-950 dark:text-gold-400">PRAKASH & KUMUTHA</strong>, Certified Financial Planner and Distributor, the company offers a range of services including Insurance, Mutual Fund investments, Retirement Planning, Tax Saving Solutions, and Health Insurance Planning.
            </p>
            <p>
              With a focus on goal-based financial planning, SK Smart Investments aims to provide wealth creation opportunities for its clients. The company has been actively engaging with its audience on Facebook & Instagram sharing valuable insights on investment strategies, tax planning, and financial literacy, emphasizing the importance of financial planning for long-term goals.
            </p>
            <p>
              SK Smart Investment's expertise in Insurance, mutual funds and financial planning has enabled it to build a strong reputation in the community. With its headquarters in <strong className="text-navy-950 dark:text-gold-400">Kanchipuram</strong>, the company is committed to providing personalized financial services to its clients. By leveraging its expertise and experience, SK Smart Investments aims to help individuals achieve financial freedom and security!
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
            Milestones & Recognition
          </span>
          <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
            Award-Winning Service
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Honored by financial institutions and communities. Click any certificate to zoom.
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
