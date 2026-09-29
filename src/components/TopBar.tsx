import React, { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useDashboardStore, Persona } from '@/lib/store';
import { useToast } from './Toast';
import { NotificationPopup } from './NotificationPopup';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

export const TopBar: React.FC = () => {
  const { persona, setPersona, setCommandPaletteOpen, hasNotifications, setHasNotifications, setActivePage } = useDashboardStore();
  const personas: Persona[] = ['Approver', 'Requester', 'Control Owner', 'Automation Owner'];
  const { addToast } = useToast();
  const [notifOpen, setNotifOpen] = useState(false);

  const openCommandPalette = () => {
    setCommandPaletteOpen(true);
  };

  return (
    <header className="h-14 border-b border-border/40 bg-surface/60 backdrop-blur-xl flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-text-muted flex items-center gap-2">
          <span>Home</span>
          <span className="text-border-strong">/</span>
          <span className="text-text-ink">Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={openCommandPalette}
          className="flex items-center gap-2 text-sm text-text-muted bg-base/60 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border/50 hover:border-border-strong transition-colors w-64"
        >
          <Search size={14} />
          <span className="flex-1 text-left">Search anything...</span>
          <kbd className="font-mono text-[10px] bg-surface-overlay/60 px-1.5 py-0.5 rounded border border-border/50">⌘K</kbd>
        </button>

        <div className="h-4 w-px bg-border/40"></div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-faint text-xs">Viewing as:</span>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-1.5 bg-surface text-text-ink font-medium px-3 py-1.5 rounded-md border border-border/50 hover:bg-surface-raised transition-colors outline-none focus:ring-2 focus:ring-accent/50">
                <span>{persona}</span>
                <ChevronDown size={14} className="text-text-muted" />
              </button>
            </DropdownMenu.Trigger>
            
            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                align="end"
                className="min-w-[180px] bg-surface/80 backdrop-blur-xl border border-border/50 rounded-lg p-1 shadow-lg animate-fade-in z-50"
              >
                {personas.map(p => (
                  <DropdownMenu.Item 
                    key={p}
                    onSelect={() => setPersona(p)}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md cursor-pointer outline-none transition-colors",
                      p === persona 
                        ? "bg-accent/10 text-accent font-medium" 
                        : "text-text-ink hover:bg-surface-raised hover:text-text-ink"
                    )}
                  >
                    {p}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-1.5 text-text-muted hover:bg-surface-raised rounded-md transition-colors relative"
            >
              <Bell size={18} strokeWidth={1.5} />
              {hasNotifications && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-breach rounded-full border-2 border-surface"></span>
              )}
            </button>
            
            <NotificationPopup 
              open={notifOpen} 
              onClose={() => setNotifOpen(false)}
              onSeeMore={() => {
                setNotifOpen(false);
                setHasNotifications(false);
                setActivePage('Notifications');
                addToast('Notifications', 'Opening full notifications view...', 'info');
              }}
            />
          </div>
          
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/40">
            <div className="flex flex-col items-end">
              <span className="text-xs font-medium">Dewi Anggraini</span>
              <span className="text-[10px] text-text-muted">Head of IT Governance</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent text-surface flex items-center justify-center font-medium text-sm">
              DA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
