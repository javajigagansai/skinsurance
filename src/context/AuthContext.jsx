import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, isFirebaseConfigured } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { logger } from '../services/logger';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const mockUsers = {
    customer: { username: 'john_customer', name: 'John Doe', role: 'customer', email: 'customer@mail.com', id: 'CUST-8392', policyCount: 3 },
    agent: { username: 'sarah_agent', name: 'Sarah Jenkins', role: 'agent', email: 'agent@mail.com', id: 'AGNT-1092', clientCount: 42, commission: '₹12,450' },
    telecaller: { username: 'mike_caller', name: 'Mike Ross', role: 'telecaller', email: 'telecaller@mail.com', id: 'CALL-0921', leadCount: 156, callsMade: 48 },
    employee: { username: 'jane_employee', name: 'Jane Watson', role: 'employee', email: 'employee@mail.com', id: 'EMP-7721', queueSize: 14 },
    manager: { username: 'david_manager', name: 'David Vance', role: 'manager', email: 'manager1@mail.com', id: 'MGR-4490', department: 'Claims & Operations' },
    admin: { username: 'alex_admin', name: 'Alex Mercer', role: 'admin', email: 'admin@mail.com', id: 'ADM-0001', systemAccess: 'Root' }
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(isFirebaseConfigured);

  // Set up Firebase Auth state listener
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch user profile doc from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          let profile = null;
          if (userDoc.exists()) {
            profile = userDoc.data();
          } else {
            // If new user registered via Firebase Auth, create default customer profile
            const emailPart = firebaseUser.email.split('@')[0];
            const detectedRole = firebaseUser.email.includes('admin') ? 'admin' :
                                 firebaseUser.email.includes('manager') ? 'manager' : 'customer';
            
            profile = {
              username: emailPart,
              name: emailPart.replace('_', ' ').toUpperCase(),
              role: detectedRole,
              email: firebaseUser.email,
              id: `USER-${Math.floor(1000 + Math.random() * 9000)}`
            };
            await setDoc(userDocRef, profile);
          }
          
          // Attach email verification status to user session
          profile.emailVerified = firebaseUser.emailVerified;
          
          setUser(profile);
          localStorage.setItem('user', JSON.stringify(profile));
          logger.auth(`User signed in via Firebase`, true, { email: firebaseUser.email });
        } catch (error) {
          logger.error("Failed to fetch user Firestore profile on auth change", { error: error.message });
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password, rememberMe = true) => {
    const cleanedEmail = email.trim().toLowerCase();
    logger.info(`Login attempt started`, { email: cleanedEmail });

    if (!isFirebaseConfigured) {
      // Mock Fallback Authentication Mode
      let role = null;
      if (cleanedEmail === 'admin@mail.com' && password === 'admin@123') {
        role = 'admin';
      } else if (cleanedEmail === 'manager1@mail.com' && password === 'manager1@123') {
        role = 'manager';
      } else if (cleanedEmail === 'customer@mail.com' && password === 'customer@123') {
        role = 'customer';
      } else if (cleanedEmail === 'agent@mail.com' && password === 'agent@123') {
        role = 'agent';
      } else if (cleanedEmail === 'telecaller@mail.com' && password === 'telecaller@123') {
        role = 'telecaller';
      } else if (cleanedEmail === 'employee@mail.com' && password === 'employee@123') {
        role = 'employee';
      }

      if (role) {
        const selectedUser = mockUsers[role];
        setUser(selectedUser);
        localStorage.setItem('user', JSON.stringify(selectedUser));
        logger.auth(`Mock User logged in successfully`, true, { email: cleanedEmail });
        return true;
      }
      logger.auth(`Mock Login failed`, false, { email: cleanedEmail });
      return false;
    }

    try {
      // Real Firebase Authentication with persistence
      await setPersistence(
        auth, 
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      const result = await signInWithEmailAndPassword(auth, cleanedEmail, password);
      return true;
    } catch (error) {
      logger.auth(`Firebase Authentication failed`, false, { email: cleanedEmail, error: error.message });
      return false;
    }
  };

  const register = async (email, password, name) => {
    if (!isFirebaseConfigured) {
      logger.info(`Mock user registration registered`, { email });
      return true;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Send email verification link
      await sendEmailVerification(result.user);
      logger.info("Sent email verification link on sign up", { email });

      // Create user profile document in Firestore
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
      logger.info(`Mock password reset email sent to: ${email}`);
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

  const sendVerificationEmail = async () => {
    if (!isFirebaseConfigured) {
      logger.info(`Mock verification email sent to current user`);
      return true;
    }
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        logger.info("Sent email verification link via Firebase", { email: auth.currentUser.email });
        return true;
      } catch (error) {
        logger.error("Failed to send email verification", { error: error.message });
        throw error;
      }
    }
    return false;
  };

  const switchRole = async (role) => {
    logger.info(`Switching user session role`, { targetRole: role });
    if (!isFirebaseConfigured) {
      if (mockUsers[role]) {
        setUser(mockUsers[role]);
        localStorage.setItem('user', JSON.stringify(mockUsers[role]));
      }
      return;
    }

    // On live Firebase, dynamically update their role document in Firestore and local state
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const updatedProfile = {
          ...user,
          role: role
        };
        await setDoc(userDocRef, updatedProfile, { merge: true });
        setUser(updatedProfile);
        localStorage.setItem('user', JSON.stringify(updatedProfile));
        logger.info(`Live user role switched in Firestore`, { uid: auth.currentUser.uid, role });
      } catch (error) {
        logger.error(`Failed to switch live user role in Firestore`, { error: error.message });
      }
    }
  };

  const logout = async () => {
    logger.info(`User logout requested`);
    if (!isFirebaseConfigured) {
      setUser(null);
      localStorage.removeItem('user');
      return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      logger.error(`Error during Firebase signout`, { error: error.message });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      sendPasswordReset, 
      sendVerificationEmail, 
      switchRole, 
      logout, 
      isAuthenticated: !!user, 
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
