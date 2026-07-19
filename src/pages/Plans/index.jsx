import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';
import { Button } from '../../components/ui/Button';
import { Filters } from '../../components/common/Filters';
import { Modal } from '../../components/ui/Modal';
import { Loader } from '../../components/ui/Loader';
import { getPlans } from '../../services/api';
import { FaCheckCircle, FaShieldAlt, FaBriefcase, FaFileSignature } from 'react-icons/fa';

export const Plans = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setActiveFilter(category);
    } else {
      setActiveFilter('ALL');
    }
  }, [location.search]);

  useEffect(() => {
    const loadPlansData = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (error) {
        console.error("Error loading plans:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPlansData();
  }, []);

  const filterOptions = [
    { label: 'All Plans', value: 'ALL' },
    { label: 'Health Care', value: 'Health' },
    { label: 'Life Protection', value: 'Life' },
    { label: 'Motor Vehicle', value: 'Motor' },
    { label: 'Property & Home', value: 'Home' },
    { label: 'Travel Assistance', value: 'Travel' }
  ];

  const filteredPlans = activeFilter === 'ALL'
    ? plans
    : plans.filter(plan => plan.category === activeFilter);

  const handleApply = (plan) => {
    setSelectedPlan(plan);
    setWizardStep(1);
    setShowApplyModal(true);
  };

  const handleWizardSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setWizardStep(2); // success view
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
          {t('tailored_offerings')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-950 dark:text-white mt-2">
          {t('plans_title')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm">
          {t('plans_subtitle')}
        </p>
      </div>

      {/* Filters strip */}
      <div className="flex justify-center mb-10">
        <Filters
          options={filterOptions}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      {/* Plans Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="glass-panel dark:glass-panel-gold rounded-3xl p-6 flex flex-col justify-between border border-slate-200/40 dark:border-white/5 relative overflow-hidden group hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
          >
            {plan.badge && (
              <span className="absolute top-4 right-4 bg-gold-400 text-navy-950 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full">
                {plan.badge}
              </span>
            )}
            
            <div className="space-y-6 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded">
                {plan.category}
              </span>
              <div>
                <h3 className="text-xl font-bold text-navy-950 dark:text-white">{plan.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[48px]">
                  {plan.description}
                </p>
              </div>

              {/* Price Details */}
              <div className="pb-4 border-b border-slate-200/50 dark:border-white/5">
                <p className="text-slate-400 text-[10px] uppercase font-bold leading-none">{t('standard_coverage_value')}</p>
                <p className="text-navy-950 dark:text-white font-extrabold text-xl mt-1">
                  ₹{plan.coverageAmount}
                </p>
                <p className="text-slate-400 text-[10px] uppercase font-bold leading-none mt-2">{t('starting_premium')}</p>
                <p className="text-gold-500 font-extrabold text-2xl mt-1">
                  ₹{plan.premiumMonthly}<span className="text-xs font-normal text-slate-500"> / month</span>
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-navy-950 dark:text-white">{t('included_features')}:</p>
                <ul className="space-y-2">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-500 dark:text-slate-400">
                      <FaCheckCircle className="text-gold-400 mt-0.5 shrink-0 text-sm" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-white/5">
              <Button
                variant="gold"
                className="w-full"
                onClick={() => handleApply(plan)}
              >
                {t('apply_now')}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Apply Wizard Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title={selectedPlan ? `Policy Application: ${selectedPlan.name}` : ''}
        size="md"
      >
        {wizardStep === 1 ? (
          <form onSubmit={handleWizardSubmit} className="space-y-4 pt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Please provide details below to configure and request policy underwriting approval.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Legal Name</label>
                <input required type="text" placeholder="Your Name" className="w-full px-3 py-2 text-xs bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg text-navy-950 dark:text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                <input required type="email" placeholder="Enter Email" className="w-full px-3 py-2 text-xs bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg text-navy-950 dark:text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mobile Phone</label>
                <input required type="tel" placeholder="Phone Number" className="w-full px-3 py-2 text-xs bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg text-navy-950 dark:text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date of Birth</label>
                <input required type="date" className="w-full px-3 py-2 text-xs bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg text-navy-950 dark:text-white" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Upload ID Copy (Passport/Driver License)</label>
              <div className="p-4 border border-dashed border-slate-300 dark:border-white/10 rounded-lg text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-navy-900">
                <span className="text-[10px] text-slate-400">Click to upload document file (PDF/JPEG)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-navy-900 border border-slate-200/50 dark:border-white/5 rounded-xl text-xs space-y-1">
              <p className="font-bold text-navy-950 dark:text-white">Premium Quote Outline</p>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Premium:</span>
                <span className="font-bold text-gold-500">₹{selectedPlan?.premiumMonthly}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Standard Sum Assured:</span>
                <span className="font-bold text-navy-950 dark:text-white">₹{selectedPlan?.coverageAmount}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setShowApplyModal(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" variant="gold" loading={isSubmitting}>Submit Application</Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 text-3xl mb-2 animate-pulse">
              <FaCheckCircle />
            </div>
            <h3 className="text-lg font-bold text-navy-950 dark:text-white">Application Received!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              Your application has been logged in our system. A verification case has been assigned to the **Employee Dashboard** queue. You can track progress instantly.
            </p>
            <Button variant="primary" onClick={() => setShowApplyModal(false)}>Close Wizard</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default Plans;
