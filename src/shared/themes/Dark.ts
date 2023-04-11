import { createTheme } from '@mui/material';
import { cyan, blue } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[700],
      dark: blue[800],
      light: blue[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[700],
      light: cyan[400],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#303134',
      default: '#202124',
    }
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  }
});