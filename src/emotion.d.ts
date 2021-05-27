// Extend emotion types to add type for custom theme

import "@emotion/react"
import { Theme as MuiThemeType } from "@material-ui/core"
import { Palette } from "./createPalette"

declare module "@emotion/react" {
  export interface Theme extends MuiThemeType {
    palette: Palette
  }
}
