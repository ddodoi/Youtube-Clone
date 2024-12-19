import { create } from "zustand";

interface StoreState {
    isSidebarOpen: boolean;
    isDesktopSidebarOpen: boolean;
    toggleDesktopSidebar: () => void;
    setIsDesktopSidebarOpen: (isOpen: boolean) => void;
    toggleSidebar: () => void;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

export const useLayoutStore = create<StoreState>((set) => ({
    isSidebarOpen: false,
    isDesktopSidebarOpen: true,
    setIsDesktopSidebarOpen: (isOpen) => set(() => ({ isDesktopSidebarOpen: isOpen })),
    toggleDesktopSidebar: () => {
        set((state) => ({ isDesktopSidebarOpen: !state.isDesktopSidebarOpen }));
    },
    setIsSidebarOpen: (isOpen) => set(() => ({ isSidebarOpen: isOpen })),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
