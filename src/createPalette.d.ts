import { Palette as MuiPalette } from "@material-ui/core/styles"

interface Palette extends MuiPalette {
  filters: createPalette.SimplePaletteColorOptions[]
}
