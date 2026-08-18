import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaShieldAlt, FaHandshake, FaUserShield } from 'react-icons/fa';

interface ValueCard {
  title: string;
  description: string;
  icon?: any;
  highlight?: boolean;
}

const defaultValues: ValueCard[] = [
  {
    title: 'Flexible Advisory',
    description: 'Choose between comprehensive life, health, motor, and SIP investment plans with zero commission bias. Learn and decide at your own pace.',
    icon: FaShieldAlt,
    highlight: false
  },
  {
    title: 'Verified Insurers',
    description: 'All policies are backed by IRDAI-licensed top institutions including Tata AIA, HDFC Life, SBI Life, and Star Health. Protect your family with confidence.',
    icon: FaHandshake,
    highlight: true // Featured middle card with glow border
  },
  {
    title: 'Personalized Sessions',
    description: 'One-on-one advisory attention tailored to your family goals and health history. Get dedicated cashless claim assistance whenever you need.',
    icon: FaUserShield,
    highlight: false
  }
];

export const EditorialTrustValues = ({ values }: { values?: ValueCard[] }) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const displayValues = values && values.length >= 3 
    ? values.slice(0, 3).map((v, i) => ({ ...v, highlight: i === 1 }))
    : defaultValues;

  return (
    <section 
      ref={containerRef} 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-b border-[#152150]/10 dark:border-white/5 bg-transparent transition-colors duration-300"
    >
      
      {/* ── Top Header Badge & Title ── */}
      <div className="w-full max-w-3xl mx-auto mb-10 sm:mb-14 text-center space-y-3">
        
        {/* Pill Badge in #ffda0a Yellow with #152150 Navy Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ffda0a]/20 border border-[#ffda0a] text-[#152150] dark:text-[#ffda0a] text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] shadow-xs"
        >
          <span className="text-xs text-[#ffda0a] dark:text-[#ffda0a]">✨</span>
          <span>OUR FOUNDATION & PROMISE</span>
        </motion.div>

        {/* Main Section Headline with Vibrant Gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight"
        >
          <span className="text-[#152150] dark:text-white">WHY </span>
          <span className="bg-gradient-to-r from-amber-500 via-[#ffda0a] to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,218,10,0.4)]">
            SK SMART INVESTMENTS
          </span>
        </motion.h2>

        {/* Subtitle in Navy-tinted neutral */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xs sm:text-sm md:text-base text-[#152150]/80 dark:text-neutral-300 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Empowering families with transparent advisory, multi-provider choice, and dedicated support.
        </motion.p>
      </div>

      {/* ── 3 Feature Cards Row in Yellow Background Pattern with Black Text ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {displayValues.map((item, idx) => {
          const Icon = item.icon || FaShieldAlt;
          const isFeatured = item.highlight || idx === 1;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className={`relative rounded-[2rem] p-7 sm:p-9 flex flex-col justify-start transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-[#ffdf1b] via-[#ffd500] to-[#f4b800] border-2 ${
                isFeatured
                  ? 'border-neutral-950 shadow-[0_18px_45px_rgba(245,184,0,0.45)] ring-4 ring-black/10'
                  : 'border-black/20 shadow-[0_12px_35px_rgba(245,184,0,0.3)] hover:border-black/50'
              } overflow-hidden group`}
            >
              {/* Subtle Decorative Pattern Background */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:16px_16px]" 
              />
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/30 rounded-full blur-2xl pointer-events-none" />

              {/* Icon Badge in Deep Black with Yellow Icon */}
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-neutral-950 text-[#ffda0a] flex items-center justify-center text-xl shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110">
                <Icon className="text-lg" />
              </div>

              {/* Title in Solid Black */}
              <h3 className="relative z-10 text-xl font-black text-black tracking-tight mb-3">
                {item.title}
              </h3>

              {/* Description in Dark High-Contrast Text */}
              <p className="relative z-10 text-sm text-neutral-900 leading-relaxed font-semibold">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default EditorialTrustValues;