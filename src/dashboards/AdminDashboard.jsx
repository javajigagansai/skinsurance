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

  const [claims, setClaims] = useState([
    { id: 'CLM-901', client: 'Vijay Kumar', type: 'Health Platinum Cover', amount: '₹1,50,000', status: 'Pending', date: '2026-07-12' },
    { id: 'CLM-902', client: 'Arun Mozhi', type: 'Auto Max Cover', amount: '₹45,000', status: 'Approved', date: '2026-07-10' },
    { id: 'CLM-903', client: 'Deepa Selvan', type: 'Term Life Elite', amount: '₹12,00,000', status: 'Pending', date: '2026-07-09' },
    { id: 'CLM-904', client: 'Karthik Raja', type: 'Safe Haven Home Policy', amount: '₹3,50,000', status: 'Rejected', date: '2026-07-08' }
  ]);

  const handleUpdateClaimStatus = (id, newStatus) => {
    setClaims(claims.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

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

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Customer');

  const [permsMatrix, setPermsMatrix] = useState(() => {
    const saved = localStorage.getItem('permissions_matrix');
    if (saved) return JSON.parse(saved);
    return {
      'Initiate Mutual Fund SIP': ['Admin', 'Manager', 'Agent', 'Customer'],
      'Submit Insurance Claim': ['Admin', 'Manager', 'Employee', 'Agent', 'Customer'],
      'Approve Claim Requests': ['Admin', 'Manager', 'Employee'],
      'Read Platform Audit Logs': ['Admin', 'Manager'],
      'Upload Gallery Assets': ['Admin']
    };
  });

  const handleTogglePerm = (op, role) => {
    const current = permsMatrix[op] || [];
    const updated = current.includes(role)
      ? current.filter(r => r !== role)
      : [...current, role];
    const newMatrix = { ...permsMatrix, [op]: updated };
    setPermsMatrix(newMatrix);
    localStorage.setItem('permissions_matrix', JSON.stringify(newMatrix));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    const nextId = `USR-${platformUsers.length + 101}`;
    const newUser = {
      id: nextId,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      active: true
    };
    setPlatformUsers([...platformUsers, newUser]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('Customer');
    setShowAddUserForm(false);
  };

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

        {/* SVG Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart: User Roles */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">User Registrations by Role</h3>
            <div className="h-36 w-full flex items-end justify-around pb-2 relative border-b border-slate-100 dark:border-white/5 pt-4">
              {/* Customer */}
              <div className="flex flex-col items-center w-12 group">
                <span className="text-[9px] font-bold text-gold-500 mb-1">12</span>
                <div className="w-6 bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-md" style={{ height: '60px' }} />
                <span className="text-[9px] text-slate-400 font-semibold mt-1">Cust</span>
              </div>
              {/* Agent */}
              <div className="flex flex-col items-center w-12 group">
                <span className="text-[9px] font-bold text-gold-500 mb-1">8</span>
                <div className="w-6 bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-md" style={{ height: '40px' }} />
                <span className="text-[9px] text-slate-400 font-semibold mt-1">Agent</span>
              </div>
              {/* Employee */}
              <div className="flex flex-col items-center w-12 group">
                <span className="text-[9px] font-bold text-gold-500 mb-1">4</span>
                <div className="w-6 bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-md" style={{ height: '20px' }} />
                <span className="text-[9px] text-slate-400 font-semibold mt-1">Emp</span>
              </div>
              {/* Manager */}
              <div className="flex flex-col items-center w-12 group">
                <span className="text-[9px] font-bold text-gold-500 mb-1">2</span>
                <div className="w-6 bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-md" style={{ height: '10px' }} />
                <span className="text-[9px] text-slate-400 font-semibold mt-1">Mgr</span>
              </div>
            </div>
          </div>

          {/* Donut Chart: Claims Underwriting */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-3">
            <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider">Claims Underwriting Outcomes</h3>
            <div className="flex items-center justify-around h-36">
              {/* SVG Donut */}
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background segment */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="transparent" strokeWidth="3" />
                  
                  {/* Approved segment (60%) */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.2" 
                    strokeDasharray="60 40" strokeDashoffset="0" />
                  
                  {/* Pending segment (30%) */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3.2" 
                    strokeDasharray="30 70" strokeDashoffset="-60" />
                  
                  {/* Rejected segment (10%) */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="3.2" 
                    strokeDasharray="10 90" strokeDashoffset="-90" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-navy-950 dark:text-white leading-none">100%</span>
                  <span className="text-[7px] text-slate-400 uppercase mt-0.5 font-bold">Resolved</span>
                </div>
              </div>

              {/* Legends list */}
              <div className="text-[10px] space-y-2 text-left font-bold">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block" />
                  <span className="text-slate-400">Approved (60%)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-amber-500 rounded-full inline-block" />
                  <span className="text-slate-400">In Progress (30%)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-rose-500 rounded-full inline-block" />
                  <span className="text-slate-400">Rejected (10%)</span>
                </div>
              </div>
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
          <div>
            <h2 className="text-xl font-bold text-navy-950 dark:text-white font-sans">Platform Users Register</h2>
            <p className="text-xs text-slate-400 mt-1">Create, view, and manage roles for platform accounts.</p>
          </div>
          <div className="flex items-center space-x-3">
            <SearchBar value={userSearch} onChange={setUserSearch} placeholder="Search user accounts..." />
            <Button variant="gold" onClick={() => setShowAddUserForm(!showAddUserForm)}>
              <FaPlus className="mr-1.5" /> Create Account
            </Button>
          </div>
        </div>

        {showAddUserForm && (
          <form onSubmit={handleCreateUser} className="p-5 bg-white dark:bg-navy-900 border border-slate-200/50 dark:border-white/5 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Legal Name</label>
              <input 
                type="text" 
                required 
                placeholder="Your Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="Enter Email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Assigned Role</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-gold-500"
              >
                <option value="Customer">Customer</option>
                <option value="Agent">Agent</option>
                <option value="Telecaller">Telecaller</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <Button type="submit" variant="gold" className="flex-1 py-2 font-bold">
                Add User
              </Button>
              <Button variant="outline" className="py-2" onClick={() => setShowAddUserForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

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

  // 3.5 CLAIMS UNDERWRITING REVIEW QUEUE
  if (tab === 'claims') {
    return (
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-bold text-navy-950 dark:text-white font-sans">Underwriting Claims Queue</h2>
          <p className="text-xs text-slate-400 mt-1">Review active customer claims, perform risk validation, and update approval statuses.</p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-200/40 dark:border-white/5 space-y-4">
          <div className="overflow-x-auto text-xs">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 border-b border-slate-200/50 dark:border-white/5 pb-2 text-left font-bold">
                  <th className="py-2.5">Claim ID</th>
                  <th>Customer/Client</th>
                  <th>Policy Plan Type</th>
                  <th>Claim Value</th>
                  <th>Date Logged</th>
                  <th>Underwriting Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-50/50 dark:hover:bg-navy-900/10">
                    <td className="py-3 font-semibold text-navy-950 dark:text-gold-400">{claim.id}</td>
                    <td className="font-bold">{claim.client}</td>
                    <td>{claim.type}</td>
                    <td className="font-semibold text-slate-600 dark:text-slate-200">{claim.amount}</td>
                    <td className="text-slate-400">{claim.date}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        claim.status === 'Approved'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : claim.status === 'Rejected'
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-2">
                      {claim.status === 'Pending' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdateClaimStatus(claim.id, 'Approved')}
                            className="px-2.5 py-1 bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all font-bold cursor-pointer text-[10px]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateClaimStatus(claim.id, 'Rejected')}
                            className="px-2.5 py-1 bg-red-500/15 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all font-bold cursor-pointer text-[10px]"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[10px]">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 4. GALLERY MANAGER TAB (SETTINGS)
  if (tab === 'settings') {

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

        {/* Roles Permission Authorization Matrix */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-200/40 dark:border-white/5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-navy-950 dark:text-white font-sans">Role-Based Access Matrix</h3>
            <p className="text-xs text-slate-400 mt-0.5">Configure feature authorization policies across customer and staff roles.</p>
          </div>

          <div className="overflow-x-auto text-xs text-left">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 border-b border-slate-200/50 dark:border-white/5 pb-2 text-left font-bold">
                  <th className="py-2.5">Platform Operation</th>
                  <th className="text-center">Admin</th>
                  <th className="text-center">Manager</th>
                  <th className="text-center">Employee</th>
                  <th className="text-center">Agent</th>
                  <th className="text-center">Customer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {Object.keys(permsMatrix).map((op) => (
                  <tr key={op} className="hover:bg-slate-50/50 dark:hover:bg-navy-900/10">
                    <td className="py-3 font-semibold text-navy-950 dark:text-white">{op}</td>
                    {['Admin', 'Manager', 'Employee', 'Agent', 'Customer'].map((role) => (
                      <td key={role} className="text-center">
                        <input 
                          type="checkbox"
                          checked={permsMatrix[op].includes(role)}
                          onChange={() => handleTogglePerm(op, role)}
                          className="w-4 h-4 rounded border-slate-300 text-gold-500 focus:ring-gold-500 cursor-pointer accent-gold-500"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return <EmptyState title="No Dashboard Section" description="The requested section could not be found." />;
};
export default AdminDashboard;
