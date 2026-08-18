import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserGraduate, FaSearch, FaCheckCircle, FaTimesCircle, FaTrash, 
  FaEnvelope, FaPhoneAlt, FaExternalLinkAlt, FaFileAlt, FaClock 
} from 'react-icons/fa';
import { 
  getJobApplications, updateJobApplicationStatus, deleteJobApplication 
} from '../../../services/api';
import { subscribeToCollection } from '../../../services/firebaseService';

export const ApplicationsManager = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    getJobApplications().then(data => {
      setApplications(data || []);
      setLoading(false);
    });

    const unsubscribe = subscribeToCollection('job_applications', (data) => {
      if (data) setApplications(data);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateJobApplicationStatus(id, newStatus);
      showToast(`Status updated to ${newStatus}`);
      const refreshed = await getJobApplications();
      setApplications(refreshed);
    } catch (e) {
      showToast("Could not update status", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJobApplication(id);
      showToast("Application record deleted");
      const refreshed = await getJobApplications();
      setApplications(refreshed);
    } catch (e) {
      showToast("Could not delete application", "error");
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantPhone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'ALL' || app.status?.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const pendingCount = applications.filter(a => a.status === 'Pending').length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold ${
              toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
            }`}
          >
            {toast.type === 'error' ? <FaTimesCircle /> : <FaCheckCircle />}
            <span>{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Candidate Applications
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review candidate resumes, cover notes, and manage interview shortlisting.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs">
          <p className="text-[10px] font-bold uppercase text-slate-400">Total Applicants</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{applications.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs">
          <p className="text-[10px] font-bold uppercase text-amber-500">Pending Review</p>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{pendingCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs">
          <p className="text-[10px] font-bold uppercase text-emerald-500">Shortlisted</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{shortlistedCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs">
          <p className="text-[10px] font-bold uppercase text-blue-500">Reviewed</p>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {applications.filter(a => a.status === 'Reviewed').length}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search candidate name, email, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none w-full sm:w-auto"
        >
          <option value="ALL">All Application Status</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="py-12 text-center text-xs font-bold text-slate-400">Loading applications...</div>
      ) : filteredApps.length === 0 ? (
        <div className="py-12 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200/60 dark:border-white/5 space-y-2">
          <FaUserGraduate className="text-3xl text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No applications received yet</p>
          <p className="text-xs text-slate-400">Applications submitted from the public Careers page will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredApps.map((app) => {
            const statusColors = {
              'Pending': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
              'Reviewed': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
              'Shortlisted': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
              'Rejected': 'bg-rose-500/10 text-rose-500 border-rose-500/20'
            };

            return (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      {app.applicantName}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded">
                      {app.jobTitle}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${statusColors[app.status] || 'bg-slate-100'}`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <a href={`mailto:${app.applicantEmail}`} className="flex items-center gap-1 hover:text-brand-accent">
                      <FaEnvelope className="text-slate-400" /> {app.applicantEmail}
                    </a>
                    <a href={`tel:${app.applicantPhone}`} className="flex items-center gap-1 hover:text-brand-accent">
                      <FaPhoneAlt className="text-slate-400" /> {app.applicantPhone}
                    </a>
                    <span className="flex items-center gap-1">
                      <FaUserGraduate className="text-slate-400" /> {app.qualification} ({app.experienceLevel})
                    </span>
                    {app.appliedAt && (
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <FaClock /> {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {app.coverNote && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-1 bg-slate-50 dark:bg-neutral-950 p-2.5 rounded-xl border border-slate-100 dark:border-white/5">
                      "{app.coverNote}"
                    </p>
                  )}

                  {app.resumeLink && (
                    <div className="pt-1">
                      <a
                        href={app.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent hover:underline"
                      >
                        <FaExternalLinkAlt className="text-[10px]" />
                        <span>View Resume / Portfolio Link</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="px-3 py-2 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors text-xs font-bold cursor-pointer"
                    title="Delete Application"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default ApplicationsManager;
