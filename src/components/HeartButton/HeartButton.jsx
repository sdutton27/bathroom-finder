import React, { useState, useEffect, useContext } from 'react';

import heart from 'react-useanimations/lib/heart'
import UseAnimations from 'react-useanimations'; // for Favoriting heart animation

import { FavoritesContext } from '../../context/FavoritesContext';

import { Favorite, FavoriteBorder } from '@mui/icons-material';

import { NavContext } from '../../context/NavContext';

import { Grid } from '@mui/material';
import { RecentSearchContext } from '../../context/RecentSearchContext';

export const HeartButton = ({bathroom, size}) => {
    const {favorites, addToFavorites, removeFromFavorites, inFavorites} = useContext(FavoritesContext)                                
    const {currentPage} = useContext(NavContext)
    const { addRecentSearchBathroom } = useContext(RecentSearchContext)

    // const [isFavorited, setIsFavorited] = useState(inFavorites(bathroom))

    // console.log(size)
    // useEffect(()=>{
    //   // console.log("favorites have changed")
    //   // console.log(`${inFavorites(bathroom)} is the favorite status for ${bathroom.name}`)
    //   // setIsFavorited(inFavorites(bathroom))
    //   // addRecentSearchBathroom(bathroom);
    // },[favorites])

    // useEffect(()=>{

    // },[])

    // const handleClick = (e) => {
    //   console.log(e)
    //   console.log(e.value)
    //   if (inFavorites(bathroom) === true) {
    //     removeFromFavorites(bathroom);
    //     // setIsFavorited(false);
    //   } else {
    //     addToFavorites(bathroom);
    //     // setIsFavorited(true);
    //   }
    //   addRecentSearchBathroom(bathroom);
      
    // }

    return (
    //   <div align={{currentPage === 'map' ? "center" : "right"}}>
    <>
        {/* {currentPage === 'map' 
        ? <div align="center">
        : <div align="right">} */}
        <div align={(currentPage === 'map') ? "center" : "right"}>
        {/* <UseAnimations
          //reverse={inFavorites(bathroom)}
          reverse={isFavorited}
          onClick={handleClick
            // () => {
            // {inFavorites(bathroom)? 
            //     removeFromFavorites(bathroom);
            //     setIsFavorited(false);
            //     : 
            //     addToFavorites(bathroom);
            //     setIsFavorited(true);
            // }
          // }
        }
          size={size}
          // wrapperStyle={{ marginTop: '8px' }}
          animation={heart}
          align="center"
          strokeColor={"#e25a5e"}
          fillColor={"#e25a5e"}
        /> */}
        <Grid item>
                    {inFavorites(bathroom) ? 
                    <Favorite sx={{color: "#e25a5e"}} onClick={()=>{removeFromFavorites(bathroom); addRecentSearchBathroom(bathroom);}}/>
                    :
                    <FavoriteBorder sx={{color: "#e25a5e"}} onClick={()=>{addToFavorites(bathroom); addRecentSearchBathroom(bathroom);}} />
                    }
                </Grid>
      </div>
    </>
    );
  };