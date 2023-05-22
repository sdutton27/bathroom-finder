import { useState, createContext } from 'react';
import {ThemeProvider} from '@mui/material/styles';
import getTheme from '../themes/base';

export const ThemeContext = createContext({
    currentThemes: 'primaryTheme',
    setTheme: null
})

const CustomThemeProvider = ({children}) => {
    // get the theme from local storage, and if not then just set it to primary theme 
const currentTheme = localStorage.getItem('gnbFinderTheme') || 'primaryTheme';
//underscore so it has a different name than the other one 
const [themeName, _setThemeName] = useState(currentTheme)
const theme = getTheme(themeName)

const setThemeName=(name) => {
localStorage.setItem('gnbFinderTheme', name)
_setThemeName(name)
}
const values={
currentTheme: themeName,
setTheme: setThemeName
}

return(
<ThemeContext.Provider value={values}>
    <ThemeProvider theme={theme}>
        { children }
    </ThemeProvider>
</ThemeContext.Provider>
)

}
export default CustomThemeProvider