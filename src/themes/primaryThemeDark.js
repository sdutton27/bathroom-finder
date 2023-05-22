import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'dark',
    mode: 'dark',
    primary: {
      main: '#212D40',
    },
    secondary: {
      main: '#7D4E57',
    },
    background: {
      default: '#11151C',
      paper: '#212D40',
    },
    text: {
      primary: '#d0d0d0',
    },
  },
};

const theme = createTheme(themeOptions);
export default theme 