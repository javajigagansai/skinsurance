import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const defaultTestimonials = [
  {
    testimonial: "SK Smart Investments helped us find the right family health plan with zero hidden clauses. When my father was admitted, cashless claim was approved in under 45 minutes!",
    by: "Ramesh Sundaram, Chennai, Tamil Nadu",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    testimonial: "Comparing Tata AIA and HDFC Life with their advisor gave me complete clarity. The term insurance process was 100% paperless and transparent.",
    by: "Ananya Deshmukh, Bangalore, Karnataka",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    testimonial: "I started a monthly SIP portfolio tailored to my retirement goal. Clear risk explanations, disciplined rebalancing, and great monthly tracking.",
    by: "Karthik Raja, Coimbatore, Tamil Nadu",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    testimonial: "Their advisory team assisted our logistics firm with corporate group health cover. Quick onboarding and very responsive support.",
    by: "Venkatesh Rao, Hyderabad, Telangana",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  },
  {
    testimonial: "Switching my old health policy to a comprehensive top-up plan was so seamless. They preserved all my waiting period credits without hassle.",
    by: "Priya Menon, Kochi, Kerala",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    testimonial: "Super professional guidance! No aggressive sales pitch, only pure data and customized recommendations suited to my budget.",
    by: "Deepak Sharma, Mumbai, Maharashtra",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  }
];

export const StaggerTestimonials = ({ testimonials = defaultTestimonials }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Mouse cursor position driven translation
  const cursorX = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { damping: 30, stiffness: 150 });

  if (!testimonials || testimonials.length === 0) return null;

  const handleMouseMove = (e) => {
    if (!containerRef.current || isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percentage = relativeX / rect.width; // 0 to 1
    // Moving cursor LEFT shifts track LEFT (-), moving cursor RIGHT shifts track RIGHT (+)
    const targetOffset = (percentage - 0.5) * 800;
    cursorX.set(targetOffset);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      cursorX.set(0);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center snap-start py-12 sm:py-16 lg:py-20 border-t border-black/5 dark:border-white/5 bg-transparent transition-colors duration-300 overflow-hidden select-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-black uppercase leading-tight">
          WHAT OUR CLIENTS SAY
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
          Move your cursor or drag across to explore client stories
        </p>
      </div>

      {/* Interactive Cursor Parallax & Drag Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full flex overflow-hidden py-4 cursor-grab active:cursor-grabbing"
      >
        {/* Soft edge gradient fades */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-neutral-1000 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-neutral-1000 to-transparent z-20 pointer-events-none" />

        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -1000, right: 1000 }}
          dragElastic={0.15}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{ x: smoothCursorX }}
          className="flex gap-6 shrink-0 px-8 py-2"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 w-[300px] sm:w-[380px] p-7 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/90 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-brand-accent/60 transition-colors duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] pointer-events-auto"
            >
              <div>
                <FaQuoteLeft className="text-brand-accent text-xl mb-4 opacity-90" />
                <p className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-[15px] font-medium leading-relaxed mb-6">
                  "{testimonial.testimonial}"
                </p>
              </div>
              
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 dark:border-white/5">
                {testimonial.imgSrc && (
                  <img
                    src={testimonial.imgSrc}
                    alt={testimonial.by}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-white/10"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-neutral-900 dark:text-white leading-tight truncate">
                    {testimonial.by.split(',')[0]}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-tight truncate">
                    {testimonial.by.split(',').slice(1).join(',').trim()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default StaggerTestimonials;
