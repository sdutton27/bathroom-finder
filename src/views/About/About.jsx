import React, {useContext, useEffect } from 'react'
import { NavContext } from '../../context/NavContext';

import { useTheme } from '@emotion/react';

import './about.css';

export default function About() {
  const {setCurrentPage} = useContext(NavContext)
  
  useEffect(()=>{
    setCurrentPage('about');
  },[])
  const theme = useTheme()
  return (
    <div className='page-container about-page'style={{backgroundColor: theme.palette.background.default}}>
      <h1>About</h1>
    </div>
  )
}
