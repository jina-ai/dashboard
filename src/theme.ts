import { createTheme } from "@material-ui/core"

const SCOOTER_GREEN = "#32C8CD"
const BOOTSTRAP_BLUE = "#007BFF"
const PERSIAN_GREEN = "#009999"
const BRAND_GREEN_LIGHT = "#4DB6AC"
const PERSIAN_GREEN_TRANSPARENT = "#0099991A"
const SKY_DIVING_IN_THE_BLUE = "#007AFF"

const HONEYBEE = "#FFFAE2"
const GOLDEN_TANOI = "#FFCC66"

const BITTER_SWEET = "#ff6666"
const SUDOBANGBANG = "#ff4540"

const BLACK = "#000000"
const DEFAULTIAN_GREY = "#212121"

const WHITE = "#FFFFFF"

const IVORY_EGG = "#F9F9F9"
const CODE_BACKGROUND = "#E8E8E855"
const NOT_SNOW_WHITE_GRAY = "#E5E5E5"
const DADGREY = "#DAD7FE"
const QUICK_SILVER = "#A6A6A6"
const DEBUG_GREY = "#7E7278"

const PAPER_BACKGROUND = "#f5f6f8"

const DISABLED_GREY = "#9E9E9E"

const CANCRO = "#E6F5F5"
const ARIEL_SCALE = "#1EA5A5"
const SKY_CLOUD = "#EFF2FE"
const SEAWATER_POPSICLE = "#8A8AE9"
const BANANA_YOGURT_SWIRL = "#FFFAE2"
const HOODIE_MASCOT = "#EE9518"

const theme = createTheme({
  palette: {
    primary: {
      main: PERSIAN_GREEN,
      contrastText: BRAND_GREEN_LIGHT,
      light: PERSIAN_GREEN_TRANSPARENT,
    },
    secondary: {
      light: HONEYBEE,
      main: GOLDEN_TANOI,
    },
    background: {
      default: WHITE,
      paper: PAPER_BACKGROUND,
    },
    action: {
      disabled: DISABLED_GREY,
    },
    text: {
      primary: BLACK,
      secondary: DEFAULTIAN_GREY,
    },
    error: {
      main: BITTER_SWEET,
    },
    warning: {
      main: GOLDEN_TANOI,
      dark: SUDOBANGBANG,
    },
    success: {
      main: SCOOTER_GREEN,
      dark: BOOTSTRAP_BLUE,
    },
    info: {
      main: PERSIAN_GREEN,
      dark: SKY_DIVING_IN_THE_BLUE,
    },
    grey: {
      100: IVORY_EGG,
      200: CODE_BACKGROUND,
      300: NOT_SNOW_WHITE_GRAY,
      400: DADGREY,
      600: QUICK_SILVER,
      700: DEBUG_GREY,
    },
    filters: [
      {
        main: CANCRO,
        contrastText: ARIEL_SCALE,
      },
      {
        main: SKY_CLOUD,
        contrastText: SEAWATER_POPSICLE,
      },
      {
        main: CANCRO,
        contrastText: ARIEL_SCALE,
      },
      {
        main: BANANA_YOGURT_SWIRL,
        contrastText: HOODIE_MASCOT,
      },
    ],
  },
})
export { theme }
