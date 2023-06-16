import { ThemeOptions, createTheme } from "@mui/material";

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff9f52",
      contrastText: "#737373",
    },
    secondary: {
      main: "#FFF6DD",
    },
    text: {
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    subtitle1: {
      fontSize: "1.15rem",
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 400,
    },
  },
});
