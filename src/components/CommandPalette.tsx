import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Clock, Shield, Plus, Command as CommandIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';
import { useToast } from './Toast';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen: open, setCommandPaletteOpen: setOpen } = useDashboardStore();
  const { addToast } = useToast();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog 
          open={open} 
          onOpenChange={setOpen} 
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh]"
          label="Global Command Menu"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-surface-overlay/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg relative z-50 bg-surface border border-border shadow-2xl rounded-xl overflow-hidden"
          >
            <div className="flex items-center border-b border-border px-4 py-3">
              <Search size={18} className="text-text-muted mr-3 shrink-0" />
              <Command.Input 
                autoFocus
                placeholder="Search requests, controls, people, or run actions..." 
                className="flex-1 bg-transparent border-none outline-none text-text-ink placeholder:text-text-faint text-[15px]"
              />
              <kbd className="font-mono text-[10px] bg-surface-raised px-1.5 py-0.5 rounded border border-border text-text-muted">ESC</kbd>
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-sm text-text-muted">No results found.</Command.Empty>
              
              <Command.Group heading="Actions" className="px-2 text-xs font-semibold text-text-faint mb-1 mt-2">
                <Command.Item 
                  onSelect={() => { addToast('New Workflow', 'Opening workflow creation wizard...', 'info'); setOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-ink cursor-pointer hover:bg-surface-raised data-[selected=true]:bg-surface-raised transition-colors"
                >
                  <Plus size={16} className="text-text-muted" /> New Workflow...
                </Command.Item>
                <Command.Item 
                  onSelect={() => { addToast('Nightly Check Started', 'Nightly data check has been queued.', 'success'); setOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-ink cursor-pointer hover:bg-surface-raised data-[selected=true]:bg-surface-raised transition-colors"
                >
                  <Play size={16} className="text-text-muted" /> Run Nightly Data Check
                </Command.Item>
              </Command.Group>
              
              <Command.Group heading="Navigation" className="px-2 text-xs font-semibold text-text-faint mb-1 mt-4">
                <Command.Item 
                  onSelect={() => { addToast('Navigation', 'Navigating to My Requests...', 'info'); setOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-ink cursor-pointer hover:bg-surface-raised data-[selected=true]:bg-surface-raised transition-colors"
                >
                  <Send size={16} className="text-text-muted" /> My Requests
                </Command.Item>
                <Command.Item 
                  onSelect={() => { addToast('Navigation', 'Navigating to Controls Registry...', 'info'); setOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-ink cursor-pointer hover:bg-surface-raised data-[selected=true]:bg-surface-raised transition-colors"
                >
                  <Shield size={16} className="text-text-muted" /> Controls Registry
                </Command.Item>
                <Command.Item 
                  onSelect={() => { addToast('Navigation', 'Navigating to Automations...', 'info'); setOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-ink cursor-pointer hover:bg-surface-raised data-[selected=true]:bg-surface-raised transition-colors"
                >
                  <Clock size={16} className="text-text-muted" /> Automations
                </Command.Item>
              </Command.Group>
            </Command.List>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
};

const Play = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="6 3 20 12 6 21 6 3"/></svg>
);
