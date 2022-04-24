import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent: PaletteOptions['primary'];
  }

  interface TypeText {
    muted?: string;
  }
}

export const defaultTheme = createTheme({
  palette: {
    common: {
      white: '#FFFEF7',
      black: '#25262D',
    },
    primary: {
      main: '#7E5F2F',
      contrastText: '#FFFEF7',
    },
    secondary: {
      main: '#F4E7CE',
      contrastText: '#321811',
    },
    error: {
      main: '#DB3D15',
    },
    success: {
      main: '#00AE29',
    },
    accent: {
      main: '#321811',
    },
    text: {
      primary: '#7E5F2F',
      secondary: '#778192',
      muted: '#C29F6C',
    },
    background: {
      default: '#F8F8F8',
      paper: '#FFFEF7',
    },
  },
  typography: {
    fontFamily: ['Nunito', 'Roboto', '-apple-system', 'sans-serif'].join(','),
  },
});
