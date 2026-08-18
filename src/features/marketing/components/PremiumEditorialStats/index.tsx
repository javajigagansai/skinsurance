import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaShieldAlt, FaUserShield, FaUsers, FaAward } from 'react-icons/fa';

const STAT_ICONS = [FaShieldAlt, FaUserShield, FaUsers, FaAward];

interface Stat {
  number?: string;
  label: string;
  icon?: any;
  size?: string;
}

export const PremiumEditorialStats = ({ stats }: { stats?: Stat[] }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const defaultStats: Stat[] = [
    { number: '98.7%', label: 'Claims Settlement Rate', icon: FaShieldAlt },
    { number: '₹420L+', label: 'Claims Disbursed', icon: FaUserShield },
    { number: '150,000+', label: 'Lives Secured', icon: FaUsers },
    { number: '4.9 / 5', label: 'Customer Rating', icon: FaAward }
  ];

  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-b border-black/5 dark:border-white/5 bg-transparent transition-colors duration-300">
      
      {/* Header Section */}
      <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 text-center space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="w-8 h-[1.5px] bg-brand-accent hidden sm:block"></span>
          <span className="text-[11px] sm:text-[12px] font-black text-brand-accent tracking-[0.25em] uppercase">
            OUR TRACK RECORD
          </span>
          <span className="w-8 h-[1.5px] bg-brand-accent hidden sm:block"></span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight"
        >
          A LEGACY MEASURED IN TRUST
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium"
        >
          Proven reliability with transparent claim settlements and lifelong advisory across Tamil Nadu.
        </motion.p>
      </div>

      {/* Perfectly Aligned 4-Column Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {displayStats.map((item, index) => {
          const Icon = item.icon || STAT_ICONS[index % STAT_ICONS.length];

          return (
            <div
              key={index}
              className="relative p-6 sm:p-8 rounded-3xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center group hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Icon Pill */}
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent text-xl mb-4 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-neutral-950 transition-all duration-300 shadow-xs">
                <Icon />
              </div>

              {/* Stat Number */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-brand-accent tracking-tight mb-2 tabular-nums">
                {item.number}
              </div>

              {/* Stat Label */}
              <p className="text-xs sm:text-sm font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider leading-snug">
                {item.label}
              </p>
            </div>
          );
        })}
      </motion.div>

    </section>
  );
};

export default PremiumEditorialStats;