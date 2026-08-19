import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaShieldAlt, FaHandshake, FaUserShield, FaArrowRight } from 'react-icons/fa';

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
    highlight: true // Featured middle card
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
      className="w-full min-h-screen flex flex-col justify-center snap-start bg-[#ffda0a] border-y border-black/10 py-12 sm:py-16 lg:py-20 relative overflow-hidden select-none"
    >
      {/* Subtle Ambient Decorative Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:20px_20px]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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

        {/* ── 3 Feature Cards Row ── */}
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
                className={`relative rounded-[2rem] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 bg-white border-2 ${
                  isFeatured
                    ? 'border-black shadow-[0_20px_45px_rgba(0,0,0,0.18)] ring-4 ring-black/10'
                    : 'border-black/25 shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:border-black'
                } overflow-hidden group`}
              >
                <div>
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