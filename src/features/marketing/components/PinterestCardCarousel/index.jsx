import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaChevronLeft, FaChevronRight, FaShieldAlt, FaCheckCircle, 
  FaStar, FaArrowRight, FaAward, FaRegClock, FaHandHoldingHeart 
} from 'react-icons/fa';

export const INSURER_CARDS = [
  {
    id: 'tata-aia',
    name: 'Tata AIA Life',
    subtitle: 'Life & Critical Illness',
    logo: '/logos/tata_aia.png',
    statBadge: '99.13% Claim Ratio',
    statIcon: FaAward,
    highlight: 'Comprehensive Life Cover & Cancer Protection Plans',
    category: 'Term & Savings',
    accentColor: '#00529C',
    link: '/plans?category=Life',
    tag: 'MOST POPULAR'
  },
  {
    id: 'hdfc-life',
    name: 'HDFC Life',
    subtitle: 'Life & Protection Plans',
    logo: '/logos/hdfc_life.png',
    statBadge: '99.5% Settlement',
    statIcon: FaCheckCircle,
    highlight: 'Guaranteed Returns & Lifelong Financial Shield',
    category: 'Savings & Term',
    accentColor: '#004C8F',
    link: '/plans?category=Life',
    tag: 'TOP RATED'
  },
  {
    id: 'lic',
    name: 'LIC of India',
    subtitle: 'Trusted Life Insurance',
    logo: '/logos/lic.png',
    statBadge: 'Sovereign Guarantee',
    statIcon: FaShieldAlt,
    highlight: 'Time-Tested Endowment & Pension Security',
    category: 'Traditional & Pension',
    accentColor: '#F59E0B',
    link: '/plans?category=Life',
    tag: 'GOVT BACKED'
  },
  {
    id: 'icici-pru',
    name: 'ICICI Prudential',
    subtitle: 'Life Insurance Solutions',
    logo: '/logos/icici_prudential.png',
    statBadge: 'Instant Approval',
    statIcon: FaRegClock,
    highlight: 'Wealth Creation with Free Critical Illness Riders',
    category: 'ULIPs & Term',
    accentColor: '#991B1B',
    link: '/plans?category=Life',
    tag: 'FAST TRACK'
  },
  {
    id: 'sbi-life',
    name: 'SBI Life',
    subtitle: 'Protection & Savings',
    logo: '/logos/sbi_life.png',
    statBadge: 'Nationwide Network',
    statIcon: FaHandHoldingHeart,
    highlight: 'Affordable Individual & Family Protection Plans',
    category: 'Savings & Cover',
    accentColor: '#0284C7',
    link: '/plans?category=Life',
    tag: 'TRUSTED'
  },
  {
    id: 'star-health',
    name: 'Star Health',
    subtitle: 'Cashless Medical Floater',
    logo: '/logos/star_health.png',
    statBadge: '14,000+ Hospitals',
    statIcon: FaStar,
    highlight: '100% Cashless In-Hospitalization & Surgeries',
    category: 'Health Floater',
    accentColor: '#16A34A',
    link: '/plans?category=Health',
    tag: 'CASHLESS'
  }
];

export const PinterestCardCarousel = ({ cards = INSURER_CARDS, autoPlayInterval = 4500 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const totalCards = cards.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  // Autoplay functionality with smooth pause on hover/interaction
  useEffect(() => {
    if (isPaused || totalCards <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, totalCards, autoPlayInterval, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current || !containerRef.current.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe Handlers
  const minSwipeDistance = 40;

  const onTouchStart = (e) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setIsPaused(false);
  };

  // Stacking calculation for each card
  const getCardStyle = (index) => {
    let diff = (index - activeIndex + totalCards) % totalCards;
    if (diff > totalCards / 2) {
      diff -= totalCards;
    }

    // Active Card (diff === 0)
    if (diff === 0) {
      return {
        zIndex: 30,
        x: '0%',
        scale: 1,
        opacity: 1,
        rotateY: 0,
        pointerEvents: 'auto',
        filter: 'blur(0px)',
        boxShadow: '0 22px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1.5px rgba(255, 179, 0, 0.45)'
      };
    }

    // Direct Neighbor: Right (+1)
    if (diff === 1) {
      return {
        zIndex: 20,
        x: '48%',
        scale: 0.88,
        opacity: 0.8,
        rotateY: -5,
        pointerEvents: 'auto',
        filter: 'blur(0.4px)',
        boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.15)'
      };
    }

    // Direct Neighbor: Left (-1)
    if (diff === -1) {
      return {
        zIndex: 20,
        x: '-48%',
        scale: 0.88,
        opacity: 0.8,
        rotateY: 5,
        pointerEvents: 'auto',
        filter: 'blur(0.4px)',
        boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.15)'
      };
    }

    // Secondary Neighbor: Right (+2)
    if (diff === 2) {
      return {
        zIndex: 10,
        x: '84%',
        scale: 0.76,
        opacity: 0.4,
        rotateY: -9,
        pointerEvents: 'auto',
        filter: 'blur(1.2px)',
        boxShadow: '0 6px 18px -6px rgba(0, 0, 0, 0.1)'
      };
    }

    // Secondary Neighbor: Left (-2)
    if (diff === -2) {
      return {
        zIndex: 10,
        x: '-84%',
        scale: 0.76,
        opacity: 0.4,
        rotateY: 9,
        pointerEvents: 'auto',
        filter: 'blur(1.2px)',
        boxShadow: '0 6px 18px -6px rgba(0, 0, 0, 0.1)'
      };
    }

    // Hidden behind cards
    return {
      zIndex: 5,
      x: diff > 0 ? '115%' : '-115%',
      scale: 0.65,
      opacity: 0,
      rotateY: diff > 0 ? -12 : 12,
      pointerEvents: 'none',
      filter: 'blur(2px)',
      boxShadow: 'none'
    };
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Certified Insurance Partners Card Stack Carousel"
      className="relative w-full select-none focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Section Title Bar ── */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
        <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
          Certified Insurers & Portfolio Plans
        </span>
      </div>

      {/* ── 3D Card Stack Stage ── */}
      <div className="relative w-full h-[260px] sm:h-[275px] flex items-center justify-center overflow-hidden [perspective:1200px] py-2">
        {cards.map((card, index) => {
          const style = getCardStyle(index);
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                rotateY: style.rotateY,
                zIndex: style.zIndex,
                filter: style.filter
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 1, 0.5, 1] // Custom smooth cubic-bezier
              }}
              style={{
                boxShadow: style.boxShadow,
                transformStyle: 'preserve-3d'
              }}
              onClick={() => {
                if (!isActive) {
                  setActiveIndex(index);
                } else {
                  navigate(card.link);
                }
              }}
              className={`absolute w-[86%] sm:w-[315px] md:w-[335px] h-[230px] sm:h-[245px] rounded-2xl cursor-pointer overflow-hidden flex flex-col justify-between p-4 sm:p-5 border transition-colors duration-300 ${
                isActive
                  ? 'bg-white dark:bg-[#151518] border-amber-400/80 dark:border-amber-400/50'
                  : 'bg-white dark:bg-[#18181c] border-slate-200 dark:border-white/10 hover:border-brand-accent/40'
              }`}
            >
              {/* Card Ambient Glow Header */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-15"
                style={{ backgroundColor: card.accentColor }}
              />

              {/* ── Top Header: Brand Logo & Tag Badge ── */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="w-[120px] sm:w-[138px] h-11 sm:h-12 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 dark:border-white/20 flex items-center justify-center shadow-xs shrink-0">
                  <img
                    src={card.logo}
                    alt={card.name}
                    className="w-auto h-full max-h-8 sm:max-h-9 max-w-[105px] sm:max-w-[122px] object-contain transition-all"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-[9px] font-black tracking-wider text-amber-700 dark:text-brand-accent uppercase whitespace-nowrap">
                    {card.tag}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 mt-0.5 whitespace-nowrap">
                    {card.category}
                  </span>
                </div>
              </div>

              {/* ── Middle: Plan Details & Highlight ── */}
              <div className="relative z-10 my-auto py-1">
                <h4 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white tracking-tight leading-snug">
                  {card.name}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium line-clamp-2 mt-1 leading-relaxed">
                  {card.highlight}
                </p>
              </div>

              {/* ── Bottom: Credential Badge & Interactive Prompt ── */}
              <div className="relative z-10 pt-2.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 dark:text-neutral-200">
                  <card.statIcon className="text-xs text-brand-accent shrink-0" />
                  <span className="truncate">{card.statBadge}</span>
                </div>

                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-brand-accent group-hover:translate-x-0.5 transition-transform">
                  <span>Explore</span>
                  <FaArrowRight className="text-[9px]" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom Controls: Navigation Arrows & Dots ── */}
      <div className="flex items-center justify-between mt-2 px-2">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 text-neutral-800 dark:text-white hover:bg-brand-accent hover:text-black dark:hover:bg-brand-accent dark:hover:text-black flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          aria-label="Previous insurance plan"
        >
          <FaChevronLeft className="text-[11px]" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'w-6 bg-brand-accent'
                  : 'w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
              }`}
              aria-label={`Go to card ${idx + 1}`}
              aria-current={idx === activeIndex ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 text-neutral-800 dark:text-white hover:bg-brand-accent hover:text-black dark:hover:bg-brand-accent dark:hover:text-black flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          aria-label="Next insurance plan"
        >
          <FaChevronRight className="text-[11px]" />
        </button>
      </div>
    </div>
  );
};

export default PinterestCardCarousel;
