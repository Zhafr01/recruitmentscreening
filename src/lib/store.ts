import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Persona = 'Approver' | 'Control Owner' | 'Automation Owner' | 'Requester';

interface DashboardState {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  hasNotifications: boolean;
  setHasNotifications: (has: boolean) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      persona: 'Approver',
      setPersona: (persona) => set({ persona }),
      editMode: false,
      setEditMode: (editMode) => set({ editMode }),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),
      activePage: 'Dashboard',
      setActivePage: (activePage) => set({ activePage }),
      hasNotifications: true,
      setHasNotifications: (hasNotifications) => set({ hasNotifications }),
    }),
    {
      name: 'bpa-dashboard-storage',
      partialize: (state) => ({ persona: state.persona }), // Only persist persona
    }
  )
);
