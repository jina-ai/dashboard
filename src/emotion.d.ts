// Extend emotion types to add type for custom theme

import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    palette: {
      background: { default: string };
      primary: {
        main: string;
      };
      secondary: { main: string };
      warning: { main: string };
      error: { main: string };
      success: { main: string };
      info: { main: string };
    };
  }
}
