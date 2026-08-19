import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaClipboardList, 
  FaBalanceScale, 
  FaShieldAlt, 
  FaHeadset, 
  FaArrowRight, 
  FaPhoneAlt 
} from 'react-icons/fa';

interface Step {
  step: string;
  title: string;
  desc: string;
  icon: any;
  tag: string;
}

const STEPS: Step[] = [
  {
    step: '01',
    title: 'Tell Us Your Needs',
    desc: 'Share your family goals, coverage expectations, or medical history through a quick consultation or simple online form.',
    icon: FaClipboardList,
    tag: 'Discovery'
  },
  {
    step: '02',
    title: 'Compare Suitable Plans',
    desc: 'We analyze top-rated policies across IRDAI-approved partners (Tata AIA, HDFC Life, Star Health) with zero commission bias.',
    icon: FaBalanceScale,
    tag: 'Comparison'
  },
  {
    step: '03',
    title: 'Choose Your Protection',
    desc: 'Select the optimal plan with transparent terms, clear exclusions, and 100% paperless digital onboarding.',
    icon: FaShieldAlt,
    tag: 'Selection'
  },
  {
    step: '04',
    title: 'We Support You After Purchase',
    desc: 'Enjoy lifetime dedicated claim assistance, cashless hospital coordination, annual portfolio reviews, and renewal support.',
    icon: FaHeadset,
    tag: 'Lifetime Care'
  }
];

export const HowItWorks = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center snap-start py-12 sm:py-16 lg:py-20 border-t border-black/5 dark:border-white/5 bg-slate-50/70 dark:bg-neutral-950/60 transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-accent/5 dark:bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="w-full max-w-3xl mx-auto mb-10 sm:mb-14 text-center space-y-3">

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight"
          >
            HOW IT <span className="text-brand-accent">WORKS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >

          </motion.p>
        </div>

        {/* ── 4-Step Process Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ duration: 0.5, delay: 0.15 * idx }}
                className="relative rounded-3xl p-7 sm:p-8 bg-white dark:bg-neutral-900/90 border border-slate-200/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between group hover:-translate-y-2 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Top Row: Step Number & Tag */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-brand-accent text-neutral-950 font-black text-sm flex items-center justify-center shadow-xs">
                    {item.step}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    {item.tag}
                  </span>
                </div>

                {/* Center Content: Icon, Title & Description */}
                <div className="space-y-3 relative z-10 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-neutral-800 text-neutral-900 dark:text-brand-accent text-xl flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-neutral-950 transition-all duration-300">
                    <Icon />
                  </div>

                  <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight pt-1">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between relative z-10">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-neutral-400 uppercase tracking-widest">
                    Step {idx + 1} of 4
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-neutral-950 group-hover:bg-brand-accent transition-all duration-300">
                    <FaArrowRight className="text-[10px]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Reassurance CTA Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-neutral-950 text-white border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <span className="text-brand-accent">Zero Hidden Charges.</span> No Commission Pressure.
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">
              Talk to a certified advisor today and get a personalized, multi-insurer comparison in minutes.
            </p>
          </div>

          <Link
            to="/appointment"
            className="shrink-0 px-8 py-3.5 rounded-2xl bg-brand-accent text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <FaPhoneAlt className="text-xs" />
            <span>Book a Free Call</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
