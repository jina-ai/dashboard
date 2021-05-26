// Extend emotion types to add type for custom theme

import "@emotion/react"

declare module "@emotion/react" {
  export interface Theme extends Theme {
    palette: {
      bodyBackground: string
      background: string
      codeBackground: string
      headerTextColor: string
      disabledGrey: string
      primary: string
      secondary: string
      warning: string
      error: string
      success: string
      info: string
      critical: string
      debug: string
      tagBackground: string
      tagPlatformBackground: string
      mutedText: string
      highlight: string
      searchBarBackground: string
      searchBarBorder: string
    }
  }
}
