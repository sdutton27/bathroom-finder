import { createContext, useContext, useState } from 'react';

export const NavContext = createContext();

const NavContextProvider = ({children}) => {
    const [currentPage, setCurrentPage] = useState('home')

    const navContext = {
        currentPage, setCurrentPage,
    }

    return (
        <NavContext.Provider value={navContext}>
            {children}
        </NavContext.Provider>
    )
}
export default NavContextProvider