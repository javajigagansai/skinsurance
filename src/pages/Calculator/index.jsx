import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';
import { 
  FaCalculator, FaShieldAlt, FaCalendarAlt, FaUserCheck, 
  FaCar, FaHome, FaHeartbeat, FaPlane, FaBolt, FaArrowRight,
  FaChartLine, FaCoins, FaPiggyBank, FaPhoneAlt
} from 'react-icons/fa';

// Animated Counter Component
const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = prefix + Math.round(v).toLocaleString('en-IN') + suffix;
        }
      }
    });
    return () => controls.stop();
  }, [value, prefix, suffix]);
  return <span ref={ref}>{prefix}{value.toLocaleString('en-IN')}{suffix}</span>;
};

/* ─── Styled Range Slider ─── */
const PremiumSlider = ({ min, max, step, value, onChange, leftLabel, rightLabel, displayValue }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-baseline">
      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {leftLabel || ''}
      </span>
      <span className="text-sm font-black text-slate-900 dark:text-brand-accent">
        {displayValue}
      </span>
    </div>
    <div className="relative group">
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-neutral-800
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-accent
        [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neutral-950
        [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
        [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-accent
        [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-neutral-950
        [background:linear-gradient(to_right,#ffda0a_0%,#ffda0a_var(--fill),#E2E8F0_var(--fill),#E2E8F0_100%)]
        dark:[background:linear-gradient(to_right,#ffda0a_0%,#ffda0a_var(--fill),#262626_var(--fill),#262626_100%)]"
        style={{ "--fill": `${((value - min) / (max - min)) * 100}%` }}
      />
    </div>
    {(leftLabel !== undefined || rightLabel !== undefined) && (
      <div className="flex justify-between text-[10px] text-slate-400 dark:text-neutral-500 font-medium">
        <span>₹{min.toLocaleString('en-IN')}</span>
        <span>₹{max.toLocaleString('en-IN')}</span>
      </div>
    )}
  </div>
);

/* ─── Compact Input Field ─── */
const GlassInput = ({ label, children }) => (
  <div>
    <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
      {label}
    </label>
    {children}
  </div>
);

const inputClasses = "w-full px-3 py-2 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-brand-accent text-xs font-bold text-slate-900 dark:text-white transition-all";
const selectClasses = inputClasses;

/* ─── Compact Toggle ─── */
const GlassToggle = ({ label, sublabel, checked, onChange }) => (
  <label className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
    checked 
      ? 'bg-brand-accent/10 border-brand-accent/40' 
      : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-white/10'
  }`}>
    <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <div className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${checked ? 'bg-brand-accent' : 'bg-slate-300 dark:bg-neutral-700'}`}>
      <span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white dark:bg-black transition ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
    </div>
    <div className="min-w-0 flex-1">
      <p className={`text-xs font-bold ${checked ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{label}</p>
      {sublabel && <p className="text-[10px] text-slate-400 truncate">{sublabel}</p>}
    </div>
  </label>
);

/* ─── Compact Condition Chip ─── */
const ConditionChip = ({ label, checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
      checked
        ? 'bg-brand-accent/15 border-brand-accent text-amber-700 dark:text-brand-accent'
        : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-brand-accent/40'
    }`}
  >
    {checked && <span className="mr-1">✓</span>}
    {label}
  </button>
);

export const Calculator = ({ isEmbedded = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // ── Main Planning Suite Tabs: 'premium' | 'sip' | 'investment' ──
  const [suiteTab, setSuiteTab] = useState('premium');

  // Sub-category under Premium Calculator
  const [premiumCategory, setPremiumCategory] = useState('health');
  
  const [premium, setPremium] = useState(0);

  // Common insurance inputs
  const [coverage, setCoverage] = useState(500000);
  const [deductible, setDeductible] = useState(500);

  // Health inputs
  const [age, setAge] = useState(30);
  const [smoker, setSmoker] = useState(false);
  const [medicalConditions, setMedicalConditions] = useState({
    diabetes: false,
    highBp: false,
    asthma: false,
    heartDisease: false,
    kidneyDisease: false,
  });
  
  const [healthBreakdown, setHealthBreakdown] = useState({
    base: 0,
    ageAdj: 0,
    tobaccoLoad: 0,
    medicalLoad: 0,
    deductibleDiscount: 0,
    annualPremium: 0,
    monthlyPremium: 0,
    riskLevel: 'Low',
  });

  // Motor inputs
  const [vehicleValue, setVehicleValue] = useState(250000);
  const [vehicleAge, setVehicleAge] = useState(1);
  const [roadsideAssistance, setRoadsideAssistance] = useState(false);

  // Life inputs
  const [termYears, setTermYears] = useState(20);
  const [annualIncome, setAnnualIncome] = useState(800000);

  // Home inputs
  const [homeValue, setHomeValue] = useState(3000000);
  const [homeAge, setHomeAge] = useState(5);

  // Travel inputs
  const [duration, setDuration] = useState(10);
  const [destination, setDestination] = useState('worldwide');

  // SIP inputs
  const [sipMonthly, setSipMonthly] = useState(5000);
  const [sipReturnRate, setSipReturnRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);
  const [sipResults, setSipResults] = useState({ invested: 0, gain: 0, total: 0 });

  // Lumpsum / Investment inputs
  const [lumpSumAmount, setLumpSumAmount] = useState(200000);
  const [investReturnRate, setInvestReturnRate] = useState(14);
  const [investYears, setInvestYears] = useState(10);
  const [investmentResults, setInvestmentResults] = useState({ principal: 0, gain: 0, total: 0, multiplier: '1.0' });

  // Calculation Engine
  useEffect(() => {
    if (suiteTab === 'premium') {
      if (premiumCategory === 'health') {
        const getBasePremium = (cov) => {
          if (cov <= 100000) return 2000;
          if (cov <= 200000) return 2000 + ((cov - 100000) / 100000) * (3200 - 2000);
          if (cov <= 500000) return 3200 + ((cov - 200000) / 300000) * (5500 - 3200);
          if (cov <= 1000000) return 5500 + ((cov - 500000) / 500000) * (8500 - 5500);
          if (cov <= 2000000) return 8500 + ((cov - 1000000) / 1000000) * (14000 - 8500);
          if (cov <= 5000000) return 14000 + ((cov - 2000000) / 3000000) * (25000 - 14000);
          return 25000;
        };

        const baseCov = getBasePremium(coverage);
        let ageFactor = 1.0;
        if (age < 25) ageFactor = 0.85;
        else if (age <= 35) ageFactor = 1.0;
        else if (age <= 45) ageFactor = 1.35;
        else if (age <= 55) ageFactor = 1.85;
        else if (age <= 65) ageFactor = 2.6;
        else ageFactor = 3.8;

        const ageAdj = baseCov * (ageFactor - 1.0);
        const tobaccoLoad = smoker ? (baseCov + ageAdj) * 0.35 : 0;

        let medFactor = 0;
        if (medicalConditions.diabetes) medFactor += 0.15;
        if (medicalConditions.highBp) medFactor += 0.12;
        if (medicalConditions.asthma) medFactor += 0.08;
        if (medicalConditions.heartDisease) medFactor += 0.30;
        if (medicalConditions.kidneyDisease) medFactor += 0.25;
        const medicalLoad = (baseCov + ageAdj) * medFactor;

        let dedFactor = 0;
        if (deductible === 500) dedFactor = 0.05;
        else if (deductible === 2500) dedFactor = 0.12;
        else if (deductible === 5000) dedFactor = 0.20;
        else if (deductible === 10000) dedFactor = 0.30;
        else if (deductible === 25000) dedFactor = 0.45;
        const deductibleDiscount = (baseCov + ageAdj) * -dedFactor;

        const annual = Math.max(1200, Math.round(baseCov + ageAdj + tobaccoLoad + medicalLoad + deductibleDiscount));
        const monthly = Math.round(annual / 12);

        let riskScore = (ageFactor - 1.0) * 40 + (smoker ? 35 : 0) + medFactor * 100;
        let riskLevel = 'Low';
        if (riskScore > 80) riskLevel = 'Very High';
        else if (riskScore > 50) riskLevel = 'High';
        else if (riskScore > 25) riskLevel = 'Moderate';

        setHealthBreakdown({
          base: Math.round(baseCov),
          ageAdj: Math.round(ageAdj),
          tobaccoLoad: Math.round(tobaccoLoad),
          medicalLoad: Math.round(medicalLoad),
          deductibleDiscount: Math.round(deductibleDiscount),
          annualPremium: annual,
          monthlyPremium: monthly,
          riskLevel
        });
        setPremium(monthly);
      } 
      else if (premiumCategory === 'life') {
        const getLifeBase = (cov, t) => {
          let perLakh = 45;
          if (age <= 25) perLakh = 35;
          else if (age <= 35) perLakh = 48;
          else if (age <= 45) perLakh = 85;
          else if (age <= 55) perLakh = 160;
          else perLakh = 320;
          
          let termMultiplier = 1.0;
          if (t === 10) termMultiplier = 0.85;
          else if (t === 20) termMultiplier = 1.0;
          else if (t === 30) termMultiplier = 1.25;
          else if (t === 40) termMultiplier = 1.5;

          return (cov / 100000) * perLakh * termMultiplier;
        };

        let baseAnnual = getLifeBase(coverage, termYears);
        if (smoker) baseAnnual *= 1.45;
        const monthly = Math.max(350, Math.round(baseAnnual / 12));
        setPremium(monthly);
      } 
      else if (premiumCategory === 'motor') {
        let rate = 0.031;
        if (vehicleAge === 0) rate = 0.028;
        else if (vehicleAge === 1) rate = 0.031;
        else if (vehicleAge === 3) rate = 0.038;
        else rate = 0.045;

        let baseAnnual = vehicleValue * rate;
        if (roadsideAssistance) baseAnnual += 1200;
        if (deductible >= 5000) baseAnnual *= 0.85;
        else if (deductible >= 2500) baseAnnual *= 0.92;

        setPremium(Math.max(250, Math.round(baseAnnual / 12)));
      } 
      else if (premiumCategory === 'home') {
        let rate = 0.0006;
        if (homeAge > 20) rate = 0.0011;
        else if (homeAge > 10) rate = 0.00085;

        const baseAnnual = homeValue * rate;
        setPremium(Math.max(150, Math.round(baseAnnual / 12)));
      } 
      else if (premiumCategory === 'travel') {
        let perDay = destination === 'domestic' ? 45 : 160;
        const totalTrip = Math.round(duration * perDay);
        setPremium(totalTrip);
      }
    } 
    else if (suiteTab === 'sip') {
      const P = sipMonthly;
      const r = (sipReturnRate / 100) / 12;
      const n = sipYears * 12;
      const M = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const totalInv = P * n;
      const gain = M - totalInv;
      setSipResults({
        invested: Math.round(totalInv),
        gain: Math.round(gain),
        total: Math.round(M)
      });
      setPremium(Math.round(M));
    }
    else if (suiteTab === 'investment') {
      const P = lumpSumAmount;
      const r = investReturnRate / 100;
      const t = investYears;
      const futureValue = P * Math.pow(1 + r, t);
      const totalGain = futureValue - P;
      const multiplier = (futureValue / P).toFixed(1);
      setInvestmentResults({
        principal: Math.round(P),
        gain: Math.round(totalGain),
        total: Math.round(futureValue),
        multiplier: multiplier
      });
      setPremium(Math.round(futureValue));
    }
  }, [suiteTab, premiumCategory, coverage, age, smoker, medicalConditions, deductible, vehicleValue, vehicleAge, roadsideAssistance, termYears, annualIncome, homeValue, homeAge, duration, destination, sipMonthly, sipReturnRate, sipYears, lumpSumAmount, investReturnRate, investYears]);

  // Main 3 Suite Tabs
  const SUITE_TABS = [
    { id: 'premium', label: 'Premium Calculator', icon: FaShieldAlt },
    { id: 'sip', label: 'SIP Calculator', icon: FaChartLine },
    { id: 'investment', label: 'Investment Calculator', icon: FaCoins }
  ];

  // Sub-categories for Insurance Premium Calculator
  const INSURANCE_TYPES = [
    { id: 'health', label: 'Health', icon: FaHeartbeat },
    { id: 'life', label: 'Life & Term', icon: FaShieldAlt },
    { id: 'motor', label: 'Motor', icon: FaCar },
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'travel', label: 'Travel', icon: FaPlane }
  ];

  const getOutputMeta = () => {
    if (suiteTab === 'sip') {
      return { 
        title: 'Projected Future Corpus', 
        value: sipResults.total, 
        sub: `Compounded wealth after ${sipYears} years`, 
        mode: 'sip' 
      };
    }
    if (suiteTab === 'investment') {
      return { 
        title: 'Estimated Maturity Wealth', 
        value: investmentResults.total, 
        sub: `${investmentResults.multiplier}x Growth over ${investYears} years`, 
        mode: 'investment' 
      };
    }

    switch (premiumCategory) {
      case 'health':
        return { title: 'Annual Health Premium', value: healthBreakdown.annualPremium, sub: `₹${healthBreakdown.monthlyPremium.toLocaleString('en-IN')} / month`, mode: 'health' };
      case 'life':
        return { title: 'Monthly Term Premium', value: premium, sub: `Coverage: ₹${coverage.toLocaleString('en-IN')}`, mode: 'life' };
      case 'motor':
        return { title: 'Monthly Motor Premium', value: premium, sub: `IDV: ₹${vehicleValue.toLocaleString('en-IN')}`, mode: 'motor' };
      case 'home':
        return { title: 'Monthly Home Premium', value: premium, sub: `Property: ₹${homeValue.toLocaleString('en-IN')}`, mode: 'home' };
      case 'travel':
        return { title: 'Total Trip Premium', value: premium, sub: `${duration} days · ${destination === 'worldwide' ? 'Worldwide' : 'Domestic'}`, mode: 'travel' };
      default:
        return { title: 'Estimated Premium', value: premium, sub: '', mode: 'premium' };
    }
  };

  const riskColors = {
    'Low': { bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
    'Moderate': { bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' },
    'High': { bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30' },
    'Very High': { bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30' },
  };

  const risk = riskColors[healthBreakdown.riskLevel] || riskColors['Low'];

  return (
    <div className={`w-full ${isEmbedded ? 'py-16 sm:py-20 lg:py-24 border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-neutral-950/40' : 'min-h-screen pt-28 pb-20'} text-slate-900 dark:text-white transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-brand-accent"></span>
              <span className="text-[11px] sm:text-xs font-black text-brand-accent tracking-[0.25em] uppercase">
                FINANCIAL PLANNING SUITE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
              PLAN YOUR <span className="text-brand-accent">FINANCIAL FUTURE</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
              Estimate your insurance premium and investment requirements in seconds.
            </p>
          </div>

          {/* Main Suite Tabs (Premium / SIP / Investment) */}
          <div className="shrink-0 flex items-center gap-1 sm:gap-1.5 p-1.5 bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {SUITE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = suiteTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSuiteTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-brand-accent text-neutral-950 shadow-sm font-black' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="text-xs sm:text-sm" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Single Viewport 2-Column Dashboard ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ── Left Column: Controls & Inputs ── */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between space-y-6">
            
            {/* If in Premium Calculator, show sub-category pill selector */}
            {suiteTab === 'premium' && (
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-neutral-950 rounded-xl border border-slate-200/60 dark:border-white/5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {INSURANCE_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = premiumCategory === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setPremiumCategory(type.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        isSelected 
                          ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-brand-accent shadow-xs font-black' 
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="text-[11px]" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={`${suiteTab}-${premiumCategory}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 flex-1"
              >

                {/* ═════════════════════════════════════════════════ */}
                {/* ═══ PREMIUM CALCULATOR: HEALTH ═══ */}
                {/* ═════════════════════════════════════════════════ */}
                {suiteTab === 'premium' && premiumCategory === 'health' && (
                  <>
                    <PremiumSlider
                      min={100000} max={5000000} step={100000}
                      value={coverage} onChange={setCoverage}
                      leftLabel="Health Sum Insured Limit"
                      displayValue={`₹${coverage.toLocaleString('en-IN')}`}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <GlassInput label="Age of Primary Insured">
                        <input type="number" min="18" max="100" value={age} onChange={(e) => setAge(Number(e.target.value))} className={inputClasses} />
                      </GlassInput>
                      <GlassInput label="Voluntary Deductible">
                        <select value={deductible} onChange={(e) => setDeductible(Number(e.target.value))} className={selectClasses}>
                          <option value="500">₹500 (Standard)</option>
                          <option value="2500">₹2,500 (12% Discount)</option>
                          <option value="5000">₹5,000 (20% Discount)</option>
                          <option value="10000">₹10,000 (30% Discount)</option>
                        </select>
                      </GlassInput>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <GlassToggle
                        label="Tobacco / Smoker"
                        sublabel="Adds ~35% underwriting load"
                        checked={smoker}
                        onChange={(e) => setSmoker(e.target ? e.target.checked : e)}
                      />

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ Tax Benefit:</span> Save up to ₹25,000 under Section 80D.
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Pre-Existing Medical Conditions
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { key: 'diabetes', label: 'Diabetes' },
                          { key: 'highBp', label: 'High BP' },
                          { key: 'asthma', label: 'Asthma' },
                          { key: 'heartDisease', label: 'Heart' },
                          { key: 'kidneyDisease', label: 'Kidney' },
                        ].map((cond) => (
                          <ConditionChip
                            key={cond.key}
                            label={cond.label}
                            checked={medicalConditions[cond.key]}
                            onChange={(val) => setMedicalConditions(prev => ({ ...prev, [cond.key]: val }))}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ═════════════════════════════════════════════════ */}
                {/* ═══ PREMIUM CALCULATOR: LIFE & TERM ═══ */}
                {/* ═════════════════════════════════════════════════ */}
                {suiteTab === 'premium' && premiumCategory === 'life' && (
                  <>
                    <PremiumSlider
                      min={1000000} max={50000000} step={500000}
                      value={coverage} onChange={setCoverage}
                      leftLabel="Term Life Cover (Sum Assured)"
                      displayValue={`₹${coverage.toLocaleString('en-IN')}`}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <GlassInput label="Age">
                        <input type="number" min="18" max="75" value={age} onChange={(e) => setAge(Number(e.target.value))} className={inputClasses} />
                      </GlassInput>
                      <GlassInput label="Policy Term">
                        <select value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} className={selectClasses}>
                          <option value="10">10 Years</option>
                          <option value="20">20 Years</option>
                          <option value="30">30 Years</option>
                          <option value="40">40 Years</option>
                        </select>
                      </GlassInput>
                      <GlassInput label="Annual Income (₹)">
                        <input type="number" step="100000" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className={inputClasses} />
                      </GlassInput>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <GlassToggle
                        label="Tobacco User"
                        sublabel="Affects term premium rates"
                        checked={smoker}
                        onChange={(e) => setSmoker(e.target ? e.target.checked : e)}
                      />
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-[11px] text-slate-500">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ Section 80C:</span> 100% Tax exemption on premiums paid.
                      </div>
                    </div>
                  </>
                )}

                {/* ═════════════════════════════════════════════════ */}
                {/* ═══ PREMIUM CALCULATOR: MOTOR ═══ */}
                {/* ═════════════════════════════════════════════════ */}
                {suiteTab === 'premium' && premiumCategory === 'motor' && (
                  <>
                    <PremiumSlider
                      min={50000} max={5000000} step={50000}
                      value={vehicleValue} onChange={setVehicleValue}
                      leftLabel="Vehicle IDV (Insured Declared Value)"
                      displayValue={`₹${vehicleValue.toLocaleString('en-IN')}`}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <GlassInput label="Vehicle Age">
                        <select value={vehicleAge} onChange={(e) => setVehicleAge(Number(e.target.value))} className={selectClasses}>
                          <option value="0">Brand New (&lt; 1 Year)</option>
                          <option value="1">1 - 2 Years</option>
                          <option value="3">2 - 5 Years</option>
                          <option value="6">5+ Years</option>
                        </select>
                      </GlassInput>
                      <GlassInput label="Voluntary Deductible">
                        <select value={deductible} onChange={(e) => setDeductible(Number(e.target.value))} className={selectClasses}>
                          <option value="1000">₹1,000</option>
                          <option value="2500">₹2,500</option>
                          <option value="5000">₹5,000</option>
                        </select>
                      </GlassInput>
                    </div>

                    <GlassToggle
                      label="24x7 Roadside Assistance Add-on"
                      sublabel="Towing, battery jump, key assistance"
                      checked={roadsideAssistance}
                      onChange={(e) => setRoadsideAssistance(e.target ? e.target.checked : e)}
                    />
                  </>
                )}

                {/* ═════════════════════════════════════════════════ */}
                {/* ═══ PREMIUM CALCULATOR: HOME ═══ */}
                {/* ═════════════════════════════════════════════════ */}
                {suiteTab === 'premium' && premiumCategory === 'home' && (
                  <>
                    <PremiumSlider
                      min={500000} max={50000000} step={500000}
                      value={homeValue} onChange={setHomeValue}
                      leftLabel="Structure & Asset Value"
                      displayValue={`₹${homeValue.toLocaleString('en-IN')}`}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <GlassInput label="Property Age (Years)">
                        <input type="number" min="0" max="100" value={homeAge} onChange={(e) => setHomeAge(Number(e.target.value))} className={inputClasses} />
                      </GlassInput>
                    </div>
                  </>
                )}

                {/* ═════════════════════════════════════════════════ */}
                {/* ═══ PREMIUM CALCULATOR: TRAVEL ═══ */}
                {/* ═════════════════════════════════════════════════ */}
                {suiteTab === 'premium' && premiumCategory === 'travel' && (
                  <>
                    <PremiumSlider
                      min={1} max={90} step={1}
                      value={duration} onChange={setDuration}
                      leftLabel="Trip Duration"
                      displayValue={`${duration} Days`}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <GlassInput label="Destination Zone">
                        <select value={destination} onChange={(e) => setDestination(e.target.value)} className={selectClasses}>
                          <option value="domestic">Domestic (India)</option>
                          <option value="worldwide">Worldwide / Schengen</option>
                        </select>
                      </GlassInput>
                    </div>
                  </>
                )}

                {/* ═════════════════════════════════════════════════ */}
                {/* ═══ SIP CALCULATOR ═══ */}
                {/* ═════════════════════════════════════════════════ */}
                {suiteTab === 'sip' && (
                  <>
                    <PremiumSlider
                      min={500} max={100000} step={500}
                      value={sipMonthly} onChange={setSipMonthly}
                      leftLabel="Monthly SIP Investment"
                      displayValue={`₹${sipMonthly.toLocaleString('en-IN')}`}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <PremiumSlider
                        min={5} max={30} step={0.5}
                        value={sipReturnRate} onChange={setSipReturnRate}
                        leftLabel="Expected ROI Rate"
                        displayValue={`${sipReturnRate}% p.a.`}
                      />
                      <PremiumSlider
                        min={1} max={30} step={1}
                        value={sipYears} onChange={setSipYears}
                        leftLabel="Investment Horizon"
                        displayValue={`${sipYears} Years`}
                      />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Total Capital Invested over {sipYears} Years:</span>
                      <strong className="font-black text-slate-900 dark:text-white">₹{sipResults.invested.toLocaleString('en-IN')}</strong>
                    </div>
                  </>
                )}

                {/* ═════════════════════════════════════════════════ */}
                {/* ═══ INVESTMENT CALCULATOR (Lumpsum & Goals) ═══ */}
                {/* ═════════════════════════════════════════════════ */}
                {suiteTab === 'investment' && (
                  <>
                    <PremiumSlider
                      min={10000} max={5000000} step={10000}
                      value={lumpSumAmount} onChange={setLumpSumAmount}
                      leftLabel="Initial Lumpsum Investment Amount"
                      displayValue={`₹${lumpSumAmount.toLocaleString('en-IN')}`}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <PremiumSlider
                        min={6} max={25} step={0.5}
                        value={investReturnRate} onChange={setInvestReturnRate}
                        leftLabel="Expected CAGR Return"
                        displayValue={`${investReturnRate}% p.a.`}
                      />
                      <PremiumSlider
                        min={1} max={30} step={1}
                        value={investYears} onChange={setInvestYears}
                        leftLabel="Investment Time Horizon"
                        displayValue={`${investYears} Years`}
                      />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-brand-accent/10 border border-brand-accent/25 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Initial Principal Deposit:</span>
                      <strong className="font-black text-slate-900 dark:text-white">₹{investmentResults.principal.toLocaleString('en-IN')}</strong>
                    </div>
                  </>
                )}

              </motion.div>
            </AnimatePresence>

          </div>

          {/* ── Right Column: Live Output & Fast Action Card ── */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-2 border-brand-accent/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Ambient Corner Glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              
              {/* Header inside Card */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  {getOutputMeta().title}
                </span>
                {suiteTab === 'premium' && premiumCategory === 'health' && (
                  <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full border ${risk.bg}`}>
                    {healthBreakdown.riskLevel} Risk
                  </span>
                )}
                {suiteTab === 'investment' && (
                  <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    {investmentResults.multiplier}x Multiplier
                  </span>
                )}
              </div>

              {/* Big Calculated Number */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1.5 shadow-inner">
                <p className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  {suiteTab === 'sip' 
                    ? 'Projected Future Corpus' 
                    : suiteTab === 'investment'
                    ? 'Maturity Wealth Value'
                    : premiumCategory === 'health' 
                    ? 'Annual Estimated Premium' 
                    : 'Monthly Premium'}
                </p>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-accent tracking-tight flex items-center justify-center gap-1">
                  <span>₹</span>
                  {suiteTab === 'sip' ? (
                    <span>
                      {sipResults.total > 10000000 
                        ? (sipResults.total/10000000).toFixed(2) + ' Cr' 
                        : (sipResults.total/100000).toFixed(2) + ' L'}
                    </span>
                  ) : suiteTab === 'investment' ? (
                    <span>
                      {investmentResults.total > 10000000 
                        ? (investmentResults.total/10000000).toFixed(2) + ' Cr' 
                        : (investmentResults.total/100000).toFixed(2) + ' L'}
                    </span>
                  ) : premiumCategory === 'health' ? (
                    <AnimatedCounter value={healthBreakdown.annualPremium} />
                  ) : (
                    <AnimatedCounter value={premium} />
                  )}
                </div>
                <p className="text-xs text-neutral-300 font-medium pt-1">
                  {getOutputMeta().sub}
                </p>
              </div>

              {/* Breakdown Statistics Grid */}
              <div className="space-y-2.5 text-xs">
                {suiteTab === 'sip' ? (
                  <>
                    <div className="flex justify-between py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">Total Capital Invested</span>
                      <strong className="text-white">₹{sipResults.invested.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">Estimated Wealth Gain</span>
                      <strong className="text-emerald-400 font-bold">+₹{sipResults.gain.toLocaleString('en-IN')}</strong>
                    </div>
                  </>
                ) : suiteTab === 'investment' ? (
                  <>
                    <div className="flex justify-between py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">Initial Principal Amount</span>
                      <strong className="text-white">₹{investmentResults.principal.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">Compound Profit Gain</span>
                      <strong className="text-emerald-400 font-bold">+₹{investmentResults.gain.toLocaleString('en-IN')}</strong>
                    </div>
                  </>
                ) : premiumCategory === 'health' ? (
                  <>
                    <div className="flex justify-between py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">Base Underwriting</span>
                      <strong className="text-white">₹{healthBreakdown.base.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">Estimated Monthly</span>
                      <strong className="text-brand-accent font-bold">₹{healthBreakdown.monthlyPremium.toLocaleString('en-IN')} / mo</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">Cover Limit</span>
                      <strong className="text-white font-bold">
                        {premiumCategory === 'motor' ? `₹${vehicleValue.toLocaleString('en-IN')}` :
                         premiumCategory === 'home' ? `₹${homeValue.toLocaleString('en-IN')}` :
                         premiumCategory === 'travel' ? `${duration} Days` :
                         `₹${coverage.toLocaleString('en-IN')}`}
                      </strong>
                    </div>
                    <div className="flex justify-between py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">Claim Assistance</span>
                      <strong className="text-emerald-400 font-bold">100% Cashless Support</strong>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Bottom CTA Actions */}
            <div className="pt-6 space-y-2 relative z-10">
              <button
                onClick={() => navigate('/appointment')}
                className="w-full py-4 rounded-2xl bg-brand-accent text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:text-neutral-950 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                <FaShieldAlt className="text-xs" />
                <span>Lock In This Plan · Book Free Call</span>
              </button>

              <p className="text-[10px] text-center text-slate-400 font-medium">
                * Indicative calculations based on standard IRDAI guidelines and compound growth formulas.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Calculator;
