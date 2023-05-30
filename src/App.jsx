import React, { useState, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import MapPage from './views/MapPage/MapPage'
import Home from './views/Home/Home'
import About from './views/About/About'
import FavoritesPage from './views/FavoritesPage/FavoritesPage'
import ProfilePage from './views/ProfilePage/ProfilePage'
import ThemeSwitch from './components/ThemeSwitch';

import { UserContext } from './context/UserContext';

import { GlobalStyles } from '@mui/material';
import { useTheme } from '@emotion/react';

import { ThemeContext } from './context/ThemeContext';

import './app.css';

// const getUserFromLocalStorage = () => {
//   const found = localStorage.getItem('user_bathroom_finder')
//   if (found) {
//     return JSON.parse(found)
//   }
//   return {}
// }

export default function App() {
  // top one seems to work
  // const {user, setUser, logMeIn, logMeOut} = useContext(UserContext)
  // const [user, setUser] = useContext(UserContext)
  //const [user, setUser] = useState(getUserFromLocalStorage)
  
  // const navigate = useNavigate()
  
  // console.log(user)

  // const logMeIn = (user) => {
  //   setUser(user)

  //   localStorage.setItem('user_bathroom_finder', JSON.stringify(user))
  // }

  // const logMeOut = () => {
  //   setUser({})
  //   localStorage.removeItem('user_bathroom_finder')
  //   navigate('/')
  // }
  const {showHomepage} = useContext(UserContext)
  const theme = useTheme()
  // const {currentTheme} = useContext(ThemeContext)
  // console.log(currentTheme)
  
  return (
    <div className="app">
         <Navbar />
         <Routes>
             <Route path="/" element={<Home />}/>
             <Route path="/about" element={<About />}/>
             <Route path="/map" element={<MapPage />}/>
             <Route path="/favorites" element={<FavoritesPage />}/>
             <Route path="/profile" element={<ProfilePage />}/>
         </Routes>
         {showHomepage === 'visible-home-page' ? 
         <ThemeSwitch className="theme-switch" style={{position: 'absolute', marginLeft: '30px', right:'0', bottom:'0'}}/>
         : <></>}
         <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default } }} />
      </div>
  )
}
