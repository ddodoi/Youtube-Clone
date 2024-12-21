export type ThemeName = "light" | "dark";
type MediaQuery = "mobile" | "tablet" | "desktop";
type ChannelPage = "grid5" | "grid4" | "grid3" | "grid2" | "grid1";

type DeviceMedia = {
    [M in MediaQuery]: string;
};

type GridMedia = {
    [C in ChannelPage]: string;
};

export interface Theme {
    name: ThemeName;
    mediaQuery: {
        sidebar: DeviceMedia;
        searchBox: DeviceMedia;
        mainPage: GridMedia;
    };
    padding: {
        [C in ChannelPage]: string;
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
        mainPage: {
            grid1: "(max-width: 685px)",
            grid2: "(max-width: 975px)",
            grid3: "(max-width: 1200px)",
            grid4: "(max-width: 1400px)",
            grid5: "(min-width: 1401px)",
        },
    },
    padding: {
        grid1: "214px",
        grid2: "321px",
        grid3: "428px",
        grid4: "535px",
        grid5: "642px",
    },
};

export const dark: Theme = {
    ...light,
    name: "dark",
};
