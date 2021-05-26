import { createTheme } from "@material-ui/core"

const SCOOTER_GREEN = "#32C8CD"
const PERSIAN_GREEN = "#009999"
const SKY_DIVING_IN_THE_BLUE = "#007AFF"

const HONEYBEE = "#FFFAE2"
const GOLDEN_TANOI = "#FFCC66"

const BITTER_SWEET = "#ff6666"
const SUDOBANGBANG = "#ff4540"

const BLACK = "#000000"

const WHITE = "#FFFFFF"

const IVORY_EGG = "#F9F9F9"
const NOT_SNOW_WHITE_GRAY = "#E5E5E5"
const CODE_BACKGROUND = "#E8E8E8"
const DADGREY = "#DAD7FE"
const QUICK_SILVER = "#A6A6A6"
const DEBUG_GREY = "#7E7278"

const PAPER_BACKGROUND = "#f5f6f8"

const DISABLED_GREY = "#9E9E9E"
//
// const oldTheme = {
//   palette: {
//     bodyBackground: PAPER_BACKGROUND,
//     background: WHITE,
//     codeBackground: CODE_BACKGROUND,
//     disabledGrey: DISABLED_GREY,
//     headerTextColor: BLACK,
//     primary: PERSIAN_GREEN,
//     secondary: GOLDEN_TANOI,
//     warning: GOLDEN_TANOI,
//     error: BITTER_SWEET,
//     success: SCOOTER_GREEN,
//     info: PERSIAN_GREEN,
//     critical: SUDOBANGBANG,
//     debug: DEBUG_GREY,
//     tagBackground: DADGREY,
//     tagPlatformBackground: HONEYBEE,
//     mutedText: QUICK_SILVER,
//     highlight: SKY_DIVING_IN_THE_BLUE,
//     searchBarBackground: IVORY_EGG,
//     searchBarBorder: NOT_SNOW_WHITE_GRAY,
//   },
// }

const theme = createTheme({
  palette: {
    primary: {
      main: PERSIAN_GREEN,
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
    },
    info: {
      main: PERSIAN_GREEN,
      dark: SKY_DIVING_IN_THE_BLUE,
    },
    grey: {
      100: IVORY_EGG,
      200: NOT_SNOW_WHITE_GRAY,
      300: CODE_BACKGROUND,
      400: DADGREY,
      600: QUICK_SILVER,
      700: DEBUG_GREY,
    },
  },
})
export { theme }
