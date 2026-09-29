import React, { useState } from 'react';
import { Search, Filter, MessageSquare, ExternalLink, Activity, CheckCircle2, XCircle, ArrowUpCircle } from 'lucide-react';
import { auditTrail } from '../data';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  CheckCircle2, ExternalLink, XCircle, MessageSquare, ArrowUpCircle,
};

export default function AuditTrail() {
  const [search, setSearch] = useState('');

  const filtered = auditTrail.filter(item => 
    item.item.toLowerCase().includes(search.toLowerCase()) || 
    item.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 h-full max-w-[1000px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Audit Trail</h1>
          <p className="text-text-muted text-sm mt-1">Detailed history of all actions and approvals across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search history..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-surface border border-border rounded-md focus:outline-none focus:border-border-strong w-64 transition-colors"
            />
          </div>
          <button className="bg-surface text-text-ink border border-border hover:bg-surface-raised p-2 rounded-md shadow-sm transition-colors text-text-muted">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex-1 min-h-0 relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border z-0"></div>
        <div className="overflow-y-auto h-full p-6 relative z-10">
          <div className="space-y-6">
            {filtered.map((log, i) => {
              const Icon = iconMap[log.icon] || Activity;
              return (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-4 group"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 relative z-10 transition-colors ${
                    log.color === 'success' ? 'bg-success-surface text-success' :
                    log.color === 'warning' ? 'bg-warning-surface text-warning' :
                    log.color === 'danger' ? 'bg-breach-surface text-breach' :
                    log.color === 'info' ? 'bg-info-surface text-info' :
                    'bg-surface-overlay text-text-muted border border-border'
                  }`}>
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1 bg-base border border-border rounded-lg p-4 shadow-sm group-hover:shadow transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${
                          log.color === 'success' ? 'bg-success-surface text-success' :
                          log.color === 'warning' ? 'bg-warning-surface text-warning' :
                          log.color === 'danger' ? 'bg-breach-surface text-breach' :
                          log.color === 'info' ? 'bg-info-surface text-info' :
                          'bg-surface-overlay text-text-muted border border-border'
                        }`}>
                          {log.action}
                        </span>
                        <span className="text-text-muted text-xs font-mono">{log.itemId}</span>
                      </div>
                      <span className="text-xs text-text-faint">{log.timestamp}</span>
                    </div>
                    
                    <div className="font-medium text-sm text-text-ink mb-2">
                      {log.item}
                    </div>
                    
                    {log.comment && (
                      <div className="text-xs text-text-muted bg-surface-overlay px-3 py-2 rounded-md border border-border border-dashed flex items-start gap-2">
                        <MessageSquare size={12} className="mt-0.5 shrink-0 text-text-faint" />
                        <p>{log.comment}</p>
                      </div>
                    )}
                    
                    <div className="mt-3 flex justify-end">
                      <button className="text-xs font-medium text-accent hover:underline flex items-center gap-1">
                        View Source <ExternalLink size={10} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-base rounded-lg border border-border border-dashed">
                <Activity size={24} className="text-text-faint mb-3" />
                <p className="text-sm text-text-muted">No audit logs match your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
