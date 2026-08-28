import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaLightbulb, 
  FaShieldAlt, 
  FaUserTie, 
  FaFileContract, 
  FaMedal, 
  FaHandshake 
} from 'react-icons/fa';

export interface MissionPillar {
  num: string;
  title: string;
  desc: string;
  icon: any;
  colorClass: string;
  cardBg: string;
  iconBg: string;
}

const PILLARS: MissionPillar[] = [
  // ── ROW 1: Pillars 1, 2, 3 ──
  {
    num: '01',
    title: 'Personalized Solutions',
    desc: 'Deliver tailored insurance and wealth preservation blueprints aligned with individual family milestones.',
    icon: FaLightbulb,
    colorClass: 'text-amber-800 dark:text-amber-300',
    cardBg: 'bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 dark:border-amber-400/30',
    iconBg: 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
  },
  {
    num: '02',
    title: 'Premium Products',
    desc: 'Curate top-tier policies from India’s leading insurers with maximum claim clearance and competitive premiums.',
    icon: FaShieldAlt,
    colorClass: 'text-blue-800 dark:text-blue-300',
    cardBg: 'bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 dark:border-blue-400/30',
    iconBg: 'bg-blue-500/20 text-blue-800 dark:text-blue-300'
  },
  {
    num: '03',
    title: 'Expert Guidance',
    desc: 'Simplify complex clauses through unbiased advice from certified advisors with over 22 years of field expertise.',
    icon: FaUserTie,
    colorClass: 'text-emerald-800 dark:text-emerald-300',
    cardBg: 'bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 dark:border-emerald-400/30',
    iconBg: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
  },

  // ── ROW 2: Pillars 4, 5, 6 ──
  {
    num: '04',
    title: 'Seamless Digital Support',
    desc: 'Ensure rapid policy issuance, digital onboarding, annual portfolio reviews, and frictionless renewals.',
    icon: FaFileContract,
    colorClass: 'text-purple-800 dark:text-purple-300',
    cardBg: 'bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/30 dark:border-purple-400/30',
    iconBg: 'bg-purple-500/20 text-purple-800 dark:text-purple-300'
  },
  {
    num: '05',
    title: 'Claims Advocacy',
    desc: 'Provide dedicated on-ground hospitalization coordination and end-to-end claim settlement assistance.',
    icon: FaMedal,
    colorClass: 'text-rose-800 dark:text-rose-300',
    cardBg: 'bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 dark:border-rose-400/30',
    iconBg: 'bg-rose-500/20 text-rose-800 dark:text-rose-300'
  },
  {
    num: '06',
    title: 'Visionary Leadership',
    desc: 'Lead with absolute integrity, ethical governance, and a steadfast commitment to generational security.',
    icon: FaHandshake,
    colorClass: 'text-indigo-800 dark:text-indigo-300',
    cardBg: 'bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 dark:border-indigo-400/30',
    iconBg: 'bg-indigo-500/20 text-indigo-800 dark:text-indigo-300'
  }
];

interface PillarCardProps {
  pillar: MissionPillar;
  idx: number;
}

const PillarCard: React.FC<PillarCardProps> = ({ pillar, idx }) => {
  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
      className={`group relative rounded-3xl p-6 sm:p-8 ${pillar.cardBg} shadow-xs hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden h-full text-left`}
    >
      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        {/* Top Row: Icon and Step Number */}
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-all duration-300`}>
            <Icon className="text-xl" />
          </div>

          <span className={`text-2xl sm:text-3xl font-black ${pillar.colorClass} opacity-60 tracking-tighter font-['Plus_Jakarta_Sans',sans-serif]`}>
            {pillar.num}
          </span>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
            {pillar.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed font-['Inter',sans-serif]">
            {pillar.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const WhatDrivesUs: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white dark:bg-neutral-900/50 border-b border-black/5 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-normal text-neutral-900 dark:text-white uppercase leading-tight font-['Plus_Jakarta_Sans',sans-serif] w-full text-center">
            WHAT DRIVES US
          </h2>
        </div>

        {/* ── 6 Cards Grid: 1, 2, 3 on top row, 4, 5, 6 directly underneath ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PILLARS.map((pillar, idx) => (
            <PillarCard key={pillar.num} pillar={pillar} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatDrivesUs;
