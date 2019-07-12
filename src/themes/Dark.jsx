import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    gradient: {
      primary: 'linear-gradient(to left, #cb2d3e, #ef473a)'
    }
  }
})