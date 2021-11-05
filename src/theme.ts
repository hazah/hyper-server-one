import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
        },
      },
    },
  },
});

export default theme;
