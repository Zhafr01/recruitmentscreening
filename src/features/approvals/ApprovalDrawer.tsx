import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Approval } from '@/lib/mockData';
import { X, Check, ArrowRightLeft, MessageSquare, Paperclip, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApprovalDrawerProps {
  approval: Approval | null;
  onClose: () => void;
}

export const ApprovalDrawer: React.FC<ApprovalDrawerProps> = ({ approval, onClose }) => {
  if (!approval) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 w-[520px] bg-surface border-l border-border shadow-2xl z-40 flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-xs font-bold px-2 py-1 rounded",
              approval.priority === 'P1' ? "bg-breach-surface text-breach" : 
              approval.priority === 'P2' ? "bg-warning-surface text-warning" : 
              "bg-surface-overlay border border-border text-text-muted"
            )}>
              {approval.priority}
            </span>
            <span className="text-sm font-mono text-text-muted">{approval.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">1 of 12 remaining</span>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-surface-raised text-text-muted transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-text-ink leading-tight mb-2">{approval.title}</h2>
            {approval.amount && (
              <div className="text-2xl font-mono tracking-tight font-medium mb-4">{approval.amount}</div>
            )}
            
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface-raised">
              <div className="w-10 h-10 rounded-full bg-border-strong text-sm flex items-center justify-center font-bold text-surface shrink-0">
                {approval.requester.avatar}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{approval.requester.name}</div>
                <div className="text-xs text-text-muted">{approval.requester.dept}</div>
              </div>
              <button className="text-xs font-medium text-text-ink border border-border bg-surface px-2 py-1 rounded hover:bg-surface-raised transition-colors">
                Contact
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-faint">Timeline & Context</h3>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center pt-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border-strong" />
                <div className="w-px h-10 bg-border my-1" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-strong" />
                <div className="w-px h-10 bg-border my-1" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent-surface" />
                <div className="w-px h-10 bg-border border-dashed my-1" />
                <div className="w-2.5 h-2.5 rounded-full border-2 border-border bg-surface" />
              </div>
              
              <div className="flex-1 space-y-5">
                <div className="text-sm">
                  <div className="font-medium">Requested by {approval.requester.name}</div>
                  <div className="text-xs text-text-muted">Oct 12, 10:45 AM</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Manager Approval (R. Pratama)</div>
                  <div className="text-xs text-text-muted">Oct 12, 11:30 AM</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-accent">Security Review (You)</div>
                  <div className="text-xs text-text-muted">Current Step</div>
                </div>
                <div className="text-sm opacity-50">
                  <div className="font-medium">Final Sign-off</div>
                  <div className="text-xs text-text-muted">Pending</div>
                </div>
              </div>
            </div>
          </div>

          {approval.relatedControl && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-faint">Compliance Impact</h3>
              <div className="p-3 border border-info/20 bg-info-surface rounded-lg flex items-start gap-3 text-sm">
                <Activity size={16} className="text-info mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-info mb-1">Affects {approval.relatedControl}</div>
                  <div className="text-info/80 text-xs">Approving this request modifies an access policy tied to a compliance control that expires in 25 days.</div>
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="p-4 border-t border-border bg-surface flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="Add a comment (required for rejection)..." 
            className="w-full text-sm bg-surface-raised border border-border rounded-md px-3 py-2 outline-none focus:border-border-strong transition-colors"
          />
          <div className="flex items-center gap-2">
            <button className="flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-border bg-surface hover:bg-surface-raised transition-colors">
              <ArrowRightLeft size={16} /> Delegate
            </button>
            <button className="flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-breach text-breach bg-breach-surface hover:bg-breach/10 transition-colors">
              <X size={16} /> Reject
            </button>
            <button className="flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-transparent bg-accent text-surface hover:bg-accent-hover transition-colors">
              <Check size={16} /> Approve
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
