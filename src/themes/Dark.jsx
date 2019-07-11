import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    gradient: {
      primary: 'linear-gradient(to right, #42275a, #734b6d)'
    }
  }
})