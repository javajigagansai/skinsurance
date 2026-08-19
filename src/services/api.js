import { db } from '../firebase/firestore';
import { isFirebaseConfigured } from '../firebase/config';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore';
import { 
  addDocWithAudit, 
  updateDocWithAudit, 
  deleteDocWithAudit,
  seedCollectionIfEmpty 
} from './firebaseService';
import { logger } from './logger';

// -------------------------------------------------------------
// PLANS Collection CRUD
// -------------------------------------------------------------

export const getSettings = async (settingName) => {
  try {
    const settingDoc = await getDoc(doc(db, 'settings', settingName));
    if (settingDoc.exists()) {
      return settingDoc.data();
    }
    return null;
  } catch (error) {
    logger.error(`Failed to fetch setting ${settingName}`, { error: error.message });
    return null;
  }
};



// -------------------------------------------------------------
// INQUIRIES & TICKETS CRUD
// -------------------------------------------------------------
export const saveTicket = async (ticketData, user = null) => {
  try {
    const ticket = {
      ...ticketData,
      status: 'Open'
    };
    await addDocWithAudit('tickets', ticket, user);
    logger.info("Successfully pushed inquiry ticket to Firestore", { ticketSubject: ticket.subject });
    return true;
  } catch (error) {
    logger.error("Failed to push inquiry ticket to Firestore", { error: error.message });
    return false;
  }
};

// -------------------------------------------------------------
// LEADS (WELCOME POPUP) CRUD
// -------------------------------------------------------------
export const saveLead = async (leadData) => {
  try {
    const leadRecord = {
      ...leadData,
      source: leadData.source || 'Welcome Popup',
      status: leadData.status || 'New',
      createdAt: new Date().toISOString()
    };
    if (isFirebaseConfigured && db) {
      await addDocWithAudit('leads', leadRecord);
      logger.info("Successfully saved visitor lead to Firestore", { email: leadData.email, phone: leadData.phone });
    }
    // Also mirror to localStorage for persistent local state
    try {
      const existing = JSON.parse(localStorage.getItem('sk_leads_local') || '[]');
      existing.unshift({ id: `lead-${Date.now()}`, ...leadRecord });
      localStorage.setItem('sk_leads_local', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {
      console.warn("Could not save to local leads cache", e);
    }
    return true;
  } catch (error) {
    logger.error("Failed to save visitor lead to Firestore", { error: error.message });
    // Still ensure local storage fallback
    try {
      const existing = JSON.parse(localStorage.getItem('sk_leads_local') || '[]');
      existing.unshift({ id: `lead-${Date.now()}`, ...leadData, createdAt: new Date().toISOString() });
      localStorage.setItem('sk_leads_local', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {}
    return false;
  }
};

export const getLeads = async () => {
  try {
    if (isFirebaseConfigured && db) {
      const colRef = collection(db, 'leads');
      const q = query(colRef, orderBy('createdAt', 'desc'), limit(50));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
    return JSON.parse(localStorage.getItem('sk_leads_local') || '[]');
  } catch (error) {
    logger.error("Failed to fetch leads", { error: error.message });
    return JSON.parse(localStorage.getItem('sk_leads_local') || '[]');
  }
};

// -------------------------------------------------------------
// ADVISORY APPOINTMENTS CRUD
// -------------------------------------------------------------
export const saveAppointment = async (appointmentData, user = null) => {
  try {
    await addDocWithAudit('appointments', appointmentData, user);
    logger.info("Successfully saved advisor appointment to Firestore", { refId: appointmentData.id });
    return true;
  } catch (error) {
    logger.error("Failed to save advisor appointment to Firestore", { error: error.message });
    return false;
  }
};



// -------------------------------------------------------------
// PREMIUM CALCULATOR HISTORY CRUD
// -------------------------------------------------------------
export const saveCalculation = async (calcData, user = null) => {
  try {
    await addDocWithAudit('calculatorHistory', calcData, user);
    logger.info("Saved premium calculation record in Firestore");
    return true;
  } catch (error) {
    logger.error("Failed to save premium calculation record in Firestore", { error: error.message });
    return false;
  }
};



// -------------------------------------------------------------
// AUDIT LOGGING UTILITY
// -------------------------------------------------------------
export const saveAuditLog = async (action, user = null, details = {}) => {
  try {
    const log = {
      action,
      user: user ? `${user.name} (${user.role})` : 'System',
      timestamp: new Date().toISOString(),
      ip: details.ip || 'localhost',
      status: details.status || 'Success',
      details
    };
    await addDoc(collection(db, 'logs'), log);
  } catch (error) {
    console.error("Failed to record system audit log", error);
  }
};

// -------------------------------------------------------------
// DYNAMIC UI DATA FETCHERS
// -------------------------------------------------------------

export const getNotifications = async () => {
  try {
    const colRef = collection(db, 'notifications');
    const q = query(colRef, orderBy('createdAt', 'desc'), limit(10));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    logger.error("Failed to fetch notifications", { error: error.message });
    return [];
  }
};

export const DEFAULT_CAREERS = [
  {
    id: 'career-1',
    title: 'Financial Planning & Wealth Advisory Associate',
    type: 'Full-time',
    department: 'Advisory & Sales',
    location: 'Kanchipuram, TN (On-site)',
    stipendOrSalary: '₹25,000 - ₹45,000 / mo + Incentives',
    duration: 'Permanent',
    experience: '1-3 Years',
    openings: 3,
    description: 'Provide personalized financial planning, retirement strategy, and multi-brand insurance consultations to retail and corporate clients.',
    requirements: ['Graduate in Finance, Commerce, or related fields', 'Strong communication and client relationship skills', 'Basic knowledge of Life & Health insurance products'],
    responsibilities: ['Conduct financial need analysis for prospective clients', 'Present unbiased comparison of top insurance portfolios', 'Maintain ongoing client relationships and policy renewals'],
    status: 'Active',
    createdAt: new Date().toISOString()
  },
  {
    id: 'career-2',
    title: 'Insurance & Financial Planning Intern',
    type: 'Internship',
    department: 'Advisory & Sales',
    location: 'Kanchipuram, TN (On-site)',
    stipendOrSalary: '₹10,000 - ₹15,000 / mo (Stipend)',
    duration: '3 - 6 Months',
    experience: 'Freshers / College Students',
    openings: 5,
    description: 'Gain hands-on training in financial underwriting, customer relationship management, and live insurance portfolio analysis under senior mentors.',
    requirements: ['Pre-final / Final year students (B.Com, BBA, MBA, Economics)', 'Eagerness to learn financial planning concepts', 'Good conversational Tamil & English'],
    responsibilities: ['Assist advisors with policy quotes and client proposals', 'Participate in client onboarding and document verification', 'Complete weekly mentorship modules with certification'],
    status: 'Active',
    createdAt: new Date().toISOString()
  },
  {
    id: 'career-3',
    title: 'Claims Processing & Operations Specialist',
    type: 'Full-time',
    department: 'Operations & Claims',
    location: 'Kanchipuram, TN (On-site)',
    stipendOrSalary: '₹22,000 - ₹35,000 / mo',
    duration: 'Permanent',
    experience: '1-2 Years',
    openings: 2,
    description: 'Coordinate end-to-end cashless hospital approvals and fast-track claim settlements across our 14,000+ hospital network.',
    requirements: ['Experience in health/general insurance claims administration', 'Detail-oriented with documentation proficiency', 'Proficiency in MS Excel and client management software'],
    responsibilities: ['Coordinate directly with TPA and insurer claim desks', 'Assist clients with emergency claim approvals and reimbursements', 'Track claim settlement timelines and turnaround benchmarks'],
    status: 'Active',
    createdAt: new Date().toISOString()
  },
  {
    id: 'career-4',
    title: 'Digital Marketing & Content Growth Intern',
    type: 'Internship',
    department: 'Marketing & Growth',
    location: 'Hybrid / Kanchipuram',
    stipendOrSalary: '₹8,000 - ₹12,000 / mo (Stipend)',
    duration: '3 Months',
    experience: 'Students / Freshers',
    openings: 2,
    description: 'Drive awareness on financial literacy, create engaging social media posts, and support YouTube & Instagram growth campaigns for SK Smart Investments.',
    requirements: ['Familiarity with Canva, Instagram Reels, and basic video editing', 'Creative mindset with interest in personal finance topics', 'Good English and Tamil copywriting skills'],
    responsibilities: ['Design educational infographics and financial literacy reels', 'Manage social media channels and audience engagement', 'Assist in SEO and community outreach initiatives'],
    status: 'Active',
    createdAt: new Date().toISOString()
  }
];

export const getCareers = async () => {
  try {
    if (isFirebaseConfigured && db) {
      const colRef = collection(db, 'careers');
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
    const local = localStorage.getItem('sk_careers_local');
    if (local) return JSON.parse(local);
    localStorage.setItem('sk_careers_local', JSON.stringify(DEFAULT_CAREERS));
    return DEFAULT_CAREERS;
  } catch (error) {
    logger.error("Failed to fetch careers", { error: error.message });
    const local = localStorage.getItem('sk_careers_local');
    return local ? JSON.parse(local) : DEFAULT_CAREERS;
  }
};

export const createCareerJob = async (jobData, user = null) => {
  try {
    const jobRecord = {
      ...jobData,
      status: jobData.status || 'Active',
      createdAt: new Date().toISOString()
    };
    let docId = `job-${Date.now()}`;
    if (isFirebaseConfigured && db) {
      const ref = await addDocWithAudit('careers', jobRecord, user);
      if (ref && ref.id) docId = ref.id;
    }
    // Update local cache
    const current = JSON.parse(localStorage.getItem('sk_careers_local') || JSON.stringify(DEFAULT_CAREERS));
    current.unshift({ id: docId, ...jobRecord });
    localStorage.setItem('sk_careers_local', JSON.stringify(current));
    return { id: docId, ...jobRecord };
  } catch (error) {
    logger.error("Failed to create career job", { error: error.message });
    const docId = `job-${Date.now()}`;
    const jobRecord = { id: docId, ...jobData, createdAt: new Date().toISOString() };
    const current = JSON.parse(localStorage.getItem('sk_careers_local') || JSON.stringify(DEFAULT_CAREERS));
    current.unshift(jobRecord);
    localStorage.setItem('sk_careers_local', JSON.stringify(current));
    return jobRecord;
  }
};

export const updateCareerJob = async (id, jobData, user = null) => {
  try {
    if (isFirebaseConfigured && db) {
      await updateDocWithAudit('careers', id, jobData, user);
    }
    const current = JSON.parse(localStorage.getItem('sk_careers_local') || JSON.stringify(DEFAULT_CAREERS));
    const updated = current.map(j => j.id === id ? { ...j, ...jobData, updatedAt: new Date().toISOString() } : j);
    localStorage.setItem('sk_careers_local', JSON.stringify(updated));
    return true;
  } catch (error) {
    logger.error("Failed to update career job", { error: error.message });
    const current = JSON.parse(localStorage.getItem('sk_careers_local') || JSON.stringify(DEFAULT_CAREERS));
    const updated = current.map(j => j.id === id ? { ...j, ...jobData, updatedAt: new Date().toISOString() } : j);
    localStorage.setItem('sk_careers_local', JSON.stringify(updated));
    return true;
  }
};

export const deleteCareerJob = async (id, user = null) => {
  try {
    if (isFirebaseConfigured && db) {
      await deleteDocWithAudit('careers', id, user);
    }
    const current = JSON.parse(localStorage.getItem('sk_careers_local') || JSON.stringify(DEFAULT_CAREERS));
    const filtered = current.filter(j => j.id !== id);
    localStorage.setItem('sk_careers_local', JSON.stringify(filtered));
    return true;
  } catch (error) {
    logger.error("Failed to delete career job", { error: error.message });
    const current = JSON.parse(localStorage.getItem('sk_careers_local') || JSON.stringify(DEFAULT_CAREERS));
    const filtered = current.filter(j => j.id !== id);
    localStorage.setItem('sk_careers_local', JSON.stringify(filtered));
    return true;
  }
};

// -------------------------------------------------------------
// JOB APPLICATIONS CRUD
// -------------------------------------------------------------
export const saveJobApplication = async (appData) => {
  try {
    const record = {
      ...appData,
      status: 'Pending',
      appliedAt: new Date().toISOString()
    };
    if (isFirebaseConfigured && db) {
      await addDocWithAudit('job_applications', record);
    }
    const current = JSON.parse(localStorage.getItem('sk_applications_local') || '[]');
    current.unshift({ id: `app-${Date.now()}`, ...record });
    localStorage.setItem('sk_applications_local', JSON.stringify(current));
    return true;
  } catch (error) {
    logger.error("Failed to save job application", { error: error.message });
    const current = JSON.parse(localStorage.getItem('sk_applications_local') || '[]');
    current.unshift({ id: `app-${Date.now()}`, ...appData, status: 'Pending', appliedAt: new Date().toISOString() });
    localStorage.setItem('sk_applications_local', JSON.stringify(current));
    return true;
  }
};

export const getJobApplications = async () => {
  try {
    if (isFirebaseConfigured && db) {
      const colRef = collection(db, 'job_applications');
      const q = query(colRef, orderBy('appliedAt', 'desc'), limit(100));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
    return JSON.parse(localStorage.getItem('sk_applications_local') || '[]');
  } catch (error) {
    logger.error("Failed to fetch applications", { error: error.message });
    return JSON.parse(localStorage.getItem('sk_applications_local') || '[]');
  }
};

export const updateJobApplicationStatus = async (id, status, user = null) => {
  try {
    if (isFirebaseConfigured && db) {
      await updateDocWithAudit('job_applications', id, { status }, user);
    }
    const current = JSON.parse(localStorage.getItem('sk_applications_local') || '[]');
    const updated = current.map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem('sk_applications_local', JSON.stringify(updated));
    return true;
  } catch (error) {
    logger.error("Failed to update application status", { error: error.message });
    const current = JSON.parse(localStorage.getItem('sk_applications_local') || '[]');
    const updated = current.map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem('sk_applications_local', JSON.stringify(updated));
    return true;
  }
};

export const deleteJobApplication = async (id, user = null) => {
  try {
    if (isFirebaseConfigured && db) {
      await deleteDocWithAudit('job_applications', id, user);
    }
    const current = JSON.parse(localStorage.getItem('sk_applications_local') || '[]');
    const filtered = current.filter(a => a.id !== id);
    localStorage.setItem('sk_applications_local', JSON.stringify(filtered));
    return true;
  } catch (error) {
    logger.error("Failed to delete application", { error: error.message });
    const current = JSON.parse(localStorage.getItem('sk_applications_local') || '[]');
    const filtered = current.filter(a => a.id !== id);
    localStorage.setItem('sk_applications_local', JSON.stringify(filtered));
    return true;
  }
};

// -------------------------------------------------------------
// FLYERS & PROMOTIONAL BANNERS CRUD
// -------------------------------------------------------------
export const DEFAULT_FLYERS = [
  {
    id: 'flyer-video-spotlight',
    title: 'SK Smart Protection Spotlight',
    subtitle: 'Watch how SK Smart Investments delivers 100% paperless digital onboarding and instant claim support.',
    tag: 'VIDEO SPOTLIGHT',
    video: '/sk_mobile_compressed.mp4',
    image: '/sk_mobile_compressed.mp4',
    mediaType: 'video',
    category: 'Video Spotlight',
    link: '/appointment',
    status: 'Active'
  },
  {
    id: 'flyer-tata-cancer',
    title: 'Tata AIA Sampoorna Care - Cancer',
    subtitle: 'Cancer Ko Cancel Karne Ke Liye Ho Jao Taiyaar. First cancer plan with income replacement during treatment & recovery.',
    tag: 'FIRST CANCER PLAN',
    image: '/flyers/tata_aia_cancer_care.png',
    category: 'Critical Illness & Health',
    link: '/plans?category=Health',
    status: 'Active'
  },
  {
    id: 'flyer-1',
    title: 'Complete Health Protection',
    subtitle: '100% Cashless hospitalization at 14,000+ top hospitals with zero co-pay options.',
    tag: 'HEALTH SHIELD',
    image: '/casual/healthinsurance.jpg',
    category: 'Health Insurance',
    link: '/plans?category=Health',
    status: 'Active'
  },
  {
    id: 'flyer-2',
    title: 'Guaranteed Life & Term Cover',
    subtitle: 'High sum assured with tax benefits under 80C & monthly pension payout options.',
    tag: 'LIFE ASSURANCE',
    image: '/casual/lifeinsurancepolicy.jpg',
    category: 'Life Insurance',
    link: '/plans?category=Life',
    status: 'Active'
  },
  {
    id: 'flyer-3',
    title: 'Comprehensive General & Asset Cover',
    subtitle: 'Protect your vehicles, business, and commercial property with instant claim approval.',
    tag: 'GENERAL & MOTOR',
    image: '/casual/insurancepolicy.jpg',
    category: 'General Insurance',
    link: '/plans?category=General',
    status: 'Active'
  }
];

export const getFlyers = async () => {
  try {
    if (isFirebaseConfigured && db) {
      const colRef = collection(db, 'flyers');
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
    const local = localStorage.getItem('sk_flyers_local');
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed && parsed.some(f => f.id === 'flyer-tata-cancer')) {
        return parsed;
      }
    }
    localStorage.setItem('sk_flyers_local', JSON.stringify(DEFAULT_FLYERS));
    return DEFAULT_FLYERS;
  } catch (error) {
    logger.error("Failed to fetch flyers", { error: error.message });
    const local = localStorage.getItem('sk_flyers_local');
    return local ? JSON.parse(local) : DEFAULT_FLYERS;
  }
};

export const createFlyer = async (flyerData, user = null) => {
  try {
    const record = {
      ...flyerData,
      status: flyerData.status || 'Active',
      createdAt: new Date().toISOString()
    };
    let docId = `flyer-${Date.now()}`;
    if (isFirebaseConfigured && db) {
      const ref = await addDocWithAudit('flyers', record, user);
      if (ref && ref.id) docId = ref.id;
    }
    const current = JSON.parse(localStorage.getItem('sk_flyers_local') || JSON.stringify(DEFAULT_FLYERS));
    current.unshift({ id: docId, ...record });
    localStorage.setItem('sk_flyers_local', JSON.stringify(current));
    return { id: docId, ...record };
  } catch (error) {
    logger.error("Failed to create flyer", { error: error.message });
    const docId = `flyer-${Date.now()}`;
    const record = { id: docId, ...flyerData, createdAt: new Date().toISOString() };
    const current = JSON.parse(localStorage.getItem('sk_flyers_local') || JSON.stringify(DEFAULT_FLYERS));
    current.unshift(record);
    localStorage.setItem('sk_flyers_local', JSON.stringify(current));
    return record;
  }
};

export const updateFlyer = async (id, flyerData, user = null) => {
  try {
    if (isFirebaseConfigured && db) {
      await updateDocWithAudit('flyers', id, flyerData, user);
    }
    const current = JSON.parse(localStorage.getItem('sk_flyers_local') || JSON.stringify(DEFAULT_FLYERS));
    const updated = current.map(f => f.id === id ? { ...f, ...flyerData } : f);
    localStorage.setItem('sk_flyers_local', JSON.stringify(updated));
    return true;
  } catch (error) {
    logger.error("Failed to update flyer", { error: error.message });
    const current = JSON.parse(localStorage.getItem('sk_flyers_local') || JSON.stringify(DEFAULT_FLYERS));
    const updated = current.map(f => f.id === id ? { ...f, ...flyerData } : f);
    localStorage.setItem('sk_flyers_local', JSON.stringify(updated));
    return true;
  }
};

export const deleteFlyer = async (id, user = null) => {
  try {
    if (isFirebaseConfigured && db) {
      await deleteDocWithAudit('flyers', id, user);
    }
    const current = JSON.parse(localStorage.getItem('sk_flyers_local') || JSON.stringify(DEFAULT_FLYERS));
    const filtered = current.filter(f => f.id !== id);
    localStorage.setItem('sk_flyers_local', JSON.stringify(filtered));
    return true;
  } catch (error) {
    logger.error("Failed to delete flyer", { error: error.message });
    const current = JSON.parse(localStorage.getItem('sk_flyers_local') || JSON.stringify(DEFAULT_FLYERS));
    const filtered = current.filter(f => f.id !== id);
    localStorage.setItem('sk_flyers_local', JSON.stringify(filtered));
    return true;
  }
};

export const getBlogPosts = async () => {
  try {
    const colRef = collection(db, 'blogs');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    logger.error("Failed to fetch blogs", { error: error.message });
    return [];
  }
};

export const getFaqs = async () => {
  try {
    const colRef = collection(db, 'faqs');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    logger.error("Failed to fetch faqs", { error: error.message });
    return [];
  }
};

export const getStats = async () => {
  try {
    const docRef = doc(db, 'settings', 'home_stats');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists() && snapshot.data().stats) {
      return snapshot.data().stats;
    }
    return [];
  } catch (error) {
    logger.error("Failed to fetch home stats", { error: error.message });
    return [];
  }
};

// -------------------------------------------------------------
// CONSULTATION LEADS (Plan Your Protection)
// -------------------------------------------------------------

export const submitConsultationLead = async (leadData) => {
  try {
    const record = {
      ...leadData,
      status: 'New',
      source: leadData.source || 'Home Lead Capture',
      createdAt: new Date().toISOString()
    };
    let docId = `lead-${Date.now()}`;
    if (isFirebaseConfigured && db) {
      const ref = await addDocWithAudit('consultation_leads', record);
      if (ref && typeof ref === 'string') docId = ref;
      else if (ref && ref.id) docId = ref.id;
    }
    const current = JSON.parse(localStorage.getItem('sk_consultation_leads_local') || '[]');
    current.unshift({ id: docId, ...record });
    localStorage.setItem('sk_consultation_leads_local', JSON.stringify(current));
    logger.info("Successfully recorded consultation lead", { docId, name: leadData.name });
    return { id: docId, ...record };
  } catch (error) {
    logger.error("Failed to submit consultation lead", { error: error.message });
    const record = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      source: leadData.source || 'Home Lead Capture',
      createdAt: new Date().toISOString()
    };
    const current = JSON.parse(localStorage.getItem('sk_consultation_leads_local') || '[]');
    current.unshift(record);
    localStorage.setItem('sk_consultation_leads_local', JSON.stringify(current));
    return record;
  }
};

export const getConsultationLeads = async () => {
  try {
    if (isFirebaseConfigured && db) {
      const colRef = collection(db, 'consultation_leads');
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      }
    }
    const local = localStorage.getItem('sk_consultation_leads_local');
    return local ? JSON.parse(local) : [];
  } catch (error) {
    logger.error("Failed to fetch consultation leads", { error: error.message });
    const local = localStorage.getItem('sk_consultation_leads_local');
    return local ? JSON.parse(local) : [];
  }
};

export const updateConsultationLeadStatus = async (id, status, user = null) => {
  try {
    if (isFirebaseConfigured && db) {
      await updateDocWithAudit('consultation_leads', id, { status }, user);
    }
    const current = JSON.parse(localStorage.getItem('sk_consultation_leads_local') || '[]');
    const updated = current.map(l => l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l);
    localStorage.setItem('sk_consultation_leads_local', JSON.stringify(updated));
    return true;
  } catch (error) {
    logger.error("Failed to update consultation lead status", { error: error.message });
    const current = JSON.parse(localStorage.getItem('sk_consultation_leads_local') || '[]');
    const updated = current.map(l => l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l);
    localStorage.setItem('sk_consultation_leads_local', JSON.stringify(updated));
    return true;
  }
};

export const deleteConsultationLead = async (id, user = null) => {
  try {
    if (isFirebaseConfigured && db) {
      await deleteDocWithAudit('consultation_leads', id, user);
    }
    const current = JSON.parse(localStorage.getItem('sk_consultation_leads_local') || '[]');
    const filtered = current.filter(l => l.id !== id);
    localStorage.setItem('sk_consultation_leads_local', JSON.stringify(filtered));
    return true;
  } catch (error) {
    logger.error("Failed to delete consultation lead", { error: error.message });
    const current = JSON.parse(localStorage.getItem('sk_consultation_leads_local') || '[]');
    const filtered = current.filter(l => l.id !== id);
    localStorage.setItem('sk_consultation_leads_local', JSON.stringify(filtered));
    return true;
  }
};
