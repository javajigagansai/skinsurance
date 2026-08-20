import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaImage, FaCheckCircle, FaTimesCircle, 
  FaSave, FaTimes, FaToggleOn, FaToggleOff, FaExternalLinkAlt,
  FaCloudUploadAlt, FaUpload, FaSpinner
} from 'react-icons/fa';
import { 
  getFlyers, createFlyer, updateFlyer, deleteFlyer, DEFAULT_FLYERS 
} from '../../../services/api';
import { subscribeToCollection, uploadMediaFile } from '../../../services/firebaseService';
import imageCompression from 'browser-image-compression';

export const FlyersManager = () => {
  const [flyers, setFlyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  // File Upload & Drag-and-Drop States
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const initialForm = {
    title: '',
    subtitle: '',
    tag: 'SPECIAL COVER',
    category: 'Health Insurance',
    image: '/casual/healthinsurance.jpg',
    link: '/plans',
    status: 'Active'
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    getFlyers().then(data => {
      setFlyers(data && data.length > 0 ? data : DEFAULT_FLYERS);
      setLoading(false);
    });

    const unsubscribe = subscribeToCollection('flyers', (data) => {
      if (data && data.length > 0) setFlyers(data);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenCreate = () => {
    setEditingFlyer(null);
    setFormData(initialForm);
    setUploadError('');
    setShowModal(true);
  };

  const handleOpenEdit = (flyer) => {
    setEditingFlyer(flyer);
    setFormData({
      title: flyer.title || '',
      subtitle: flyer.subtitle || '',
      tag: flyer.tag || 'SPECIAL COVER',
      category: flyer.category || 'Health Insurance',
      image: flyer.image || '/casual/healthinsurance.jpg',
      link: flyer.link || '/plans',
      status: flyer.status || 'Active'
    });
    setUploadError('');
    setShowModal(true);
  };

  // Process File (from File Picker or Drag & Drop)
  const processImageFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP, GIF)');
      return;
    }

    setUploadingImage(true);
    setUploadError('');

    try {
      let compressedFile = file;
      try {
        const options = {
          maxSizeMB: 1.5,
          maxWidthOrHeight: 1400,
          useWebWorker: true
        };
        compressedFile = await imageCompression(file, options);
      } catch (compErr) {
        console.warn('Image compression fallback:', compErr);
      }

      const imageUrl = await uploadMediaFile(compressedFile, 'flyers');
      setFormData(prev => ({ ...prev, image: imageUrl }));
      showToast('Image uploaded successfully!');
    } catch (err) {
      console.error('Upload Error:', err);
      // Local fallback using FileReader
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({ ...prev, image: e.target.result }));
          showToast('Image loaded successfully!');
        };
        reader.readAsDataURL(file);
      } catch (readErr) {
        setUploadError('Failed to upload image. Please try again.');
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await processImageFile(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setUploadError('Please upload an image or poster for the flyer');
      return;
    }

    setSaving(true);
    try {
      if (editingFlyer) {
        await updateFlyer(editingFlyer.id, formData);
        showToast("Flyer banner updated successfully!");
      } else {
        await createFlyer(formData);
        showToast("New flyer banner added to hero section!");
      }
      setShowModal(false);
      const refreshed = await getFlyers();
      setFlyers(refreshed);
    } catch (err) {
      console.error(err);
      showToast("Failed to save flyer", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (flyer) => {
    const newStatus = flyer.status === 'Active' ? 'Closed' : 'Active';
    try {
      await updateFlyer(flyer.id, { status: newStatus });
      showToast(`Flyer marked as ${newStatus}`);
      const refreshed = await getFlyers();
      setFlyers(refreshed);
    } catch (e) {
      showToast("Could not update status", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFlyer(id);
      setDeleteConfirmId(null);
      showToast("Flyer removed");
      const refreshed = await getFlyers();
      setFlyers(refreshed);
    } catch (e) {
      showToast("Could not delete flyer", "error");
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Hero Flyers & Banners Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage promotional insurance posters and banner images displayed on the right side of the Home page hero section.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-brand-accent text-neutral-950 rounded-xl text-xs font-bold hover:bg-brand-accent/90 transition-all shadow-sm flex items-center gap-2 cursor-pointer w-fit active:scale-95"
        >
          <FaPlus />
          <span>Upload New Flyer / Banner</span>
        </button>
      </div>

      {/* Flyers Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs font-bold text-slate-400">Loading flyers...</div>
      ) : flyers.length === 0 ? (
        <div className="py-12 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200/60 dark:border-white/5 space-y-2">
          <FaImage className="text-3xl text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No flyers uploaded yet</p>
          <p className="text-xs text-slate-400">Click "Upload New Flyer / Banner" to add one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flyers.map((flyer) => {
            const isActive = flyer.status === 'Active';

            return (
              <div
                key={flyer.id}
                className="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-white/5 shadow-xs overflow-hidden flex flex-col justify-between group/card hover:shadow-lg transition-all"
              >
                {/* Image Preview */}
                <div className="relative h-48 w-full bg-neutral-950 overflow-hidden">
                  <img
                    src={flyer.image}
                    alt={flyer.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = '/casual/healthinsurance.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black text-brand-accent border border-white/20">
                      {flyer.tag}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      isActive ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}>
                      {flyer.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-black text-white leading-tight drop-shadow-sm font-['Plus_Jakarta_Sans',sans-serif]">
                      {flyer.title}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {flyer.subtitle}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                    <button
                      onClick={() => handleToggleStatus(flyer)}
                      className="text-xs font-bold flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-brand-accent cursor-pointer"
                    >
                      {isActive ? <FaToggleOn className="text-emerald-500 text-base" /> : <FaToggleOff className="text-slate-400 text-base" />}
                      <span>{isActive ? 'Active' : 'Closed'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(flyer)}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-200 hover:bg-brand-accent hover:text-neutral-950 transition-colors text-xs font-bold cursor-pointer"
                        title="Edit Flyer"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(flyer.id)}
                        className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors text-xs font-bold cursor-pointer"
                        title="Delete Flyer"
                      >
                        <FaTrash />
                      </button>
                    </div>
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
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Delete Flyer?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This will remove the flyer from the home hero slider.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Create / Edit Modal with Drag & Drop */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                {editingFlyer ? 'Edit Flyer Banner' : 'Upload New Flyer / Banner'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                Drag and drop your flyer poster image or browse files from your device.
              </p>

              <form onSubmit={handleSave} className="space-y-4">
                
                {/* ── DRAG & DROP FILE UPLOAD AREA ── */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                    Flyer Poster Image *
                  </label>
                  
                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {/* Dropzone Container */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition-all duration-200 ${
                      isDragging 
                        ? 'border-brand-accent bg-brand-accent/15 scale-[1.01]' 
                        : 'border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-neutral-950/60 hover:border-brand-accent/60 hover:bg-slate-100 dark:hover:bg-neutral-800/40'
                    }`}
                  >
                    {uploadingImage ? (
                      <div className="py-6 flex flex-col items-center justify-center gap-2">
                        <FaSpinner className="animate-spin text-2xl text-brand-accent" />
                        <p className="text-xs font-bold text-slate-600 dark:text-neutral-300">Processing & Uploading image...</p>
                      </div>
                    ) : formData.image ? (
                      <div className="flex items-center gap-4 text-left">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-slate-200 dark:border-white/10">
                          <img
                            src={formData.image}
                            alt="Flyer Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = '/casual/healthinsurance.jpg'; }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase mb-1">
                            <FaCheckCircle className="text-[9px]" />
                            <span>Image Ready</span>
                          </div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            Poster Attached
                          </p>
                          <p className="text-[10px] text-brand-accent font-bold mt-1 hover:underline">
                            Click or drop new file to replace
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center text-brand-accent text-xl">
                          <FaCloudUploadAlt />
                        </div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">
                          <span className="text-amber-600 dark:text-brand-accent">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-neutral-500">
                          PNG, JPG, WEBP up to 8MB
                        </p>
                      </div>
                    )}
                  </div>

                  {uploadError && (
                    <p className="text-xs text-red-500 font-bold mt-1 flex items-center gap-1">
                      <FaTimesCircle className="text-xs" /> {uploadError}
                    </p>
                  )}

                  {/* Preset Options / URL Switch */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 text-[10px] text-slate-400">
                    <span className="font-semibold">Quick Presets:</span>
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={() => setFormData({ ...formData, image: '/casual/healthinsurance.jpg' })} 
                        className="text-brand-accent underline hover:text-white cursor-pointer font-bold"
                      >
                        Health
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setFormData({ ...formData, image: '/casual/lifeinsurancepolicy.jpg' })} 
                        className="text-brand-accent underline hover:text-white cursor-pointer font-bold"
                      >
                        Life
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setFormData({ ...formData, image: '/casual/insurancepolicy.jpg' })} 
                        className="text-brand-accent underline hover:text-white cursor-pointer font-bold"
                      >
                        General
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Flyer Title / Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Complete Health Protection"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Subtitle / Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 100% Cashless hospitalization at 14,000+ top hospitals..."
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Badge / Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. HEALTH SHIELD, SPECIAL"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Health Insurance">Health Insurance</option>
                      <option value="Life Insurance">Life Insurance</option>
                      <option value="General Insurance">General Insurance</option>
                      <option value="Motor Insurance">Motor Insurance</option>
                      <option value="Mutual Funds">Mutual Funds</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Action Link Destination *
                    </label>
                    <select
                      value={
                        ['/plans', '/plans?category=health', '/plans?category=life', '/plans?category=motor', '/plans?category=general', '/appointment', '/claims', '/support', '/about'].includes(formData.link)
                          ? formData.link
                          : 'custom'
                      }
                      onChange={(e) => {
                        if (e.target.value !== 'custom') {
                          setFormData({ ...formData, link: e.target.value });
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="/plans">All Insurance Plans (/plans)</option>
                      <option value="/plans?category=health">Health Insurance (/plans?category=health)</option>
                      <option value="/plans?category=life">Life Insurance (/plans?category=life)</option>
                      <option value="/plans?category=motor">Motor Insurance (/plans?category=motor)</option>
                      <option value="/plans?category=general">General Insurance (/plans?category=general)</option>
                      <option value="/appointment">Book Consultation (/appointment)</option>
                      <option value="/claims">Claims Assistance (/claims)</option>
                      <option value="/support">Contact Desk (/support)</option>
                      <option value="/about">About Us (/about)</option>
                      <option value="custom">Custom Link / External URL...</option>
                    </select>

                    <input
                      type="text"
                      placeholder="e.g. /plans or https://..."
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full mt-2 px-3.5 py-2 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-accent text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Active">Active (Visible)</option>
                      <option value="Closed">Closed (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || uploadingImage}
                    className="px-6 py-2.5 rounded-xl bg-brand-accent text-neutral-950 text-xs font-black uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <FaSave />
                    <span>{saving ? 'Saving...' : editingFlyer ? 'Update Flyer' : 'Add Flyer'}</span>
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

export default FlyersManager;
