import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBriefcase, FaMapMarkerAlt, FaClock, FaCheckCircle, FaInbox, 
  FaSearch, FaGraduationCap, FaMoneyBillWave, FaUsers, FaAward, 
  FaUserGraduate, FaPaperPlane, FaTimes, FaShieldAlt, FaArrowRight 
} from 'react-icons/fa';
import { getCareers, saveJobApplication, DEFAULT_CAREERS } from '../../services/api';
import { subscribeToCollection } from '../../services/firebaseService';

export const Careers = () => {
  const [jobs, setJobs] = useState(DEFAULT_CAREERS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedDept, setSelectedDept] = useState('ALL');
  
  // Application Modal State
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successApply, setSuccessApply] = useState(false);

  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    qualification: '',
    experienceLevel: 'Fresher / Student',
    resumeLink: '',
    coverNote: ''
  });

  useEffect(() => {
    // 1. Initial fetch
    getCareers().then((data) => {
      if (data && data.length > 0) setJobs(data);
      setLoading(false);
    });

    // 2. Real-time updates from Firestore if connected
    const unsubscribe = subscribeToCollection('careers', (data) => {
      if (data && data.length > 0) {
        setJobs(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setSuccessApply(false);
    setShowApplyModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const applicationData = {
      jobId: selectedJob?.id || 'general',
      jobTitle: selectedJob?.title || 'General Application',
      jobType: selectedJob?.type || 'Full-time',
      department: selectedJob?.department || 'General',
      ...formData
    };

    try {
      await saveJobApplication(applicationData);
      setSubmitting(false);
      setSuccessApply(true);
      setTimeout(() => {
        setShowApplyModal(false);
        setSuccessApply(false);
        setFormData({
          applicantName: '',
          applicantEmail: '',
          applicantPhone: '',
          qualification: '',
          experienceLevel: 'Fresher / Student',
          resumeLink: '',
          coverNote: ''
        });
      }, 2500);
    } catch (err) {
      console.error("Error submitting job application", err);
      setSubmitting(false);
    }
  };

  // Filter Jobs
  const filteredJobs = jobs.filter((job) => {
    if (job.status === 'Closed') return false;
    const matchesSearch = 
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'ALL' || job.type?.toLowerCase() === selectedType.toLowerCase();
    const matchesDept = selectedDept === 'ALL' || job.department?.toLowerCase() === selectedDept.toLowerCase();

    return matchesSearch && matchesType && matchesDept;
  });

  const departments = ['ALL', 'Advisory & Sales', 'Operations & Claims', 'Marketing & Growth', 'Finance & Accounts'];
  const types = ['ALL', 'Full-time', 'Internship', 'Part-time'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pt-28 pb-24 transition-colors duration-300">
      
      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs font-bold uppercase tracking-widest"
        >
          <FaBriefcase /> CAREERS & INTERNSHIPS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight"
        >
          SHAPE YOUR CAREER AT <span className="text-brand-accent">SK SMART</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Work alongside certified financial planners, assist in multi-crore claim settlements, and gain real-world industry experience through high-impact roles and internships.
        </motion.p>

        {/* Highlight Perks Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left"
        >
          {[
            { icon: FaUserGraduate, title: "Structured Mentorship", desc: "Direct training from certified IRDAI directors." },
            { icon: FaMoneyBillWave, title: "Attractive Compensation", desc: "Competitive salaries, stipends & performance bonuses." },
            { icon: FaAward, title: "Verified Certification", desc: "Industry recognized certificates & recommendation letters." },
            { icon: FaUsers, title: "High-Growth Culture", desc: "Fast-track promotion path for top performers." },
          ].map((perk, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent text-base mb-2">
                <perk.icon />
              </div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-0.5">{perk.title}</h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">{perk.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Search & Filter Controls ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
            <input
              type="text"
              placeholder="Search by job title, skill, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 text-neutral-900 dark:text-white"
            />
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
            <span className="text-xs font-bold text-neutral-500 uppercase mr-1 hidden lg:inline">Type:</span>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === type
                    ? 'bg-brand-accent text-neutral-950 shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {type === 'ALL' ? 'All Roles' : type}
              </button>
            ))}
          </div>

        </div>

        {/* Department Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-4 px-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedDept === dept
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950'
                  : 'bg-transparent border border-black/10 dark:border-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {dept === 'ALL' ? 'All Departments' : dept}
            </button>
          ))}
        </div>
      </section>

      {/* ── Open Positions List ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-sm font-bold text-neutral-500 animate-pulse">
            Loading active positions...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-black/5 dark:border-white/10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-accent/10 text-brand-accent text-2xl flex items-center justify-center mx-auto">
              <FaInbox />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No Open Positions Match Your Search</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Try adjusting your search terms or filters. You can also send us a general application!
            </p>
            <button
              onClick={() => {
                setSelectedJob({ title: 'General Career Application', type: 'Any Role', department: 'General' });
                setShowApplyModal(true);
              }}
              className="px-6 py-2.5 rounded-xl bg-brand-accent text-neutral-950 text-xs font-bold hover:opacity-90 transition-opacity"
            >
              Submit General Application
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const isInternship = job.type?.toLowerCase().includes('intern');

              return (
                <div
                  key={job.id}
                  className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-lg border border-brand-accent/20">
                        {job.department || 'Advisory'}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isInternship
                          ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}>
                        {job.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-neutral-900 dark:text-white group-hover:text-brand-accent transition-colors leading-snug">
                      {job.title}
                    </h3>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                      <span className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                        <FaMapMarkerAlt className="text-brand-accent" /> {job.location || 'Kanchipuram, TN'}
                      </span>
                      <span className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                        <FaGraduationCap className="text-blue-400" /> {job.experience || 'Freshers / Students'}
                      </span>
                      {job.duration && (
                        <span className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                          <FaClock className="text-emerald-400" /> {job.duration}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                      {job.description}
                    </p>

                    {/* Stipend / Salary */}
                    {job.stipendOrSalary && (
                      <div className="pt-2">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Package / Stipend</span>
                        <span className="text-xs font-black text-neutral-900 dark:text-brand-accent">
                          {job.stipendOrSalary}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-6 border-t border-black/5 dark:border-white/5 mt-6 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-neutral-400">
                      {job.openings ? `${job.openings} Openings` : 'Immediate Joining'}
                    </span>
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="px-5 py-2.5 rounded-xl bg-brand-accent text-neutral-950 text-xs font-bold hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Apply Now</span>
                      <FaArrowRight className="text-[10px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Application Modal ── */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setShowApplyModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <FaTimes />
              </button>

              {successApply ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 text-3xl flex items-center justify-center mx-auto animate-bounce">
                    <FaCheckCircle />
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white">Application Submitted!</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for applying for <strong>{selectedJob?.title}</strong>. Our HR and management team will review your application and contact you directly.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-6 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">
                      {selectedJob?.type || 'Position'}
                    </span>
                    <h2 className="text-xl font-black text-neutral-900 dark:text-white">
                      Apply for {selectedJob?.title}
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Fill in your details below to submit your resume for review.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.applicantName}
                        onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-accent text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.applicantEmail}
                          onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                          className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-accent text-neutral-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.applicantPhone}
                          onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-accent text-neutral-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-1">
                          Highest Qualification *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. B.Com, BBA, MBA, B.Tech"
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                          className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-accent text-neutral-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-1">
                          Experience Level
                        </label>
                        <select
                          value={formData.experienceLevel}
                          onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                          className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-accent text-neutral-900 dark:text-white"
                        >
                          <option value="Fresher / Student">Fresher / Student</option>
                          <option value="0-1 Year">0-1 Year</option>
                          <option value="1-3 Years">1-3 Years</option>
                          <option value="3+ Years">3+ Years</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-1">
                        Resume / Portfolio Link (Google Drive / LinkedIn / GitHub)
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
                        value={formData.resumeLink}
                        onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                        className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-accent text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-1">
                        Short Cover Note / Introduction
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us a little about your career interests and why you want to join..."
                        value={formData.coverNote}
                        onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                        className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-accent text-neutral-900 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-brand-accent text-neutral-950 font-black text-xs uppercase tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <FaPaperPlane />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Careers;
