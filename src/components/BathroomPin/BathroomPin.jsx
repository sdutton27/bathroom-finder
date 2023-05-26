import React from 'react'

import { Typography } from '@mui/material'

// export default function BathroomPin({index, lat, lng}) {
export default function BathroomPin({index, position}) {
  return (
    // <div lat={lat} lng={lng} style={{position:"relative", zIndex:100}}>
    <div style={{position:position, zIndex:100}}>
      <img src={require("./pin.png")} style={{height:"40px", position:"absolute", filter: "drop-shadow(1px 2px 3px #00000044)"}} />
      <Typography sx={{position:"absolute", left: "15px", top:"-2px", fontWeight:"500", }} >{String.fromCharCode((index + 65))}</Typography>
    </div>
  )
}
