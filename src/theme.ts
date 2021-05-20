import { createTheme } from "@material-ui/core"

const PERSIAN_GREEN = "#009999"
const GOLDEN_TANOI = "#FFCC66"
const BITTER_SWEET = "#ff6666"
const SCOOTER_GREEN = "#32C8CD"
const WHITE = "#FFFFFF"
const DADGREY = "#DAD7FE"
const SKY_DIVING_IN_THE_BLUE = "#007AFF"
const QUICK_SILVER = "#A6A6A6"
const HONEYBEE = "#FFFAE2"
const BLACK = "#000000"
const BODY_BACKGROUND = "#f5f6f8"
const CODE_BACKGROUND = "#E8E8E8"
const DISABLED_GREY = "#9E9E9E"

const theme = {
  palette: {
    bodyBackground: BODY_BACKGROUND,
    background: WHITE,
    codeBackground: CODE_BACKGROUND,
    disabledGrey: DISABLED_GREY,
    headerTextColor: BLACK,
    primary: PERSIAN_GREEN,
    secondary: GOLDEN_TANOI,
    warning: GOLDEN_TANOI,
    error: BITTER_SWEET,
    success: SCOOTER_GREEN,
    info: PERSIAN_GREEN,
    critical: "#ff4540",
    debug: "#7E7278",
    tagBackground: DADGREY,
    tagPlatformBackground: HONEYBEE,
    mutedText: QUICK_SILVER,
    highlight: SKY_DIVING_IN_THE_BLUE,
  },
}

const muiTheme = createTheme({
  palette: {
    primary: {
      main: WHITE,
    },
    secondary: {
      main: PERSIAN_GREEN,
    },
  },
})
export { theme, muiTheme }
