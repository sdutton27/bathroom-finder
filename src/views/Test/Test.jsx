import React, { useState } from 'react'

import './test.css'

export default function Test() {
    const [checked, setChecked] = useState(true)

    const onDoorCheckChange = (e) => {
        if (checked === true) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }

    return (
        <div className="curtain">
            <div className="curtain__wrapper">
                <input type="checkbox" checked={checked} onChange={onDoorCheckChange}/>
                
                <div className="curtain__panel curtain__panel--left">
                </div> 
                
                <div className="curtain__content">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/trophy.svg"/>
                <h2>Achievement Unlocked!</h2>
                </div>
                
                <div className="curtain__panel curtain__panel--right">
                </div>
                
            </div>
        </div> 
    )
}
