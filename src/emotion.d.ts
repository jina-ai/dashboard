// Extend emotion types to add type for custom theme

import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    palette: {
      background: string;
      primary: string;
      secondary: string;
      warning: string;
      error: string;
      success: string;
      info: string;
      critical: string;
      debug: string;
      tagBackground: string;
      highlight: string;
    };
  }
}
