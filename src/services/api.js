import { db, isFirebaseConfigured } from '../config/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc } from 'firebase/firestore';
import { PLANS } from './mockData';
import { logger } from './logger';

export const getPlans = async () => {
  if (!isFirebaseConfigured) {
    logger.info("Serving plans from local mock repository");
    return PLANS;
  }
  try {
    const plansCol = collection(db, 'plans');
    const plansSnapshot = await getDocs(plansCol);
    const plansList = plansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (plansList.length === 0) {
      logger.info("Firestore plans collection empty, seeding local plans data");
      // Seed plans to Firestore for convenience
      for (const plan of PLANS) {
        await setDoc(doc(db, 'plans', plan.id), plan);
      }
      return PLANS;
    }
    logger.info("Serving plans from Firestore database");
    return plansList;
  } catch (error) {
    logger.error("Failed to fetch plans from Firestore, falling back to mock data", { error: error.message });
    return PLANS;
  }
};

export const saveTicket = async (ticketData) => {
  const ticket = {
    ...ticketData,
    createdAt: new Date().toISOString(),
    status: 'open'
  };
  if (!isFirebaseConfigured) {
    logger.info("Saved inquiry ticket to sandbox mock database", ticket);
    return true;
  }
  try {
    const ticketsCol = collection(db, 'tickets');
    await addDoc(ticketsCol, ticket);
    logger.info("Successfully pushed inquiry ticket to Firestore", { ticketSubject: ticket.subject });
    return true;
  } catch (error) {
    logger.error("Failed to push inquiry ticket to Firestore", { error: error.message });
    return false;
  }
};

export const getUserProfile = async (uid) => {
  if (!isFirebaseConfigured) {
    return null;
  }
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    logger.error("Error retrieving user profile from Firestore", { uid, error: error.message });
    return null;
  }
};

export const createUserProfile = async (uid, profileData) => {
  if (!isFirebaseConfigured) {
    return true;
  }
  try {
    await setDoc(doc(db, 'users', uid), {
      ...profileData,
      uid,
      createdAt: new Date().toISOString()
    });
    logger.info("Created user profile inside Firestore", { uid, role: profileData.role });
    return true;
  } catch (error) {
    logger.error("Failed to create user profile inside Firestore", { uid, error: error.message });
    return false;
  }
};
