import { styled } from "styled-components";
import { useThemeStore } from "../../stores/themeStore";

const ThemeSwitcher = () => {
    const { themeName, toggleTheme } = useThemeStore();

    const switchTheme = () => {
        toggleTheme();
    };
    return (
        <ThemeSwitcherStyle onClick={switchTheme}>
            {themeName === "light" ? "dark" : "light"}
        </ThemeSwitcherStyle>
    );
};

const ThemeSwitcherStyle = styled.button``;

export default ThemeSwitcher;
