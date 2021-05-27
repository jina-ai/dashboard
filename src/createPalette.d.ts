import * as createPalette from "@material-ui/core/styles/createPalette"

declare module "@material-ui/core/styles/createPalette" {
  export interface PaletteOptions {
    filters?: PaletteColorOptions[]
  }
}

interface Palette extends createPalette.Palette {
  filters: createPalette.SimplePaletteColorOptions[]
}
