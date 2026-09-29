import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockApprovals, Approval } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { differenceInSeconds } from 'date-fns';
import { Filter, Check, X, ArrowRightLeft } from 'lucide-react';
import { ApprovalDrawer } from './ApprovalDrawer';
import { useToast } from '@/components/Toast';

const SlaCountdown: React.FC<{ dueAt: Date; submittedAt: Date }> = ({ dueAt, submittedAt }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalSeconds = differenceInSeconds(dueAt, submittedAt);
  const remainingSeconds = differenceInSeconds(dueAt, now);
  const isBreached = remainingSeconds < 0;

  const progress = Math.max(0, Math.min(100, ((totalSeconds - remainingSeconds) / totalSeconds) * 100));

  const formatRemaining = (seconds: number) => {
    const abs = Math.abs(seconds);
    const h = Math.floor(abs / 3600);
    const m = Math.floor((abs % 3600) / 60);
    const s = abs % 60;
    return `${isBreached ? '-' : ''}${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="flex flex-col gap-1 w-32">
      <div className="flex justify-between items-center text-[10px] font-mono">
        <span className={cn(isBreached ? "text-breach font-bold" : "text-text-muted")}>
          {formatRemaining(remainingSeconds)}
        </span>
      </div>
      <div className="h-1 bg-surface-raised border border-border rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-1000 linear",
            isBreached ? "bg-breach" : progress > 80 ? "bg-warning" : "bg-healthy"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const ApprovalsWidget: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [focusedApproval, setFocusedApproval] = useState<Approval | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { addToast } = useToast();

  // Keyboard navigation logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusedApproval) return; // Disable list nav if drawer is open

      const currentIndex = mockApprovals.findIndex(a => a.id === hoveredId);
      
      if (e.key === 'j') {
        const nextIndex = currentIndex < mockApprovals.length - 1 ? currentIndex + 1 : 0;
        setHoveredId(mockApprovals[nextIndex].id);
      } else if (e.key === 'k') {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : mockApprovals.length - 1;
        setHoveredId(mockApprovals[prevIndex].id);
      } else if (e.key === ' ' && hoveredId) {
        e.preventDefault();
        toggleSelect(hoveredId);
      } else if (e.key === 'Enter' && hoveredId) {
        setFocusedApproval(mockApprovals.find(a => a.id === hoveredId) || null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hoveredId, focusedApproval]);

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-xl shadow-sm overflow-hidden relative">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">Pending Approvals</h2>
          <span className="bg-surface-raised border border-border px-2 py-0.5 rounded-full text-xs font-mono">{mockApprovals.length}</span>
        </div>
        <button 
          onClick={() => addToast('Filter', 'Filter options will appear here.', 'info')}
          className="text-text-muted hover:text-text-ink transition-colors p-1 rounded-md hover:bg-surface-raised"
        >
          <Filter size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-border">
          {mockApprovals.map((approval, idx) => (
            <motion.li 
              key={approval.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 + 0.2, type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "group relative flex items-center gap-4 px-5 py-4 cursor-pointer outline-none overflow-hidden",
                (selectedIds.has(approval.id) || hoveredId === approval.id) ? "bg-surface-raised" : "bg-surface",
                focusedApproval && focusedApproval.id !== approval.id && "opacity-40"
              )}
              onClick={() => setFocusedApproval(approval)}
              onMouseEnter={() => setHoveredId(approval.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <AnimatePresence>
                {hoveredId === approval.id && !selectedIds.has(approval.id) && (
                  <motion.div 
                    layoutId="approval-hover"
                    className="absolute inset-0 bg-surface-raised pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              {differenceInSeconds(approval.dueAt, new Date()) < 0 && (
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-breach shadow-[0_0_8px_var(--color-breach)]" />
              )}
              
              <div className="flex-shrink-0 pt-1 relative z-10" onClick={(e) => { e.stopPropagation(); toggleSelect(approval.id); }}>
                <input 
                  type="checkbox" 
                  checked={selectedIds.has(approval.id)}
                  onChange={() => {}}
                  className="rounded border-border text-accent focus:ring-accent w-4 h-4" 
                />
              </div>

              <div className="flex-shrink-0 w-8 flex flex-col items-center">
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded",
                  approval.priority === 'P1' ? "bg-breach-surface text-breach" : 
                  approval.priority === 'P2' ? "bg-warning-surface text-warning" : 
                  "bg-surface-overlay border border-border text-text-muted"
                )}>
                  {approval.priority}
                </span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-1 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate text-text-ink">{approval.title}</span>
                  {approval.relatedControl && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-info-surface text-info font-medium border border-info/20 whitespace-nowrap">
                      {approval.relatedControl}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-border-strong text-[8px] flex items-center justify-center font-bold text-surface">
                      {approval.requester.avatar}
                    </div>
                    <span>{approval.requester.name}</span>
                  </div>
                  <span>&middot;</span>
                  <span>Step {approval.step} of {approval.totalSteps}</span>
                  {approval.amount && (
                    <>
                      <span>&middot;</span>
                      <span className="font-mono">{approval.amount}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center gap-4 relative z-10">
                <SlaCountdown dueAt={approval.dueAt} submittedAt={approval.submittedAt} />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 bg-surface border-t border-border p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex items-center justify-between"
          >
            <div className="text-sm font-medium">
              {selectedIds.size} selected
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { addToast('Delegated', 'Selected approvals have been delegated.', 'info'); setSelectedIds(new Set()); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-border bg-surface hover:bg-surface-raised transition-colors"
              >
                <ArrowRightLeft size={14} /> Delegate
              </button>
              <button 
                onClick={() => { addToast('Rejected', 'Selected approvals have been rejected.', 'error'); setSelectedIds(new Set()); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-breach text-breach bg-breach-surface hover:bg-breach/10 transition-colors"
              >
                <X size={14} /> Reject
              </button>
              <button 
                onClick={() => { addToast('Approved', 'Selected approvals have been approved successfully.', 'success'); setSelectedIds(new Set()); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-transparent bg-accent text-surface hover:bg-accent-hover transition-colors shadow-sm"
              >
                <Check size={14} /> Approve
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ApprovalDrawer 
        approval={focusedApproval} 
        onClose={() => setFocusedApproval(null)} 
      />
    </div>
  );
};
