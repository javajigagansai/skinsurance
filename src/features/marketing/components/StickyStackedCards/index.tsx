import React from 'react';
import { FaShieldAlt, FaHeartbeat, FaUserShield, FaCar } from 'react-icons/fa';
import { useTranslation } from '../../../../context/LanguageContext';
import { SimpleCard } from './SimpleCard';

export const StickyStackedCards = () => {
  const { t } = useTranslation();
  const eduCards = [
    { icon: FaShieldAlt, title: t('card_1_title') || 'Life Insurance', desc: t('card_1_desc') || 'Financial security and wealth creation for your family with guaranteed payouts.', colorClass: 'text-blue-600', bgHoverClass: 'bg-blue-200/70 dark:bg-blue-800/30' },
    { icon: FaHeartbeat, title: t('card_2_title') || 'Health Cover', desc: t('card_2_desc') || 'Cashless hospitalization, critical illness support, and extensive network access.', colorClass: 'text-red-600', bgHoverClass: 'bg-red-200/70 dark:bg-red-800/30' },
    { icon: FaUserShield, title: t('card_3_title') || 'Personal Protection', desc: t('card_3_desc') || 'Accidental disability, income replacement, and tailored family term umbrellas.', colorClass: 'text-emerald-600', bgHoverClass: 'bg-emerald-200/70 dark:bg-emerald-800/30' },
    { icon: FaCar, title: t('card_4_title') || 'Motor & General', desc: t('card_4_desc') || 'Comprehensive zero-depreciation coverage for vehicles, travel, and commercial assets.', colorClass: 'text-amber-600', bgHoverClass: 'bg-amber-200/70 dark:bg-amber-800/30' },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center snap-start py-12 sm:py-16 lg:py-20 border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-neutral-950/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 flex flex-col items-center max-w-4xl mx-auto overflow-hidden">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight whitespace-nowrap">
            {t('what_is_ins_title') || 'MASTERING WEALTH & PROTECTION'}
          </h2>
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
