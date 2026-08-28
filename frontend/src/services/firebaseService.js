import { db } from '../firebase/firestore';
import { storage } from '../firebase/storage';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { logger } from './logger';

export const SHARED_DEFAULT_PLANS = [
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

const getLocalPlansSafe = () => {
  try {
    const raw = localStorage.getItem('sk_plans_local');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  try {
    localStorage.setItem('sk_plans_local', JSON.stringify(SHARED_DEFAULT_PLANS));
  } catch (e) {}
  return [...SHARED_DEFAULT_PLANS];
};

/**
 * Generic real-time synchronization for any collection.
 * Triggers the callback automatically when changes happen.
 */
export const subscribeToCollection = (collectionName, callback) => {
  if (!db) {
    if (collectionName === 'plans') {
      callback(getLocalPlansSafe());

      const handleUpdate = (e) => {
        if (e.detail && Array.isArray(e.detail)) callback(e.detail);
        else callback(getLocalPlansSafe());
      };
      window.addEventListener('sk_plans_updated', handleUpdate);
      return () => window.removeEventListener('sk_plans_updated', handleUpdate);
    }

    if (collectionName === 'awards') {
      const getLocalAwards = () => {
        try {
          const raw = localStorage.getItem('sk_awards_local');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
          }
        } catch (e) {}
        return [];
      };
      callback(getLocalAwards());

      const handleAwardsUpdate = (e) => {
        if (e.detail && Array.isArray(e.detail)) callback(e.detail);
        else callback(getLocalAwards());
      };
      window.addEventListener('sk_awards_updated', handleAwardsUpdate);
      return () => window.removeEventListener('sk_awards_updated', handleAwardsUpdate);
    }

    callback([]);
    return () => {};
  }
  try {
    const colRef = collection(db, collectionName);
    return onSnapshot(colRef, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      if (collectionName === 'plans' && items.length === 0) {
        callback(getLocalPlansSafe());
        return;
      }
      callback(items);
    }, (error) => {
      logger.error(`Real-time sync failed for collection: ${collectionName}`, { error: error.message });
      if (collectionName === 'plans') {
        callback(getLocalPlansSafe());
        return;
      }
      callback([]); // Unblock UI on error
    });
  } catch (error) {
    logger.error(`Failed to set up real-time listener for ${collectionName}`, { error: error.message });
    if (collectionName === 'plans') {
      callback(getLocalPlansSafe());
      return () => {};
    }
    callback([]); // Unblock UI on error
    return () => {};
  }
};

/**
 * Adds a new document with audit metadata fields.
 */
export const addDocWithAudit = async (collectionName, data, user = null) => {
  if (!db) {
    return data.id || `doc-${Date.now()}`;
  }
  try {
    const colRef = collection(db, collectionName);
    const docId = data.id || `doc-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const docRef = doc(colRef, docId);

    const auditData = {
      ...data,
      id: docId,
      status: data.status || 'Active',
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user ? { uid: user.uid || user.id, name: user.name, role: user.role } : 'system',
      updatedBy: user ? { uid: user.uid || user.id, name: user.name, role: user.role } : 'system'
    };

    await setDoc(docRef, auditData);
    logger.info(`Added document to ${collectionName} with audit trailing`, { docId });
    return docId;
  } catch (error) {
    logger.error(`Failed to add document to ${collectionName}`, { error: error.message });
    throw error;
  }
};

/**
 * Updates an existing document with audit metadata fields.
 */
export const updateDocWithAudit = async (collectionName, docId, data, user = null) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const auditUpdates = {
      ...data,
      updatedAt: new Date().toISOString(),
      updatedBy: user ? { uid: user.uid || user.id, name: user.name, role: user.role } : 'system'
    };

    await updateDoc(docRef, auditUpdates);
    logger.info(`Updated document in ${collectionName} with audit trailing`, { docId });
    return true;
  } catch (error) {
    logger.error(`Failed to update document in ${collectionName} (ID: ${docId})`, { error: error.message });
    throw error;
  }
};

/**
 * Deletes a document or marks it as deleted (soft delete by status).
 * We will perform hard deletes for configuration tables, but log the event.
 */
export const deleteDocWithAudit = async (collectionName, docId, user = null) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    logger.info(`Deleted document in ${collectionName}`, { docId, deletedBy: user ? user.name : 'system' });
    return true;
  } catch (error) {
    logger.error(`Failed to delete document in ${collectionName} (ID: ${docId})`, { error: error.message });
    throw error;
  }
};

/**
 * Uploads a file to Firebase Storage and returns the public download URL.
 */
export const uploadMediaFile = (file, folderPath = 'uploads') => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file object provided for upload"));
      return;
    }
    
    // File validation checks
    const maxSize = 8 * 1024 * 1024; // 8MB limit
    if (file.size > maxSize) {
      reject(new Error("File size exceeds the 8MB limit"));
      return;
    }

    if (!storage) {
      // Local development fallback: read file as Base64 Data URL
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
      return;
    }

    const fileName = file.name ? file.name : 'upload.jpg';
    const fileExtension = fileName.split('.').pop();
    const finalName = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${fileExtension}`;
    const storageRef = ref(storage, `${folderPath}/${finalName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // progress
      }, 
      (error) => {
        logger.warn("Media upload to cloud storage failed, using local Data URL fallback", { error: error.message });
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(error);
        reader.readAsDataURL(file);
      }, 
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          logger.info("File successfully uploaded to Firebase Storage", { path: `${folderPath}/${fileName}` });
          resolve(downloadURL);
        } catch (err) {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = () => reject(err);
          reader.readAsDataURL(file);
        }
      }
    );
  });
};

/**
 * Seeds a collection if it is empty.
 */
export const seedCollectionIfEmpty = async (collectionName, defaultData) => {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      logger.info(`Seeding empty collection: ${collectionName}`);
      for (const item of defaultData) {
        const docId = item.id || `seed-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const docRef = doc(colRef, docId);
        await setDoc(docRef, {
          ...item,
          id: docId,
          status: 'Active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'seeder',
          updatedBy: 'seeder'
        });
      }
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`Error seeding collection: ${collectionName}`, { error: error.message });
    return false;
  }
};
