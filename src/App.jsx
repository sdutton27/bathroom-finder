import React, { useState, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import MapPage from './views/MapPage'
import Home from './views/Home/Home'

import Test from './views/Test/Test'

import { UserContext } from './context/UserContext';

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

  return (
    <div className="app">
         <Navbar />
         <Routes>
             <Route path="/" element={<Home />}/>
             <Route path="/map" element={<MapPage />}/>
             <Route path="/testing" element={<Test />}/>
         </Routes>
      </div>
  )
}
