import { create } from "zustand";
import { dark, light, Theme, ThemeName } from "../style/theme";

const DEFAULT_THEME_NAME = "light";
const LOCAL_STORAGE_KEY = "youtube_theme";

interface ThemeState {
    themeName: ThemeName;
    toggleTheme: () => void;
    getTheme: () => Theme;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    themeName: (localStorage.getItem(LOCAL_STORAGE_KEY) as ThemeName | null) || DEFAULT_THEME_NAME,
    toggleTheme: () => {
        set((state) => {
            const themeName = state.themeName === "light" ? "dark" : "light";
            localStorage.setItem(LOCAL_STORAGE_KEY, themeName);
            return { themeName };
        });
    },
    getTheme: () => (get().themeName === "light" ? light : dark),
}));
