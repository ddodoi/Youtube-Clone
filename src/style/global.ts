import "sanitize.css";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html {
        font-size: 10px;
        font-family: Roboto, Arial, sans-serif;

        body {
            padding: 0;
            margin: 0;
            overflow-x: auto;
            background-color: ${({ theme }) => (theme.name === "light" ? "white" : "black")};

            &::-webkit-scrollbar {
                display: none;
            }
        } 
    }
    
    * {
        /* color: ${({ theme }) => (theme.name === "light" ? "black" : "white")}; */
    }

    .yt-icon-button {
        vertical-align: middle;
        color: inherit;
        outline: none;
        background: none;
        margin: 0;
        border: none;
        padding: 0;
        width: 100%;
        height: 100%;
        line-height: 0;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent; // https://min-ji07.tistory.com/entry/webkit-tap-highlight-color
    }
`;
