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
  const {favorites, getFavorites} = useContext(FavoritesContext)
  const { user } = useContext(UserContext)
  const theme = useTheme()
  useEffect(()=>{
    setCurrentPage('favorites');
    getFavorites();
    console.log({favorites})
  },[])

  // // we should move this to FavoritesContext so that getFavorites is called on mount to turn into the { favorites }
  // const getFavorites = async () => {
  //   const url = `http://127.0.0.1:5000/api/favorites`;
  //   const options = {
  //       //method: "GET",
  //       //mode: 'no-cors',
  //       headers: {
  //           "Content-Type": 'application/json',
  //           Authorization: `Bearer ${user.apitoken}`
  //       },
  //       // body: JSON.stringify(bathroom)
  //   };
  //   const res = await fetch(url, options);
  //   const data = await res.json();
  //   // console.log(data)
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
