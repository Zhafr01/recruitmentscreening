import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info';

interface ToastData {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (title: string, message?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((title: string, message?: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="min-w-[300px] max-w-[400px] bg-surface border border-border shadow-lg rounded-xl overflow-hidden flex"
            >
              <div className={`w-1.5 flex-shrink-0 ${
                t.type === 'success' ? 'bg-healthy' :
                t.type === 'error' ? 'bg-breach' : 'bg-info'
              }`} />
              <div className="flex flex-1 p-3 items-start gap-3">
                <div className={`mt-0.5 ${
                  t.type === 'success' ? 'text-healthy' :
                  t.type === 'error' ? 'text-breach' : 'text-info'
                }`}>
                  {t.type === 'success' && <CheckCircle2 size={18} />}
                  {t.type === 'error' && <AlertCircle size={18} />}
                  {t.type === 'info' && <Info size={18} />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-text-ink">{t.title}</div>
                  {t.message && <div className="text-xs text-text-muted mt-1">{t.message}</div>}
                </div>
                <button 
                  className="text-text-muted hover:text-text-ink hover:bg-surface-raised p-1 rounded-md transition-colors shrink-0" 
                  onClick={() => removeToast(t.id)}
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
