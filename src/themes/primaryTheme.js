import { createTheme } from '@mui/material/styles'; 

const themeOptions = {
  palette: {
    type: 'light',
    mode: 'light',
    primary: {
      main: '#4A4E69',
    },
    secondary: {
      main: '#9A8C98',
    },
    background: {
      default: '#C9ADA7',
      paper: '#f2e9e4',
    },
    text: {
      primary: '#22223b',
    },
  },
};

const theme = createTheme(themeOptions)
export default theme 