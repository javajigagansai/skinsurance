import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { FaShieldAlt, FaHeartbeat, FaCar, FaUserShield, FaHandshake, FaAward, FaStar } from 'react-icons/fa';
import { PLANS } from '../../services/mockData';

export const Home = () => {
  const navigate = useNavigate();

  // Highlight only top 3 popular plans
  const featuredPlans = PLANS.slice(0, 3);

  const stats = [
    { number: '98.7%', label: 'Claims Settlement Rate' },
    { number: '$420M+', label: 'Claims Disbursed' },
    { number: '150,000+', label: 'Global Clients Protected' },
    { number: '4.9 / 5', label: 'Average Trustpilot Rating' }
  ];

  const values = [
    {
      title: 'Digital-First Simplicity',
      description: 'Scans, quotes, and payouts managed seamlessly via client portals with instant status tracker feeds.',
      icon: FaUserShield
    },
    {
      title: 'Underwriting Integrity',
      description: 'Transparent calculators reflecting genuine actuarial risk tables with zero surprise charges.',
      icon: FaHandshake
    },
    {
      title: 'Award-Winning Underwriting',
      description: 'Highly commended boutique operations recognized globally for custom risk modeling options.',
      icon: FaAward
    }
  ];

  const testimonials = [
    {
      quote: "I am grateful for the opportunity to complete my internship with this organization. During this internship, I gained valuable knowledge about the insurance industry, customer relationship management, and financial planning. The mentors and staff members were supportive and guided me throughout.",
      author: "Harini Harini",
      role: "1 review • a month ago"
    },
    {
      quote: "My internship at sk smart investment company was a valuable learning experience. I improved my communication skill, learned about insurance products and gained practical knowledge about the corporate work environment.",
      author: "Dhivya Kumaran",
      role: "1 review • a month ago"
    },
    {
      quote: "The mentors and staff members were supportive and guided me throughout the internship, which made the learning experience more comfortable and effective.",
      author: "Manimozhi E",
      role: "1 review • a month ago"
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-16 px-4 overflow-hidden premium-gradient text-white">
        {/* Background video loop */}
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/hero_background.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-navy-950/60 z-10" />

        {/* Background blobs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-navy-500/20 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-left"
          >
            <span className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-400/10 rounded-full border border-gold-400/20">
              Securing Legacies, Simplifying Protection
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Premium Insurance <br />
              <span className="gold-gradient-text">Redefined.</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Explore bespoke digital health, life, and asset coverage packages designed around you. Manage policies, calculate premiums, and settle claims in real time.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="gold" size="lg" onClick={() => navigate('/calculator')}>
                Calculate Premium Quote
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" onClick={() => navigate('/plans')}>
                View Insurance Plans
              </Button>
            </div>
          </motion.div>

          {/* Right Glassmorphic Hero Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel-gold rounded-3xl p-6 sm:p-8 space-y-6 max-w-md mx-auto text-navy-950 dark:text-white border border-gold-300/35"
          >
            <div className="flex items-center space-x-2 text-gold-500">
              <FaShieldAlt className="text-2xl" />
              <h3 className="text-lg font-bold">SK Smart Guarantee</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-300 text-left">
              Get an instant coverage recommendation based on standard variables. Try our simple risk assessment.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs py-2.5 border-b border-slate-200/50 dark:border-white/5">
                <span className="text-slate-400">Claims Decision Period</span>
                <span className="font-semibold text-right">&lt; 24 Hours</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2.5 border-b border-slate-200/50 dark:border-white/5">
                <span className="text-slate-400">Cashless Garages & Hospitals</span>
                <span className="font-semibold text-right">15,000+ Worldwide</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2.5 border-b border-slate-200/50 dark:border-white/5">
                <span className="text-slate-400">Multi-policy Savings Discount</span>
                <span className="font-bold text-gold-500 text-right">Up to 20% Off</span>
              </div>
            </div>

            <Button variant="primary" className="w-full" onClick={() => navigate('/calculator')}>
              Estimate My Policy
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Counters Stats Strip */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel dark:glass-panel-gold rounded-3xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 shadow-xl">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white gold-gradient-text">
                {stat.number}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Section: What is Insurance & Types */}
      <section className="max-w-7xl mx-auto px-4 py-8 text-left space-y-12">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
            Financial Literacy 101
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
            Understanding Insurance & Investments
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Insurance is a critical contract designed to shield individuals from severe financial losses. Discover how it works and explore the primary classes of coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <div className="p-3 bg-navy-500/10 text-navy-950 dark:text-white rounded-xl inline-block">
              <FaShieldAlt className="text-xl text-gold-500" />
            </div>
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">What is Insurance?</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              A risk management tool where an individual pays a small premium to an insurance provider in exchange for protection against major, unpredictable losses.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <div className="p-3 bg-navy-500/10 text-navy-950 dark:text-white rounded-xl inline-block">
              <FaHeartbeat className="text-xl text-gold-500" />
            </div>
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">Health Cover</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Guards against medical emergencies by paying for hospitalization, operations, and diagnostics directly, securing your cash reserves during illness.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <div className="p-3 bg-navy-500/10 text-navy-950 dark:text-white rounded-xl inline-block">
              <FaUserShield className="text-xl text-gold-500" />
            </div>
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">Life Insurance</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Secures your family's future financially in your absence, paying out a lump-sum death benefit, or offering savings components like mutual funds.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <div className="p-3 bg-navy-500/10 text-navy-950 dark:text-white rounded-xl inline-block">
              <FaCar className="text-xl text-gold-500" />
            </div>
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">Motor & General</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Protects your physical assets (cars, homes) from collisions, fires, natural disasters, or legal third-party liability charges.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Values Section */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <div className="text-center">
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full">
            Our Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white mt-2">
            Why SK Smart is Chosen by Global Executives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 text-left space-y-4 hover:shadow-lg transition-all duration-300 border border-slate-200/40 dark:border-white/5 group"
              >
                <div className="p-3 bg-navy-50 dark:bg-navy-900 text-gold-500 rounded-xl inline-block group-hover:scale-110 transition-transform">
                  <Icon className="text-xl" />
                </div>
                <h3 className="text-base font-bold text-navy-950 dark:text-white">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Plans Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <div className="text-center">
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full">
            Tailored Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white mt-2">
            Explore Featured Insurance Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPlans.map((plan) => (
            <div
              key={plan.id}
              className="glass-panel rounded-3xl p-6 flex flex-col justify-between border border-slate-200/40 dark:border-white/5 relative overflow-hidden group hover:shadow-xl transition-all"
            >
              {plan.badge && (
                <span className="absolute top-4 right-4 bg-gold-400 text-navy-950 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              
              <div className="space-y-4 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded">
                  {plan.category}
                </span>
                <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[48px]">
                  {plan.description}
                </p>
                <div className="pt-2">
                  <p className="text-slate-400 text-[10px] uppercase font-bold leading-none">Starting from</p>
                  <p className="text-navy-950 dark:text-white font-extrabold text-2xl mt-1">
                    ${plan.premiumMonthly}<span className="text-xs font-normal text-slate-500"> / month</span>
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  variant="gold"
                  className="w-full"
                  onClick={() => navigate('/calculator')}
                >
                  Configure & Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Strip */}
      <section className="bg-navy-950 py-16 text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Intern & Client Voices</span>
            <h2 className="text-2xl sm:text-3xl font-bold">Trusted Learning & Advisory</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Read transparent reviews from our interns and clients on their experience with SK Smart Investments.
            </p>
            <div className="flex justify-center space-x-1 pt-1 text-gold-400 text-sm">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-navy-900/60 border border-white/5 rounded-2xl p-6 text-left space-y-4 flex flex-col justify-between">
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-white/5">
                  <h4 className="text-xs font-bold text-white">{t.author}</h4>
                  <p className="text-[10px] text-slate-500 mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
