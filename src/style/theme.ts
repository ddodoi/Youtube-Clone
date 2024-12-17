export type ThemeName = "light" | "dark";
type Layout = "sidebar" | "searchBox";
type MediaQuery = "mobile" | "tablet" | "desktop";

export interface Theme {
    name: ThemeName;
    mediaQuery: {
        [key in Layout]: {
            [key in MediaQuery]: string;
        };
    };
}

export const light: Theme = {
    name: "light",
    mediaQuery: {
        sidebar: {
            desktop: "(min-width: 1313px)",
            tablet: "(max-width: 1312px)",
            mobile: "(max-width: 791px)",
        },
        searchBox: {
            desktop: "(min-width: 657px)",
            tablet: "(min-width: 657px)",
            mobile: "(max-width: 656px)",
        },
    },
};

export const dark: Theme = {
    ...light,
    name: "dark",
};
