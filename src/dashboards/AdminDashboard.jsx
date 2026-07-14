import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SYSTEM_LOGS } from '../services/mockData';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/common/SearchBar';
import { EmptyState } from '../components/ui/EmptyState';
import { FaShieldAlt, FaUsers, FaHistory, FaServer, FaCheckCircle, FaTrash, FaPlus, FaInfoCircle } from 'react-icons/fa';

export const AdminDashboard = ({ tab }) => {
  const { user } = useAuth();
  const [logs, setLogs] = useState(SYSTEM_LOGS);
  const [userSearch, setUserSearch] = useState('');
  const [systemLogsSearch, setSystemLogsSearch] = useState('');

  const [platformUsers, setPlatformUsers] = useState([
    { id: 'USR-101', name: 'John Doe', role: 'Customer', email: 'customer@mail.com', active: true },
    { id: 'USR-102', name: 'Sarah Jenkins', role: 'Agent', email: 'agent@mail.com', active: true },
    { id: 'USR-103', name: 'Mike Ross', role: 'Telecaller', email: 'telecaller@mail.com', active: true },
    { id: 'USR-104', name: 'Jane Watson', role: 'Employee', email: 'employee@mail.com', active: true },
    { id: 'USR-105', name: 'David Vance', role: 'Manager', email: 'manager1@mail.com', active: true },
    { id: 'USR-106', name: 'Alex Mercer', role: 'Admin', email: 'admin@mail.com', active: true }
  ]);

  const handleDeleteUser = (userId) => {
    setPlatformUsers(platformUsers.filter(u => u.id !== userId));
  };

  const filteredUsers = platformUsers.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(systemLogsSearch.toLowerCase()) ||
    log.action.toLowerCase().includes(systemLogsSearch.toLowerCase())
  );

  // 1. OVERVIEW VIEW (SYSTEM CONSOLE HEALTH)
  if (!tab || tab === 'overview') {
    return (
      <div className="space-y-6 text-left">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel dark:glass-panel-gold rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
              <FaServer className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Actuarial DB Clusters</p>
              <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-0.5">Online (99.9%)</h3>
            </div>
          </div>

          <div className="glass-panel dark:glass-panel-gold rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <FaUsers className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Registered Accounts</p>
              <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-0.5">{platformUsers.length} Users</h3>
            </div>
          </div>

          <div className="glass-panel dark:glass-panel-gold rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
              <FaHistory className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Security Events Logged</p>
              <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-0.5">{logs.length} Audited</h3>
            </div>
          </div>
        </div>

        {/* Global systems health check status card */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-4">
          <h3 className="text-base font-bold text-navy-950 dark:text-white">Platform Systems Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-navy-900 rounded-xl flex items-center justify-between border border-slate-200/50 dark:border-white/5">
              <span className="text-slate-400 font-medium">Actuarial DB API</span>
              <span className="font-bold text-emerald-500 flex items-center"><FaCheckCircle className="mr-1" /> Active</span>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-navy-900 rounded-xl flex items-center justify-between border border-slate-200/50 dark:border-white/5">
              <span className="text-slate-400 font-medium">Claims Validator Engine</span>
              <span className="font-bold text-emerald-500 flex items-center"><FaCheckCircle className="mr-1" /> Active</span>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-navy-900 rounded-xl flex items-center justify-between border border-slate-200/50 dark:border-white/5">
              <span className="text-slate-400 font-medium">Email Dispatch SMTP</span>
              <span className="font-bold text-emerald-500 flex items-center"><FaCheckCircle className="mr-1" /> Active</span>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-navy-900 rounded-xl flex items-center justify-between border border-slate-200/50 dark:border-white/5">
              <span className="text-slate-400 font-medium">Payment Treasury Gateway</span>
              <span className="font-bold text-emerald-500 flex items-center"><FaCheckCircle className="mr-1" /> Active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. USERS MANAGEMENT TAB
  if (tab === 'users') {
    return (
      <div className="space-y-6 text-left">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-navy-950 dark:text-white">Platform Users Register</h2>
          <SearchBar value={userSearch} onChange={setUserSearch} placeholder="Search user accounts..." />
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-200/40 dark:border-white/5 space-y-4">
          {filteredUsers.length === 0 ? (
            <EmptyState title="No Users Found" description="Try editing search terms." />
          ) : (
            <div className="overflow-x-auto text-xs">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-200/50 dark:border-white/5 pb-2 text-left font-bold">
                    <th className="py-2.5">User ID</th>
                    <th>Full Legal Name</th>
                    <th>Email Address</th>
                    <th>Assigned Role</th>
                    <th>Access status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-navy-900/10">
                      <td className="py-3 font-semibold text-navy-950 dark:text-white">{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-900 font-bold">{u.role}</span></td>
                      <td><span className="text-emerald-500 font-bold">Active</span></td>
                      <td>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-navy-900 rounded transition-all cursor-pointer text-slate-400"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. AUDIT LOGS TAB
  if (tab === 'logs') {
    return (
      <div className="space-y-6 text-left">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-navy-950 dark:text-white font-sans">Audit Logs Ledger</h2>
          <SearchBar value={systemLogsSearch} onChange={setSystemLogsSearch} placeholder="Filter audit logs..." />
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-200/40 dark:border-white/5 space-y-4">
          {filteredLogs.length === 0 ? (
            <EmptyState title="No Logs Match Search" description="Refine your logs query terms." />
          ) : (
            <div className="overflow-x-auto text-xs">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-200/50 dark:border-white/5 pb-2 text-left font-bold">
                    <th className="py-2.5">Audit Timestamp</th>
                    <th>Platform Operator</th>
                    <th>Trigger Action</th>
                    <th>Result Status</th>
                    <th>Origin IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-navy-900/10">
                      <td className="py-3 font-semibold text-slate-400">{log.timestamp.replace('T', ' ')}</td>
                      <td className="font-bold">{log.user}</td>
                      <td>{log.action}</td>
                      <td><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">{log.status}</span></td>
                      <td className="text-slate-400">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 4. GALLERY MANAGER TAB (SETTINGS)
  if (tab === 'settings') {
    const [awardsList, setAwardsList] = useState(() => {
      const saved = localStorage.getItem('about_awards');
      if (saved) return JSON.parse(saved);
      return [
        { title: 'Excellence in Financial Planning', desc: 'Recognized for outstanding client portfolio management and wealth creation advisory.', img: '/IMG-20260714-WA0061.jpg' },
        { title: 'Best Insurance Distributor', desc: 'Commended for seamless claim settlement support and strategic insurance guidance.', img: '/IMG-20260714-WA0062.jpg' },
        { title: 'Trusted Mutual Fund Advisory', desc: 'Honored for delivering goal-based growth and custom risk mitigation strategies.', img: '/IMG-20260714-WA0063.jpg' },
        { title: 'Financial Literacy Contributor', desc: 'Recognized for public education campaigns on investment strategies and retirement savings.', img: '/IMG-20260714-WA0064.jpg' }
      ];
    });

    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newImg, setNewImg] = useState('/IMG-20260714-WA0061.jpg');
    const [customImgUrl, setCustomImgUrl] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleAddPhoto = (e) => {
      e.preventDefault();
      const imgPath = customImgUrl.trim() || newImg;
      if (!newTitle.trim() || !newDesc.trim()) return;

      const newPhoto = {
        title: newTitle.trim(),
        desc: newDesc.trim(),
        img: imgPath
      };

      const updated = [...awardsList, newPhoto];
      setAwardsList(updated);
      localStorage.setItem('about_awards', JSON.stringify(updated));
      setNewTitle('');
      setNewDesc('');
      setCustomImgUrl('');
      setSuccessMsg('Photo added to gallery successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    };

    const handleRemovePhoto = (index) => {
      const updated = awardsList.filter((_, idx) => idx !== index);
      setAwardsList(updated);
      localStorage.setItem('about_awards', JSON.stringify(updated));
    };

    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold text-navy-950 dark:text-white">About Us Gallery & Awards Manager</h2>
          <p className="text-xs text-slate-400 mt-1">Manage the award certificate photos displayed on the About Us page.</p>
        </div>

        {successMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl font-semibold">
            {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Photo Form */}
          <div className="lg:col-span-1 glass-panel rounded-3xl p-5 border border-slate-200/40 dark:border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-navy-950 dark:text-white">Add New Photo / Award</h3>
            <form onSubmit={handleAddPhoto} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Award / Photo Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. MDRT Excellence Award" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Description</label>
                <textarea 
                  required
                  placeholder="Describe this milestone or award..." 
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows="2"
                  className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Preset Image</label>
                <select 
                  value={newImg}
                  onChange={(e) => {
                    setNewImg(e.target.value);
                    setCustomImgUrl('');
                  }}
                  className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                >
                  <option value="/IMG-20260714-WA0061.jpg">Milestone Image 1</option>
                  <option value="/IMG-20260714-WA0062.jpg">Milestone Image 2</option>
                  <option value="/IMG-20260714-WA0063.jpg">Milestone Image 3</option>
                  <option value="/IMG-20260714-WA0064.jpg">Milestone Image 4</option>
                </select>
              </div>

              <div className="relative my-2 text-center text-[10px] text-slate-400 font-bold">OR</div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Custom Image URL / Filename</label>
                <input 
                  type="text" 
                  placeholder="e.g. /custom-photo.jpg" 
                  value={customImgUrl}
                  onChange={(e) => setCustomImgUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <Button type="submit" variant="gold" className="w-full py-2 font-bold mt-2">
                Add to Gallery
              </Button>
            </form>
          </div>

          {/* Current Gallery List */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-5 border border-slate-200/40 dark:border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-navy-950 dark:text-white">Current Gallery Items</h3>
            {awardsList.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No photos in gallery. Add one to display on the About Us page.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1">
                {awardsList.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-navy-900 rounded-2xl flex items-center space-x-3 border border-slate-200/40 dark:border-white/5 relative group">
                    <img src={item.img} className="w-16 h-16 object-cover rounded-xl border border-slate-200/50 dark:border-white/5" alt={item.title} />
                    <div className="flex-1 min-w-0 text-xs text-left">
                      <p className="font-bold text-navy-950 dark:text-white truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleRemovePhoto(idx)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl cursor-pointer"
                      title="Remove Photo"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <EmptyState title="No Dashboard Section" description="The requested section could not be found." />;
};
export default AdminDashboard;
