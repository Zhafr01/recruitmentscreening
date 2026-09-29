import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/Toast';

export const FocusStrip: React.FC = () => {
  const { addToast } = useToast();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-info-surface text-info rounded-md px-4 py-2.5 text-sm flex items-center justify-between border border-info/20"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-info opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-info"></span>
        </span>
        <span className="font-medium">Focus:</span>
        <span>1 approval breaches within 2h &middot; 1 control expires in 25 days</span>
      </div>
      <button 
        onClick={() => addToast('Focus Mode', 'Entering triage mode for critical items.', 'info')}
        className="text-info font-medium hover:underline"
      >
        Triage Now &rarr;
      </button>
    </motion.div>
  );
};
