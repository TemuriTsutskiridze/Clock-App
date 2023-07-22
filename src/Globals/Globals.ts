import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle<{ currentTime: number }>`
  ${(props) => css`
    html {
      font-size: 62.5%;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Inter", sans-serif;
    }

    body {
      min-height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      background-image: url(${props?.currentTime >= 6 &&
      props?.currentTime <= 20
        ? "/mobile/bg-image-daytime.jpg"
        : (props.currentTime > 20 && props.currentTime <= 24) ||
          (props.currentTime >= 0 && props.currentTime <= 5)
        ? "/mobile/bg-image-nighttime.jpg"
        : null});
      background-blend-mode: multiply;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      padding: 0 2.5rem;
      overflow: hidden;
    }

    @media screen and (min-width: 48em) {
      body {
        background-image: url(${props?.currentTime >= 6 &&
        props?.currentTime <= 20
          ? "/tablet/bg-image-daytime.jpg"
          : (props.currentTime > 20 && props.currentTime <= 24) ||
            (props.currentTime >= 0 && props.currentTime <= 5)
          ? "/tablet/bg-image-nighttime.jpg"
          : null});

        padding: 0 6.4rem;
      }
    }

    @media screen and (min-width: 90em) {
      body {
        background-image: url(${props?.currentTime >= 6 &&
        props?.currentTime <= 20
          ? "/desktop/bg-image-daytime.jpg"
          : (props.currentTime > 20 && props.currentTime <= 24) ||
            (props.currentTime >= 0 && props.currentTime <= 5)
          ? "/desktop/bg-image-nighttime.jpg"
          : null});
      }

      padding: 0 16.5rem;
    }
  `}
`;

export default GlobalStyles;
