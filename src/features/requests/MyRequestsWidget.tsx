import React from 'react';
import { Clock, CheckCircle, XCircle, FileText, ArrowRight } from 'lucide-react';
import { myRequests } from '@/data';
import { motion } from 'framer-motion';

export const MyRequestsWidget: React.FC = () => {
  const recentRequests = myRequests.slice(0, 3); // Just show top 3 on dashboard

  return (
    <div className="bg-surface/60 backdrop-blur-xl border border-border/50 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-border/40 flex justify-between items-center bg-base/40">
        <div>
          <h2 className="font-semibold text-text-ink flex items-center gap-2">
            My Requests
            <span className="bg-surface-raised text-text-muted text-xs px-2 py-0.5 rounded-full border border-border/50 font-medium">
              {myRequests.length}
            </span>
          </h2>
        </div>
        <button className="text-text-muted hover:text-text-ink transition-colors flex items-center gap-1 text-sm font-medium">
          View all <ArrowRight size={14} />
        </button>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto">
        {recentRequests.map((req, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={req.id} 
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-base border border-border/40 hover:border-border-strong hover:bg-surface-raised transition-all"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="mt-1 bg-surface rounded-md p-1.5 border border-border/50 text-text-muted shadow-sm">
                <FileText size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-text-ink truncate">{req.title}</div>
                <div className="text-xs text-text-muted mt-1 flex items-center gap-2">
                  <span className="bg-surface px-1.5 py-0.5 rounded border border-border/40">ID: {req.id}</span>
                  <span>•</span>
                  <span>Submitted: {req.submittedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:min-w-[200px]">
              {req.status === 'in-progress' && (
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-medium mb-1.5">
                    <span className="text-info flex items-center gap-1">
                      <Clock size={10} /> In Progress
                    </span>
                    <span className="text-text-muted">Step {req.currentStep} of {req.totalSteps}</span>
                  </div>
                  <div className="h-1.5 bg-surface border border-border/40 rounded-full overflow-hidden w-full">
                    <div 
                      className="h-full bg-info rounded-full" 
                      style={{ width: `${(req.currentStep! / req.totalSteps!) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {req.status === 'approved' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-success-surface text-success border border-success/20 ml-auto">
                  <CheckCircle size={12}/> Approved
                </span>
              )}
              {req.status === 'rejected' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-breach-surface text-breach border border-breach/20 ml-auto">
                  <XCircle size={12}/> Rejected
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
