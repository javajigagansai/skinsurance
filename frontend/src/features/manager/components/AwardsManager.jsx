import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaCheckCircle, 
  FaTimesCircle, FaTrophy, FaAward, FaCalendarAlt, 
  FaBuilding, FaTag, FaUpload, FaSpinner, FaEye, 
  FaExternalLinkAlt, FaTimes, FaSave, FaImage
} from 'react-icons/fa';
import { useAuth } from '../../../features/auth/contexts/AuthContext';
import { getAwards, createAward, updateAward, deleteAward, DEFAULT_AWARDS_DATA } from '../../../services/api';
import { subscribeToCollection, uploadMediaFile } from '../../../services/firebaseService';

const CATEGORY_OPTIONS = [
  'Industry Leadership',
  'Global Benchmark',
  'Consulting Merit',
  'Branch Leadership',
  'Tata AIA Recognition',
  'Annual Excellence',
  'Sales Excellence',
  'Innovation & Growth',
  'Community Impact',
  'International Merit',
  'High Potential',
  'Organizational Leadership',
  'Business Excellence',
  'Capacity Building',
  'Performance Benchmark',
  'Digital Innovation',
  'Branch Excellence',
  'Other Honor'
];

export const AwardsManager = () => {
  const { user } = useAuth();
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // Modal & Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAward, setEditingAward] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [lightboxAward, setLightboxAward] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Industry Leadership',
    tag: 'INDUSTRY LEADERSHIP',
    year: new Date().getFullYear().toString(),
    org: 'Tata AIA Life Insurance',
    desc: '',
    img: '',
    status: 'Active',
    priority: 1,
    featured: false
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    getAwards().then(data => {
      if (data && data.length > 0) setAwards(data);
      else setAwards(DEFAULT_AWARDS_DATA);
      setLoading(false);
    }).catch(() => setLoading(false));

    const unsubscribe = subscribeToCollection('awards', (data) => {
      if (data && data.length > 0) setAwards(data);
      else setAwards(DEFAULT_AWARDS_DATA);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenAddModal = () => {
    setEditingAward(null);
    setFormData({
      title: '',
      category: 'Industry Leadership',
      tag: 'INDUSTRY LEADERSHIP',
      year: new Date().getFullYear().toString(),
      org: 'Tata AIA Life Insurance',
      desc: '',
      img: '',
      status: 'Active',
      priority: awards.length + 1,
      featured: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (award) => {
    setEditingAward(award);
    setFormData({
      title: award.title || '',
      category: award.category || 'Industry Leadership',
      tag: award.tag || 'INDUSTRY LEADERSHIP',
      year: award.year || new Date().getFullYear().toString(),
      org: award.org || '',
      desc: award.desc || '',
      img: award.img || '',
      status: award.status || 'Active',
      priority: award.priority || 1,
      featured: Boolean(award.featured)
    });
    setIsModalOpen(true);
  };

  const handleFileProcess = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setUploadingImage(true);
    try {
      const downloadUrl = await uploadMediaFile(file, 'awards');
      if (downloadUrl) {
        setFormData(prev => ({ ...prev, img: downloadUrl }));
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({ ...prev, img: e.target.result }));
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('Failed to upload image', err);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, img: e.target.result }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter an award title.');
      return;
    }
    if (!formData.img.trim()) {
      alert('Please upload or provide an image for the award certificate.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        tag: formData.tag.trim() || formData.category.toUpperCase(),
        priority: parseInt(formData.priority) || 99
      };

      if (editingAward) {
        await updateAward(editingAward.id, payload, user);
      } else {
        await createAward(payload, user);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save award', err);
      alert('Failed to save award. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (award) => {
    const nextStatus = award.status === 'Active' ? 'Inactive' : 'Active';
    await updateAward(award.id, { status: nextStatus }, user);
  };

  const handleDelete = async (id) => {
    await deleteAward(id, user);
    setDeleteConfirmId(null);
  };

  // Filtered list
  const filteredAwards = awards.filter(award => {
    if (statusFilter !== 'ALL' && award.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const title = (award.title || '').toLowerCase();
      const org = (award.org || '').toLowerCase();
      const tag = (award.tag || '').toLowerCase();
      const year = (award.year || '').toString();
      return title.includes(q) || org.includes(q) || tag.includes(q) || year.includes(q);
    }
    return true;
  });

  const activeCount = awards.filter(a => a.status === 'Active').length;
  const featuredCount = awards.filter(a => a.featured).length;

  return (
    <div className="space-y-6 text-left">
      
      {/* ── Top Header Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-700 dark:text-brand-accent">
              <FaTrophy className="text-lg" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                Awards & Achievements Manager
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                Manage all {awards.length} verified honor certificates displayed on the public About Us page.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-brand-accent hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer shrink-0"
        >
          <FaPlus className="text-xs" />
          <span>Add New Award</span>
        </button>
      </div>

      {/* ── Quick Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-neutral-500 uppercase tracking-wider">Total Certificates</span>
            <FaAward className="text-amber-500 text-base" />
          </div>
          <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2 tabular-nums">
            {awards.length}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-neutral-500 uppercase tracking-wider">Active on Site</span>
            <FaCheckCircle className="text-emerald-500 text-base" />
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2 tabular-nums">
            {activeCount}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-neutral-500 uppercase tracking-wider">Spotlight Highlights</span>
            <FaTrophy className="text-amber-500 text-base" />
          </div>
          <p className="text-3xl font-black text-amber-600 dark:text-brand-accent mt-2 tabular-nums">
            {featuredCount}
          </p>
        </div>
      </div>

      {/* ── Filter & Search Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-neutral-900 p-3 rounded-2xl border border-slate-200/80 dark:border-white/10">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search awards, org, year..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 border-none text-xs font-semibold text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-brand-accent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-xs"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'Active', 'Inactive'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ── Awards Grid ── */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <FaSpinner className="text-3xl text-brand-accent animate-spin" />
          <p className="text-sm font-bold text-neutral-500">Loading awards portfolio...</p>
        </div>
      ) : filteredAwards.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200/80 dark:border-white/10 p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto text-xl">
            <FaTrophy />
          </div>
          <h3 className="text-lg font-black text-neutral-950 dark:text-white">No awards found</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            No award records matched your search or status filter. Try clearing the search or adding a new award.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-accent text-neutral-950 text-xs font-black uppercase tracking-wider hover:opacity-90 cursor-pointer"
          >
            <FaPlus className="text-xs" />
            <span>Add Award Certificate</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAwards.map((award) => {
            const isActive = award.status !== 'Inactive';

            return (
              <div
                key={award.id}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Photo Thumbnail */}
                <div 
                  className="relative w-full h-44 bg-slate-100 dark:bg-neutral-950 p-3 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-white/5 cursor-pointer"
                  onClick={() => setLightboxAward(award)}
                >
                  <img
                    src={award.img}
                    alt={award.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/Awards_JPG/IMG_3623.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-xs">
                    <FaEye />
                    <span>Click to Zoom</span>
                  </div>

                  {/* Badges Over Image */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
                    {award.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-neutral-950 text-[9px] font-black uppercase tracking-wider shadow-sm">
                        SPOTLIGHT
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(award);
                      }}
                      className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider cursor-pointer shadow-sm transition-all ${
                        isActive
                          ? 'bg-emerald-500 text-white'
                          : 'bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      {isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400">
                      <span className="text-amber-700 dark:text-brand-accent font-black uppercase tracking-wider truncate max-w-[140px]">
                        {award.tag || award.category}
                      </span>
                      <span className="tabular-nums font-extrabold text-neutral-900 dark:text-neutral-100">
                        {award.year}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-neutral-950 dark:text-white line-clamp-2 leading-snug uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      {award.title}
                    </h4>

                    {award.org && (
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium truncate flex items-center gap-1.5">
                        <FaBuilding className="text-[9px] shrink-0 text-neutral-400" />
                        <span>{award.org}</span>
                      </p>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenEditModal(award)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <FaEdit className="text-[10px]" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(award.id)}
                      className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 flex items-center justify-center text-xs transition-colors cursor-pointer"
                      title="Delete Award"
                    >
                      <FaTrash className="text-[10px]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── CREATE / EDIT AWARD MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden my-8 text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-brand-accent">
                    <FaTrophy />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                      {editingAward ? 'Edit Award Certificate' : 'Add New Award Certificate'}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Fill out the recognition details and upload the certificate photo.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                
                {/* Drag & Drop Photo Uploader */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Award Certificate Image *
                  </label>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full h-48 rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center p-4 cursor-pointer overflow-hidden ${
                      dragOver
                        ? 'border-brand-accent bg-amber-500/10'
                        : formData.img
                        ? 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950'
                        : 'border-slate-300 dark:border-white/20 bg-slate-50 hover:bg-slate-100 dark:bg-neutral-950/60'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFileProcess(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />

                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-2 text-brand-accent">
                        <FaSpinner className="text-2xl animate-spin" />
                        <span className="text-xs font-bold">Uploading & compressing photo...</span>
                      </div>
                    ) : formData.img ? (
                      <div className="relative w-full h-full flex items-center justify-center group">
                        <img
                          src={formData.img}
                          alt="Award Preview"
                          className="max-h-full max-w-full object-contain rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 rounded-lg">
                          <FaUpload className="text-lg" />
                          <span className="text-xs font-bold">Click or drop to replace image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center space-y-2 text-neutral-500 dark:text-neutral-400">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center text-xl">
                          <FaImage />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-900 dark:text-white">
                            Drag & drop certificate image here, or <span className="text-brand-accent underline">browse</span>
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            Supports JPG, PNG, WebP
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fallback Image URL Input */}
                  <div className="pt-1">
                    <input
                      type="text"
                      value={formData.img}
                      onChange={(e) => setFormData(prev => ({ ...prev, img: e.target.value }))}
                      placeholder="Or paste image URL (e.g. /Awards_JPG/IMG_3623.jpg)"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-neutral-900 dark:text-white placeholder-neutral-400"
                    />
                  </div>
                </div>

                {/* Award Title */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Award Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. DREAM AGENCY ELITE ASPIRANT AWARD"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-brand-accent"
                  />
                </div>

                {/* Organization & Year Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      value={formData.org}
                      onChange={(e) => setFormData(prev => ({ ...prev, org: e.target.value }))}
                      placeholder="e.g. Tata AIA Life Insurance"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      Recognition Year
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      placeholder="e.g. 2024"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white tabular-nums"
                    />
                  </div>
                </div>

                {/* Category & Badge Tag */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({ 
                          ...prev, 
                          category: val,
                          tag: val.toUpperCase()
                        }));
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      Tag / Badge Label
                    </label>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                      placeholder="e.g. INDUSTRY LEADERSHIP"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white uppercase"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Summary / Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.desc}
                    onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
                    placeholder="Brief description of the milestone or performance achievement..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-medium text-neutral-900 dark:text-white leading-relaxed resize-none"
                  />
                </div>

                {/* Options: Featured & Status & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
                  
                  <div className="flex items-center gap-2.5 pt-2">
                    <input
                      type="checkbox"
                      id="featuredCheckbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-brand-accent"
                    />
                    <label htmlFor="featuredCheckbox" className="text-xs font-black text-neutral-900 dark:text-white cursor-pointer">
                      Spotlight Featured
                    </label>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-neutral-500">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-neutral-500">Display Order</label>
                    <input
                      type="number"
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white"
                    />
                  </div>

                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-accent hover:opacity-90 text-neutral-950 text-xs font-black uppercase tracking-wider transition-opacity shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="text-xs animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FaSave className="text-xs" />
                        <span>{editingAward ? 'Update Certificate' : 'Save Certificate'}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LIGHTBOX MODAL PREVIEW ── */}
      <AnimatePresence>
        {lightboxAward && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setLightboxAward(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-4 sm:p-6 text-left space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-accent">
                    {lightboxAward.tag || lightboxAward.category} · {lightboxAward.year}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white uppercase font-['Plus_Jakarta_Sans',sans-serif]">
                    {lightboxAward.title}
                  </h3>
                </div>
                <button
                  onClick={() => setLightboxAward(null)}
                  className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="w-full h-[380px] sm:h-[480px] bg-neutral-950 rounded-2xl flex items-center justify-center p-2 overflow-hidden">
                <img
                  src={lightboxAward.img}
                  alt={lightboxAward.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {lightboxAward.desc && (
                <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
                  {lightboxAward.desc}
                </p>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200 dark:border-white/10 p-6 shadow-2xl text-left space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center text-xl">
                <FaTrash />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-neutral-950 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  Delete Award Certificate?
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Are you sure you want to remove this certificate? It will no longer be visible on the public About Us page.
                </p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
                >
                  Delete Certificate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AwardsManager;
