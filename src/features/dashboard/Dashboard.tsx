import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { useDashboardStore } from '@/lib/store';
import { FocusStrip } from './FocusStrip';
import { ApprovalsWidget } from '../approvals/ApprovalsWidget';
import { ControlsWidget } from '../controls/ControlsWidget';
import { SchedulesWidget } from '../schedules/SchedulesWidget';
import { useToast } from '@/components/Toast';
import { cn } from '@/lib/utils';
import { GripHorizontal } from 'lucide-react';

const WIDGETS_CONFIG = {
  approvals: { id: 'approvals', component: ApprovalsWidget, className: 'col-span-12 lg:col-span-7 xl:col-span-8' },
  controls: { id: 'controls', component: ControlsWidget, className: 'col-span-12 lg:col-span-5 xl:col-span-4' },
  schedules: { id: 'schedules', component: SchedulesWidget, className: 'col-span-12' },
};

export const Dashboard: React.FC = () => {
  const { persona, editMode, setEditMode } = useDashboardStore();
  const { addToast } = useToast();
  
  const [widgetOrder, setWidgetOrder] = useState(['approvals', 'controls', 'schedules']);

  const toggleEditMode = () => {
    const nextMode = !editMode;
    setEditMode(nextMode);
    if (nextMode) {
      addToast('Edit Layout', 'You can now drag and drop widgets to reorganize your dashboard.', 'info');
    } else {
      addToast('Layout Saved', 'Dashboard layout has been saved successfully.', 'success');
    }
  };

  const cancelEditMode = () => {
    setEditMode(false);
    // Reset order
    setWidgetOrder(['approvals', 'controls', 'schedules']);
    addToast('Layout Edit Cancelled', 'No changes were saved.', 'info');
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Good morning, Dewi</h1>
          <p className="text-text-muted text-sm mt-1">Here is what needs your attention today.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {editMode && (
            <button 
              onClick={cancelEditMode}
              className="text-sm font-medium px-3 py-1.5 rounded-md hover:bg-surface-raised transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={toggleEditMode}
            className="text-sm font-medium bg-surface border border-border px-3 py-1.5 rounded-md hover:bg-surface-raised transition-colors"
          >
            {editMode ? 'Save Layout' : 'Edit Layout'}
          </button>
        </div>
      </div>

      <FocusStrip />

      <Reorder.Group 
        axis="y"
        values={widgetOrder} 
        onReorder={setWidgetOrder} 
        className="flex-1 grid grid-cols-12 gap-6 min-h-0 items-start"
      >
        {widgetOrder.map((id) => {
          const config = WIDGETS_CONFIG[id as keyof typeof WIDGETS_CONFIG];
          const Component = config.component;
          
          return (
            <Reorder.Item
              key={id}
              value={id}
              drag={editMode ? "y" : false}
              className={cn(
                "flex flex-col relative rounded-xl transition-all",
                config.className,
                editMode ? "cursor-grab shadow-lg ring-2 ring-accent/50 hover:ring-accent z-50 bg-base" : "z-auto"
              )}
            >
              {editMode && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-50 p-1 bg-surface-overlay backdrop-blur rounded-md border border-border shadow-sm text-text-muted">
                  <GripHorizontal size={16} />
                </div>
              )}
              <div className={cn("pointer-events-auto h-full", editMode && "opacity-60 pointer-events-none")}>
                <Component />
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
};
