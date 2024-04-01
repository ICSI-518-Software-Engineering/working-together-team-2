import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#ffffff",
    },
    background: {
      paper: "black",
      default: "black",
    },
  },
  mixins: {
    toolbar: {
      height: "5rem",
    },
  },
});
