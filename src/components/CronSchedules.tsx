import React from 'react';
import { cronSchedules } from '../data';
import { motion } from 'framer-motion';
import { Play, Pause, AlertTriangle, Clock, Terminal, Activity, CheckCircle2, XCircle, Zap } from 'lucide-react';

export default function CronSchedules() {
  return (
    <div className="flex flex-col gap-6 h-full max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Automations</h1>
          <p className="text-text-muted text-sm mt-1">Manage scheduled jobs, cron tasks, and background processes.</p>
        </div>
        <button className="bg-accent text-white hover:bg-accent/90 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors flex items-center gap-2">
          <Terminal size={16} /> New Job
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex-1 min-h-0 flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="sticky top-0 bg-base z-10">
              <tr>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider">Job Name & ID</th>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider">Next Run</th>
                <th className="px-6 py-4 border-b border-border text-xs font-semibold text-text-faint uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cronSchedules.map((job, i) => (
                <motion.tr 
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="hover:bg-surface-raised transition-colors group"
                >
                  <td className="px-6 py-4 border-b border-border">
                    <div className="font-semibold text-text-ink mb-1 flex items-center gap-2">
                      <Terminal size={14} className="text-text-muted" />
                      {job.name}
                    </div>
                    <div className="text-xs text-text-muted font-mono">{job.id}</div>
                  </td>
                  <td className="px-6 py-4 border-b border-border">
                    <div className="text-text-ink font-mono text-xs mb-1 bg-surface-overlay border border-border inline-block px-1.5 py-0.5 rounded">{job.schedule}</div>
                    <div className="text-xs text-text-muted">{job.frequency}</div>
                  </td>
                  <td className="px-6 py-4 border-b border-border">
                    {job.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-success-surface text-success border border-success/20">
                        <Activity size={12} className="animate-pulse" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-surface-overlay text-text-muted border border-border">
                        <Pause size={12} /> Paused
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-1.5 mb-1 text-xs">
                      {job.lastResult === 'success' && <CheckCircle2 size={12} className="text-success" />}
                      {job.lastResult === 'warning' && <AlertTriangle size={12} className="text-warning" />}
                      {job.lastResult === 'failure' && <XCircle size={12} className="text-breach" />}
                      <span className="font-medium text-text-ink">{job.lastResult === 'success' ? 'Success' : job.lastResult === 'warning' ? 'Warning' : 'Failed'}</span>
                    </div>
                    <div className="text-xs text-text-muted">{job.lastRun}</div>
                  </td>
                  <td className="px-6 py-4 border-b border-border">
                    <div className="text-xs text-text-muted flex items-center gap-1.5">
                      <Clock size={12} className="text-text-faint" /> {job.nextRun}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-border text-right space-x-2">
                    <button className="p-1.5 text-text-muted hover:text-accent hover:bg-accent/10 rounded transition-colors" title="Run Now">
                      <Zap size={14} />
                    </button>
                    {job.status === 'active' ? (
                      <button className="p-1.5 text-text-muted hover:text-warning hover:bg-warning-surface rounded transition-colors" title="Pause">
                        <Pause size={14} />
                      </button>
                    ) : (
                      <button className="p-1.5 text-text-muted hover:text-success hover:bg-success-surface rounded transition-colors" title="Resume">
                        <Play size={14} />
                      </button>
                    )}
                    <button className="text-sm font-medium text-text-muted hover:text-accent transition-colors ml-2">Edit</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
