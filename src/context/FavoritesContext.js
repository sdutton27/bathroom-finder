import { createContext, useContext, useState } from 'react';

export const FavoritesContext = createContext();

const FavoritesContextProvider = ({children}) => {
    // const [currentPage, setCurrentPage] = useState('home')

    // const navContext = {
    //     currentPage, setCurrentPage,
    // }

    const [favorites, setFavorites] = useState([])

    // we should have this get the context of the favorites using the async call to the api  
    const addToFavorites = (bathroom) => {
        setFavorites(prev => {
            return [
                ...prev,
                bathroom
            ]
        })
    }

    const removeFromFavorites = (bathroom) => {
        // const index = favorites.indexOf(bathroom)
        // if (index !== -1) {
        //     setFavorites()
        // }
        setFavorites(prev => {
            // const index = prev.indexOf(bathroom)
            // if (index !== -1) {
            //     return prev.splice(index, 1)
            // }
            return prev.filter(e => e !== bathroom)
        })
    }

    const inFavorites = (bathroom) => {
        for (let i=0; i<favorites.length; i++) {
            if (favorites[i] === bathroom) {
                return true
            }
        }
        return false 
    }

    const favoritesContext = {
        favorites, setFavorites, addToFavorites, removeFromFavorites, inFavorites
    }

    return (
        <FavoritesContext.Provider value={favoritesContext}>
            {children}
        </FavoritesContext.Provider>
    )
}
export default FavoritesContextProvider