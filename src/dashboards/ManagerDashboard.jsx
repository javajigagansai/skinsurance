import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CLAIMS } from '../services/mockData';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { FaShieldAlt, FaArrowUp, FaUsers, FaCoins, FaCheckCircle, FaFileDownload } from 'react-icons/fa';

export const ManagerDashboard = ({ tab }) => {
  const { user } = useAuth();
  
  // High value claims escalated to manager (amount > $2000)
  const [approvalsQueue, setApprovalsQueue] = useState(
    CLAIMS.filter(c => c.status === 'Approved' || c.status === 'In Progress')
          .map(c => ({ ...c, status: 'Escalated' }))
  );
  
  const [successMsg, setSuccessMsg] = useState(null);

  const handleApprove = (claimId) => {
    setApprovalsQueue(prev => prev.filter(c => c.id !== claimId));
    setSuccessMsg(`Claim ${claimId} successfully authorized and dispatched to bank treasury.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // 1. OVERVIEW VIEW (KPI OPERATIONS)
  if (!tab || tab === 'overview') {
    return (
      <div className="space-y-6 text-left">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel dark:glass-panel-gold rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <FaCoins className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gross Department Sales</p>
              <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-0.5">₹1,89,42,000</h3>
              <p className="text-[9px] text-emerald-500 font-bold flex items-center mt-0.5"><FaArrowUp className="mr-0.5" /> +8.2% monthly target</p>
            </div>
          </div>

          <div className="glass-panel dark:glass-panel-gold rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-gold-500/10 text-gold-500 rounded-xl">
              <FaShieldAlt className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Claims Settled (Department)</p>
              <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-0.5">340 Claims</h3>
            </div>
          </div>

          <div className="glass-panel dark:glass-panel-gold rounded-2xl p-5 flex items-center space-x-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
              <FaUsers className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Agency Force</p>
              <h3 className="text-2xl font-bold text-navy-950 dark:text-white mt-0.5">58 Field Agents</h3>
            </div>
          </div>
        </div>

        {/* Manager Tasks / Approvals summary */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200/40 dark:border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-navy-950 dark:text-white">Escalated High-Value Claims Approvals</h3>
            <span className="text-xs text-slate-400">Total escalated: {approvalsQueue.length}</span>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs flex items-center space-x-2">
              <FaCheckCircle />
              <span>{successMsg}</span>
            </div>
          )}

          {approvalsQueue.length === 0 ? (
            <EmptyState title="Approvals Queue Clean" description="No claims escalated at this time." icon={FaCheckCircle} />
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/5 text-xs">
              {approvalsQueue.map(c => (
                <div key={c.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-navy-950 dark:text-white">{c.id} - {c.planName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Claim sum: <strong className="text-gold-500">{c.amount}</strong> | Policy Number: {c.policyNumber}</p>
                  </div>
                  <Button variant="gold" size="sm" onClick={() => handleApprove(c.id)}>Authorize Payout</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. HIGH-VALUE APPROVALS TAB
  if (tab === 'approvals') {
    return (
      <div className="space-y-6 text-left">
        <h2 className="text-xl font-bold text-navy-950 dark:text-white font-sans">High-Value Audit Desk</h2>
        <div className="glass-panel rounded-3xl p-6 border border-slate-200/40 dark:border-white/5 space-y-4">
          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs">
              {successMsg}
            </div>
          )}
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {approvalsQueue.map(c => (
              <div key={c.id} className="py-4 flex justify-between items-center gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-navy-950 dark:text-white">Escalated: {c.id} | Sum: <strong className="text-gold-500">{c.amount}</strong></h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Underwriting policy details: {c.policyNumber} | Plan: {c.planName}</p>
                </div>
                <Button variant="gold" size="sm" onClick={() => handleApprove(c.id)}>Approve Payment</Button>
              </div>
            ))}
            {approvalsQueue.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">No escalated approval requests pending.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. STAFF PERFORMANCE TAB
  if (tab === 'staff') {
    return (
      <div className="space-y-6 text-left">
        <h2 className="text-xl font-bold text-navy-950 dark:text-white">Agency Force Metrics</h2>
        <div className="glass-panel rounded-3xl p-6 border border-slate-200/40 dark:border-white/5 space-y-4">
          <div className="overflow-x-auto text-xs">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 border-b border-slate-200/50 dark:border-white/5 pb-2 text-left font-bold">
                  <th className="py-2.5">Agent Identifier</th>
                  <th>Department / Focus</th>
                  <th>Client Portfolios</th>
                  <th>Conversion rate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-navy-900/10">
                  <td className="py-3 font-semibold">Sarah Jenkins</td>
                  <td>Life & Health Coverage</td>
                  <td>42 Active</td>
                  <td className="font-bold text-emerald-500">14.8%</td>
                  <td><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">Top Performer</span></td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-navy-900/10">
                  <td className="py-3 font-semibold">Mark Antony</td>
                  <td>Motor Vehicle Cover</td>
                  <td>28 Active</td>
                  <td className="font-bold text-slate-500">10.2%</td>
                  <td><span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-900 text-slate-400 text-[10px] font-bold">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 4. BUSINESS REPORTS TAB
  if (tab === 'reports') {
    return (
      <div className="space-y-6 text-left">
        <h2 className="text-xl font-bold text-navy-950 dark:text-white">Underwriting Performance Audits</h2>
        <div className="glass-panel rounded-3xl p-6 border border-slate-200/40 dark:border-white/5 space-y-4">
          <p className="text-xs text-slate-500 leading-normal">
            Download quarterly business performance sheets. These include loss ratios, renewal rates, and Telecaller metrics.
          </p>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-navy-900/40 border border-slate-200/50 dark:border-white/5 rounded-xl flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-navy-950 dark:text-white">Q2_2026_LossRatioReport.xlsx</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Generated July 1, 2026 | Size: 4.2 MB</p>
              </div>
              <Button variant="secondary" size="sm" icon={FaFileDownload}>Download</Button>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-navy-900/40 border border-slate-200/50 dark:border-white/5 rounded-xl flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-navy-950 dark:text-white">Agency_Commissions_PayoutList.pdf</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Generated July 12, 2026 | Size: 1.1 MB</p>
              </div>
              <Button variant="secondary" size="sm" icon={FaFileDownload}>Download</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <EmptyState title="No Dashboard Section" description="The requested section could not be found." />;
};
export default ManagerDashboard;
