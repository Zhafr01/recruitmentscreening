import React, { useState } from 'react';
import { 
  Home, 
  CheckSquare, 
  Send, 
  Shield, 
  Clock, 
  BarChart2, 
  History, 
  Plus, 
  PanelLeftClose, 
  PanelLeftOpen 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useToast } from './Toast';
import { useDashboardStore } from '@/lib/store';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { activePage, setActivePage } = useDashboardStore();
  const { addToast } = useToast();

  const navGroups = [
    {
      title: 'Home',
      items: [{ icon: Home, label: 'Dashboard' }],
    },
    {
      title: 'Work',
      items: [
        { icon: CheckSquare, label: 'Approvals', badge: '3', alert: true },
        { icon: Send, label: 'My Requests' },
      ],
    },
    {
      title: 'Govern',
      items: [
        { icon: Shield, label: 'Controls' },
        { icon: Clock, label: 'Automations' },
      ],
    },
    {
      title: 'Insight',
      items: [
        { icon: BarChart2, label: 'Reports' },
        { icon: History, label: 'Audit Trail' },
      ],
    },
  ];

  return (
    <aside 
      className={cn(
        "flex flex-col border-r border-border/40 bg-surface/60 backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center h-14 px-4 border-b border-border justify-between">
        {!collapsed && (
          <span className="font-semibold text-lg tracking-tight">SKORGE</span>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-md hover:bg-surface-raised text-text-muted hover:text-text-ink transition-colors",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <PanelLeftOpen size={18} strokeWidth={1.5} /> : <PanelLeftClose size={18} strokeWidth={1.5} />}
        </button>
      </div>

      <div className="p-4">
        <button 
          onClick={() => addToast('New Workflow', 'Opening workflow creation wizard...', 'info')}
          className={cn(
            "flex items-center justify-center gap-2 w-full bg-accent text-surface hover:bg-accent-hover transition-colors rounded-lg font-medium",
            collapsed ? "h-10 w-10 p-0 rounded-full mx-auto" : "h-10 px-4"
          )}
        >
          <Plus size={18} strokeWidth={2} />
          {!collapsed && <span>New Workflow</span>}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            {!collapsed && (
              <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-text-faint">
                {group.title}
              </div>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item, itemIdx) => {
                const isActive = activePage === item.label;
                return (
                  <li key={itemIdx} className="relative">
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-surface-raised rounded-md"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <button 
                      onClick={() => {
                        setActivePage(item.label);
                        addToast(item.label, `Navigating to ${item.label}...`, 'info');
                      }}
                      className={cn(
                        "flex items-center gap-3 w-full rounded-md transition-colors text-sm relative z-10",
                        collapsed ? "justify-center h-10 px-0" : "px-3 py-2",
                        isActive 
                          ? "text-text-ink font-medium" 
                          : "text-text-muted hover:bg-surface-raised hover:text-text-ink"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon size={18} strokeWidth={1.5} className={isActive ? "text-accent" : ""} />
                      {!collapsed && (
                        <span className="flex-1 text-left">{item.label}</span>
                      )}
                      {!collapsed && item.badge && (
                        <div className="flex items-center gap-1.5">
                          {item.alert && <span className="w-1.5 h-1.5 rounded-full bg-breach"></span>}
                          <span className="bg-surface-overlay border border-border px-1.5 py-0.5 rounded text-[10px] leading-none font-mono font-medium">
                            {item.badge}
                          </span>
                        </div>
                      )}
                      {collapsed && item.alert && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-breach border-2 border-surface"></span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};
