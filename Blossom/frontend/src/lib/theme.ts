import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    // secondary: {
    //   main: "#fff",
    // },
    // background: {
    //   paper: "black",
    //   default: "black",
    // },
    // text: {
    //   primary: "#fff",
    // },
  },
  mixins: {
    toolbar: {
      height: "5rem",
    },
  },
});
