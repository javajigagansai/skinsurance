import React, { useRef } from 'react';
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
  progressPercent: number;
}

const STEPS: Step[] = [
  {
    step: '01',
    title: 'Tell Us Your Needs',
    desc: 'Share your family goals, coverage expectations, or medical history through a quick consultation or simple online form.',
    icon: FaClipboardList,
    tag: 'Discovery',
    progressPercent: 25
  },
  {
    step: '02',
    title: 'Compare Suitable Plans',
    desc: 'We analyze top-rated policies across IRDAI-approved partners (Tata AIA, HDFC Life, Star Health) with zero commission bias.',
    icon: FaBalanceScale,
    tag: 'Comparison',
    progressPercent: 50
  },
  {
    step: '03',
    title: 'Choose Your Protection',
    desc: 'Select the optimal plan with transparent terms, clear exclusions, and 100% paperless digital onboarding.',
    icon: FaShieldAlt,
    tag: 'Selection',
    progressPercent: 75
  },
  {
    step: '04',
    title: 'We Support You After Purchase',
    desc: 'Enjoy lifetime dedicated claim assistance, cashless hospital coordination, annual portfolio reviews, and renewal support.',
    icon: FaHeadset,
    tag: 'Lifetime Care',
    progressPercent: 100
  }
];

export const HowItWorks = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-center snap-start py-6 sm:py-8 lg:py-6 border-t border-black/5 dark:border-white/5 bg-slate-50 dark:bg-neutral-950 transition-colors duration-300 overflow-hidden font-sans"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-center">
        
        {/* ── Section Header ── */}
        <div className="w-full max-w-3xl mx-auto mb-4 sm:mb-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif]"
          >
            HOW IT WORKS
          </motion.h2>
        </div>

        {/* ── 4-Step Process Flow Grid ── */}
        <div className="relative">
          
          {/* Desktop Connecting Line behind cards */}
          <div className="hidden lg:block absolute top-8 left-10 right-10 h-0.5 bg-slate-200 dark:bg-neutral-800 z-0 rounded-full" />
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-8 left-10 right-10 h-0.5 bg-gradient-to-r from-amber-400 via-brand-accent to-amber-500 z-0 origin-left rounded-full shadow-[0_0_10px_rgba(255,218,10,0.5)]" 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-4 relative z-10">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="relative rounded-2xl p-4 sm:p-5 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex flex-col justify-between group hover:border-brand-accent/50 dark:group-hover:border-brand-accent/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all duration-300 overflow-hidden cursor-default min-h-[200px] lg:min-h-[220px]"
                >
                  {/* Top Ambient Hover Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex flex-col h-full justify-between">
                    {/* Top Row: Number Node Badge & Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-brand-accent/40 blur-md opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                        <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-brand-accent to-amber-400 text-neutral-950 font-black text-xs flex items-center justify-center shadow-xs border border-white dark:border-neutral-900 group-hover:scale-110 transition-transform duration-300 font-['Plus_Jakarta_Sans',sans-serif]">
                          {item.step}
                        </div>
                      </div>

                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-amber-800 dark:text-brand-accent px-2.5 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 font-['Plus_Jakarta_Sans',sans-serif]">
                        {item.tag}
                      </span>
                    </div>

                    {/* Icon & Content */}
                    <div className="space-y-2 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-neutral-800 text-neutral-900 dark:text-brand-accent text-base flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-brand-accent group-hover:text-neutral-950 transition-all duration-300">
                        <Icon />
                      </div>

                      <h3 className="text-sm sm:text-base font-extrabold text-neutral-950 dark:text-white tracking-tight leading-snug font-['Plus_Jakarta_Sans',sans-serif] group-hover:text-amber-800 dark:group-hover:text-brand-accent transition-colors duration-200">
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

        {/* ── Bottom Reassurance CTA Strip: Zero Hidden Charges • IRDAI Compliant ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-4 sm:mt-5 p-4 sm:p-5 rounded-2xl bg-neutral-950 text-white border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
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
            <p className="text-[11px] sm:text-xs text-neutral-400 font-medium">
              Talk to certified advisors for transparent policy audits and tailored family protection blueprints.
            </p>
          </div>

          <Link
            to="/appointment"
            className="shrink-0 px-6 py-3 rounded-xl bg-brand-accent text-neutral-950 font-black text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer relative z-10"
          >
            <FaPhoneAlt className="text-xs" />
            <span>Book a Free Call</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;

