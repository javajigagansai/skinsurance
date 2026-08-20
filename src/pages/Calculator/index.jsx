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

/* ─── Styled Range Slider (Proportional & Readable) ─── */
const PremiumSlider = ({ min, max, step, value, onChange, leftLabel, rightLabel, displayValue }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-baseline">
      <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 font-['Plus_Jakarta_Sans',sans-serif]">
        {leftLabel || ''}
      </span>
      <span className="text-base sm:text-lg font-black text-slate-950 dark:text-brand-accent font-['Plus_Jakarta_Sans',sans-serif]">
        {displayValue}
      </span>
    </div>
    <div className="relative group">
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-neutral-800
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-accent
        [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neutral-950
        [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
        [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-accent
        [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-neutral-950
        [background:linear-gradient(to_right,#ffda0a_0%,#ffda0a_var(--fill),#E2E8F0_var(--fill),#E2E8F0_100%)]
        dark:[background:linear-gradient(to_right,#ffda0a_0%,#ffda0a_var(--fill),#262626_var(--fill),#262626_100%)]"
        style={{ "--fill": `${((value - min) / (max - min)) * 100}%` }}
      />
    </div>
    {(leftLabel !== undefined || rightLabel !== undefined) && (
      <div className="flex justify-between text-xs text-slate-400 dark:text-neutral-500 font-medium">
        <span>₹{min.toLocaleString('en-IN')}</span>
        <span>₹{max.toLocaleString('en-IN')}</span>
      </div>
    )}
  </div>
);

/* ─── Standard Form Input Field ─── */
const GlassInput = ({ label, children }) => (
  <div>
    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-['Plus_Jakarta_Sans',sans-serif]">
      {label}
    </label>
    {children}
  </div>
);

const inputClasses = "w-full px-4 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-brand-accent text-sm font-bold text-slate-900 dark:text-white transition-all shadow-2xs";
const selectClasses = inputClasses;

/* ─── Form Toggle ─── */
const GlassToggle = ({ label, sublabel, checked, onChange }) => (
  <label className={`flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl border cursor-pointer transition-all ${
    checked 
      ? 'bg-brand-accent/10 border-brand-accent/50 shadow-xs' 
      : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-white/10 hover:border-brand-accent/30'
  }`}>
    <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <div className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-brand-accent' : 'bg-slate-300 dark:bg-neutral-700'}`}>
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white dark:bg-black transition ${checked ? 'translate-x-4.5' : 'translate-x-1'}`} />
    </div>
    <div className="min-w-0 flex-1">
      <p className={`text-xs sm:text-sm font-bold ${checked ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{label}</p>
      {sublabel && <p className="text-xs text-slate-400 truncate mt-0.5">{sublabel}</p>}
    </div>
  </label>
);

/* ─── Condition Chip ─── */
const ConditionChip = ({ label, checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
      checked
        ? 'bg-brand-accent/15 border-brand-accent text-amber-800 dark:text-brand-accent shadow-xs'
        : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-brand-accent/40'
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
    ageFactor: 0,
    smokerFactor: 0,
    medicalFactor: 0,
    deductibleDiscount: 0,
    annualPremium: 0,
    monthlyPremium: 0,
    riskLevel: 'Low'
  });

  // Term / Life inputs
  const [termYears, setTermYears] = useState(20);
  const [annualIncome, setAnnualIncome] = useState(600000);

  // Motor inputs
  const [vehicleValue, setVehicleValue] = useState(600000);
  const [vehicleAge, setVehicleAge] = useState(1);
  const [roadsideAssistance, setRoadsideAssistance] = useState(false);

  // Home inputs
  const [homeValue, setHomeValue] = useState(3500000);
  const [homeAge, setHomeAge] = useState(5);

  // Travel inputs
  const [duration, setDuration] = useState(15);
  const [destination, setDestination] = useState('domestic');

  // SIP / Investment inputs
  const [sipMonthly, setSipMonthly] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [sipReturnRate, setSipReturnRate] = useState(12);
  const [sipResults, setSipResults] = useState({ invested: 0, gain: 0, total: 0 });

  // Lumpsum Investment inputs
  const [lumpSumAmount, setLumpSumAmount] = useState(100000);
  const [investYears, setInvestYears] = useState(10);
  const [investReturnRate, setInvestReturnRate] = useState(12);
  const [investmentResults, setInvestmentResults] = useState({ principal: 0, gain: 0, total: 0, multiplier: '1.0' });

  // 1. Actuarial Health Premium Algorithm
  useEffect(() => {
    if (suiteTab !== 'premium' || premiumCategory !== 'health') return;

    let base = coverage * 0.012;
    let ageMultiplier = 1;
    if (age < 25) ageMultiplier = 0.85;
    else if (age <= 35) ageMultiplier = 1.0;
    else if (age <= 45) ageMultiplier = 1.35;
    else if (age <= 55) ageMultiplier = 1.85;
    else if (age <= 65) ageMultiplier = 2.6;
    else ageMultiplier = 3.8;

    let smokerAdd = smoker ? base * 0.35 : 0;

    let medicalScore = 0;
    if (medicalConditions.diabetes) medicalScore += 0.20;
    if (medicalConditions.highBp) medicalScore += 0.15;
    if (medicalConditions.asthma) medicalScore += 0.10;
    if (medicalConditions.heartDisease) medicalScore += 0.40;
    if (medicalConditions.kidneyDisease) medicalScore += 0.35;
    let medicalAdd = base * medicalScore;

    let dedDiscount = 0;
    if (deductible >= 10000) dedDiscount = 0.30;
    else if (deductible >= 5000) dedDiscount = 0.20;
    else if (deductible >= 2500) dedDiscount = 0.12;

    let annual = (base * ageMultiplier + smokerAdd + medicalAdd) * (1 - dedDiscount);
    let monthly = annual / 12;

    let riskLevel = 'Low';
    if (medicalScore > 0.4 || age > 55) riskLevel = 'High';
    else if (medicalScore > 0.15 || age > 40 || smoker) riskLevel = 'Moderate';

    setHealthBreakdown({
      base: Math.round(base),
      ageFactor: Math.round(base * (ageMultiplier - 1)),
      smokerFactor: Math.round(smokerAdd),
      medicalFactor: Math.round(medicalAdd),
      deductibleDiscount: Math.round(base * dedDiscount),
      annualPremium: Math.round(annual),
      monthlyPremium: Math.round(monthly),
      riskLevel
    });
  }, [suiteTab, premiumCategory, coverage, age, smoker, medicalConditions, deductible]);

  // 2. Life / Motor / Home / Travel Calculations
  useEffect(() => {
    if (suiteTab !== 'premium') return;

    if (premiumCategory === 'life') {
      let base = (coverage / 1000) * 1.1;
      let ageFactor = age > 30 ? 1 + (age - 30) * 0.04 : 1;
      let smokerFactor = smoker ? 1.4 : 1.0;
      let termFactor = termYears >= 30 ? 0.9 : 1.0;
      setPremium(Math.round((base * ageFactor * smokerFactor * termFactor) / 12));
    } else if (premiumCategory === 'motor') {
      let idvRate = vehicleAge === 0 ? 0.032 : vehicleAge <= 2 ? 0.028 : 0.024;
      let ownDamage = vehicleValue * idvRate;
      let thirdParty = 2094;
      let rsa = roadsideAssistance ? 450 : 0;
      let dedDiscount = deductible >= 5000 ? 500 : deductible >= 2500 ? 250 : 0;
      let totalAnnual = ownDamage + thirdParty + rsa - dedDiscount;
      setPremium(Math.round(totalAnnual / 12));
    } else if (premiumCategory === 'home') {
      let rate = homeAge <= 5 ? 0.0006 : 0.0009;
      let annual = homeValue * rate + 1200;
      setPremium(Math.round(annual / 12));
    } else if (premiumCategory === 'travel') {
      let perDay = destination === 'worldwide' ? 140 : 45;
      let baseTrip = duration * perDay;
      setPremium(Math.round(baseTrip));
    }
  }, [suiteTab, premiumCategory, coverage, age, smoker, termYears, vehicleValue, vehicleAge, deductible, roadsideAssistance, homeValue, homeAge, duration, destination]);

  // 3. SIP Compound Growth Model
  useEffect(() => {
    if (suiteTab !== 'sip') return;
    const P = sipMonthly;
    const i = (sipReturnRate / 100) / 12;
    const n = sipYears * 12;
    const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = P * n;
    const gain = M - invested;
    setSipResults({
      invested: Math.round(invested),
      gain: Math.round(gain),
      total: Math.round(M)
    });
  }, [suiteTab, sipMonthly, sipYears, sipReturnRate]);

  // 4. Lumpsum Investment Wealth Compounder
  useEffect(() => {
    if (suiteTab !== 'investment') return;
    const P = lumpSumAmount;
    const r = investReturnRate / 100;
    const t = investYears;
    const total = P * Math.pow(1 + r, t);
    const gain = total - P;
    const multiplier = (total / P).toFixed(1);
    setInvestmentResults({
      principal: Math.round(P),
      gain: Math.round(gain),
      total: Math.round(total),
      multiplier
    });
  }, [suiteTab, lumpSumAmount, investYears, investReturnRate]);

  // Suite Tab Categories
  const SUITE_TABS = [
    { id: 'premium', label: 'Insurance Premium', icon: FaShieldAlt },
    { id: 'sip', label: 'SIP Growth Wealth', icon: FaChartLine },
    { id: 'investment', label: 'Lumpsum Wealth', icon: FaPiggyBank }
  ];

  // Insurance Sub-Categories
  const INSURANCE_TYPES = [
    { id: 'health', label: 'Health', icon: FaHeartbeat },
    { id: 'life', label: 'Term Life', icon: FaUserCheck },
    { id: 'motor', label: 'Motor', icon: FaCar },
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'travel', label: 'Travel', icon: FaPlane }
  ];

  const getOutputMeta = () => {
    if (suiteTab === 'sip') {
      return { title: 'Projected Wealth Corpus', value: sipResults.total, sub: `Over ${sipYears} Years · ${sipReturnRate}% CAGR`, mode: 'sip' };
    }
    if (suiteTab === 'investment') {
      return { title: 'Estimated Maturity Value', value: investmentResults.total, sub: `${investmentResults.multiplier}x Growth · ${investYears} Years Horizon`, mode: 'investment' };
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
    <div className={`w-full ${isEmbedded ? 'py-3 sm:py-4 lg:py-5 flex flex-col justify-center' : 'min-h-screen pt-24 pb-16'} text-slate-900 dark:text-white transition-colors font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="space-y-0.5 sm:space-y-1 max-w-xl text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-black uppercase tracking-tight text-neutral-950 dark:text-white leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              PLAN YOUR FINANCIAL FUTURE
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium font-['Inter',sans-serif]">
              Estimate your insurance premium and wealth accumulation requirements in seconds.
            </p>
          </div>

          {/* Main Suite Tabs (Premium / SIP / Investment) */}
          <div className="shrink-0 flex items-center gap-1.5 p-1.5 bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {SUITE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = suiteTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSuiteTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-brand-accent text-neutral-950 shadow-md font-black' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 2-Column Responsive Dashboard Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          
          {/* ── Left Column: Controls & Inputs ── */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
            
            {/* If in Premium Calculator, show sub-category pill selector */}
            {suiteTab === 'premium' && (
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-neutral-950 rounded-xl border border-slate-200/60 dark:border-white/5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {INSURANCE_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = premiumCategory === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setPremiumCategory(type.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        isSelected 
                          ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-brand-accent shadow-sm font-black' 
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="text-xs" />
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
                className="space-y-4 flex-1"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <GlassToggle
                        label="Tobacco / Smoker"
                        sublabel="Underwriting adjustment (~35%)"
                        checked={smoker}
                        onChange={(e) => setSmoker(e.target ? e.target.checked : e)}
                      />

                      <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ Tax Benefit:</span> Save up to ₹25,000 under Section 80D.
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                        Pre-Existing Medical Conditions
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { key: 'diabetes', label: 'Diabetes' },
                          { key: 'highBp', label: 'High BP' },
                          { key: 'asthma', label: 'Asthma' },
                          { key: 'heartDisease', label: 'Heart Condition' },
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <GlassToggle
                        label="Tobacco User"
                        sublabel="Affects term premium underwriting"
                        checked={smoker}
                        onChange={(e) => setSmoker(e.target ? e.target.checked : e)}
                      />
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs text-slate-500">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-sm text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Total Capital Invested over {sipYears} Years:</span>
                      <strong className="font-black text-slate-900 dark:text-white text-base">₹{sipResults.invested.toLocaleString('en-IN')}</strong>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                    <div className="p-4 rounded-2xl bg-brand-accent/10 border border-brand-accent/25 text-sm text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Initial Principal Deposit:</span>
                      <strong className="font-black text-slate-900 dark:text-white text-base">₹{investmentResults.principal.toLocaleString('en-IN')}</strong>
                    </div>
                  </>
                )}

              </motion.div>
            </AnimatePresence>

          </div>

          {/* ── Right Column: Live Output & Fast Action Card ── */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-2 border-brand-accent/30 rounded-3xl p-4 sm:p-6 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden space-y-4">
            
            {/* Ambient Corner Glow */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3.5 relative z-10">
              
              {/* Header inside Card */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 font-['Plus_Jakarta_Sans',sans-serif]">
                  {getOutputMeta().title}
                </span>
                {suiteTab === 'premium' && premiumCategory === 'health' && (
                  <span className={`px-2.5 py-0.5 text-[11px] font-black uppercase rounded-full border ${risk.bg}`}>
                    {healthBreakdown.riskLevel} Risk
                  </span>
                )}
                {suiteTab === 'investment' && (
                  <span className="px-2.5 py-0.5 text-[11px] font-black uppercase rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    {investmentResults.multiplier}x Multiplier
                  </span>
                )}
              </div>

              {/* Big Calculated Number */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 shadow-inner">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest font-['Plus_Jakarta_Sans',sans-serif]">
                  {suiteTab === 'sip' 
                    ? 'Projected Future Corpus' 
                    : suiteTab === 'investment'
                    ? 'Maturity Wealth Value'
                    : premiumCategory === 'health' 
                    ? 'Annual Estimated Premium' 
                    : 'Monthly Premium'}
                </p>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-accent tracking-tight flex items-center justify-center gap-1 font-['Plus_Jakarta_Sans',sans-serif]">
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
                <p className="text-xs text-neutral-300 font-medium pt-0.5">
                  {getOutputMeta().sub}
                </p>
              </div>

              {/* Breakdown Statistics Grid */}
              <div className="space-y-2 text-xs sm:text-sm">
                {suiteTab === 'sip' ? (
                  <>
                    <div className="flex justify-between py-2 px-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">Total Capital Invested</span>
                      <strong className="text-white font-bold">₹{sipResults.invested.toLocaleString('en-IN')}</strong>
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
                      <strong className="text-white font-bold">₹{investmentResults.principal.toLocaleString('en-IN')}</strong>
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
                      <strong className="text-white font-bold">₹{healthBreakdown.base.toLocaleString('en-IN')}</strong>
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
            <div className="pt-2 space-y-1.5 relative z-10">
              <button
                onClick={() => navigate('/appointment')}
                className="w-full py-3.5 rounded-2xl bg-brand-accent text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:text-neutral-950 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                <FaShieldAlt className="text-xs" />
                <span>Lock In This Plan · Book Free Call</span>
              </button>

              <p className="text-[11px] text-center text-slate-400 font-medium">
                * Indicative calculations based on standard IRDAI guidelines.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Calculator;
