import React from 'react';
import { FaShieldAlt, FaHeartbeat, FaUserShield, FaCar } from 'react-icons/fa';
import { useTranslation } from '../../../../context/LanguageContext';
import { SimpleCard } from './SimpleCard';

export const StickyStackedCards = () => {
  const { t } = useTranslation();
  const eduCards = [
    { icon: FaShieldAlt, title: t('card_1_title'), desc: t('card_1_desc'), colorClass: 'text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]', bgHoverClass: 'bg-blue-50 dark:bg-blue-900/10' },
    { icon: FaHeartbeat, title: t('card_2_title'), desc: t('card_2_desc'), colorClass: 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]', bgHoverClass: 'bg-red-50 dark:bg-red-900/10' },
    { icon: FaUserShield, title: t('card_3_title'), desc: t('card_3_desc'), colorClass: 'text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]', bgHoverClass: 'bg-emerald-50 dark:bg-emerald-900/10' },
    { icon: FaCar, title: t('card_4_title'), desc: t('card_4_desc'), colorClass: 'text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]', bgHoverClass: 'bg-amber-50 dark:bg-amber-900/10' },
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 border-t border-black/5 dark:border-white/5 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-3 flex flex-col items-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1.5px] bg-brand-accent hidden sm:block"></span>
            <span className="text-[11px] sm:text-[12px] font-black text-brand-accent tracking-[0.25em] uppercase">
              INSURANCE ESSENTIALS
            </span>
            <span className="w-8 h-[1.5px] bg-brand-accent hidden sm:block"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            {t('what_is_ins_title')}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('what_is_ins_desc')}
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {eduCards.map((card, idx) => (
            <SimpleCard key={idx} card={card} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
