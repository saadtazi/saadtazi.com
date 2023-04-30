import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

declare module '@mui/system' {
  interface DefaultTheme extends Theme {}
}

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
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
});

export default theme;
