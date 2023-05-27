import React, { useContext, useEffect } from 'react'
import { NavContext } from '../../context/NavContext';

import { useTheme } from '@emotion/react';

import { Box } from '@mui/material';

import './favoritespage.css'

import FavoritesCard from '../../components/FavoritesCard/FavoritesCard';

import { FavoritesContext } from '../../context/FavoritesContext';

import { UserContext } from '../../context/UserContext';

export default function FavoritesPage() {
  const {setCurrentPage} = useContext(NavContext)
  const {favorites} = useContext(FavoritesContext)
  const { user } = useContext(UserContext)
  const theme = useTheme()
  useEffect(()=>{
    setCurrentPage('favorites');
    // getFavorites();
  },[])

  // const getFavorites = async () => {
  //   // const url = 'http://127.0.0.1:5000/api/favorites';

  //   if (user.apitoken) { // if the user is logged in
  //     const res = await fetch('http://127.0.0.1:5000/api/favorites', {
  //         headers: {Authorization: `Bearer ${user.apitoken}`}
  //     })
  //     const data = await res.json()
  //     console.log(data)
  //     if (data.status === 'ok') {
  //         // setCart(data.cart)
  //         console.log('the favorites list was a success')
  //     }
  //     else {
  //         // if you log out then if should log out
  //         // setCart([])
  //         console.log('the favorites list was a failure')
  //     }
  //   }

  // }

  return (
    <div className="page-container" style={{backgroundColor: theme.palette.background.default}}>
      <h1>Favorites</h1>
      <Box align="center">
          {favorites?.map((bathroom, i)=>(
            // <Typography key={i} sx={{color:'text.primary', marginLeft:40}} onClick={()=>{removeFromFavorites(bathroom)}}>{bathroom.name}</Typography>
            <FavoritesCard key={i} bathroom={bathroom}/>
          ))}
        </Box>
    </div>
  )
}
