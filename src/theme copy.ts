import { DefaultTheme } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const Theme: DefaultTheme = {
  palette: {
    primary: {
      main: '#37474f',
      light: '#62727b',
      dark: '#102027',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#610316',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: `'Source Code Pro', monospace`,
  },
};
const theme = createMuiTheme(Theme);

export default theme;
