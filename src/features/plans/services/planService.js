import { db } from '../../../firebase/firestore';
import { isFirebaseConfigured } from '../../../firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore';
import { addDocWithAudit } from '../../../services/firebaseService';
import { logger } from '../../../services/logger';

export const INITIAL_DEFAULT_PLANS = [
  {
    id: 'plan-tata-maha-raksha',
    title: 'Tata AIA Maha Raksha Supreme',
    name: 'Tata AIA Maha Raksha Supreme',
    company: 'Tata AIA',
    category: 'Life Insurance',
    categoryTag: 'Life',
    description: 'Comprehensive pure term life insurance with accelerated payout on 40 critical illnesses and whole-life cover up to age 100.',
    premiumMonthly: '850',
    premiumAmount: '850',
    billingCycle: 'Monthly',
    coverageAmount: '₹ 1 Crore',
    features: [
      'Cashless Claim Settlement within 4 hours',
      'Whole Life Cover Option up to 100 Years',
      'Accelerated Critical Illness Benefit',
      'Terminal Illness Payout up to 50%',
      'Tax Savings under Section 80C'
    ],
    status: 'Recommended Plan',
    priority: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'plan-star-comprehensive',
    title: 'Star Health Comprehensive Health Plan',
    name: 'Star Health Comprehensive Health Plan',
    company: 'Star Health',
    category: 'Health Insurance',
    categoryTag: 'Health',
    description: 'Zero capping on room rent, automatic restoration of entire sum insured, and cashless treatment across 14,000+ top Indian hospitals.',
    premiumMonthly: '1200',
    premiumAmount: '1200',
    billingCycle: 'Monthly',
    coverageAmount: '₹ 25 Lakhs',
    features: [
      'Zero Room Rent Sub-limits',
      '100% Automatic Sum Insured Restoration',
      'Bariatric & Psychiatric Care Coverage',
      'Pre & Post Hospitalization up to 180 Days',
      'Annual Free Master Health Checkup'
    ],
    status: 'Popular Plan',
    priority: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: 'plan-hdfc-click-2-protect',
    title: 'HDFC Life Click 2 Protect Super',
    name: 'HDFC Life Click 2 Protect Super',
    company: 'HDFC Life',
    category: 'Life Insurance',
    categoryTag: 'Life',
    description: 'Smart flexible protection plan with return of premium option and increasing life cover to protect against inflation.',
    premiumMonthly: '950',
    premiumAmount: '950',
    billingCycle: 'Monthly',
    coverageAmount: '₹ 1.5 Crore',
    features: [
      'Return of All Premiums on Survival',
      'Increasing Life Cover by 10% Every 5 Years',
      'Accidental Total Permanent Disability Waiver',
      'Tax Exemptions under Section 80C & 10(10D)'
    ],
    status: 'Active',
    priority: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: 'plan-bajaj-drive-smart',
    title: 'Bajaj Allianz DriveSmart Comprehensive',
    name: 'Bajaj Allianz DriveSmart Comprehensive',
    company: 'Bajaj Allianz',
    category: 'Motor Insurance',
    categoryTag: 'Motor',
    description: 'All-inclusive motor insurance covering zero depreciation, engine and gearbox safeguard, 24x7 roadside towing, and key replacement.',
    premiumMonthly: '650',
    premiumAmount: '650',
    billingCycle: 'Monthly',
    coverageAmount: 'Full IDV Value',
    features: [
      'Zero Depreciation on All Metal & Plastic Parts',
      'Engine & Electronic Circuit Protection',
      'Cashless Repair at 6,500+ Partner Garages',
      'Instant On-Spot Claim Surveyor via Mobile App'
    ],
    status: 'Active',
    priority: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: 'plan-sbi-general-bharat-sookshma',
    title: 'SBI General Bharat Sookshma Udyam',
    name: 'SBI General Bharat Sookshma Udyam',
    company: 'SBI Life Insurance',
    category: 'General Insurance',
    categoryTag: 'General',
    description: 'Standard fire and special perils insurance for small enterprises, office premises, warehouses, and physical machinery assets.',
    premiumMonthly: '450',
    premiumAmount: '450',
    billingCycle: 'Monthly',
    coverageAmount: '₹ 50 Lakhs',
    features: [
      'Protection against Fire, Storms, Earthquakes & Floods',
      'Stock in Trade & Plant Machinery Coverage',
      'Business Interruption Compensation',
      'Burglary and Theft Protection Cover'
    ],
    status: 'Active',
    priority: 5,
    createdAt: new Date().toISOString()
  }
];

// Helper to get local storage plans
const getLocalPlans = () => {
  try {
    const raw = localStorage.getItem('sk_plans_local');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error reading sk_plans_local:', e);
  }
  // Initialize with default plans if empty
  try {
    localStorage.setItem('sk_plans_local', JSON.stringify(INITIAL_DEFAULT_PLANS));
  } catch (e) {}
  return [...INITIAL_DEFAULT_PLANS];
};

// Helper to save local storage plans and broadcast update
const saveLocalPlans = (plansList) => {
  try {
    localStorage.setItem('sk_plans_local', JSON.stringify(plansList));
    window.dispatchEvent(new CustomEvent('sk_plans_updated', { detail: plansList }));
  } catch (e) {
    console.warn('Error writing sk_plans_local:', e);
  }
};

export const getPlans = async (lastVisibleDoc = null, pageSize = 20) => {
  if (!isFirebaseConfigured || !db) {
    const local = getLocalPlans();
    return {
      plans: local,
      lastVisible: null
    };
  }
  
  try {
    const plansCol = collection(db, 'plans');
    let q = query(plansCol, orderBy('createdAt', 'desc'), limit(pageSize));
    if (lastVisibleDoc) {
      q = query(plansCol, orderBy('createdAt', 'desc'), startAfter(lastVisibleDoc), limit(pageSize));
    }
    const plansSnapshot = await getDocs(q);
    const plansList = plansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (plansList.length === 0) {
      const local = getLocalPlans();
      return { plans: local, lastVisible: null };
    }

    return {
      plans: plansList,
      lastVisible: plansSnapshot.docs[plansSnapshot.docs.length - 1]
    };
  } catch (error) {
    logger.warn("Failed to fetch plans from Firestore, using local fallback", { error: error.message });
    const local = getLocalPlans();
    return {
      plans: local,
      lastVisible: null
    };
  }
};

export const createPlan = async (planData, user = null) => {
  const planId = planData.id || `plan-${Date.now()}`;
  const completePlan = {
    ...planData,
    id: planId,
    name: planData.name || planData.title,
    title: planData.title || planData.name,
    status: planData.status || 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: user ? (user.email || user.username || 'manager') : 'manager'
  };

  // Always update local storage for immediate offline/localhost access
  const currentLocal = getLocalPlans();
  const updated = [completePlan, ...currentLocal.filter(p => p.id !== planId)];
  saveLocalPlans(updated);

  if (isFirebaseConfigured && db) {
    try {
      const docId = await addDocWithAudit('plans', completePlan, user);
      logger.info("Successfully created new plan in Firestore", { planId: docId });
      return { success: true, id: docId };
    } catch (error) {
      logger.warn("Firestore create failed, stored locally", { error: error.message });
      return { success: true, id: planId };
    }
  }

  logger.info("Successfully created new plan in Local Sandbox", { planId });
  return { success: true, id: planId };
};

export const updatePlan = async (planId, planData, user = null) => {
  const currentLocal = getLocalPlans();
  const index = currentLocal.findIndex(p => p.id === planId);
  const updatedPayload = {
    ...(index !== -1 ? currentLocal[index] : {}),
    ...planData,
    id: planId,
    name: planData.name || planData.title,
    title: planData.title || planData.name,
    updatedAt: new Date().toISOString(),
    updatedBy: user ? (user.email || user.username || 'manager') : 'manager'
  };

  if (index !== -1) {
    currentLocal[index] = updatedPayload;
  } else {
    currentLocal.unshift(updatedPayload);
  }
  saveLocalPlans(currentLocal);

  if (isFirebaseConfigured && db) {
    try {
      const planRef = doc(db, 'plans', planId);
      await updateDoc(planRef, updatedPayload);
      logger.info("Successfully updated plan in Firestore", { planId });
      return { success: true };
    } catch (error) {
      logger.warn("Firestore update failed, updated locally", { error: error.message });
      return { success: true };
    }
  }

  logger.info("Successfully updated plan in Local Sandbox", { planId });
  return { success: true };
};

export const deletePlan = async (planId) => {
  const currentLocal = getLocalPlans();
  const filtered = currentLocal.filter(p => p.id !== planId);
  saveLocalPlans(filtered);

  if (isFirebaseConfigured && db) {
    try {
      const planRef = doc(db, 'plans', planId);
      await deleteDoc(planRef);
      logger.info("Successfully deleted plan from Firestore", { planId });
      return { success: true };
    } catch (error) {
      logger.warn("Firestore delete failed, deleted locally", { error: error.message });
      return { success: true };
    }
  }

  logger.info("Successfully deleted plan from Local Sandbox", { planId });
  return { success: true };
};
