// Extend emotion types to add type for custom theme

import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    palette: {
      background: { default: string };
      primary: string;
      secondary: string;
      warning: string;
      error: string;
      success: string;
      info: string;
      critical: string;
      debug: string;
    };
  }
}
