import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaPhoneAlt, FaEnvelope, FaListAlt, 
  FaSearch, FaCheckCircle, FaTimesCircle, FaTrash, 
  FaClock, FaWhatsapp, FaShieldAlt, FaFilter, FaDownload 
} from 'react-icons/fa';
import { 
  getConsultationLeads, 
  updateConsultationLeadStatus, 
  deleteConsultationLead 
} from '../../../services/api';
import { subscribeToCollection } from '../../../services/firebaseService';

const STATUS_OPTIONS = ['New', 'Contacted', 'In Progress', 'Closed'];

export const LeadsManager = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    getConsultationLeads().then(data => {
      setLeads(data || []);
      setLoading(false);
    });

    const unsubscribe = subscribeToCollection('consultation_leads', (data) => {
      if (data) {
        const sorted = [...data].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setLeads(sorted);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateConsultationLeadStatus(id, newStatus);
      showToast(`Lead marked as ${newStatus}`);
      const refreshed = await getConsultationLeads();
      setLeads(refreshed);
    } catch (e) {
      showToast("Could not update status", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead record?")) return;
    try {
      await deleteConsultationLead(id);
      showToast("Lead record deleted");
      const refreshed = await getConsultationLeads();
      setLeads(refreshed);
    } catch (e) {
      showToast("Could not delete lead", "error");
    }
  };

  const filteredLeads = leads.filter(lead => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      lead.name?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.phone?.toLowerCase().includes(query) ||
      lead.requirement?.toLowerCase().includes(query);
    
    const matchesStatus = filterStatus === 'ALL' || lead.status?.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const newCount = leads.filter(l => l.status === 'New' || !l.status).length;
  const inProgressCount = leads.filter(l => l.status === 'In Progress' || l.status === 'Contacted').length;
  const closedCount = leads.filter(l => l.status === 'Closed').length;

  const exportCSV = () => {
    if (!leads.length) return;
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Requirement', 'Status'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt || Date.now()).toLocaleString(),
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.requirement || ''}"`,
      l.status || 'New'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sk_consultation_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <span>Consultation Leads</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-accent text-neutral-950 font-black">
              ADMIN ONLY
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Incoming lead submissions from the "Let's Plan Your Protection" home section.
          </p>
        </div>

        {leads.length > 0 && (
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs self-start sm:self-auto"
          >
            <FaDownload className="text-xs" />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 shadow-xs">
          <p className="text-[10px] font-black uppercase text-slate-400">Total Leads</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{leads.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-xs">
          <p className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400">New / Uncontacted</p>
          <p className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-1">{newCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 shadow-xs">
          <p className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-400">In Progress</p>
          <p className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1">{inProgressCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-xs">
          <p className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">Closed / Protected</p>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">{closedCount}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or requirement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:border-brand-accent"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'New', 'Contacted', 'In Progress', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterStatus === st
                  ? 'bg-brand-accent text-neutral-950 font-black shadow-xs'
                  : 'bg-white dark:bg-neutral-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading consultation leads...</div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200 dark:border-white/10 p-8 space-y-2">
          <FaShieldAlt className="text-3xl text-slate-300 dark:text-neutral-700 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No consultation leads found</p>
          <p className="text-xs text-slate-400">New inquiries from the Home page lead capture form will automatically appear here in real time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLeads.map((lead) => {
            const status = lead.status || 'New';
            const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');

            const statusColors = {
              'New': 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
              'Contacted': 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
              'In Progress': 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30',
              'Closed': 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
            };

            return (
              <motion.div
                key={lead.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-brand-accent/50 transition-all"
              >
                {/* Left: Lead Details */}
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {lead.name}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusColors[status] || statusColors['New']}`}>
                      {status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <FaClock className="text-[9px]" />
                      {new Date(lead.createdAt || Date.now()).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <a 
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1 font-bold text-brand-accent hover:underline"
                    >
                      <FaPhoneAlt className="text-[10px]" />
                      <span>{lead.phone}</span>
                    </a>
                    
                    <a 
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:underline"
                    >
                      <FaEnvelope className="text-[10px]" />
                      <span>{lead.email}</span>
                    </a>

                    <div className="flex items-center gap-1 text-slate-500">
                      <FaListAlt className="text-[10px] text-brand-accent" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{lead.requirement}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions & Status Switcher */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  {/* WhatsApp Direct Link */}
                  {cleanPhone && (
                    <a
                      href={`https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=Hi%20${encodeURIComponent(lead.name || '')},%20this%20is%20SK%20Smart%20Investments%20regarding%20your%20consultation%20request.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                      title="Chat on WhatsApp"
                    >
                      <FaWhatsapp className="text-sm" />
                    </a>
                  )}

                  {/* Status Dropdown */}
                  <select
                    value={status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className="px-3 py-1.5 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-brand-accent cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                    title="Delete lead record"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default LeadsManager;
