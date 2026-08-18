import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaBriefcase, FaGraduationCap, 
  FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimesCircle, FaSave, 
  FaTimes, FaUsers, FaMoneyBillWave, FaToggleOn, FaToggleOff 
} from 'react-icons/fa';
import { 
  getCareers, createCareerJob, updateCareerJob, deleteCareerJob, DEFAULT_CAREERS 
} from '../../../services/api';
import { subscribeToCollection } from '../../../services/firebaseService';

export const CareersManager = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  const initialForm = {
    title: '',
    type: 'Full-time',
    department: 'Advisory & Sales',
    location: 'Kanchipuram, TN (On-site)',
    stipendOrSalary: '',
    duration: 'Permanent',
    experience: 'Freshers / College Students',
    openings: 1,
    description: '',
    requirements: '',
    responsibilities: '',
    status: 'Active'
  };

  const [formData, setFormData] = useState(initialForm);

  const showToastMsg = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    getCareers().then(data => {
      setJobs(data && data.length > 0 ? data : DEFAULT_CAREERS);
      setLoading(false);
    });

    const unsubscribe = subscribeToCollection('careers', (data) => {
      if (data && data.length > 0) {
        setJobs(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOpenCreate = () => {
    setEditingJob(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      type: job.type || 'Full-time',
      department: job.department || 'Advisory & Sales',
      location: job.location || 'Kanchipuram, TN (On-site)',
      stipendOrSalary: job.stipendOrSalary || '',
      duration: job.duration || 'Permanent',
      experience: job.experience || 'Freshers / College Students',
      openings: job.openings || 1,
      description: job.description || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : (job.responsibilities || ''),
      status: job.status || 'Active'
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      openings: Number(formData.openings) || 1,
      requirements: formData.requirements.split('\n').map(r => r.trim()).filter(Boolean),
      responsibilities: formData.responsibilities.split('\n').map(r => r.trim()).filter(Boolean),
    };

    try {
      if (editingJob) {
        await updateCareerJob(editingJob.id, payload);
        showToastMsg("Job / Internship updated successfully!");
      } else {
        await createCareerJob(payload);
        showToastMsg("New Job / Internship posted successfully!");
      }
      setShowModal(false);
      // Refresh local list
      const refreshed = await getCareers();
      setJobs(refreshed);
    } catch (err) {
      console.error(err);
      showToastMsg("Failed to save job posting", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (job) => {
    const newStatus = job.status === 'Active' ? 'Closed' : 'Active';
    try {
      await updateCareerJob(job.id, { status: newStatus });
      showToastMsg(`Position marked as ${newStatus}`);
      const refreshed = await getCareers();
      setJobs(refreshed);
    } catch (e) {
      showToastMsg("Could not update status", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCareerJob(id);
      setDeleteConfirmId(null);
      showToastMsg("Job posting deleted");
      const refreshed = await getCareers();
      setJobs(refreshed);
    } catch (e) {
      showToastMsg("Could not delete job", "error");
    }
  };

  // Filter logic
  const filteredJobs = jobs.filter(j => {
    const matchesSearch = 
      j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'ALL' || j.type?.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'ALL' || j.status?.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalActive = jobs.filter(j => j.status === 'Active').length;
  const totalInternships = jobs.filter(j => j.type?.toLowerCase().includes('intern') && j.status === 'Active').length;
  const totalJobs = jobs.filter(j => !j.type?.toLowerCase().includes('intern') && j.status === 'Active').length;

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

      {/* Header & Stats Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Careers & Jobs Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create, edit, and manage open employment roles and student internship postings.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-brand-accent text-neutral-950 rounded-xl text-xs font-bold hover:bg-brand-accent/90 transition-colors flex items-center gap-2 cursor-pointer shadow-sm w-fit"
        >
          <FaPlus />
          <span>Post New Job / Internship</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs">
          <p className="text-[10px] font-bold uppercase text-slate-400">Total Postings</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{jobs.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs">
          <p className="text-[10px] font-bold uppercase text-emerald-500">Active Roles</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{totalActive}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs">
          <p className="text-[10px] font-bold uppercase text-blue-500">Active Internships</p>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{totalInternships}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs">
          <p className="text-[10px] font-bold uppercase text-amber-500">Full-Time Jobs</p>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{totalJobs}</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search roles, departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Role Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Part-time">Part-time</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid / Table */}
      {loading ? (
        <div className="py-12 text-center text-xs font-bold text-slate-400">Loading careers...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="py-12 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200/60 dark:border-white/5 space-y-2">
          <FaBriefcase className="text-3xl text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No positions found</p>
          <p className="text-xs text-slate-400">Click "Post New Job / Internship" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const isIntern = job.type?.toLowerCase().includes('intern');
            const isActive = job.status === 'Active';

            return (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-2.5 py-0.5 rounded-md border border-brand-accent/20">
                      {job.department}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-slate-400" /> {job.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-bold text-brand-accent">{job.type}</span>
                    <span>•</span>
                    <span>{job.experience}</span>
                  </div>

                  {job.stipendOrSalary && (
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {job.stipendOrSalary}
                    </p>
                  )}

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleStatus(job)}
                    className="text-xs font-bold flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-brand-accent cursor-pointer"
                  >
                    {isActive ? <FaToggleOn className="text-emerald-500 text-base" /> : <FaToggleOff className="text-slate-400 text-base" />}
                    <span>{isActive ? 'Mark Closed' : 'Mark Active'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(job)}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-200 hover:bg-brand-accent hover:text-neutral-950 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(job.id)}
                      className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 max-w-sm w-full space-y-4 text-center">
              <FaTrash className="text-3xl text-rose-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Delete Job Posting?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This will remove the job from the public Careers page immediately.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Create / Edit Job Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-1">
                {editingJob ? 'Edit Career Position' : 'Create New Position / Internship'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Fill in the details below to publish or update this opening on the website.
              </p>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Job / Internship Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Financial Advisory Associate, Insurance Intern"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Role Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    >
                      <option value="Advisory & Sales">Advisory & Sales</option>
                      <option value="Operations & Claims">Operations & Claims</option>
                      <option value="Marketing & Growth">Marketing & Growth</option>
                      <option value="Finance & Accounts">Finance & Accounts</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    >
                      <option value="Active">Active (Visible)</option>
                      <option value="Closed">Closed (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kanchipuram, TN (On-site)"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Stipend / Salary
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹10,000 / mo or ₹25k-40k"
                      value={formData.stipendOrSalary}
                      onChange={(e) => setFormData({ ...formData, stipendOrSalary: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Openings
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.openings}
                      onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Eligibility / Experience
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Freshers / College Students, 1-2 Years"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Permanent, 3 Months, 6 Months"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Job Description & Overview *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the role, team responsibilities, and growth opportunities..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Key Requirements (One per line)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Bachelor's degree in Finance or Business&#10;Good communication skills in Tamil & English"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-brand-accent text-neutral-950 text-xs font-black uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <FaSave />
                    <span>{saving ? 'Saving...' : editingJob ? 'Update Position' : 'Publish Position'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CareersManager;
