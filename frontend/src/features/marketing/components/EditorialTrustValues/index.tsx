import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBan, FaClock, FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';
import noSpamImg from '../../../../assets/why_us/why_no_spam.jpg';
import freeConsultationImg from '../../../../assets/why_us/why_free_consultation.jpg';
import talkOrMeetImg from '../../../../assets/why_us/why_talk_or_meet.jpg';
import noSalesAdviseImg from '../../../../assets/why_us/why_no_sales_advise.jpg';

interface ValueCard {
  title: string;
  description: string;
  image: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

const trustValues: ValueCard[] = [
  {
    title: 'No Spamming',
    description: "We will never spam you, it's a promise. Your peace of mind is our first priority.",
    image: noSpamImg,
    icon: FaBan,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-brand-accent'
  },
  {
    title: 'Free Consultation',
    description: "30–45 mins of your undivided attention is all we need, and it's 100% free.",
    image: freeConsultationImg,
    icon: FaClock,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    title: 'Talk or Meet',
    description: 'We let you choose how and when to connect. Phone, video, or in-person—we are ready when you are!',
    image: talkOrMeetImg,
    icon: FaPhoneAlt,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    title: 'No Sales Only Advise',
    description: "Choose what's best for your family. Buy from us or anywhere else with zero pressure.",
    image: noSalesAdviseImg,
    icon: FaCheckCircle,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400'
  }
];

export const EditorialTrustValues = ({ values }: { values?: any[] }) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-screen flex flex-col justify-center snap-start bg-[#ffda0a] border-y border-black/10 py-12 sm:py-16 lg:py-20 relative overflow-hidden select-none"
    >
      {/* Subtle Ambient Decorative Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:20px_20px]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* ── Top Header Title ── */}
        <div className="w-full mb-8 sm:mb-12 text-center overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[26px] sm:text-[42px] md:text-[54px] lg:text-[66px] xl:text-[74px] font-black tracking-tight sm:tracking-normal uppercase leading-none text-black text-center w-full block"
          >
            WHY SK SMART INVESTMENTS
          </motion.h2>
        </div>

        {/* ── 4 Feature Cards Row (Matching Major Claims Card Structure & Design) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {trustValues.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="bg-white dark:bg-neutral-900 border border-black/15 dark:border-white/10 flex flex-col hover:shadow-2xl dark:hover:shadow-none transition-all duration-300 cursor-pointer group rounded-3xl overflow-hidden hover:-translate-y-2"
              >
                {/* Top Image Container */}
                <div className="w-full h-44 sm:h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white dark:bg-neutral-900">
                  <div>
                    {/* Circular Icon Badge */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${item.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`text-xl ${item.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-neutral-950 dark:text-white mb-2.5 tracking-tight uppercase font-['Plus_Jakarta_Sans',sans-serif]">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EditorialTrustValues;