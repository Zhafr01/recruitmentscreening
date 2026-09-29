import React from 'react';
import { motion } from 'framer-motion';
import { mockSchedules } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Play, Pause, AlertTriangle, TrendingUp, Clock, Zap } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useToast } from '@/components/Toast';

export const SchedulesWidget: React.FC = () => {
  const { addToast } = useToast();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* SLA KPI Tile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Personal SLA</h3>
          <TrendingUp size={16} className="text-healthy" />
        </div>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-semibold tracking-tight flex items-baseline">
            <AnimatedCounter value={98.4} decimals={1} />
            <span className="text-2xl ml-0.5">%</span>
          </span>
          <span className="text-sm text-healthy font-medium mb-1">+1.2%</span>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-text-muted">
          <span>Avg cycle time</span>
          <span className="font-mono font-medium text-text-ink">4h 12m</span>
        </div>
      </motion.div>

      {/* Automations Health Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="col-span-1 md:col-span-2 bg-surface border border-border rounded-xl shadow-sm flex flex-col"
      >
        <div className="px-5 py-4 border-b border-border flex justify-between items-center">
          <h3 className="font-semibold">Automations Health</h3>
          <button 
            onClick={() => addToast('Schedules', 'Opening full schedules view...', 'info')}
            className="text-xs text-text-muted hover:text-text-ink cursor-pointer bg-transparent border-none p-0"
          >
            View schedules &rarr;
          </button>
        </div>
        <div className="flex-1 p-5 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSchedules.map((schedule, idx) => (
            <div key={schedule.id} className="border border-border rounded-lg p-3 flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium line-clamp-2 pr-2">{schedule.title}</span>
                {schedule.status === 'active' && <div className="w-2 h-2 rounded-full bg-healthy shrink-0 mt-1"></div>}
                {schedule.status === 'paused' && <div className="w-2 h-2 rounded-full bg-text-muted shrink-0 mt-1"></div>}
                {schedule.status === 'failed' && <div className="w-2 h-2 rounded-full bg-breach shrink-0 mt-1 animate-pulse"></div>}
              </div>
              <div className="font-mono text-[10px] text-text-muted mt-auto">
                {schedule.cron}
              </div>
              <div className="flex items-center justify-between mt-1 pt-2 border-t border-border">
                <span className="text-[10px] text-text-faint">{schedule.readable}</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => addToast('Job Started', `Forcing manual run for ${schedule.id}.`, 'info')}
                    className="text-text-muted hover:text-accent p-1 rounded hover:bg-surface-raised transition-colors"
                    title="Run Now"
                  >
                    <Zap size={12} />
                  </button>
                  <button 
                    onClick={() => {
                      const action = schedule.status === 'active' ? 'Paused' : schedule.status === 'paused' ? 'Resumed' : 'Retrying';
                      addToast(`Schedule ${action}`, `Schedule has been ${action.toLowerCase()}.`, schedule.status === 'failed' ? 'info' : 'success');
                    }}
                    className="text-text-muted hover:text-text-ink p-1 rounded hover:bg-surface-raised transition-colors"
                    title={schedule.status === 'active' ? 'Pause' : schedule.status === 'paused' ? 'Resume' : 'Retry'}
                  >
                    {schedule.status === 'active' ? <Pause size={12} /> : schedule.status === 'paused' ? <Play size={12} /> : <AlertTriangle size={12} className="text-breach" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
