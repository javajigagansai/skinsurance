import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';

interface CardData {
  icon: IconType;
  title: string;
  desc: string;
  colorClass?: string;
  bgHoverClass?: string;
}

interface SimpleCardProps {
  card: CardData;
  idx: number;
}

export const SimpleCard: React.FC<SimpleCardProps> = ({ card, idx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Disable layout morphing on touch devices to prevent lag
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchend' in document || navigator.maxTouchPoints > 0);
  const layoutId = isTouchDevice ? undefined : `simple-card-${idx}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <motion.div 
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className="w-full relative min-h-[280px] sm:min-h-[300px] h-full rounded-3xl p-7 sm:p-8 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between bg-white dark:bg-neutral-900/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer transition-all duration-300 group hover:border-black/20 dark:hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 overflow-hidden"
      >
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-300 rounded-3xl ${card.bgHoverClass || ''}`} />
        <div className="flex flex-col items-start w-full h-full relative z-10 justify-between">
          <div className="w-full">
            <motion.div className="w-12 h-12 bg-slate-100 dark:bg-neutral-800 text-black dark:text-white rounded-2xl flex items-center justify-center mb-5 shadow-xs transition-all duration-300 group-hover:scale-110">
              <card.icon className={`text-xl transition-all duration-300 ${card.colorClass || ''}`} />
            </motion.div>
            <motion.h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight mb-2.5">
              {card.title}
            </motion.h3>
            <motion.p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
              {card.desc}
            </motion.p>
          </div>
          <div className="mt-6 flex items-center justify-end w-full text-brand-accent">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-brand-accent group-hover:text-black dark:group-hover:border-brand-accent transition-all duration-300 shadow-xs">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      </motion.div>

      {mounted ? createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 pt-24 md:pt-32"
            >
              <div
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md cursor-pointer"
              />
              
              <motion.div
                layoutId={layoutId}
                className="relative w-full max-w-4xl max-h-full bg-neutral-50 dark:bg-neutral-900 rounded-[32px] overflow-hidden border border-black/10 dark:border-white/10 z-10 flex flex-col shadow-2xl"
              >
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-10 w-10 items-center justify-center bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full text-black dark:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                
                <div className="p-6 sm:p-12 w-full flex flex-col overflow-y-auto">
                  <motion.div className="p-4 bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white rounded-[16px] inline-block shadow-sm w-max mb-6">
                    <card.icon className={`text-3xl lg:text-4xl text-black dark:text-white ${card.colorClass ? card.colorClass.replace(/group-hover:/g, '') : ''}`} />
                  </motion.div>

                  <motion.h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight mb-4">
                    {card.title}
                  </motion.h3>
                  <motion.p className="text-[15px] sm:text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed pb-6 mb-6 border-b border-black/10 dark:border-white/10">
                    {card.desc}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1 }}
                    className="text-black/80 dark:text-white/80 text-sm sm:text-base leading-relaxed"
                  >
                    <div className="flex flex-col gap-6">
                      <p>Understanding {card.title.toLowerCase()} is crucial for protecting your financial future. This detailed guide explores how these instruments work to provide a safety net for you and your loved ones.</p>
                      
                      <div>
                        <h4 className="font-bold text-lg sm:text-xl mb-3 text-black dark:text-brand-accent">Key Benefits & Coverage</h4>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                          <li>Comprehensive protection against unforeseen events and emergencies.</li>
                          <li>Potential tax benefits under various sections of the Income Tax Act.</li>
                          <li>Complete peace of mind knowing your family's future is secured.</li>
                          <li>Flexible premium payment options tailored to your income flow.</li>
                        </ul>
                      </div>
                      
                      <Link to="/plans" className="mt-2 px-8 py-3 md:px-10 md:py-4 bg-brand-accent text-black font-bold uppercase tracking-widest rounded-full hover:brightness-110 transition-all self-start shadow-[0_0_15px_rgba(255, 179, 0,0.4)] text-sm text-center inline-block">
                        Explore Plans
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      ) : null}
    </>
  );
};
