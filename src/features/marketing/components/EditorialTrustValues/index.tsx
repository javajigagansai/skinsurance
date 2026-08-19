import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBan, FaClock, FaPhoneAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

interface ValueCard {
  title: string;
  description: string;
  icon?: any;
  highlight?: boolean;
}

const defaultValues: ValueCard[] = [
  {
    title: 'No Spamming',
    description: "We will never spam you, it's a promise. Your peace of mind is our first priority",
    icon: FaBan,
    highlight: false
  },
  {
    title: 'Free Consultation',
    description: "30- 45 mins of your undivided attention is all we need , and it's free",
    icon: FaClock,
    highlight: false
  },
  {
    title: 'Talk or Meet',
    description: 'We let you choose , how and when to connect. We are ready when you are !',
    icon: FaPhoneAlt,
    highlight: false
  },
  {
    title: 'No Sales Only Advise',
    description: "Choose what's best, buy from us or anywhere else",
    icon: FaCheckCircle,
    highlight: false
  }
];

export const EditorialTrustValues = ({ values }: { values?: ValueCard[] }) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const displayValues = values && values.length >= 4 
    ? values
    : defaultValues;

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-screen flex flex-col justify-center snap-start bg-[#ffda0a] border-y border-black/10 py-12 sm:py-16 lg:py-20 relative overflow-hidden select-none"
    >
      {/* Subtle Ambient Decorative Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:20px_20px]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* ── Top Header Title ── */}
        <div className="w-full max-w-3xl mx-auto mb-10 sm:mb-14 text-center">
          {/* Main Section Headline: 100% Solid Black */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight text-black"
          >
            WHY SK SMART INVESTMENTS
          </motion.h2>
        </div>

        {/* ── 4 Feature Cards Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {displayValues.map((item, idx) => {
            const Icon = item.icon || FaBan;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 bg-white border-2 border-black/25 shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:border-black overflow-hidden group"
              >
                <div>
                  {/* Icon Badge in Deep Black with Yellow Icon */}
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-neutral-950 text-[#ffda0a] flex items-center justify-center text-xl shadow-lg mb-5 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="text-lg" />
                  </div>

                  {/* Title in Solid Black */}
                  <h3 className="relative z-10 text-lg sm:text-xl font-black text-black tracking-tight mb-2.5">
                    {item.title}
                  </h3>

                  {/* Description in Dark High-Contrast Text */}
                  <p className="relative z-10 text-xs sm:text-sm text-neutral-900 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Right Action Arrow */}
                <div className="relative z-10 mt-6 pt-4 border-t border-black/10 flex items-center justify-end text-neutral-950 font-black text-xs group-hover:translate-x-1 transition-transform">
                  <FaArrowRight className="text-xs" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EditorialTrustValues;