import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShieldAlt, FaHeartbeat, FaCar, FaUserShield, FaPhoneAlt, FaWhatsapp, 
  FaCheckCircle, FaArrowRight, FaArrowLeft, FaHeadset, FaFileAlt, FaHospital, 
  FaClipboardCheck, FaCalendarAlt, FaClock, FaCheck, FaBuilding, FaUserCheck,
  FaFileContract, FaCheckSquare, FaBriefcase
} from 'react-icons/fa';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/Accordion';

export const Claims = () => {
  // Wizard State (from Claims2)
  const [claimMode, setClaimMode] = useState(null); // null | 'new_claim' | 'claim_help'
  const [step, setStep] = useState(1);
  const [policyType, setPolicyType] = useState('health');
  const [insurer, setInsurer] = useState('Tata AIA Life');
  const [claimSubType, setClaimSubType] = useState('Cashless Hospitalization');
  const [preferredAction, setPreferredAction] = useState('whatsapp'); // 'whatsapp' | 'meeting'
  
  // Client Details
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    policyNumber: '',
    locationOrHospital: '',
    incidentDate: '',
    preferredDate: '',
    preferredTime: '10:00 AM - 01:00 PM',
    notes: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Document checklist tabs state
  const [activeDocTab, setActiveDocTab] = useState('health');

  // Policy Types for Wizard
  const policyTypes = [
    {
      id: 'health',
      title: 'Health Insurance',
      icon: FaHeartbeat,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10 border-rose-500/20 dark:bg-rose-500/15',
      subOptions: ['Cashless Hospitalization', 'Reimbursement Claim', 'Critical Illness Cover', 'Pre/Post Hospitalization Bills']
    },
    {
      id: 'motor',
      title: 'Motor Insurance',
      icon: FaCar,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10 border-amber-500/20 dark:bg-amber-500/15',
      subOptions: ['Accident Repair & Cashless Garage', 'Third-Party Damage', 'Theft / Total Loss', 'Windshield / Zero-Dep Claim']
    },
    {
      id: 'life',
      title: 'Life & Term Insurance',
      icon: FaUserShield,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 border-blue-500/20 dark:bg-blue-500/15',
      subOptions: ['Death Claim Settlement', 'Maturity Payout', 'Disability Benefit', 'Terminal Illness Rider']
    },
    {
      id: 'general',
      title: 'General & Business',
      icon: FaBuilding,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10 border-purple-500/20 dark:bg-purple-500/15',
      subOptions: ['Shop & Commercial Fire Loss', 'Travel Medical & Baggage Loss', 'Home & Property Damage', 'Marine & Transit Loss']
    }
  ];

  const insurersList = [
    'Tata AIA Life',
    'Star Health Insurance',
    'HDFC Life',
    'SBI Life Insurance',
    'Future Generali',
    'Bajaj Allianz',
    'LIC of India',
    'ICICI Prudential / Lombard',
    'Niva Bupa Health',
    'Oriental Insurance',
    'Other Insurer'
  ];

  const handleSelectMode = (mode) => {
    setClaimMode(mode);
    setStep(1);
    setIsSuccess(false);
    // Scroll smoothly to wizard
    const el = document.getElementById('claim-action-hub');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setClaimMode(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const modeLabel = claimMode === 'new_claim' ? 'NEW POLICY CLAIM' : 'EXISTING CLAIM ASSISTANCE';
    const actionLabel = preferredAction === 'meeting' ? 'SCHEDULE CLAIM CONSULTATION MEETING' : 'INSTANT WHATSAPP CLAIM SUBMISSION';

    const text = `🚨 *${modeLabel} REQUEST*
----------------------------------------
📌 *Request Type:* ${actionLabel}
📋 *Policy Category:* ${policyTypes.find(p => p.id === policyType)?.title || policyType}
🏢 *Insurer Institution:* ${insurer}
📝 *Claim Specifics:* ${claimSubType}

👤 *Policyholder / Nominee:* ${formData.fullName}
📞 *Mobile Number:* ${formData.phone}
📧 *Email Address:* ${formData.email || 'Not provided'}
🆔 *Policy Number:* ${formData.policyNumber || 'Will provide on call'}
📍 *Hospital / Garage / Location:* ${formData.locationOrHospital || 'Not specified'}

${preferredAction === 'meeting' ? `📅 *Requested Meeting Date:* ${formData.preferredDate || 'Earliest available'}
⏰ *Preferred Time Slot:* ${formData.preferredTime}` : ''}
💬 *Additional Remarks:* ${formData.notes || 'None'}
----------------------------------------
Hi SK Smart Investments Claims Desk, please review my details and initiate assistance.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919994451300?text=${encoded}`, '_blank');
    setIsSuccess(true);
  };

  const docTabs = [
    { id: 'health', label: 'Health Claim' },
    { id: 'life', label: 'Life Claim' },
    { id: 'general', label: 'General & Motor Claim' },
  ];

  const docsData = {
    health: ['Policy document', 'Hospital bills & receipts', 'Discharge summary', 'Doctor prescription & reports', 'Government Identity proof'],
    life: ['Policy document', 'Original death certificate', 'Nominee ID & address proof', 'Bank passbook / cancelled cheque', 'Claim intimation form'],
    general: ['Policy document', 'Incident report / Police FIR', 'Photographs of damaged vehicle/property', 'Repair estimate bills', 'Driving licence & RC copy'],
  };

  const faqs = [
    { q: "How do I register a claim with SK Smart Investments?", a: "You can register a claim directly using our 2-step interactive Claim Desk above, or by contacting our 24x7 support team via phone (+91 99944 51300) or WhatsApp. We immediately initiate the file with the respective insurance company on your behalf." },
    { q: "What is the difference between Cashless and Reimbursement claims?", a: "In a cashless claim at network hospitals or garages, the insurer settles bills directly with the provider. In reimbursement, you pay upfront and submit bills to get refunded. We guide and manage both processes end-to-end." },
    { q: "What documents do I need to prepare?", a: "Required documents vary based on the claim type (Health, Motor, Life, General). Please use our interactive Document Checklist on this page to view the exact requirements." },
    { q: "How long does a claim approval usually take?", a: "Standard cashless health claims receive initial approval within 2 to 4 hours. Reimbursement and life settlement claims typically take 7 to 15 business days once verified documents are submitted." },
    { q: "What should I do during an emergency?", a: "In an emergency, prioritize medical attention or safety first. Call our 24x7 Emergency Hotline (+91 99944 51300), and our team will handle immediate hospital coordination and cashless approvals." }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] dark:bg-black text-neutral-800 dark:text-neutral-200 overflow-x-hidden font-sans pt-20 selection:bg-brand-accent selection:text-black transition-colors duration-300">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative px-6 lg:px-12 pt-8 pb-16 lg:pt-12 lg:pb-24 max-w-[1440px] mx-auto border-b border-black/10 dark:border-white/10 overflow-hidden flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-brand-accent/10 dark:bg-brand-accent/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F7F5] dark:from-black via-[#F7F7F5]/80 dark:via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-brand-accent text-xs font-black uppercase tracking-wider mb-6">
              <span>Claims Support Desk</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[70px] font-black text-black dark:text-white leading-[1.05] tracking-tight mb-6 uppercase font-['Plus_Jakarta_Sans',sans-serif]">
              We Help You <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-brand-accent to-amber-500">
                Through Every Claim.
              </span>
            </h1>
            
            <div className="pl-6 border-l-2 border-black/10 dark:border-white/10 max-w-2xl mb-8">
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                From emergency hospital approvals to final settlement, our certified claims desk coordinates directly with insurers on your behalf.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#claim-action-hub"
                className="px-7 py-3.5 bg-brand-accent text-neutral-950 font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all rounded-xl shadow-md hover:shadow-xl active:scale-95 flex items-center gap-2.5 cursor-pointer"
              >
                <span>File or Track Claim</span>
                <FaArrowRight className="text-xs" />
              </a>

              <a 
                href="tel:+919994451300"
                className="px-7 py-3.5 bg-red-600 border border-red-500 text-white font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-red-500 transition-colors flex items-center gap-2.5 shadow-[0_0_16px_rgba(220,38,38,0.35)] rounded-xl active:scale-95"
              >
                <FaPhoneAlt /> 
                <span>24/7 Emergency Support</span>
              </a>
            </div>
          </motion.div>

          {/* Right Side Image & Overlapping Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200/80 dark:border-white/10">
              <img 
                src="/claim.jpg" 
                alt="Claims Support Team" 
                className="w-full h-auto max-h-[440px] object-cover" 
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-5 -left-5 bg-white dark:bg-neutral-900 p-5 rounded-2xl shadow-xl border border-black/5 dark:border-white/10 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400">
                <FaCheckSquare className="text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black dark:text-white leading-none mb-1">98.7%</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">Settlement Ratio</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE CLAIM ACTION HUB (Integrated from Claims 2) ── */}
      <section id="claim-action-hub" className="py-20 px-4 sm:px-6 lg:px-12 max-w-[1280px] mx-auto border-b border-black/10 dark:border-white/10">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 text-xs font-bold text-neutral-600 dark:text-neutral-300">
            <FaHeadset className="text-amber-500" />
            <span>Interactive Claim Assistant</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 dark:text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Filing a Claim is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-brand-accent to-amber-500">
              Now Made Easy
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Choose your requirement below to start a new policy claim or receive immediate expert assistance for an ongoing claim.
          </p>
        </div>

        {/* ── INTERACTIVE 2-CARD SELECTION OR 3-STEP WIZARD ── */}
        <AnimatePresence mode="wait">
          {!claimMode ? (
            /* STAGE 1: 2 MASTER OPTIONS */
            <motion.div
              key="main-options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto"
            >
              {/* Option 1: File a New Claim */}
              <div 
                onClick={() => handleSelectMode('new_claim')}
                className="group relative rounded-3xl p-7 sm:p-9 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-md hover:shadow-xl hover:border-amber-500/50 dark:hover:border-brand-accent/50 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                <div className="space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-neutral-950 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                    <FaFileContract />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-brand-accent">
                      Option 01
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      File a Policy Claim
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                      Register a new hospitalization, motor accident, or life policy claim with our certified claim advisors.
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="w-full py-3.5 px-5 rounded-2xl bg-amber-500 group-hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2">
                    <span>Start New Claim</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Option 2: Help with Existing Claim */}
              <div 
                onClick={() => handleSelectMode('claim_help')}
                className="group relative rounded-3xl p-7 sm:p-9 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-md hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                <div className="space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    <FaHeadset />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                      Option 02
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      Help with Existing Claim
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                      Get expert assistance for ongoing claim delays, hospital TPA query resolution, document verification, or meeting advisory.
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="w-full py-3.5 px-5 rounded-2xl bg-blue-600 group-hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2">
                    <span>Get Claim Support</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* STAGE 2: 3-STEP WIZARD */
            <motion.div
              key="claim-wizard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl max-w-3xl mx-auto"
            >
              {/* Top Navigation */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-white/5 mb-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-amber-500 transition-colors cursor-pointer"
                >
                  <FaArrowLeft className="text-xs" />
                  <span>{step === 1 ? 'Back to Options' : 'Previous Step'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-brand-accent text-[11px] font-black uppercase tracking-wider">
                    {claimMode === 'new_claim' ? 'New Claim' : 'Claim Help'} • Step {step} of 3
                  </span>
                </div>
              </div>

              {/* Success Screen */}
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-500/30 animate-bounce">
                    <FaCheck />
                  </div>
                  <h3 className="text-2xl font-black text-neutral-950 dark:text-white uppercase">
                    Claim Request Dispatched!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                    Your claim details have been routed directly to the SK Smart Investments Claims Helpdesk via WhatsApp. Our advisor will confirm within minutes.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => setClaimMode(null)}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 text-xs font-bold hover:bg-brand-accent hover:text-neutral-950 transition-colors cursor-pointer"
                    >
                      Start Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* STEP 1: SELECT CATEGORY & SPECIFICS */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-black text-neutral-950 dark:text-white uppercase">
                          1. Which insurance policy are you claiming?
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Select category and specific claim circumstance.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {policyTypes.map((pt) => {
                          const Icon = pt.icon;
                          const isSelected = policyType === pt.id;
                          return (
                            <button
                              key={pt.id}
                              type="button"
                              onClick={() => {
                                setPolicyType(pt.id);
                                setClaimSubType(pt.subOptions[0]);
                              }}
                              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/20 shadow-sm scale-102 ring-1 ring-amber-500'
                                  : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950/60 hover:border-amber-500/40'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${pt.bg} ${pt.color}`}>
                                  <Icon />
                                </div>
                                {isSelected && <FaCheckCircle className="text-amber-500 text-xs" />}
                              </div>
                              <span className="text-xs sm:text-sm font-extrabold text-neutral-950 dark:text-white">
                                {pt.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                          Select Claim Circumstance / Reason:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {policyTypes.find(p => p.id === policyType)?.subOptions.map((sub, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setClaimSubType(sub)}
                              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                                claimSubType === sub
                                  ? 'border-amber-500 bg-amber-500 text-neutral-950 shadow-2xs'
                                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 hover:border-amber-500/30'
                              }`}
                            >
                              <span>{sub}</span>
                              {claimSubType === sub && <FaCheck className="text-[10px]" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Continue to Insurer Details</span>
                          <FaArrowRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: INSURER & LOCATION DETAILS */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-black text-neutral-950 dark:text-white uppercase">
                          2. Insurer & Location Details
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Tell us which insurance company issued the policy and location specifics.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                            Insurance Company <span className="text-amber-500">*</span>
                          </label>
                          <select
                            value={insurer}
                            onChange={(e) => setInsurer(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
                          >
                            {insurersList.map((ins, idx) => (
                              <option key={idx} value={ins}>{ins}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                            Policy Number (If handy)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. TATALIFE-98212 or StarHealth-1002"
                            value={formData.policyNumber}
                            onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                          Hospital Name / Garage Location / City
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Apollo Hospital Greams Road, Chennai or Kanchipuram Cashless Garage"
                          value={formData.locationOrHospital}
                          onChange={(e) => setFormData({ ...formData, locationOrHospital: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
                        />
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                          How would you like to proceed with our claim desk?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPreferredAction('whatsapp')}
                            className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                              preferredAction === 'whatsapp'
                                ? 'border-[#25D366] bg-[#25D366]/10 shadow-2xs ring-1 ring-[#25D366]'
                                : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950'
                            }`}
                          >
                            <FaWhatsapp className="text-xl text-[#25D366] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-black text-neutral-950 dark:text-white">Instant WhatsApp Submission</p>
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Fastest direct review with claims officer</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPreferredAction('meeting')}
                            className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                              preferredAction === 'meeting'
                                ? 'border-amber-500 bg-amber-500/10 shadow-2xs ring-1 ring-amber-500'
                                : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950'
                            }`}
                          >
                            <FaCalendarAlt className="text-xl text-amber-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-black text-neutral-950 dark:text-white">Schedule Consultation Meeting</p>
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">In-person / video claims review</p>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-4 py-2.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Continue to Client Info</span>
                          <FaArrowRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CONTACT INFO & SUBMIT */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-black text-neutral-950 dark:text-white uppercase">
                          3. Policyholder Contact Details
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Please enter your details so our team can coordinate directly.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                            Full Name <span className="text-amber-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter policyholder / claimant name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                            Mobile / WhatsApp Number <span className="text-amber-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Enter 10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
                          />
                        </div>
                      </div>

                      {preferredAction === 'meeting' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                              Preferred Meeting Date
                            </label>
                            <input
                              type="date"
                              value={formData.preferredDate}
                              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                              Preferred Time Slot
                            </label>
                            <select
                              value={formData.preferredTime}
                              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent"
                            >
                              <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                              <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</option>
                              <option value="05:00 PM - 07:00 PM">Evening (05:00 PM - 07:00 PM)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                          Specific Situation / Query (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Need urgent TPA cashless approval / Query regarding discharge bill deductions"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
                        />
                      </div>

                      <div className="pt-3 space-y-2">
                        <button
                          type="submit"
                          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_6px_20px_rgba(245,158,11,0.3)] hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FaWhatsapp className="text-base" />
                          <span>
                            {preferredAction === 'meeting' 
                              ? 'Confirm & Book Consultation Meeting' 
                              : 'Submit Claim Assistance Request'}
                          </span>
                        </button>

                        <p className="text-[10px] text-neutral-400 text-center font-medium">
                          🔒 100% Secure • IRDAI Licensed Claims Assistance • Direct Fiduciary Support
                        </p>
                      </div>
                    </div>
                  )}

                </form>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 3. NEED TO MAKE A CLAIM? (Categories Overview) ── */}
      <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-black/10 dark:border-white/10">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white tracking-tight uppercase">
            Major Claim Categories
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
            Comprehensive claims facilitation across all retail and corporate portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          <div 
            onClick={() => handleSelectMode('new_claim')}
            className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 flex flex-col hover:shadow-xl transition-all cursor-pointer group rounded-2xl overflow-hidden"
          >
            <div className="w-full h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10" />
              <img src="/casual/healthinsurance.jpg" alt="Health Claim" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 flex-1 flex flex-col bg-blue-50/30 dark:bg-blue-900/10">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 transition-colors">
                <FaHeartbeat className="text-xl text-blue-600 dark:text-blue-400 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">HEALTH CLAIM</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Cashless hospitalisation, critical illness & post-discharge reimbursement.</p>
            </div>
          </div>

          <div 
            onClick={() => handleSelectMode('new_claim')}
            className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 flex flex-col hover:shadow-xl transition-all cursor-pointer group rounded-2xl overflow-hidden"
          >
            <div className="w-full h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-red-900/20 group-hover:bg-transparent transition-colors z-10" />
              <img src="/casual/lifeinsurancepolicy.jpg" alt="Life Claim" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 flex-1 flex flex-col bg-red-50/30 dark:bg-red-900/10">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 transition-colors">
                <FaShieldAlt className="text-xl text-red-600 dark:text-red-400 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">LIFE & TERM CLAIM</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Nominee death benefit settlement, terminal riders & maturity payouts.</p>
            </div>
          </div>

          <div 
            onClick={() => handleSelectMode('new_claim')}
            className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 flex flex-col hover:shadow-xl transition-all cursor-pointer group rounded-2xl overflow-hidden"
          >
            <div className="w-full h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors z-10" />
              <img src="/casual/insurancepolicy.jpg" alt="General Claim" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 flex-1 flex flex-col bg-emerald-50/30 dark:bg-emerald-900/10">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 transition-colors">
                <FaBriefcase className="text-xl text-emerald-600 dark:text-emerald-400 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">MOTOR & GENERAL CLAIM</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Zero-dep garage repairs, commercial fire loss, transit & property claims.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. 24/7 PRIORITY HOTLINE BANNER ── */}
      <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-black/10 dark:border-white/10">
        <div className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 p-8 sm:p-12 lg:p-16 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between items-start lg:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-brand-accent"></div>
                <span className="text-[#FFB300] dark:text-brand-accent font-bold tracking-[0.2em] uppercase text-xs">Priority Access</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white tracking-tight mb-4">
                IMMEDIATE CLAIM ASSISTANCE
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Whether facing a sudden medical emergency or an urgent road accident, our dedicated rapid-response desk coordinates with hospitals and surveyors without delay.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 w-full md:min-w-[300px] md:w-auto">
              <a 
                href="tel:+919994451300"
                className="border-l-4 border-brand-accent pl-5 group"
              >
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">24/7 Dedicated Hotline</p>
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white group-hover:text-amber-500 transition-colors">+91 99944 51300</p>
              </a>
              <a 
                href="mailto:skinvestments2025@gmail.com"
                className="border-l-4 border-black/20 dark:border-white/20 pl-5 group"
              >
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Priority Email</p>
                <p className="text-base sm:text-lg font-medium text-black dark:text-white group-hover:text-amber-500 transition-colors break-all">skinvestments2025@gmail.com</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS: WHAT HAPPENS AFTER YOU CONTACT US? ── */}
      <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-black/10 dark:border-white/10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white tracking-tight mb-12 uppercase">
          WHAT HAPPENS AFTER YOU CONTACT US?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {[
            { step: '01', title: 'TELL US ABOUT THE CLAIM', desc: 'Call, WhatsApp or submit your details via our online claim desk.' },
            { step: '02', title: 'SHARE YOUR DOCUMENTS', desc: "We provide the precise checklist tailored to your insurer's requirements." },
            { step: '03', title: 'WE AUDIT EVERYTHING', desc: 'Our team verifies all bills, FIRs, and medical records before filing.' },
            { step: '04', title: 'WE FOLLOW UP WITH TPA', desc: 'We coordinate with surveyors and TPA desks to fast-track approvals.' },
            { step: '05', title: 'CLAIM SETTLEMENT', desc: 'We stay with you until the final settlement is paid into your account.' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-3xl font-black text-[#FFB300] dark:text-brand-accent mb-4 font-serif italic border-b border-black/10 dark:border-white/10 pb-3">
                {item.step}
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-2">{item.title}</h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. WHAT DOCUMENTS WILL I NEED? ── */}
      <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-black/10 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-6 uppercase">
              WHAT DOCUMENTS WILL I NEED?
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              Select your claim category to view the essential documentation checklist required by insurers.
            </p>
            <div className="flex flex-col gap-2">
              {docTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDocTab(tab.id)}
                  className={`flex items-center gap-4 px-6 py-4 text-left font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors border-l-4 rounded-r-xl cursor-pointer ${
                    activeDocTab === tab.id 
                      ? 'bg-black/5 dark:bg-white/5 text-black dark:text-white border-brand-accent' 
                      : 'bg-transparent border-transparent text-neutral-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-8">
             <div className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 p-8 sm:p-12 rounded-3xl shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-6 border-b border-black/10 dark:border-white/10 pb-4">
                  {docTabs.find(t => t.id === activeDocTab)?.label.toUpperCase()} CHECKLIST
                </h3>
                <ul className="space-y-3.5 mb-8">
                  {docsData[activeDocTab].map((doc, i) => (
                    <li key={i} className="flex items-center gap-3.5 text-sm sm:text-base text-black dark:text-white font-medium bg-black/[0.02] dark:bg-black/40 p-4 rounded-xl border border-black/5 dark:border-white/5">
                      <FaCheckSquare className="text-[#FFB300] dark:text-brand-accent text-lg shrink-0" /> 
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 rounded-xl bg-brand-accent/[0.08] dark:bg-brand-accent/10 border-l-4 border-brand-accent text-neutral-800 dark:text-brand-accent text-xs sm:text-sm">
                  <strong className="text-amber-700 dark:text-brand-accent">Note:</strong> Exact documents can vary depending on your insurer and specific incident circumstances. Our advisors will audit your paperwork before submission.
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── 7. WHY HAVE US HANDLE YOUR CLAIM & FAQ ── */}
      <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-black/10 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           
           <div>
             <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-10 uppercase">
               WHY HAVE US HANDLE YOUR CLAIM?
             </h2>
             <ul className="space-y-8">
               {[
                 { title: 'DEDICATED CLAIMS OFFICER', desc: 'A single, experienced fiduciary advisor manages your case from intimation to payout.' },
                 { title: 'ZERO CONFLICT OF INTEREST', desc: 'We represent you, ensuring no unfair deductions or wrongful repudiations.' },
                 { title: 'CLEAR & TRANSPARENT UPDATES', desc: 'We explain every requirement in plain language without confusing insurance jargon.' },
                 { title: 'TPA & HOSPITAL DESK COORDINATION', desc: 'We directly interface with Third-Party Administrators for speedy cashless clearance.' },
                 { title: 'END-TO-END ADVOCACY', desc: 'From pre-audit of medical bills to dispute escalation, we stay by your side.' },
               ].map((item, i) => (
                 <li key={i} className="border-l-4 border-brand-accent pl-5">
                   <h4 className="text-lg font-bold text-black dark:text-white mb-1">{item.title}</h4>
                   <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>
                 </li>
               ))}
             </ul>
           </div>

           <div>
             <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-10 uppercase">
               FREQUENTLY ASKED QUESTIONS
             </h2>
             <Accordion type="single" collapsible className="space-y-0">
               {faqs.map((faq, index) => (
                 <AccordionItem key={index} value={`faq-${index}`} className="border-b border-black/10 dark:border-white/10">
                   <AccordionTrigger className="text-base sm:text-lg py-5 text-black dark:text-white hover:text-amber-500 text-left">
                     {faq.q}
                   </AccordionTrigger>
                   <AccordionContent className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 pb-5 leading-relaxed">
                     {faq.a}
                   </AccordionContent>
                 </AccordionItem>
               ))}
             </Accordion>
           </div>

        </div>
      </section>

      {/* ── 8. FINAL ACTION CTA ── */}
      <section className="py-24 px-6 lg:px-12 bg-black dark:bg-white text-white dark:text-black text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight">
            Don't Handle Your Claim Alone.
          </h2>
          <p className="text-base sm:text-xl font-medium text-neutral-400 dark:text-neutral-600 max-w-2xl mx-auto">
            Tell us what happened. Our certified fiduciary claims team will guide you through the next step.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a 
              href="#claim-action-hub" 
              className="px-8 py-4 bg-brand-accent text-neutral-950 font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 transition-all rounded-2xl shadow-xl active:scale-95"
            >
              Submit Claim Details
            </a>
            <a 
              href="tel:+919994451300" 
              className="px-8 py-4 bg-white/10 dark:bg-black/10 text-white dark:text-black border border-white/20 dark:border-black/20 font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all rounded-2xl active:scale-95 flex items-center gap-2"
            >
              <FaPhoneAlt className="text-xs" />
              <span>Talk to Claims Officer</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Claims;
