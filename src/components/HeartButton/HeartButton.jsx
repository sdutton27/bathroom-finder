import React, { useState, useEffect, useContext } from 'react';

import heart from 'react-useanimations/lib/heart'
import UseAnimations from 'react-useanimations'; // for Favoriting heart animation

import { FavoritesContext } from '../../context/FavoritesContext';

import { NavContext } from '../../context/NavContext';

export const HeartButton = ({bathroom, size}) => {
    const {favorites, addToFavorites, removeFromFavorites, inFavorites} = useContext(FavoritesContext)                                
    const {currentPage} = useContext(NavContext)

    // console.log(size)
    useEffect(()=>{
      console.log("favorites have changed")
      console.log(`${inFavorites(bathroom)} is the favorite status for ${bathroom.name}`)
    },[favorites])

    return (
    //   <div align={{currentPage === 'map' ? "center" : "right"}}>
    <>
        {/* {currentPage === 'map' 
        ? <div align="center">
        : <div align="right">} */}
        <div align={(currentPage === 'map') ? "center" : "right"}>
        <UseAnimations
          reverse={inFavorites(bathroom)}
          onClick={() => {
            {inFavorites(bathroom)? 
                removeFromFavorites(bathroom)
                : 
                addToFavorites(bathroom)
            }
          }}
          size={size}
          // wrapperStyle={{ marginTop: '8px' }}
          animation={heart}
          align="center"
          strokeColor={"#e25a5e"}
          fillColor={"#e25a5e"}
        />
      </div>
    </>
    );
  };