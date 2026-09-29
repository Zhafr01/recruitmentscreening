import React, { useState } from 'react';
import { pendingApprovals } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle2, XCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

export default function PendingApprovals() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="flex flex-col gap-6 h-full max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pending Approvals</h1>
          <p className="text-text-muted text-sm mt-1">Review and action pending requests requiring your approval.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search approvals..." 
              className="pl-9 pr-4 py-2 text-sm bg-surface border border-border rounded-md focus:outline-none focus:border-border-strong w-64 transition-colors"
            />
          </div>
          <button className="bg-surface text-text-ink border border-border hover:bg-surface-raised p-2 rounded-md shadow-sm transition-colors text-text-muted">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        {['all', 'critical', 'warning', 'ok'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              filter === f 
                ? 'bg-accent-surface text-accent border-accent/20' 
                : 'bg-surface border-border text-text-muted hover:text-text-ink hover:bg-surface-raised'
            }`}
          >
            {f === 'all' ? 'All' : f === 'critical' ? 'SLA Critical' : f === 'warning' ? 'SLA Warning' : 'SLA OK'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {pendingApprovals.filter(a => filter === 'all' || a.slaStatus === filter).map((item, i) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                  item.slaStatus === 'critical' ? 'bg-breach-surface text-breach border border-breach/20' :
                  item.slaStatus === 'warning' ? 'bg-warning-surface text-warning border border-warning/20' :
                  'bg-healthy-surface text-healthy border border-healthy/20'
                }`}>
                  <Clock size={10} /> {item.slaRemaining} left
                </span>
                <span className="text-xs text-text-faint font-mono">{item.id}</span>
              </div>
              
              <h3 className="font-semibold text-text-ink leading-snug mb-2">{item.title}</h3>
              
              <div className="space-y-1.5 text-sm text-text-muted mb-6 flex-1">
                <div className="flex justify-between">
                  <span>Requester:</span>
                  <span className="font-medium text-text-ink">{item.requester}</span>
                </div>
                <div className="flex justify-between">
                  <span>Department:</span>
                  <span>{item.department}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">{item.amount}</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-border border-dashed text-xs">
                  <span className="text-text-faint">Step:</span>
                  <span className="text-text-ink">{item.step}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md border border-border hover:bg-breach-surface hover:text-breach hover:border-breach/30 transition-colors text-sm font-medium text-text-muted">
                  <XCircle size={14} /> Deny
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-accent text-white hover:bg-accent/90 shadow-sm transition-colors text-sm font-medium">
                  <CheckCircle2 size={14} /> Approve
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
