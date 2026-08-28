import React from 'react';
import { motion } from 'framer-motion';
import termHeroImg from '../../../../assets/term_insurance_hero_clean.png';

export const HeroFlyerCarousel = () => {
  return (
    <div className="relative w-full flex items-center justify-end select-none py-2 overflow-visible">
      {/* ── Frameless Naturally Blended Transparent Graphic (Extended to Right Corner) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[620px] sm:max-w-[720px] md:max-w-[800px] lg:max-w-[880px] xl:max-w-[1000px] 2xl:max-w-[1120px] flex items-center justify-end translate-x-0 sm:translate-x-2 lg:translate-x-6 xl:translate-x-10"
      >
        <img
          src={termHeroImg}
          alt="SK Smart Investments - Family Protection Shield"
          className="w-full h-auto object-contain object-right block transition-transform duration-700 ease-out hover:scale-[1.01]"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>
    </div>
  );
};

export default HeroFlyerCarousel;
