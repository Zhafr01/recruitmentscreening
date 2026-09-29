import React, { useState } from 'react';
import { workflowCatalog } from '../data';
import { motion } from 'framer-motion';
import { Plus, Search, DollarSign, Plane, KeyRound, Handshake, UserPlus, RefreshCw, SearchCheck, BarChart3, ClipboardCheck, MailWarning, ShieldAlert, Rocket, PackageOpen, FileSearch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  DollarSign, Plane, KeyRound, Handshake, UserPlus, RefreshCw,
  SearchCheck, BarChart3, ClipboardCheck, MailWarning, ShieldAlert,
  Rocket, PackageOpen, FileSearch,
};

export default function WorkflowCatalog() {
  const [search, setSearch] = useState('');

  const filtered = workflowCatalog.filter(w => w.name.toLowerCase().includes(search.toLowerCase()) || w.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-6 h-full max-w-[1400px] mx-auto animate-fade-in overflow-y-auto pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Workflow Catalog</h1>
          <p className="text-text-muted text-sm mt-1">Browse and execute available organizational workflows.</p>
        </div>
        <button className="bg-accent text-white hover:bg-accent/90 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors flex items-center gap-2">
          <Plus size={16} /> Create New
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input 
          type="text" 
          placeholder="Search workflows by name or category..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((wf, i) => {
          const Icon = iconMap[wf.icon] || FileSearch;
          return (
            <motion.div 
              key={wf.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface-overlay border border-border flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon size={18} className="text-accent" strokeWidth={1.5} />
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-overlay text-text-muted border border-border uppercase tracking-wider">
                  {wf.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-text-ink leading-snug mb-2">{wf.name}</h3>
              <p className="text-sm text-text-muted mb-4 line-clamp-2">{wf.desc}</p>
              
              <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                <span className="text-xs font-mono text-text-faint">{wf.id}</span>
                <button className="text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">Execute &rarr;</button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
