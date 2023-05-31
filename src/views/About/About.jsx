import React, { useContext, useEffect } from 'react'
import { NavContext } from '../../context/NavContext';

import { useTheme } from '@emotion/react';

import './about.css';

import TransgenderIcon from '@mui/icons-material/Transgender';
import AccessibleIcon from '@mui/icons-material/Accessible';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

export default function About() {
  const { setCurrentPage } = useContext(NavContext)

  useEffect(() => {
    setCurrentPage('about');
  }, [])
  const theme = useTheme()
  return (
    <div className='page-container about-page' style={{ backgroundColor: theme.palette.background.default }}>
      <h1>About</h1>

      <div className="letter-holder">
        <div className="l-1 letter">L</div>
        <div className="l-2 letter">o</div>
        <div className="l-3 letter">a</div>
        <div className="l-4 letter">d</div>
        <div className="l-5 letter">i</div>
        <div className="l-6 letter">n</div>
        <div className="l-7 letter">g</div>
        <div className="l-8 letter">.</div>
        <div className="l-9 letter">.</div>
        <div className="l-10 letter">.</div>
      </div>


      <div className="container">
        <div className="toggle">
          <input type="checkbox"/>
            <span className="button"></span>
            {/* <span className="label">+</span> */}
            <TransgenderIcon className="label" />
        </div>
        <div className="toggle">
          <input type="checkbox"/>
            <span className="button"></span>
            <AccessibleIcon className="label" />
        </div>
        <div className="toggle">
          <input type="checkbox"/>
            <span className="button"></span>
            <BabyChangingStationIcon className="label" />
        </div>
      </div>

    </div>
  )
}
