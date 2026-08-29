import React from 'react';
import { motion } from 'framer-motion';

export const OfficialInsurancePartners = ({ partners = [] }: { partners?: any[] }) => {
  // Duplicate the array to create a seamless infinite scrolling loop
  const logos = [...partners, ...partners];

  return (
    <section className="py-20 sm:py-24 overflow-hidden border-t border-white/5 bg-neutral-950 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 text-center">
        <span className="inline-block mb-3 text-xs font-black text-brand-accent tracking-[0.2em] uppercase font-['Plus_Jakarta_Sans',sans-serif]">
          // OUR NETWORK
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.025em] [word-spacing:0.26em] text-white uppercase leading-[1.15] font-['Plus_Jakarta_Sans',sans-serif]">
          Official Insurance Partners
        </h2>
      </div>
      
      <div className="relative w-full flex items-center justify-center overflow-hidden">
        <motion.div
          className="flex flex-nowrap items-center w-max gap-8 sm:gap-12 md:gap-16 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {logos.map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              className="flex shrink-0 items-center justify-center group"
            >
              <div className="bg-white px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center min-w-[140px] h-[75px] border border-white/10">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-9 sm:h-11 w-auto max-w-[150px] object-contain"
                  onError={(e) => {
                    if (partner.onlineLogo && !e.currentTarget.src.includes(partner.onlineLogo)) {
                      e.currentTarget.src = partner.onlineLogo;
                    } else {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                      }
                    }
                  }}
                />
                <span className="hidden text-neutral-900 font-black text-center text-xs px-2 leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Overlays for smooth edges on the infinite marquee */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export default OfficialInsurancePartners;
