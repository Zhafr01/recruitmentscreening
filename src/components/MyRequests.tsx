import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, XCircle, User, Calendar, FileText, Activity } from 'lucide-react';
import { myRequests } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyRequests() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? myRequests
    : myRequests.filter(r => r.status === filter);

  return (
    <div className="flex flex-col gap-6 h-full max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Requests</h1>
          <p className="text-text-muted text-sm mt-1">Track the status of workflows you've initiated.</p>
        </div>
        <button className="bg-accent text-white hover:bg-accent/90 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors flex items-center gap-2">
          <Plus size={16} /> New Request
        </button>
      </div>

      <div className="flex items-center gap-2 bg-surface p-1 rounded-lg border border-border w-fit">
        {['all', 'in-progress', 'approved', 'rejected'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f 
                ? 'bg-accent-surface text-accent shadow-sm' 
                : 'text-text-muted hover:text-text-ink hover:bg-surface-raised'
            }`}
          >
            {f === 'all' ? 'All Requests' : f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex-1 min-h-0 flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="sticky top-0 bg-base z-10">
              <tr>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider">Request Title</th>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((req, i) => (
                  <motion.tr 
                    key={req.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className="hover:bg-surface-raised transition-colors group"
                  >
                    <td className="px-6 py-4 border-b border-border">
                      <div className="font-semibold text-text-ink mb-1">{req.title}</div>
                      <div className="text-xs text-text-muted flex items-center gap-1.5">
                        <FileText size={12} /> ID: {req.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-border">
                      {req.status === 'in-progress' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-info-surface text-info border border-info/20"><Clock size={12}/> In Progress</span>}
                      {req.status === 'approved' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-success-surface text-success border border-success/20"><CheckCircle size={12}/> Approved</span>}
                      {req.status === 'rejected' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-breach-surface text-breach border border-breach/20"><XCircle size={12}/> Rejected</span>}
                    </td>
                    <td className="px-6 py-4 border-b border-border min-w-[200px]">
                      {req.status === 'in-progress' ? (
                        <div className="w-full">
                          <div className="flex justify-between text-xs mb-1.5 font-medium">
                            <span className="text-text-muted">Step {req.currentStep} of {req.totalSteps}</span>
                            <span className="text-accent">{Math.round((req.currentStep / req.totalSteps) * 100)}%</span>
                          </div>
                          <div className="h-1.5 bg-surface-overlay border border-border rounded-full overflow-hidden w-full">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(req.currentStep / req.totalSteps) * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-accent rounded-full"
                            />
                          </div>
                          <div className="text-[10px] text-text-muted mt-2 flex items-center gap-1.5">
                            <User size={10} className="text-text-faint" /> Pending with: <span className="font-medium text-text-ink">{req.assignedTo}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-text-muted font-medium bg-surface-overlay px-2 py-1 rounded-md border border-border">Completed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b border-border">
                      <div className="text-xs text-text-muted flex items-center gap-1.5">
                        <Calendar size={14} className="text-text-faint" /> {req.submittedAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-border text-right">
                      <button className="text-sm font-medium text-text-muted hover:text-accent transition-colors">Details</button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Activity size={32} className="text-border-strong mb-4" />
              <p className="text-text-muted">No requests found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
