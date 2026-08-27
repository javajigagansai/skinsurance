import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaArrowRight } from 'react-icons/fa';

export interface CardData {
  icon: IconType;
  title: string;
  desc: string;
  image: string;
  iconBg: string;
  iconColor: string;
  modalDetails?: {
    overview: string;
    points: string[];
  };
}

interface SimpleCardProps {
  card: CardData;
  idx: number;
}

export const SimpleCard: React.FC<SimpleCardProps> = ({ card, idx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const Icon = card.icon;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 * idx }}
        onClick={() => setIsOpen(true)}
        className="bg-white dark:bg-neutral-900 border border-black/15 dark:border-white/10 flex flex-col hover:shadow-2xl dark:hover:shadow-none transition-all duration-300 cursor-pointer group rounded-3xl overflow-hidden hover:-translate-y-2 select-none"
      >
        {/* Top Image Container */}
        <div className="w-full h-44 sm:h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
          <img 
            src={card.image} 
            alt={card.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white dark:bg-neutral-900">
          <div>
            {/* Circular Icon Badge */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${card.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`text-xl ${card.iconColor}`} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-black text-neutral-950 dark:text-white mb-2.5 tracking-tight uppercase font-['Plus_Jakarta_Sans',sans-serif]">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
              {card.desc}
            </p>
          </div>

          {/* Action indicator */}
          <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-bold text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
            <span>Learn More</span>
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
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
                className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-neutral-900 rounded-[32px] overflow-hidden border border-black/10 dark:border-white/10 z-10 flex flex-col shadow-2xl"
              >
                {/* Modal Header with Image */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center bg-black/40 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>

                  <div className="absolute bottom-4 left-6 sm:left-8 right-6 flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.iconBg} shadow-md`}>
                      <Icon className={`text-2xl ${card.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>
                
                {/* Modal Body */}
                <div className="p-6 sm:p-8 w-full flex flex-col overflow-y-auto">
                  <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-semibold leading-relaxed mb-6">
                    {card.desc}
                  </p>
                  
                  <div className="flex flex-col gap-5 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    <p>
                      {card.modalDetails?.overview || `Proper coverage under ${card.title.toLowerCase()} is fundamental to shielding yourself, your family, and your investments from sudden disruptions.`}
                    </p>
                    
                    <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-base sm:text-lg mb-3 text-black dark:text-white">
                        Key Features & Protection Benefits
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                        {card.modalDetails?.points ? (
                          card.modalDetails.points.map((pt, pIdx) => (
                            <li key={pIdx}>{pt}</li>
                          ))
                        ) : (
                          <>
                            <li>100% transparent policy comparisons with IRDAI-regulated partner insurers.</li>
                            <li>Instant cashless claims facilitation and priority grievance escalation.</li>
                            <li>Tax optimization advantages under relevant sections of the Income Tax Act.</li>
                            <li>Zero commission bias—transparent recommendations customized to your profile.</li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <Link 
                        to="/plans" 
                        onClick={() => setIsOpen(false)}
                        className="px-8 py-3.5 bg-brand-accent text-black font-bold uppercase tracking-wider rounded-xl hover:brightness-110 transition-all shadow-md text-sm text-center inline-block"
                      >
                        Explore Recommended Plans
                      </Link>
                      <Link 
                        to="/support" 
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3.5 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-bold rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm"
                      >
                        Talk to an Advisor
                      </Link>
                    </div>
                  </div>
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
