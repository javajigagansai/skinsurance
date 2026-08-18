import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaChevronLeft, FaChevronRight, FaShieldAlt, FaArrowRight, 
  FaCheckCircle, FaStar, FaBolt, FaPhoneAlt, FaRegEye 
} from 'react-icons/fa';
import { getFlyers, DEFAULT_FLYERS } from '../../../../services/api';
import { subscribeToCollection } from '../../../../services/firebaseService';

export const HeroFlyerCarousel = () => {
  const [flyers, setFlyers] = useState(DEFAULT_FLYERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getFlyers().then(data => {
      if (data && data.length > 0) setFlyers(data.filter(f => f.status !== 'Closed'));
    });

    const unsubscribe = subscribeToCollection('flyers', (data) => {
      if (data && data.length > 0) setFlyers(data.filter(f => f.status !== 'Closed'));
    });

    return () => unsubscribe();
  }, []);

  // Smooth progress bar and auto-advance
  useEffect(() => {
    if (flyers.length <= 1 || isPaused) return;

    const DURATION = 5000;
    const STEP = 50;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentIndex(c => (c + 1) % flyers.length);
          return 0;
        }
        return prev + (STEP / DURATION) * 100;
      });
    }, STEP);

    return () => clearInterval(interval);
  }, [flyers.length, isPaused, currentIndex]);

  const handleSelectFlyer = (idx) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + flyers.length) % flyers.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flyers.length);
    setProgress(0);
  };

  if (!flyers || flyers.length === 0) return null;

  const currentFlyer = flyers[currentIndex] || flyers[0];

  return (
    <div 
      className="relative w-full max-w-xl mx-auto flex flex-col space-y-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* ── Main 3D Poster Showcase Card ── */}
      <div className="relative w-full h-[400px] sm:h-[470px] lg:h-[500px] rounded-[2.5rem] bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-2.5 sm:p-3.5 border border-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5)] dark:shadow-[0_25px_70px_-15px_rgba(255,179,0,0.15)] overflow-hidden group">
        
        {/* Ambient Halo Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Poster Canvas */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-neutral-950 flex items-center justify-center border border-white/10 shadow-inner">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFlyer.id || currentIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
            >
              {/* Blurred Background Atmospheric Tone */}
              <img
                src={currentFlyer.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40 select-none pointer-events-none"
              />

              {/* Foreground Poster Image */}
              <img
                src={currentFlyer.image}
                alt={currentFlyer.title}
                className="relative z-10 w-full h-full object-contain object-top drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                onError={(e) => {
                  e.currentTarget.src = '/casual/healthinsurance.jpg';
                }}
              />

              {/* Bottom Subtle Shadow Vignette */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* ── Top Floating Badges ── */}
          <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              key={`tag-${currentIndex}`}
              className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-brand-accent/40 text-[10px] sm:text-[11px] font-black text-brand-accent tracking-widest uppercase shadow-xl flex items-center gap-1.5"
            >
              <FaStar className="text-[9px] text-brand-accent animate-pulse" />
              <span>{currentFlyer.tag || 'SPECIAL FEATURE'}</span>
            </motion.span>

            <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wider shadow-lg">
              {currentFlyer.category || 'INSURANCE'}
            </span>
          </div>

          {/* ── Left / Right Floating Arrows ── */}
          {flyers.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-brand-accent hover:text-neutral-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                aria-label="Previous flyer"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-brand-accent hover:text-neutral-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                aria-label="Next flyer"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </>
          )}

          {/* ── Sleek Slim Progress Line at bottom edge ── */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-black/40 overflow-hidden">
            <motion.div 
              className="h-full bg-brand-accent"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>

      {/* ── Interactive Multi-Flyer Thumbnail Strip ── */}
      {flyers.length > 1 && (
        <div className="flex items-center gap-2 px-1 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {flyers.map((flyer, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={flyer.id || idx}
                onClick={() => handleSelectFlyer(idx)}
                className={`flex-1 min-w-[90px] sm:min-w-[110px] p-2 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer text-left ${
                  isActive 
                    ? 'bg-neutral-900 dark:bg-neutral-900 border-brand-accent shadow-[0_0_15px_rgba(255,179,0,0.25)]' 
                    : 'bg-white/90 dark:bg-neutral-900/60 border-black/5 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-brand-accent/50'
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-neutral-950 shrink-0 border border-white/10">
                  <img
                    src={flyer.image}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="overflow-hidden min-w-0 flex-1">
                  <p className={`text-[10px] sm:text-[11px] font-black leading-tight truncate ${
                    isActive ? 'text-brand-accent' : 'text-neutral-800 dark:text-neutral-200'
                  }`}>
                    {flyer.tag || `Poster ${idx + 1}`}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400 dark:text-neutral-500 truncate">
                    {flyer.category}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default HeroFlyerCarousel;
