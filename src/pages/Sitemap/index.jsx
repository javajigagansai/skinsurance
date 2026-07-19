import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass, FaExternalLinkAlt, FaLock, FaUserShield, FaGlobe, FaNetworkWired } from 'react-icons/fa';

export const Sitemap = () => {
  const categories = [
    {
      title: 'Public Portal',
      icon: FaGlobe,
      desc: 'Access client brochures, premium quote tools, and company announcements.',
      links: [
        { label: 'Home Page', path: '/' },
        { label: 'About Us & Timeline', path: '/about' },
        { label: 'Tailored Protection Plans', path: '/plans' },
        { label: 'Interactive SIP Calculator', path: '/calculator' },
        { label: 'Careers & Positions', path: '/careers' },
        { label: 'Inquiries & Contact Desk', path: '/support' },
        { label: 'Financial Insights Blog', path: '/blog' }
      ]
    },
    {
      title: 'Authentication & Security',
      icon: FaLock,
      desc: 'Access verification systems, password recovery, and secure sessions.',
      links: [
        { label: 'User Sign In / Sign Up', path: '/auth' },
        { label: 'Client Registration Desk', path: '/auth' },
        { label: 'Grievance Redressal Privacy Policy', path: '/privacy' }
      ]
    },
    {
      title: 'Role-Based Workspaces',
      icon: FaUserShield,
      desc: 'Verify underwriting documents, claims queues, and leadership dashboards.',
      links: [
        { label: 'Policyholder Dashboard', path: '/dashboard' },
        { label: 'Underwriting Representative Workspace', path: '/dashboard/agent' },
        { label: 'Outbound Leads Panel', path: '/dashboard/telecaller' },
        { label: 'Claims Verification Queue', path: '/dashboard/employee' },
        { label: 'Operations Leadership Console', path: '/dashboard/manager' },
        { label: 'System Admin Settings Console', path: '/dashboard/admin' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-500 bg-gold-500/10 rounded-full">
          Site Index
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 dark:text-white mt-2">
          Platform Sitemap
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-xs sm:text-sm">
          Navigate all public services, operational workspaces, and legal portals of SK Smart Investments.
        </p>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div 
              key={idx} 
              className="p-6 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/40 dark:border-white/5 shadow-sm space-y-4 text-left flex flex-col justify-between hover:border-gold-500/20 dark:hover:border-gold-400/20 transition-all duration-300 group hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gold-500">
                  <div className="p-2.5 bg-slate-50 dark:bg-navy-950 rounded-xl group-hover:scale-110 transition-transform">
                    <Icon className="text-lg" />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-navy-955 dark:text-white">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  {cat.desc}
                </p>
                <div className="w-full border-t border-slate-100 dark:border-white/5 pt-2" />
                <ul className="space-y-2">
                  {cat.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        to={link.path}
                        className="text-xs font-semibold text-slate-500 dark:text-slate-300 hover:text-gold-500 hover:underline flex items-center space-x-2 py-1"
                      >
                        <span className="text-[8px] text-gold-400">●</span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Connectivity map */}
      <div className="p-6 bg-navy-950 text-white rounded-3xl border border-white/5 text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-navy-900 text-gold-400 rounded-2xl shrink-0">
            <FaNetworkWired className="text-xl" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">External Integrations & Channels</h4>
            <p className="text-[11px] text-slate-400 mt-1 max-w-md leading-relaxed">
              Connect with MD Prakash Gajendiran or follow official company posts across Instagram and LinkedIn channels.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0 w-full sm:w-auto justify-start sm:justify-end">
          <a 
            href="https://www.instagram.com/sk_smartinvestments/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-navy-900 border border-white/10 hover:border-gold-500 text-gold-400 font-bold text-[10px] uppercase rounded-xl flex items-center space-x-2 transition-all cursor-pointer"
          >
            <span>Instagram Page</span>
            <FaExternalLinkAlt className="text-[8px]" />
          </a>
          <a 
            href="https://www.linkedin.com/company/sksmartinvestments/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-navy-900 border border-white/10 hover:border-gold-500 text-gold-400 font-bold text-[10px] uppercase rounded-xl flex items-center space-x-2 transition-all cursor-pointer"
          >
            <span>LinkedIn Company</span>
            <FaExternalLinkAlt className="text-[8px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
