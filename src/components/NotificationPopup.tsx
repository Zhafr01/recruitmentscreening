import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, ArrowRight, Bell, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info';
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'CapEx Approved',
    message: 'Server Infrastructure Upgrade request has been approved by CFO.',
    time: '5 min ago',
    type: 'success',
    read: false,
  },
  {
    id: '2',
    title: 'SLA Warning',
    message: 'Vendor Onboarding — Acme Cloud is approaching SLA deadline.',
    time: '20 min ago',
    type: 'warning',
    read: false,
  },
  {
    id: '3',
    title: 'New Approval Assigned',
    message: 'Travel Request — AWS re:Invent requires your review.',
    time: '1 hour ago',
    type: 'info',
    read: false,
  },
  {
    id: '4',
    title: 'Control Expiring',
    message: 'ISO 27001 Data Classification policy expires in 25 days.',
    time: '2 hours ago',
    type: 'warning',
    read: true,
  },
  {
    id: '5',
    title: 'Cron Job Failed',
    message: 'Vendor SLA Compliance Check encountered an error during execution.',
    time: '3 hours ago',
    type: 'warning',
    read: true,
  },
];

interface NotificationPopupProps {
  open: boolean;
  onClose: () => void;
  onSeeMore: () => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({ open, onClose, onSeeMore }) => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const iconFor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} className="text-success shrink-0" />;
      case 'warning': return <AlertTriangle size={16} className="text-warning shrink-0" />;
      case 'info': return <Info size={16} className="text-info shrink-0" />;
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — covers everything, click to dismiss */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200]"
          />
          
          {/* Popup — floats above all content */}
          <motion.div 
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-6 top-[60px] w-[380px] z-[201] rounded-xl border border-border/50 shadow-2xl overflow-hidden"
            style={{
              background: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
              backdropFilter: 'blur(32px) saturate(180%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-accent" />
                <span className="font-semibold text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-accent text-surface text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-md hover:bg-surface-raised text-text-muted hover:text-text-ink transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            
            {/* Notification List */}
            <div className="max-h-[340px] overflow-y-auto">
              {mockNotifications.map((notif, i) => (
                <motion.div 
                  key={notif.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  className={`flex gap-3 px-4 py-3 hover:bg-surface-raised/60 transition-colors cursor-pointer border-b border-border/30 last:border-b-0 ${
                    !notif.read ? 'bg-accent-surface/30' : ''
                  }`}
                >
                  <div className="mt-0.5">
                    {iconFor(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-text-ink truncate">{notif.title}</span>
                      {!notif.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">{notif.message}</p>
                    <span className="text-[10px] text-text-faint mt-1 block">{notif.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="border-t border-border/40 px-4 py-3">
              <button 
                onClick={onSeeMore}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors py-1"
              >
                See all notifications
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
