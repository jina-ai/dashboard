const PERSIAN_GREEN = "#009999";
const GOLDEN_TANOI = "#FFCC66";
const BITTER_SWEET = "#ff6666";
const SCOOTER_GREEN = "#32C8CD";

const theme = {
  palette: {
    background: { default: "#FFFFFF" },
    primary: {
      main: PERSIAN_GREEN,
    },
    secondary: { main: GOLDEN_TANOI },
    warning: { main: GOLDEN_TANOI },
    error: { main: BITTER_SWEET },
    success: { main: PERSIAN_GREEN },
    info: { main: SCOOTER_GREEN },
  },
} as const;

export { theme };
