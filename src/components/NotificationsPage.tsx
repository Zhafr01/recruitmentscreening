import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, Bell, Check, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info';
  read: boolean;
}

const allNotifications: Notification[] = [
  { id: '1', title: 'CapEx Approved', message: 'Server Infrastructure Upgrade request has been approved by CFO.', time: '5 min ago', type: 'success', read: false },
  { id: '2', title: 'SLA Warning', message: 'Vendor Onboarding — Acme Cloud is approaching SLA deadline.', time: '20 min ago', type: 'warning', read: false },
  { id: '3', title: 'New Approval Assigned', message: 'Travel Request — AWS re:Invent requires your review.', time: '1 hour ago', type: 'info', read: false },
  { id: '4', title: 'Control Expiring', message: 'ISO 27001 Data Classification policy expires in 25 days.', time: '2 hours ago', type: 'warning', read: true },
  { id: '5', title: 'Cron Job Failed', message: 'Vendor SLA Compliance Check encountered an error during execution.', time: '3 hours ago', type: 'warning', read: true },
  { id: '6', title: 'Access Revoked', message: 'Elevated production database access for Michael Torres has expired.', time: '5 hours ago', type: 'info', read: true },
  { id: '7', title: 'Weekly Report Ready', message: 'Financial reconciliation report for week 39 is available for download.', time: '1 day ago', type: 'success', read: true },
  { id: '8', title: 'New Vendor Added', message: 'SecureAuth Inc. has been added to the approved vendor registry.', time: '1 day ago', type: 'success', read: true },
  { id: '9', title: 'Policy Updated', message: 'GDPR Data Privacy Impact Assessment has been renewed for 2025.', time: '2 days ago', type: 'info', read: true },
  { id: '10', title: 'Audit Complete', message: 'Ad-Hoc Compliance Audit for Q3 has been completed successfully.', time: '3 days ago', type: 'success', read: true },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(allNotifications);

  const filtered = filter === 'all' ? notifications : notifications.filter(n => !n.read);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const iconFor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={18} className="text-success" />;
      case 'warning': return <AlertTriangle size={18} className="text-warning" />;
      case 'info': return <Info size={18} className="text-info" />;
    }
  };

  const bgFor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-success-surface';
      case 'warning': return 'bg-warning-surface';
      case 'info': return 'bg-info-surface';
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full max-w-[800px] mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-3">
            <Bell size={24} className="text-accent" />
            Notifications
            {unreadCount > 0 && (
              <span className="bg-accent text-surface text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-text-muted text-sm mt-1">Stay updated on approvals, alerts, and system events.</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={markAllRead}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-muted hover:text-text-ink bg-surface border border-border rounded-md hover:bg-surface-raised transition-colors"
            >
              <Check size={14} /> Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {(['all', 'unread'] as const).map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === f 
                ? 'bg-accent-surface text-accent border-accent/20' 
                : 'bg-surface border-border text-text-muted hover:text-text-ink hover:bg-surface-raised'
            }`}
          >
            {f === 'all' ? 'All' : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.map((notif, i) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${
              !notif.read 
                ? 'bg-surface/80 border-accent/15 shadow-sm' 
                : 'bg-surface/40 border-border/40 hover:bg-surface/60'
            }`}
          >
            <div className={`w-9 h-9 rounded-lg ${bgFor(notif.type)} flex items-center justify-center shrink-0`}>
              {iconFor(notif.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-text-ink">{notif.title}</span>
                {!notif.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
              </div>
              <p className="text-sm text-text-muted leading-relaxed">{notif.message}</p>
              <span className="text-xs text-text-faint mt-2 block">{notif.time}</span>
            </div>
            <button className="p-1.5 rounded-md text-text-faint hover:text-breach hover:bg-breach-surface opacity-0 group-hover:opacity-100 transition-all self-start shrink-0">
              <Trash2 size={14} />
            </button>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell size={32} className="text-text-faint mb-4" />
            <p className="text-text-muted font-medium">No unread notifications</p>
            <p className="text-text-faint text-sm mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
