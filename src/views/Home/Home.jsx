import React, { useState, useEffect } from 'react'
import Signup from '../../components/Auth/Signup'
import Login from '../../components/Auth/Login'

import './home.css'

const Home = () => {
  // const [isChecked, setIsChecked] = useState(false)

  const [checked, setChecked] = useState(true)

  const [userUnlocked, setUserUnlocked] = useState('locked')

    const onDoorCheckChange = (e) => {
        if (checked === true) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }


    useEffect(()=>{
      console.log('user unlocked has changed!')
    },[userUnlocked])
  // const handleLoginChange = (e) => {
  //   console.log(e.target.checked)
  //   setIsChecked(e.target.checked)
  // }

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
    <div style={{position: "relative", height:"100%" }}>
        <div className="curtain" style={{position: "absolute"}}>
            <div className={`curtain__wrapper ${userUnlocked}`}>
                {/* <input type="checkbox" checked={checked} onChange={onDoorCheckChange}/> */}
                
                <div className="curtain__panel curtain__panel--left">
                </div> 
                                    {/* don't need this className unless going to do a Zoom  */}
                <div id="home-page" className={userUnlocked==='unlocked'? 'visible-home-page':""}>
                <h1>This is the homepage</h1>
                </div>
                
                <div className="curtain__panel curtain__panel--right">
                </div>
                
            </div>
        </div> 
    
    <Login style={{zIndex: 2, position: "absolute"}} userUnlocked={userUnlocked} setUserUnlocked={setUserUnlocked} />
    </div>
    </>
  )
}

export default Home