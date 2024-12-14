export type ThemeName = "light" | "dark";

export interface Theme {
    name: ThemeName;
}

export const light: Theme = {
    name: "light",
};

export const dark: Theme = {
    name: "dark",
};
