import React from 'react';
import { FaShieldAlt, FaHeartbeat, FaUserShield, FaCar } from 'react-icons/fa';
import { useTranslation } from '../../../../context/LanguageContext';
import { SimpleCard } from './SimpleCard';

export const StickyStackedCards = () => {
  const { t } = useTranslation();
  const eduCards = [
    { icon: FaShieldAlt, title: t('card_1_title') || 'Life Insurance', desc: t('card_1_desc') || 'Financial security and wealth creation for your family with guaranteed payouts.', colorClass: 'text-blue-500', bgHoverClass: 'bg-blue-50/50 dark:bg-blue-900/10' },
    { icon: FaHeartbeat, title: t('card_2_title') || 'Health Cover', desc: t('card_2_desc') || 'Cashless hospitalization, critical illness support, and extensive network access.', colorClass: 'text-red-500', bgHoverClass: 'bg-red-50/50 dark:bg-red-900/10' },
    { icon: FaUserShield, title: t('card_3_title') || 'Personal Protection', desc: t('card_3_desc') || 'Accidental disability, income replacement, and tailored family term umbrellas.', colorClass: 'text-emerald-500', bgHoverClass: 'bg-emerald-50/50 dark:bg-emerald-900/10' },
    { icon: FaCar, title: t('card_4_title') || 'Motor & General', desc: t('card_4_desc') || 'Comprehensive zero-depreciation coverage for vehicles, travel, and commercial assets.', colorClass: 'text-amber-500', bgHoverClass: 'bg-amber-50/50 dark:bg-amber-900/10' },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-neutral-950/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 space-y-3 flex flex-col items-center max-w-3xl mx-auto">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            {t('what_is_ins_title') || 'MASTERING WEALTH & PROTECTION'}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('what_is_ins_desc') || 'Explore transparent, IRDAI-certified coverage categories customized for your long-term security.'}
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
