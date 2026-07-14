import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sidebar } from '../../components/layout/Sidebar';
import { CustomerDashboard } from '../../dashboards/CustomerDashboard';
import { AgentDashboard } from '../../dashboards/AgentDashboard';
import { TelecallerDashboard } from '../../dashboards/TelecallerDashboard';
import { EmployeeDashboard } from '../../dashboards/EmployeeDashboard';
import { ManagerDashboard } from '../../dashboards/ManagerDashboard';
import { AdminDashboard } from '../../dashboards/AdminDashboard';
import { NOTIFICATIONS } from '../../services/mockData';
import { FaBell, FaChevronDown, FaUserCircle, FaCheckCircle, FaTrash } from 'react-icons/fa';

export const Dashboard = () => {
  const { user, switchRole } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { tab } = useParams();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [showNtfDropdown, setShowNtfDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Redirect to Auth if not logged in
  if (!user) {
    React.useEffect(() => {
      navigate('/auth');
    }, []);
    return null;
  }

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleNtfClick = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const renderRoleDashboard = () => {
    if (!tab || tab === 'overview') {
      return (
        <div className="space-y-6 text-left">
          {/* Title */}
          <h1 className="text-2xl font-bold text-navy-950 dark:text-white leading-tight">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}-focused overview
          </h1>

          {/* Cards Row (KPI, SGD, Global Network) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-left">
            {/* KPI Panels Card */}
            <div className="glass-panel dark:glass-panel-gold rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 relative">
              <div className="flex justify-between items-start">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-sans">KPI panels</p>
                <span className="text-xs text-slate-400">•••</span>
              </div>
              <h3 className="text-3xl font-extrabold text-navy-950 dark:text-white mt-2">75.8%</h3>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center mt-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block" />
                + Positive growth
              </p>
            </div>

            {/* SGD Card */}
            <div className="glass-panel dark:glass-panel-gold rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 relative">
              <div className="flex justify-between items-start">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-sans">SGD</p>
                <span className="text-xs text-slate-400">•••</span>
              </div>
              <h3 className="text-3xl font-extrabold text-navy-950 dark:text-white mt-2">$83.1579</h3>
              <p className="text-[10px] text-red-500 font-bold flex items-center mt-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5 inline-block" />
                - 0.04% Down
              </p>
            </div>

            {/* Global Network Card */}
            <div className="glass-panel dark:glass-panel-gold rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 relative">
              <div className="flex justify-between items-start">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-sans">Global network</p>
                <span className="text-xs text-slate-400">•••</span>
              </div>
              <h3 className="text-3xl font-extrabold text-navy-950 dark:text-white mt-2">59.8k</h3>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center mt-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block" />
                + 2.8% Up
              </p>
            </div>
          </div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {/* Global investments */}
            <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 flex flex-col justify-between min-h-[300px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-navy-950 dark:text-white font-sans">Global investments</h3>
                <span className="text-xs text-slate-400">Weekly ▼</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center flex-1">
                {/* Investment Stats */}
                <div className="md:col-span-1 space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Global</p>
                    <h4 className="text-2xl font-bold text-[#12126A] dark:text-slate-100">11.25k</h4>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Member</p>
                    <h4 className="text-2xl font-bold text-slate-700 dark:text-slate-200">51.35k</h4>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Institutions</p>
                    <h4 className="text-2xl font-bold text-gold-500">5.06</h4>
                  </div>
                </div>

                {/* World Map SVG */}
                <div className="md:col-span-2 h-48 relative bg-navy-900/5 dark:bg-navy-950/40 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-100 dark:border-white/5">
                  <svg className="w-full h-full text-slate-300 dark:text-navy-800" viewBox="0 0 1000 500" fill="currentColor">
                    {/* Continents path */}
                    <path d="M 50 100 Q 150 120 220 80 T 300 200 T 250 300 Z" />
                    <path d="M 250 300 Q 280 380 320 480 T 260 490 Z" />
                    <path d="M 450 120 Q 550 80 650 90 T 800 120 T 900 200 T 850 350 T 600 300 Z" />
                    <path d="M 460 220 Q 550 250 580 350 T 520 440 Z" />
                    <path d="M 800 380 Q 880 390 890 450 Z" />

                    {/* Gold pins */}
                    <circle cx="180" cy="180" r="10" className="fill-gold-500 animate-ping opacity-75" />
                    <circle cx="180" cy="180" r="6" className="fill-gold-500" />
                    <circle cx="490" cy="130" r="10" className="fill-gold-500 animate-ping opacity-75" />
                    <circle cx="490" cy="130" r="6" className="fill-gold-500" />
                    <circle cx="780" cy="300" r="10" className="fill-gold-500 animate-ping opacity-75" />
                    <circle cx="780" cy="300" r="6" className="fill-gold-500" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column (Insights + Notifications) */}
            <div className="space-y-6">
              {/* Market Insights with glowing border */}
              <div className="glass-panel rounded-2xl p-5 border border-gold-500/30 dark:border-gold-500/20 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider font-sans">Live market insights</h3>
                  <span className="text-xs text-slate-400">•••</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Corporate assets rate index is currently outperforming traditional yields by +2.1%. Actuarial parameters updated.
                </p>
              </div>

              {/* Prioritized Notifications */}
              <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-navy-950 dark:text-white uppercase tracking-wider font-sans">Prioritized notifications</h3>
                  <span className="text-xs text-slate-400">▼</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-gold-500 shrink-0" />
                      <span className="font-semibold truncate max-w-[120px]">Premium Payout</span>
                    </div>
                    <span className="text-[10px] text-slate-400">2 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-gold-500 shrink-0" />
                      <span className="font-semibold truncate max-w-[120px]">Claims Ingress</span>
                    </div>
                    <span className="text-[10px] text-slate-400">1 day ago</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-white/5">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-semibold truncate max-w-[120px]">System Backup</span>
                    </div>
                    <span className="text-[10px] text-slate-400">2 days ago</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                      <span className="font-semibold truncate max-w-[120px]">Dataform Sync</span>
                    </div>
                    <span className="text-[10px] text-slate-400">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (user.role) {
      case 'customer':
        return <CustomerDashboard tab={tab} />;
      case 'agent':
        return <AgentDashboard tab={tab} />;
      case 'telecaller':
        return <TelecallerDashboard tab={tab} />;
      case 'employee':
        return <EmployeeDashboard tab={tab} />;
      case 'manager':
        return <ManagerDashboard tab={tab} />;
      case 'admin':
        return <AdminDashboard tab={tab} />;
      default:
        return <CustomerDashboard tab={tab} />;
    }
  };

  const getDashboardTitle = () => {
    const roleLabels = {
      customer: 'Policyholder Workspace',
      agent: 'Underwriting Representative Dashboard',
      telecaller: 'Outbound Leads Dashboard',
      employee: 'Claims Verification Queue',
      manager: 'Operations Leadership Console',
      admin: 'System Settings Console'
    };
    return roleLabels[user.role] || 'Insurance Dashboard';
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Dynamic Collapsible Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200/40 dark:border-white/5 bg-white/70 dark:bg-navy-950/70 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-sm font-bold text-navy-950 dark:text-white uppercase tracking-wider font-sans">
              {getDashboardTitle()}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNtfDropdown(!showNtfDropdown);
                  setShowProfileDropdown(false);
                }}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-900 text-slate-500 dark:text-slate-300 relative transition-all cursor-pointer"
              >
                <FaBell className="text-base" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1.5 h-4 w-4 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-[8px] animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNtfDropdown && (
                <div className="absolute right-0 mt-2 w-80 glass-panel dark:glass-panel-gold border border-slate-200/50 dark:border-gold-400/20 rounded-2xl shadow-xl z-50 p-4 text-left overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 mb-2 text-xs">
                    <span className="font-bold text-navy-950 dark:text-white">Notifications Panel</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[10px] text-gold-500 hover:underline font-semibold cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {notifications.map((ntf) => (
                      <div
                        key={ntf.id}
                        onClick={() => handleNtfClick(ntf.id)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          ntf.unread
                            ? 'bg-gold-500/5 border-gold-300/30'
                            : 'bg-slate-50/50 dark:bg-navy-900/30 border-transparent hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-navy-950 dark:text-white text-[11px] leading-tight">
                            {ntf.title}
                          </p>
                          <span className="text-[9px] text-slate-400 font-semibold">{ntf.time}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                          {ntf.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNtfDropdown(false);
                }}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-900 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <div className="h-8 w-8 rounded-lg bg-navy-800 text-gold-400 flex items-center justify-center font-bold text-xs shrink-0 border border-gold-400/20">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-xs font-semibold hidden md:inline truncate max-w-[80px]">{user.name}</span>
                <FaChevronDown className="text-[10px] text-slate-400" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 glass-panel border border-slate-200/50 dark:border-white/5 rounded-2xl shadow-xl z-50 p-2 text-left">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/5 text-xs">
                    <p className="font-bold text-navy-950 dark:text-white truncate">{user.name}</p>
                    <p className="text-[9px] text-slate-400 font-semibold mt-0.5 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate('/dashboard/settings');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-200 mt-1 cursor-pointer font-medium"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate('/dashboard/support');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-200 cursor-pointer font-medium"
                  >
                    Help Center
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace View */}
        <main className="flex-1 overflow-y-auto p-6 pb-28">
          {renderRoleDashboard()}
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
