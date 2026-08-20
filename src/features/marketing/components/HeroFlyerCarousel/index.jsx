import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaChevronLeft, FaChevronRight, FaShieldAlt, FaArrowRight, 
  FaCheckCircle, FaStar, FaBolt, FaPhoneAlt, FaRegEye,
  FaVideo, FaVolumeMute, FaVolumeUp 
} from 'react-icons/fa';
import { getFlyers, DEFAULT_FLYERS } from '../../../../services/api';
import { subscribeToCollection } from '../../../../services/firebaseService';

export const HeroFlyerCarousel = () => {
  const [flyers, setFlyers] = useState(DEFAULT_FLYERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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

  // Auto-advance flyers every 6 seconds
  useEffect(() => {
    if (flyers.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(c => (c + 1) % flyers.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [flyers.length, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + flyers.length) % flyers.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flyers.length);
  };

  if (!flyers || flyers.length === 0) return null;

  const currentFlyer = flyers[currentIndex] || flyers[0];

  // Detect if the current flyer is a video
  const isVideo = Boolean(
    currentFlyer.mediaType === 'video' ||
    currentFlyer.video ||
    currentFlyer.videoUrl ||
    (typeof currentFlyer.image === 'string' && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(currentFlyer.image))
  );

  const mediaSrc = currentFlyer.video || currentFlyer.videoUrl || currentFlyer.image;

  return (
    <div 
      className="relative w-full max-w-[611px] mx-auto flex flex-col space-y-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Modern Sleek Poster Card Frame (+15px Width & Height) ── */}
      <div className="relative w-full h-[420px] sm:h-[490px] lg:h-[520px] rounded-3xl bg-neutral-900 border border-neutral-700/60 dark:border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden group">
        
        {/* Subtle Ambient Halo Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-accent/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Poster Canvas */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-neutral-950">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFlyer.id || currentIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
            >
              {isVideo ? (
                <>
                  {/* Main Foreground Video - Edge-to-Edge Full Fit */}
                  <video
                    key={`fg-vid-${currentFlyer.id || currentIndex}`}
                    src={mediaSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    controls={false}
                    className="relative z-10 w-full h-full object-cover object-center"
                  />
                </>
              ) : (
                <>
                  {/* Foreground Poster Image - Edge-to-Edge Full Fit */}
                  <img
                    src={currentFlyer.image}
                    alt={currentFlyer.title || 'Insurance Flyer'}
                    className="relative z-10 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/casual/healthinsurance.jpg';
                    }}
                  />
                </>
              )}

              {/* Bottom Subtle Shadow Vignette */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* ── Top Floating Video Audio Control (if video) ── */}
          {isVideo && (
            <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="px-2.5 py-1 rounded-full bg-black/80 hover:bg-brand-accent hover:text-neutral-950 text-white backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase shadow-lg flex items-center gap-1.5 cursor-pointer pointer-events-auto transition-all"
                title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              >
                {isMuted ? <FaVolumeMute className="text-brand-accent text-xs" /> : <FaVolumeUp className="text-brand-accent text-xs" />}
                <span>{isMuted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>
          )}

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

        </div>

      </div>

    </div>
  );
};

export default HeroFlyerCarousel;
