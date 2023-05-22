import React, { useContext, useEffect } from 'react'
import { NavContext } from '../../context/NavContext';

import { useTheme } from '@emotion/react';
import './favoritespage.css'

export default function FavoritesPage() {
  const {setCurrentPage} = useContext(NavContext)
  
  const theme = useTheme()
  useEffect(()=>{
    setCurrentPage('favorites');
  },[])

  return (
    <div className="page-container" style={{backgroundColor: theme.palette.background.default}}>
      <h1>Favorites</h1>
    </div>
  )
}
