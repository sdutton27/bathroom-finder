import React, { useState, useEffect } from 'react'
import Auth from '../../components/Auth/Auth'

import {Link} from '@mui/material'

import Button from '@mui/material/Button';

// import { UserContext } from '../../context/UserContext';

import './home.css'

// the themeSwitch
// import ThemeSwitch from '../../components/ThemeSwitch';

import {useContext} from 'react'
import { UserContext } from '../../context/UserContext';
import { NavContext } from '../../context/NavContext';

import { FavoritesContext } from '../../context/FavoritesContext';

// import { ThemeContext } from '../../context/ThemeContext';
import { useTheme } from '@emotion/react';

const Home = () => {
  // const [isChecked, setIsChecked] = useState(false)

  const [checked, setChecked] = useState(true)

  const {user, userUnlocked, setUserUnlocked, showHomepage, setShowHomepage} = useContext(UserContext)
  const {setCurrentPage} = useContext(NavContext)
  // const [userUnlocked, setUserUnlocked] = useState('locked')
  const {getFavorites} = useContext(FavoritesContext)
  // const [showHomepage, setShowHomepage] = useState('invisible-home-page')

    const onDoorCheckChange = (e) => {
        if (checked === true) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }
    // on mount, check if user in showStorage 
    useEffect(()=>{
      if (Object.keys(user).length !== 0) {
        console.log('someone logged in')
        setShowHomepage('visible-home-page');
        setUserUnlocked('unlocked');
      } else {
        console.log('nobody logged in')
        setShowHomepage('invisible-home-page');
        setUserUnlocked('locked');
      }
      setCurrentPage('home');
    },[])

    useEffect(()=>{
      console.log('user unlocked has changed!')
      if (userUnlocked === 'unlocked') {
        console.log('now we are unlocked')
        setTimeout(()=>{return setShowHomepage('visible-home-page')}, 2000)
        // here is where we should also call getFavorites()
        getFavorites()
      } else {
        console.log('now we are locked')
      }
    },[userUnlocked])

  // const handleLoginChange = (e) => {
  //   console.log(e.target.checked)
  //   setIsChecked(e.target.checked)
  // }
  // const {currentTheme} = useContext(ThemeContext)
  // console.log(currentTheme)
  const theme = useTheme()
  return (
    // <div>
    //   Home
    //   <input type="checkbox" onChange={handleLoginChange}/>
    //   {isChecked? 
    //   <Login />
    //   :
    //   <Signup />
    //   }
    // </div>

    <>
    {showHomepage === 'invisible-home-page' ? 
    <div style={{position: "relative", height:"100%" }}>
        <div className="curtain" style={{position: "absolute"}}>
            <div className={`curtain__wrapper ${userUnlocked}`}>
                {/* <input type="checkbox" checked={checked} onChange={onDoorCheckChange}/> */}
                
                <div className="curtain__panel curtain__panel--left">
                </div> 
                                    {/* don't need this className unless going to do a Zoom  */}
                {/* <div id="home-page" className={userUnlocked==='unlocked'? 'visible-home-page':""}> */}
                
                <div id="home-page" className={showHomepage} style={{backgroundColor: theme.palette.background.default }}>
                  <h1>Welcome!</h1>
                  <p>(Please forgive me this will be a better homepage)</p>
                  <Button color="primary" variant="contained"><Link to="about" underline="none">About Us</Link></Button>
                  {/* <ThemeSwitch /> */}
                </div>
                
                <div className="curtain__panel curtain__panel--right">
                </div>
                
            </div>
        </div> 
    
    <Auth style={{zIndex: 2, position: "absolute"}}/>
    </div>
    : 
      <div id="home-page" className={`page-container ${showHomepage}`} style={{backgroundColor: theme.palette.background.default }}>
        <h1>Welcome!</h1>
                  <p>(Please forgive me this will be a better homepage)</p>
      </div>
    }
    </>
    
  )
}

export default Home