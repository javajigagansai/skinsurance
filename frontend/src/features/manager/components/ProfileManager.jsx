import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, FaPhoneAlt, FaEnvelope, FaCalendarAlt, 
  FaCity, FaMapPin, FaSave, FaCheckCircle, FaInfoCircle,
  FaShieldAlt, FaUserCheck, FaUndo
} from 'react-icons/fa';
import { useAuth } from '../../auth/contexts/AuthContext';
import { db } from '../../../firebase/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { isFirebaseConfigured } from '../../../firebase/config';

export const ProfileManager = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    city: '',
    pincode: '',
    address: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load existing profile from multiple sources on mount
  useEffect(() => {
    let name = user?.name || user?.fullName || user?.displayName || '';
    let phone = user?.phone || user?.mobile || user?.phoneNumber || '';
    let email = user?.email || '';
    let dob = user?.dob || user?.dateOfBirth || '';
    let city = user?.city || '';
    let pincode = user?.pincode || user?.zipCode || '';
    let address = user?.address || '';

    // Check localStorage auth user
    try {
      const savedAuth = localStorage.getItem('sk_auth_user') || sessionStorage.getItem('sk_auth_user');
      if (savedAuth) {
        const u = JSON.parse(savedAuth);
        if (!name) name = u.name || u.fullName || u.displayName || u.username || '';
        if (!phone) phone = u.phone || u.mobile || u.phoneNumber || '';
        if (!email) email = u.email || '';
        if (!dob) dob = u.dob || u.dateOfBirth || '';
        if (!city) city = u.city || '';
        if (!pincode) pincode = u.pincode || u.zipCode || '';
        if (!address) address = u.address || '';
      }
    } catch (e) {}

    // Check localStorage user profile
    try {
      const savedProfile = localStorage.getItem('sk_user_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (!name) name = p.fullName || p.name || '';
        if (!phone) phone = p.phone || p.mobile || '';
        if (!email) email = p.email || '';
        if (!dob) dob = p.dob || p.dateOfBirth || '';
        if (!city) city = p.city || '';
        if (!pincode) pincode = p.pincode || p.zipCode || '';
        if (!address) address = p.address || '';
      }
    } catch (e) {}

    // Check localStorage submitted lead
    try {
      const savedLead = localStorage.getItem('sk_lead_submitted');
      if (savedLead) {
        const l = JSON.parse(savedLead);
        if (!name) name = l.fullName || l.name || '';
        if (!phone) phone = l.phone || l.mobile || '';
        if (!email) email = l.email || '';
        if (!dob) dob = l.dob || l.dateOfBirth || '';
        if (!city) city = l.city || '';
        if (!pincode) pincode = l.pincode || l.zipCode || '';
      }
    } catch (e) {}

    setProfile({
      fullName: name,
      phone: phone,
      email: email,
      dob: dob,
      city: city,
      pincode: pincode,
      address: address
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setSavedSuccess(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      fullName: profile.fullName.trim(),
      name: profile.fullName.trim(),
      phone: profile.phone.trim(),
      mobile: profile.phone.trim(),
      email: profile.email.trim(),
      dob: profile.dob,
      dateOfBirth: profile.dob,
      city: profile.city.trim(),
      pincode: profile.pincode.trim(),
      zipCode: profile.pincode.trim(),
      address: profile.address.trim(),
      updatedAt: new Date().toISOString()
    };

    try {
      // 1. Update localStorage sk_user_profile
      localStorage.setItem('sk_user_profile', JSON.stringify(payload));

      // 2. Update localStorage sk_lead_submitted
      localStorage.setItem('sk_lead_submitted', JSON.stringify(payload));

      // 3. Update localStorage sk_auth_user
      try {
        const existingAuth = localStorage.getItem('sk_auth_user');
        const authObj = existingAuth ? JSON.parse(existingAuth) : {};
        const updatedAuth = { ...authObj, ...payload };
        localStorage.setItem('sk_auth_user', JSON.stringify(updatedAuth));
      } catch (e) {}

      // 4. Update Firestore if user is signed in with Firebase
      if (isFirebaseConfigured && user?.uid) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, payload, { merge: true });
        } catch (dbErr) {
          console.warn('Could not sync to Firestore user doc:', dbErr.message);
        }
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProfile({
      fullName: '',
      phone: '',
      email: '',
      dob: '',
      city: '',
      pincode: '',
      address: ''
    });
    setSavedSuccess(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xs">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest font-['Plus_Jakarta_Sans',sans-serif]">
            // ADMIN & CLIENT CONFIGURATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Profile & Autofill Settings
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            Manage your personal and policyholder details. Values saved here automatically autofill in the Claims assistant and booking forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <FaUserCheck className="text-xs" />
            <span>Autofill Sync Active</span>
          </span>
        </div>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-bold shadow-xs"
        >
          <FaCheckCircle className="text-base shrink-0" />
          <span>Profile details saved successfully! All claim submission and booking forms will now auto-fill with these details.</span>
        </motion.div>
      )}

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              Full Name <span className="text-amber-500">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
              <input
                type="text"
                name="fullName"
                required
                value={profile.fullName}
                onChange={handleChange}
                placeholder="e.g. Prakash Gajendiran"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
              />
            </div>
          </div>

          {/* Mobile / WhatsApp */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              Mobile / WhatsApp Number <span className="text-amber-500">*</span>
            </label>
            <div className="relative">
              <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
              <input
                type="tel"
                name="phone"
                required
                value={profile.phone}
                onChange={handleChange}
                placeholder="e.g. 9994451300"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="e.g. skinvestments2025@gmail.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
              />
            </div>
          </div>

          {/* Date of Birth (DOB) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              Date of Birth (DOB)
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
              />
            </div>
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              City
            </label>
            <div className="relative">
              <FaCity className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                placeholder="e.g. Kanchipuram"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
              />
            </div>
          </div>

          {/* Pincode */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              Pincode / Postal Code
            </label>
            <div className="relative">
              <FaMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
              <input
                type="text"
                name="pincode"
                value={profile.pincode}
                onChange={handleChange}
                placeholder="e.g. 631502"
                maxLength={6}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
              />
            </div>
          </div>

        </div>

        {/* Address Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
            Street Address / Office Location (Optional)
          </label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="e.g. #104, West Raja Street, Kanchipuram"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-brand-accent shadow-2xs"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <FaUndo className="text-xs" />
            <span>Clear Fields</span>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-xl bg-brand-accent text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-brand-accent active:bg-brand-accent shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            <FaSave className="text-sm" />
            <span>{loading ? 'Saving...' : 'Save Profile & Autofill Info'}</span>
          </button>
        </div>
      </form>

      {/* Info Card */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3.5 text-xs text-neutral-700 dark:text-neutral-300">
        <FaInfoCircle className="text-amber-600 dark:text-brand-accent text-base shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-neutral-900 dark:text-white">How Autofill Works Across SK Smart Website:</p>
          <p>
            When you save your details above, any user or manager session opening the Claims Assistant, Consultation Booking, or Instant Lead forms will have these values pre-filled in their respective fields automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
