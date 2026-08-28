import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { FaShieldAlt, FaUserShield, FaUsers, FaAward } from 'react-icons/fa';

const STAT_ICONS = [FaShieldAlt, FaUserShield, FaUsers, FaAward];

interface Stat {
  number?: string;
  label: string;
  icon?: any;
  size?: string;
}

const parseStatString = (rawString: string) => {
  let prefix = '';
  let suffix = '';
  let targetNum = 0;
  let decimals = 0;
  let isLocale = false;

  if (rawString.includes('98.7')) {
    targetNum = 98.7;
    decimals = 1;
    suffix = '%';
  } else if (rawString.includes('420')) {
    prefix = '₹';
    targetNum = 420;
    suffix = 'L+';
  } else if (rawString.includes('150')) {
    targetNum = 150000;
    suffix = '+';
    isLocale = true;
  } else if (rawString.includes('4.9')) {
    targetNum = 4.9;
    decimals = 1;
    suffix = ' / 5';
  } else {
    const match = rawString.match(/^([^0-9.]*)([0-9,.]+)(.*)$/);
    if (match) {
      prefix = match[1] || '';
      const numStr = match[2].replace(/,/g, '');
      targetNum = parseFloat(numStr) || 0;
      if (numStr.includes('.')) {
        decimals = numStr.split('.')[1].length;
      }
      suffix = match[3] || '';
      isLocale = match[2].includes(',');
    }
  }

  const formatValue = (val: number) => {
    let formatted = '';
    if (decimals > 0) {
      formatted = val.toFixed(decimals);
    } else if (isLocale) {
      formatted = Math.round(val).toLocaleString('en-IN');
    } else {
      formatted = Math.round(val).toString();
    }
    return `${prefix}${formatted}${suffix}`;
  };

  return { targetNum, formatValue };
};

const AnimatedStatNumber = ({
  rawString = '',
  isInView,
  delay = 0,
}: {
  rawString?: string;
  isInView: boolean;
  delay?: number;
}) => {
  const { targetNum, formatValue } = parseStatString(rawString);
  const [display, setDisplay] = useState(() => formatValue(0));

  useEffect(() => {
    if (!isInView || !rawString || !targetNum) return;

    const controls = animate(0, targetNum, {
      duration: 2.0,
      delay,
      ease: [0.16, 1, 0.3, 1], // Premium ease-out curve
      onUpdate(latest) {
        setDisplay(formatValue(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, rawString, delay, targetNum]);

  return <span>{display || rawString}</span>;
};

export const PremiumEditorialStats = ({ stats }: { stats?: Stat[] }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const defaultStats: Stat[] = [
    { number: '98.7%', label: 'Claims Settlement Rate', icon: FaShieldAlt },
    { number: '₹420L+', label: 'Claims Disbursed', icon: FaUserShield },
    { number: '150,000+', label: 'Lives Secured', icon: FaUsers },
    { number: '4.9 / 5', label: 'Customer Rating', icon: FaAward }
  ];

  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  const PASTEL_STYLES = [
    {
      bg: 'bg-sky-100/90 dark:bg-sky-950/60 border-sky-300/90 dark:border-sky-700/60 shadow-sky-500/10',
      numColor: 'text-sky-950 dark:text-sky-100',
      labelColor: 'text-sky-900 dark:text-sky-200'
    },
    {
      bg: 'bg-emerald-100/90 dark:bg-emerald-950/60 border-emerald-300/90 dark:border-emerald-700/60 shadow-emerald-500/10',
      numColor: 'text-emerald-950 dark:text-emerald-100',
      labelColor: 'text-emerald-900 dark:text-emerald-200'
    },
    {
      bg: 'bg-purple-100/90 dark:bg-purple-950/60 border-purple-300/90 dark:border-purple-700/60 shadow-purple-500/10',
      numColor: 'text-purple-950 dark:text-purple-100',
      labelColor: 'text-purple-900 dark:text-purple-200'
    },
    {
      bg: 'bg-amber-100/90 dark:bg-amber-950/60 border-amber-300/90 dark:border-amber-700/60 shadow-amber-500/10',
      numColor: 'text-amber-950 dark:text-amber-100',
      labelColor: 'text-amber-900 dark:text-amber-200'
    }
  ];

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex flex-col justify-center snap-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 border-b border-black/5 dark:border-white/5 bg-transparent transition-colors duration-300">
      
      {/* Header Section with Equal Word Spacing */}
      <div className="w-full mb-8 sm:mb-10 text-center overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-600 dark:text-red-500 uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif] w-full flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 md:gap-x-5 text-center"
        >
          <span className="inline-block">A</span>
          <span className="inline-block">LEGACY</span>
          <span className="inline-block">MEASURED</span>
          <span className="inline-block">IN</span>
          <span className="inline-block">TRUST</span>
        </motion.h2>
      </div>

      {/* Perfectly Aligned 4-Column Stats Grid in Pastel Colors */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch"
      >
        {displayStats.map((item, index) => {
          const pastel = PASTEL_STYLES[index % PASTEL_STYLES.length];
          return (
            <div
              key={index}
              className={`relative p-6 sm:p-8 min-h-[160px] sm:min-h-[175px] rounded-3xl border shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center group hover:-translate-y-1.5 transition-all duration-300 overflow-hidden ${pastel.bg}`}
            >
              {/* Stat Number with Count-Up Animation on Viewport Entry */}
              <div className={`text-2xl xs:text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black tracking-tight mb-2.5 tabular-nums whitespace-nowrap flex items-center justify-center ${pastel.numColor}`}>
                <AnimatedStatNumber
                  rawString={item.number}
                  isInView={isInView}
                  delay={0.1 + index * 0.1}
                />
              </div>

              {/* Stat Label */}
              <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider leading-snug ${pastel.labelColor}`}>
                {item.label}
              </p>
            </div>
          );
        })}
      </motion.div>

    </section>
  );
};

export default PremiumEditorialStats;