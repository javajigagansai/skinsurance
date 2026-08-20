import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../../firebase/auth';
import { db } from '../../../firebase/firestore';
import { isFirebaseConfigured } from '../../../firebase/config';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { logger } from '../../../services/logger';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Seed default collections and listen to Auth state changes
  useEffect(() => {
    if (!isFirebaseConfigured) {
      // Local development sandbox mode: restore persisted local session
      try {
        const saved = localStorage.getItem('sk_auth_user') || sessionStorage.getItem('sk_auth_user');
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch (e) {
        console.warn('Error restoring local session:', e);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          // Fetch user profile doc from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          let profile = null;
          
          try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              profile = userDoc.data();
            }
          } catch (readErr) {
            console.warn('Firestore read failed, will create profile:', readErr.message);
          }
          
          if (!profile) {
            logger.warn('User has auth account but no Firestore profile', { uid: firebaseUser.uid });
            setUser(null);
            setLoading(false);
            return;
          }
          
          profile.emailVerified = firebaseUser.emailVerified;
          profile.uid = firebaseUser.uid;
          setUser(profile);
          logger.auth(`User signed in via Firebase`, true, { email: firebaseUser.email });
        } catch (error) {
          // Strictly fail secure: If Firestore fails, DO NOT grant access.
          console.error("Auth state change error:", error.message);
          setUser(null);
          logger.error("Authentication rejected due to Firestore error", { error: error.message });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password, rememberMe = true) => {
    let cleanedEmail = email.trim().toLowerCase();
    
    if (!cleanedEmail.includes('@')) {
      cleanedEmail = `${cleanedEmail}@sksmart.com`;
    }

    logger.info(`Login attempt started`, { email: cleanedEmail });

    if (!isFirebaseConfigured) {
      // Seamless Local Sandbox Auth: Allow developer/manager access to Dashboard
      const devProfile = {
        uid: 'dev-manager-001',
        email: cleanedEmail || 'admin@sksmart.com',
        username: (cleanedEmail || 'admin').split('@')[0],
        name: 'SK Manager (Admin)',
        role: 'manager',
        emailVerified: true
      };
      setUser(devProfile);
      try {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('sk_auth_user', JSON.stringify(devProfile));
      } catch (e) {}
      logger.info('Logged in successfully in Local Sandbox Mode', { email: cleanedEmail });
      return true;
    }

    try {
      await setPersistence(
        auth, 
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      const userCredential = await signInWithEmailAndPassword(auth, cleanedEmail, password);
      
      // Auth succeeded - try Firestore but don't fail login if it errors
      try {
        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userDocRef);
        let profile;
        if (userDoc.exists()) {
          profile = userDoc.data();
        } else {
          logger.warn('User logged in but no Firestore profile exists', { uid: userCredential.user.uid });
          throw new Error('Access Denied: No manager profile found.');
        }
        profile.emailVerified = userCredential.user.emailVerified;
        profile.uid = userCredential.user.uid;
        setUser(profile);
      } catch (firestoreErr) {
        console.warn('Firestore profile error during login, failing securely:', firestoreErr.message);
        // Fail secure: reject login if we cannot verify role from Firestore
        throw new Error('Database access failed. Could not verify user role.');
      }
      return true;
    } catch (error) {
      logger.auth(`Original Login Error`, false, { error: error.code, message: error.message });
      logger.auth(`Firebase Authentication failed`, false, { email: cleanedEmail, error: error.message });
      return `Auth Error: ${error.message}`;
    }
  };

  const register = async (email, password, name) => {
    if (!isFirebaseConfigured) {
      const profile = {
        uid: `dev-cust-${Date.now()}`,
        username: email.split('@')[0],
        name: name || 'Customer',
        role: 'customer',
        email: email,
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`
      };
      setUser(profile);
      try {
        localStorage.setItem('sk_auth_user', JSON.stringify(profile));
      } catch (e) {}
      return true;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      const profile = {
        username: email.split('@')[0],
        name: name,
        role: 'customer',
        email: email,
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`
      };
      await setDoc(doc(db, 'users', result.user.uid), profile);
      logger.info("Real user registered and profile initialized in Firestore", { email });
      return true;
    } catch (error) {
      logger.error("Failed to register account via Firebase Auth", { error: error.message });
      throw error;
    }
  };

  const sendPasswordReset = async (email) => {
    if (!isFirebaseConfigured) {
      return true;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      logger.info("Sent password reset email via Firebase", { email });
      return true;
    } catch (error) {
      logger.error("Failed to send password reset email", { error: error.message });
      throw error;
    }
  };

  const logout = async () => {
    logger.info(`User logout requested`);
    try {
      localStorage.removeItem('sk_auth_user');
      sessionStorage.removeItem('sk_auth_user');
    } catch (e) {}
    setUser(null);
    if (isFirebaseConfigured) {
      try {
        await signOut(auth);
      } catch (error) {
        logger.error(`Error during Firebase signout`, { error: error.message });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      sendPasswordReset, 
      
      logout, 
      isAuthenticated: !!user, 
      isManager: user?.role === 'manager', 
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
