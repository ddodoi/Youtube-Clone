import "sanitize.css";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        background-color: ${({ theme }) => (theme.name === "light" ? "white" : "black")};
    }

    * {
        color: ${({ theme }) => (theme.name === "light" ? "black" : "white")};
    }
`;
