import { createContext, useContext, useState } from 'react';
import { UserContext } from './UserContext';

export const FavoritesContext = createContext();

const FavoritesContextProvider = ({children}) => {
    // const [currentPage, setCurrentPage] = useState('home')

    // const navContext = {
    //     currentPage, setCurrentPage,
    // }

    const [favorites, setFavorites] = useState([])
    const {user} = useContext(UserContext)

    const addBathroom = async (bathroom) => {
        const url = `http://127.0.0.1:5000/api/bathrooms/add`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${user.apitoken}`
                //Authorization: `Bearer ${(user.google_user ? firebase.auth().currentUser.getIdToken() : user.apitoken)}`
            },
            body: JSON.stringify(bathroom)
        };

        const res = await fetch(url, options);
        const data = await res.json();
        // console.log(data)
        return data
    }

    // we should have this get the context of the favorites using the async call to the api  
    const addToFavorites = async (bathroom) => {
        // const url = `http://127.0.0.1:5000/api/add-bathroom/${bathroom.id}/${bathroom.name}/${bathroom.street}/${bathroom.city}/${bathroom.state}/${bathroom.country}/${bathroom.accessible}/${bathroom.unisex}/${bathroom.changing_table}/${bathroom.latitude}/${bathroom.longitude}/${bathroom.rating}/${bathroom.directions}/${bathroom.comment}`;
        // const url = `http://127.0.0.1:5000/api/bathrooms/add`;
        // const options = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": 'application/json',
        //         Authorization: `Bearer ${user.apitoken}`
        //         //Authorization: `Bearer ${(user.google_user ? firebase.auth().currentUser.getIdToken() : user.apitoken)}`
        //     },
        //     body: JSON.stringify(bathroom)
        // };

        // const res = await fetch(url, options);
        // const data = await res.json();
        // console.log(data)

        // console.log(bathroom.bathroom)
        // bathroom = bathroom.bathroom 

        const data = await addBathroom(bathroom)

        // have to change this 
        if (data.status === 'ok' || data.message === "That bathroom is already in the database.") { // if the bathroom hadn't yet been added to Bathrooms...we need to also add bathrooms to favorites that were already added
            // add in backend
            const url = `http://127.0.0.1:5000/api/favorites/favorite/${bathroom.id}`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${user.apitoken}`
                    //Authorization: `Bearer ${(user.google_user ? firebase.auth().currentUser.getIdToken() : user.apitoken)}`
                },
                // body: JSON.stringify(bathroom)
            };

            const res = await fetch(url, options);
            const data = await res.json();
            console.log(data)
            if (data.status === 'ok') {
                // add in frontend
                setFavorites(prev => {
                    return [
                        ...prev,
                        bathroom
                    ]
                })
            }

        } else {
            console.log('status was not ok, not added')
        }
    }

    const removeFromFavorites = async (bathroom) => {
        // const index = favorites.indexOf(bathroom)
        // if (index !== -1) {
        //     setFavorites()
        // }
        const url = `http://127.0.0.1:5000/api/favorites/unfavorite/${bathroom.id}`;
        const options = {
                method: "DELETE", // or PUT ? 
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${user.apitoken}`
                },
            };

            const res = await fetch(url, options);
            const data = await res.json();
            console.log(data)

        if (data.status === 'ok') {
            setFavorites(prev => {
                // const index = prev.indexOf(bathroom)
                // if (index !== -1) {
                //     return prev.splice(index, 1)
                // }
                return prev.filter(e => e !== bathroom)
            })
        }
    }

    const inFavorites = (bathroom) => {
        for (let i=0; i<favorites.length; i++) {
            if (favorites[i]['id'] === bathroom['id']) {
                return true
            }
        }
        return false 
    }

    // FOR RETRIEVING THE USER'S FAVORITES
    const getFavorites = async () => {
        // const url = 'http://127.0.0.1:5000/api/favorites';
    
        if (user.apitoken) { // if the user is logged in
          const res = await fetch('http://127.0.0.1:5000/api/favorites', {
              headers: {Authorization: `Bearer ${user.apitoken}`}
          })
          const data = await res.json()
          console.log(data)
          if (data.status === 'ok') {
              console.log('the favorites list was a success')
              setFavorites(data.favorites)
          }
          else {
              // if you log out then if should log out
              // setCart([])
              console.log('the favorites list was a failure')
              setFavorites([])
          }
        } else { // if the user has logged out 
            setFavorites([])
        }
    
    }

    const favoritesContext = {
        favorites, setFavorites, addToFavorites, removeFromFavorites, inFavorites, getFavorites
    }

    return (
        <FavoritesContext.Provider value={favoritesContext}>
            {children}
        </FavoritesContext.Provider>
    )
}
export default FavoritesContextProvider