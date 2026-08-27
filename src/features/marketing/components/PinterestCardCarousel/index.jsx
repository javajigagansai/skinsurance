import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaShieldAlt, FaCheckCircle, FaStar, FaAward, FaRegClock, FaHandHoldingHeart 
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

export const PinterestCardCarousel = ({ cards = INSURER_CARDS, autoPlayInterval = 4200 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);
  const lastHoverTime = useRef(0);
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

  // Fast & Sensitive 3D Cursor Placement Response
  const handleCardMouseMove = (e, isActive) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // -6deg to +6deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setMouseTilt({ x, y });
  };

  const handleCardMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Cursor-Sensitive Hover Shift across stage
  const handleCardHover = (index) => {
    const now = Date.now();
    if (now - lastHoverTime.current > 200) {
      lastHoverTime.current = now;
      setActiveIndex(index);
    }
  };

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

  // High-Clarity Stacking Calculation: No blurs, high opacities, prominent side exposure
  const getCardStyle = (index) => {
    let diff = (index - activeIndex + totalCards) % totalCards;
    if (diff > totalCards / 2) {
      diff -= totalCards;
    }

    // Active Card (diff === 0): Full focus & clarity
    if (diff === 0) {
      return {
        zIndex: 30,
        x: '0%',
        scale: 1,
        opacity: 1,
        rotateY: 0,
        pointerEvents: 'auto',
        boxShadow: '0 24px 50px -12px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)'
      };
    }

    // Direct Neighbor: Right (+1) - High visibility & clear logo
    if (diff === 1) {
      return {
        zIndex: 20,
        x: '34%',
        scale: 0.92,
        opacity: 0.96,
        rotateY: -4,
        pointerEvents: 'auto',
        boxShadow: '0 12px 28px -8px rgba(0, 0, 0, 0.12)'
      };
    }

    // Direct Neighbor: Left (-1) - High visibility & clear logo
    if (diff === -1) {
      return {
        zIndex: 20,
        x: '-34%',
        scale: 0.92,
        opacity: 0.96,
        rotateY: 4,
        pointerEvents: 'auto',
        boxShadow: '0 12px 28px -8px rgba(0, 0, 0, 0.12)'
      };
    }

    // Secondary Neighbor: Right (+2)
    if (diff === 2) {
      return {
        zIndex: 10,
        x: '62%',
        scale: 0.84,
        opacity: 0.80,
        rotateY: -7,
        pointerEvents: 'auto',
        boxShadow: '0 6px 18px -4px rgba(0, 0, 0, 0.08)'
      };
    }

    // Secondary Neighbor: Left (-2)
    if (diff === -2) {
      return {
        zIndex: 10,
        x: '-62%',
        scale: 0.84,
        opacity: 0.80,
        rotateY: 7,
        pointerEvents: 'auto',
        boxShadow: '0 6px 18px -4px rgba(0, 0, 0, 0.08)'
      };
    }

    // Hidden behind cards
    return {
      zIndex: 5,
      x: diff > 0 ? '88%' : '-88%',
      scale: 0.75,
      opacity: 0,
      rotateY: diff > 0 ? -10 : 10,
      pointerEvents: 'none',
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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ── 3D Card Stack Stage: Proportionally Fitted to Logos ── */}
      <div className="relative w-full h-[205px] sm:h-[220px] lg:h-[235px] flex items-center justify-center overflow-visible [perspective:1200px] py-1">
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
                rotateY: isActive ? style.rotateY + mouseTilt.x : style.rotateY,
                rotateX: isActive ? mouseTilt.y : 0,
                zIndex: style.zIndex
              }}
              transition={{
                duration: 0.38, // Smooth and gently paced transition
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                boxShadow: style.boxShadow,
                transformStyle: 'preserve-3d'
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (isActive) {
                  handleNext();
                } else {
                  setActiveIndex(index);
                }
              }}
              onMouseEnter={() => {
                if (!isActive) {
                  handleCardHover(index);
                }
              }}
              onMouseMove={(e) => handleCardMouseMove(e, isActive)}
              onMouseLeave={handleCardMouseLeave}
              className={`absolute w-[80%] sm:w-[280px] md:w-[300px] lg:w-[310px] h-[155px] sm:h-[170px] lg:h-[180px] rounded-2xl cursor-pointer overflow-hidden flex items-center justify-center p-4 sm:p-6 border transition-colors duration-200 ${
                isActive
                  ? 'bg-white dark:bg-[#151518] border-slate-300 dark:border-white/25 shadow-xl hover:border-brand-accent/60'
                  : 'bg-white/95 dark:bg-[#18181c] border-slate-200 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 shadow-md hover:scale-[0.94]'
              }`}
            >
              {/* Card Ambient Glow */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-xl pointer-events-none opacity-15"
                style={{ backgroundColor: card.accentColor }}
              />

              {/* ── Proportionally Fitted Logo Display ── */}
              <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none p-2">
                <img
                  src={card.logo}
                  alt={card.name}
                  className="w-auto h-auto max-h-16 sm:max-h-20 md:max-h-22 max-w-[80%] sm:max-w-[82%] object-contain transition-transform duration-200 drop-shadow-sm select-none"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PinterestCardCarousel;
