import { create } from "zustand";
import { dark, light, Theme, ThemeName } from "../style/theme";

const DEFAULT_THEME_NAME = "light";
const LOCAL_STORAGE_KEY = "youtube_theme";

interface ThemeState {
    themeName: ThemeName;
    toggleTheme: () => void;
    getTheme: (themeName: ThemeName) => Theme;
}

export const useThemeStore = create<ThemeState>((set) => ({
    themeName: (localStorage.getItem(LOCAL_STORAGE_KEY) as ThemeName | null) || DEFAULT_THEME_NAME,
    toggleTheme: () => {
        set((state) => {
            const themeName = state.themeName === "light" ? "dark" : "light";
            localStorage.setItem(LOCAL_STORAGE_KEY, themeName);
            return { themeName };
        });
    },
    getTheme: (themeName) => {
        switch (themeName) {
            case "light":
                return light;
            case "dark":
                return dark;
        }
    },
}));
