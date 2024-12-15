import "sanitize.css";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html {
        font-size: 10px;
        font-family: Roboto, Arial, sans-serif;

        body {
        padding: 0;
        margin: 0;
        background-color: ${({ theme }) => (theme.name === "light" ? "white" : "black")};
    }  
    }
    
    * {
        color: ${({ theme }) => (theme.name === "light" ? "black" : "white")};
    }
`;
