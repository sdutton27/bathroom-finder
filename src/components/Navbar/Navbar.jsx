import React, { Component, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

// import {useContext} from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { NavContext } from '../../context/NavContext';

import './navbar.css'

import busDark from './bus-dark.png'
import busLight from './bus.png'

export default function Navbar() {
    //const {user, setUser} = useContext(UserContext)
    const {user, setUser, logMeOut} = useContext(UserContext)
    const {currentPage} = useContext(NavContext);
    // console.log(user)
    const {currentTheme} = useContext(ThemeContext)

    const [whichBus, setWhichBus] = useState(busLight)
    const [whichBackground, setWhichBackground] = useState('radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)')

    // const whichBus = () => {
    //   console.log(currentTheme)
    //   console.log('whichbus')
    //   if (currentTheme === 'primaryTheme') {
    //     return busDark
    //   } else {
    //     return busLight
    //   }
    // }
     useEffect(()=>{
      console.log('useeffect')
      if (currentTheme === 'primaryTheme') {
        //setWhichBus(busDark)
        setWhichBus(busLight)
      } else {
        setWhichBus(busDark)
      }
      console.log(whichBackground)
      if (currentTheme === 'primaryTheme') {
        setWhichBackground("radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)")
      } else {
        setWhichBackground('linear-gradient(354deg, rgba(2,0,36,1) 8%, rgba(17,17,62,1) 43%, rgba(4,55,85,1) 100%, rgba(10,77,91,1) 100%)')
      }
        
     },[currentTheme])
  return (
    <div className='nav-container'>
      <div className='nav-background' style={{background: whichBackground}}/>
      <nav className="navbar">
        <Link to="/">Home</Link>
        {/* <a href="#">About</a> */}
        <Link to="about" underline="none">About</Link>
        <Link to="map" underline="none">Map</Link>
        <Link to="favorites" underline="none">Favorites</Link>
        <Link to="profile">Profile</Link>
        <div className={`animation nav-${currentPage}`} style={{backgroundImage:`url(${whichBus})`}}></div>
      </nav>
      <div id="scroll-container">
        <img id="clouds-1" src={ require('./clouds.png') }/>
        <img id="clouds-2" src={ require('./clouds.png') }/>
        <img id="tree-1" src={ require('./tree.png') }/>
        <img id="tree-3" src={ require('./tree_3.png') }/>
        <img id="wc" src={ require('./toilet.png') }/>
      </div>
    </div>

    // <></>
    // <>
    // { (user.id) ?  

    // <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //             <div className="container-fluid">
    //                 <a className="navbar-brand" href="/">Navbar</a>
    //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //                     <li className="nav-item">
    //                     <Link className="nav-link active" aria-current="page" to="/">Home</Link>
    //                         <Link className="nav-link active" aria-current="page" to="/map">Map</Link>
    //                     </li>
    //                     {/* {(user.id)? 
    //                     <> */}
    //                     <span>{user.email}</span>
    //                     <button onClick={logMeOut}>Logout</button>
    //                     {/* </>
    //                     : <></>} */}
    //                 </ul>
    //             </div>
    //         </nav>
    // : <></>}
    // </>
  )
}
