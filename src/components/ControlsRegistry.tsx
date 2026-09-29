import React from 'react';
import { controls } from '../data';
import { motion } from 'framer-motion';
import { Clock, Lock, FileText, Cloud, Handshake, ShieldCheck, BadgeCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Lock, FileText, Cloud, Handshake, ShieldCheck, BadgeCheck,
};

export default function ControlsRegistry() {
  return (
    <div className="flex flex-col gap-6 h-full max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Controls Registry</h1>
          <p className="text-text-muted text-sm mt-1">Manage policies, SLAs, and compliance controls.</p>
        </div>
        <button className="bg-surface text-text-ink border border-border hover:bg-surface-raised px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors flex items-center gap-2">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {controls.map((ctrl, i) => {
          const Icon = iconMap[ctrl.icon] || ShieldCheck;
          return (
            <motion.div 
              key={ctrl.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-overlay border border-border flex items-center justify-center">
                    <Icon size={18} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-0.5">{ctrl.type}</div>
                    <div className="text-xs text-text-faint font-mono">{ctrl.id}</div>
                  </div>
                </div>
                {ctrl.status === 'active' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-success-surface text-success border border-success/20 uppercase">Active</span>}
                {ctrl.status === 'renewal' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-warning-surface text-warning border border-warning/20 uppercase">Renewal</span>}
                {ctrl.status === 'breach' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-breach-surface text-breach border border-breach/20 uppercase">Breach</span>}
              </div>
              
              <h3 className="font-semibold text-text-ink leading-snug mb-4 flex-1">{ctrl.name}</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-text-muted">Validity</span>
                    <span className={ctrl.daysRemaining < 30 ? 'text-breach' : 'text-text-ink'}>
                      {ctrl.daysRemaining} days left
                    </span>
                  </div>
                  <div className="h-1.5 bg-surface-overlay border border-border rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(ctrl.daysRemaining / ctrl.totalDays) * 100}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${
                        ctrl.daysRemaining < 30 ? 'bg-breach' : ctrl.daysRemaining < 90 ? 'bg-warning' : 'bg-success'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-text-muted pt-3 border-t border-border border-dashed">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-text-faint" /> {ctrl.expiresAt}
                  </div>
                  <button className="text-accent font-medium hover:underline">Review</button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
