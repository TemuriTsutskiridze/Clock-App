import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    html {
        font-size: 62.5%;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }

    body {
        min-height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        background-image: url(src/assets/mobile/bg-image-daytime.jpg);
        background-blend-mode: multiply;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding: 0 2.5rem;
        overflow: hidden;
    }
`;

export default GlobalStyle;
