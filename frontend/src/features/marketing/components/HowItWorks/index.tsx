import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaClipboardList, 
  FaBalanceScale, 
  FaShieldAlt, 
  FaHeadset, 
  FaArrowRight, 
  FaPhoneAlt,
  FaCheckCircle
} from 'react-icons/fa';

interface Step {
  step: string;
  title: string;
  desc: string;
  icon: any;
  tag: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  tagColor: string;
  badgeGradient: string;
}

const STEPS: Step[] = [
  {
    step: '01',
    title: 'Tell Us Your Needs',
    desc: 'Share your family goals, coverage expectations, or medical history through a quick consultation or simple online form.',
    icon: FaClipboardList,
    tag: 'Discovery',
    iconColor: 'text-sky-500 dark:text-sky-400',
    bgColor: 'bg-sky-500/10 dark:bg-sky-400/15',
    borderColor: 'border-sky-500/25',
    tagColor: 'text-sky-800 dark:text-sky-300 bg-sky-500/10 border-sky-500/20',
    badgeGradient: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sky-500/20'
  },
  {
    step: '02',
    title: 'Compare Suitable Plans',
    desc: 'We analyze top-rated policies across IRDAI-approved partners (Tata AIA, HDFC Life, Star Health) with zero commission bias.',
    icon: FaBalanceScale,
    tag: 'Comparison',
    iconColor: 'text-blue-500 dark:text-blue-400',
    bgColor: 'bg-blue-500/10 dark:bg-blue-400/15',
    borderColor: 'border-blue-500/25',
    tagColor: 'text-blue-800 dark:text-blue-300 bg-blue-500/10 border-blue-500/20',
    badgeGradient: 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-blue-500/20'
  },
  {
    step: '03',
    title: 'Choose Your Protection',
    desc: 'Select the optimal plan with transparent terms, clear exclusions, and 100% paperless digital onboarding.',
    icon: FaShieldAlt,
    tag: 'Selection',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10 dark:bg-emerald-400/15',
    borderColor: 'border-emerald-500/25',
    tagColor: 'text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    badgeGradient: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-emerald-500/20'
  },
  {
    step: '04',
    title: 'We Support You After Purchase',
    desc: 'Enjoy lifetime dedicated claim assistance, cashless hospital coordination, annual portfolio reviews, and renewal support.',
    icon: FaHeadset,
    tag: 'Lifetime Care',
    iconColor: 'text-purple-500 dark:text-purple-400',
    bgColor: 'bg-purple-500/10 dark:bg-purple-400/15',
    borderColor: 'border-purple-500/25',
    tagColor: 'text-purple-800 dark:text-purple-300 bg-purple-500/10 border-purple-500/20',
    badgeGradient: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-purple-500/20'
  }
];

export const HowItWorks = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-center snap-start py-6 sm:py-8 lg:py-6 border-t border-black/5 dark:border-white/5 bg-slate-50 dark:bg-neutral-950 transition-colors duration-300 overflow-hidden font-sans"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-center">
        
        {/* ── Section Header ── */}
        <div className="w-full mb-6 sm:mb-8 text-center overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[32px] sm:text-[46px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-extrabold tracking-normal [word-spacing:0.35em] sm:[word-spacing:0.45em] text-neutral-950 dark:text-white uppercase leading-none font-['Plus_Jakarta_Sans',sans-serif] w-full block text-center"
          >
            HOW IT WORKS
          </motion.h2>
        </div>

        {/* ── 4-Step Process Flow Grid ── */}
        <div className="relative">
          
          {/* Desktop Animated Connector Line */}
          <div className="hidden lg:block absolute top-8 left-10 right-10 h-0.5 bg-slate-200 dark:bg-neutral-800 z-0 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={isInView ? { x: '100%' } : { x: '-100%' }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.4)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-4 relative z-10">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = activeStep === idx;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`relative rounded-2xl p-4 sm:p-5 bg-white dark:bg-neutral-900 border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default min-h-[200px] lg:min-h-[220px] group ${
                    isHovered
                      ? 'border-neutral-400/80 dark:border-white/30 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.4)] scale-[1.015]'
                      : 'border-slate-200/80 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.25)]'
                  }`}
                >
                  <div className="flex flex-col h-full justify-between">
                    {/* Top Row: Number Node Badge & Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="relative">
                        <div className={`relative w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shadow-xs border transition-all duration-300 font-['Plus_Jakarta_Sans',sans-serif] ${item.badgeGradient} ${
                          isHovered ? 'scale-110' : ''
                        }`}>
                          {item.step}
                        </div>
                      </div>

                      <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full border transition-all duration-300 font-['Plus_Jakarta_Sans',sans-serif] ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    {/* Icon & Content */}
                    <div className="space-y-2 flex-1">
                      <div className={`w-9 h-9 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center text-base ${item.iconColor} shadow-2xs transition-all duration-300 group-hover:scale-110`}>
                        <Icon />
                      </div>

                      <h3 className="text-sm sm:text-base font-extrabold text-neutral-950 dark:text-white tracking-tight leading-snug font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200">
                        {item.title}
                      </h3>

                      <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal font-['Inter',sans-serif] line-clamp-3 sm:line-clamp-4">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Reassurance CTA Strip: Transparent Black / Grey Glass ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-4 sm:mt-5 p-4 sm:p-5 rounded-2xl bg-neutral-900/60 dark:bg-black/60 backdrop-blur-2xl text-white border border-neutral-700/40 dark:border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-0.5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 text-brand-accent text-[11px] font-black uppercase tracking-wider">
              <FaCheckCircle className="text-xs" />
              <span>Zero Hidden Charges • IRDAI Compliant</span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-white tracking-tight">
              Get an Unbiased, Multi-Partner Comparison in Minutes
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-300 font-medium">
              Talk to certified advisors for transparent policy audits and tailored family protection blueprints.
            </p>
          </div>

          <a
            href="tel:+919840723956"
            className="shrink-0 px-6 py-3 rounded-xl bg-brand-accent text-neutral-950 font-black text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer relative z-10"
          >
            <FaPhoneAlt className="text-xs" />
            <span>Call Us</span>
            <FaArrowRight className="text-[10px]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
