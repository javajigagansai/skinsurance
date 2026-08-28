import React from 'react';
import { FaShieldAlt, FaHeartbeat, FaUserShield, FaCar } from 'react-icons/fa';
import { useTranslation } from '../../../../context/LanguageContext';
import { SimpleCard, CardData } from './SimpleCard';
import whatIsInsuranceImg from '../../../../assets/education/what_is_insurance.jpg';
import healthCoverImg from '../../../../assets/education/health_cover.jpg';
import lifeInsuranceImg from '../../../../assets/education/life_insurance.jpg';
import generalInsuranceImg from '../../../../assets/education/general_insurance.jpg';

export const StickyStackedCards = () => {
  const { t } = useTranslation();

  const eduCards: CardData[] = [
    { 
      icon: FaShieldAlt, 
      title: 'WHAT IS INSURANCE?', 
      desc: 'A risk management tool where an individual pays a small premium in exchange for protection against major losses.', 
      image: whatIsInsuranceImg,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      modalDetails: {
        overview: 'Insurance is an essential contract between you and an insurance provider that transfers high financial risk from sudden accidents or illness into manageable, predictable premiums.',
        points: [
          'Guaranteed shield against major unplanned financial disruptions.',
          'Provides complete peace of mind for your family and savings.',
          'Ensures fast liquid financial assistance when unexpected emergencies occur.',
          'Backed by strict IRDAI solvency regulations and prompt grievance mechanisms.'
        ]
      }
    },
    { 
      icon: FaHeartbeat, 
      title: 'HEALTH COVER', 
      desc: 'Guards against medical emergencies by paying for hospitalization, operations, and diagnostics directly.', 
      image: healthCoverImg,
      iconBg: 'bg-rose-100 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
      modalDetails: {
        overview: 'Health insurance provides direct cashless treatments across 14,000+ top hospital networks nationwide, shielding your life savings from escalating healthcare inflation.',
        points: [
          '100% cashless hospitalization across multi-speciality network hospitals.',
          'Covers pre & post-hospitalization, daycare procedures, and ambulance charges.',
          'Comprehensive critical illness riders and annual preventive health checkups.',
          'Tax deductions up to ₹75,000 under Section 80D for you and your parents.'
        ]
      }
    },
    { 
      icon: FaUserShield, 
      title: 'LIFE INSURANCE', 
      desc: "Secures your family's future financially in your absence, paying out a death benefit or savings.", 
      image: lifeInsuranceImg,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      modalDetails: {
        overview: 'Life and term insurance creates an immediate financial shield for your dependents, guaranteeing their lifestyle, children’s education, and home loans remain secure under any circumstance.',
        points: [
          'High sum assured coverage with affordable monthly or annual premiums.',
          'Complete protection against premature loss of primary household income.',
          'Guaranteed lump-sum or regular income payout to registered nominees.',
          'Tax exemption on death benefits under Section 10(10D) and Section 80C.'
        ]
      }
    },
    { 
      icon: FaCar, 
      title: 'GENERAL INSURANCE', 
      desc: 'Protects your physical assets and covers travel, business, fire, and property.', 
      image: generalInsuranceImg,
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      modalDetails: {
        overview: 'General insurance safeguards your vehicle, commercial properties, transit shipments, and travel itineraries against theft, accidental damages, natural calamities, and legal liabilities.',
        points: [
          'Zero-depreciation motor insurance with 24/7 roadside assistance.',
          'Commercial property and business interruption indemnity.',
          'Worldwide travel insurance for trip cancellations and medical emergencies.',
          'Quick survey inspection and streamlined settlement processing.'
        ]
      }
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center snap-start py-12 sm:py-16 lg:py-20 border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-neutral-950/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="w-full text-center mb-8 sm:mb-12 overflow-hidden">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif] w-full flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 md:gap-x-5 text-center">
            {(t('what_is_ins_title') || 'MASTERING WEALTH & PROTECTION').split(' ').map((word: string, i: number) => (
              <span key={i} className="inline-block">{word}</span>
            ))}
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

export default StickyStackedCards;
