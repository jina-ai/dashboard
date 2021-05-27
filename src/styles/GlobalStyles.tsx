import React from "react"
import { Global, css } from "@emotion/react"

const GlobalStyles = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Roboto";
        src: local("Roboto"),
          url("./fonts/Roboto/Roboto-Regular.ttf") format("truetype");
      }
      @font-face {
        font-family: "Roboto";
        font-weight: 500;
        src: local("Roboto"),
          url("./fonts/Roboto/Roboto-Medium.ttf") format("truetype");
      }
      @font-face {
        font-family: "Roboto";
        font-weight: 700;
        src: local("Roboto"),
          url("./fonts/Roboto/Roboto-Bold.ttf") format("truetype");
      }
      @font-face {
        font-family: "Roboto";
        font-weight: 800;
        src: local("Roboto"),
          url("./fonts/Roboto/Roboto-Black.ttf") format("truetype");
      }
      @font-face {
        font-family: "Roboto";
        font-weight: 300;
        src: local("Roboto"),
          url("./fonts/Roboto/Roboto-Light.ttf") format("truetype");
      }
      @font-face {
        font-family: "Monaco";
        src: local("Monaco"),
          url("./fonts/Monaco/Monaco.ttf") format("truetype");
      }
    `}
  />
)

export default GlobalStyles
