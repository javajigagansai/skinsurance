import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Lightweight branded page loading component.
 * Features the SK Logo, a refined gold shimmer line, and subtle breathing animation.
 * Optimized for fast loading without long splash delays.
 */
export const PageLoader = ({ 
  fullScreen = true, 
  message = "Securing your financial journey...",
  className = "" 
}) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center select-none ${
        fullScreen 
          ? 'fixed inset-0 z-[9999] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md' 
          : 'w-full min-h-[350px] py-12 bg-transparent'
      } ${className}`}
      aria-busy="true"
      aria-label="Loading page"
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-amber-400/10 via-amber-500/5 to-transparent blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center max-w-[280px] text-center"
      >
        {/* SK Logo with Gentle Brand Pulse */}
        <motion.div 
          animate={{ 
            scale: [1, 1.03, 1],
            filter: [
              'drop-shadow(0 4px 12px rgba(255, 179, 0, 0.15))',
              'drop-shadow(0 8px 24px rgba(255, 179, 0, 0.30))',
              'drop-shadow(0 4px 12px rgba(255, 179, 0, 0.15))'
            ]
          }}
          transition={{ 
            duration: 2.2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative mb-5"
        >
          <img
            src="/logo.png"
            alt="SK Smart Investments"
            className="h-12 sm:h-14 w-auto object-contain transition-all"
          />
        </motion.div>

        {/* Micro brand title */}
        <p className="text-[10px] tracking-[0.25em] font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-4">
          SK SMART INVESTMENTS
        </p>

        {/* Subtle Animated Gold Loading Line */}
        <div className="w-32 h-[3px] bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFB300] to-transparent rounded-full"
          />
        </div>

        {/* Subtle Supporting Micro-label */}
        {message && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-3 text-xs font-medium text-neutral-400 dark:text-neutral-500 font-sans tracking-wide"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

/**
 * InitialAppLoader for wrapping initial page mounts with a quick, silky fade-out.
 */
export const InitialAppLoader = ({ children }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Quick, lightweight loading window (450ms max)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="initial-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="fixed inset-0 z-[99999] pointer-events-none"
          >
            <PageLoader fullScreen={true} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageLoader;
