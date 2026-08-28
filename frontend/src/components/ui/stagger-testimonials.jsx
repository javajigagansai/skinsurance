import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const checkScrollability = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollability);
    checkScrollability();
    return () => el.removeEventListener('scroll', checkScrollability);
  }, [checkScrollability]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = window.innerWidth < 640 ? 300 : 380;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    
    if (direction === 'left') {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Autoplay functionality with smooth pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scroll('right');
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center snap-start py-12 sm:py-16 lg:py-20 border-t border-black/5 dark:border-white/5 bg-transparent transition-colors duration-300 overflow-hidden select-none">
      
      {/* ── Section Header with Title ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 w-full text-center overflow-hidden">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif] w-full flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 md:gap-x-5 text-center">
          <span className="inline-block">WHAT</span>
          <span className="inline-block">OUR</span>
          <span className="inline-block">CLIENTS</span>
          <span className="inline-block">SAY</span>
        </h2>
      </div>

      {/* ── Interactive Horizontal Scroll Carousel Track ── */}
      <div 
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft Edge Gradient Fades */}
        <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 dark:from-neutral-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 dark:from-neutral-950 to-transparent z-20 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto scroll-smooth px-4 sm:px-8 lg:px-12 no-scrollbar py-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="shrink-0 w-[290px] sm:w-[370px] md:w-[390px] p-6 sm:p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-brand-accent/60 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] select-none"
            >
              <div>
                <FaQuoteLeft className="text-brand-accent text-xl mb-3 opacity-90" />
                <p className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-[14.5px] font-medium leading-relaxed mb-5">
                  "{testimonial.testimonial}"
                </p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                {testimonial.imgSrc && (
                  <img
                    src={testimonial.imgSrc}
                    alt={testimonial.by}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.by)}&background=random`;
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-neutral-900 dark:text-white leading-tight truncate">
                    {testimonial.by.split(',')[0]}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-tight truncate">
                    {testimonial.by.split(',').slice(1).join(',').trim() || 'Verified Client'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default StaggerTestimonials;

