import React from 'react';
import { motion } from 'framer-motion';
import { mockControls } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { differenceInDays } from 'date-fns';
import { ShieldCheck, AlertCircle, XCircle } from 'lucide-react';
import { useToast } from '@/components/Toast';

export const ControlsWidget: React.FC = () => {
  const sortedControls = [...mockControls].sort((a, b) => a.expiresAt.getTime() - b.expiresAt.getTime());
  const { addToast } = useToast();

  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex justify-between items-center">
        <h2 className="font-semibold">Controls Registry</h2>
        <button 
          onClick={() => addToast('Controls', 'Opening Controls Registry...', 'info')}
          className="text-xs text-text-muted hover:text-text-ink cursor-pointer bg-transparent border-none p-0"
        >
          View all &rarr;
        </button>
      </div>

      <div className="flex-1 p-5 overflow-y-auto relative">
        <div className="absolute left-[29px] top-5 bottom-5 w-px bg-border-strong border-dashed border-l"></div>
        
        <div className="space-y-6 relative">
          {sortedControls.map((control, idx) => {
            const daysRemaining = differenceInDays(control.expiresAt, new Date());
            const isBreached = daysRemaining < 0;
            const isWarning = daysRemaining >= 0 && daysRemaining <= 30;
            
            return (
              <motion.div 
                key={control.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="flex gap-4 relative"
              >
                <div className="relative z-10 w-5 h-5 rounded-full bg-surface border-2 flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    borderColor: isBreached ? 'var(--color-breach)' : isWarning ? 'var(--color-warning)' : 'var(--color-healthy)'
                  }}
                >
                  {isBreached && <div className="w-1.5 h-1.5 rounded-full bg-breach" />}
                  {isWarning && <div className="w-1.5 h-1.5 rounded-full bg-warning" />}
                  {!isBreached && !isWarning && <div className="w-1.5 h-1.5 rounded-full bg-healthy" />}
                </div>

                <div className={cn(
                  "flex-1 p-3 border rounded-lg",
                  isBreached ? "bg-breach-surface/30 border-breach/20" :
                  isWarning ? "bg-warning-surface/30 border-warning/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]" : 
                  "bg-surface border-border"
                )}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium leading-snug pr-4 text-text-ink">{control.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted font-mono">{control.id}</span>
                    <span className={cn(
                      "text-xs font-medium font-mono",
                      isBreached ? "text-breach" : isWarning ? "text-warning" : "text-text-muted"
                    )}>
                      {isBreached ? `Breached by ${Math.abs(daysRemaining)}d` : `Expires in ${daysRemaining}d`}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
