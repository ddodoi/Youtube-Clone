import { create } from "zustand";

interface StoreState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const useLayoutStore = create<StoreState>((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
