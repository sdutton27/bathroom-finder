import React from 'react'

import { Typography } from '@mui/material'
import { useTheme } from '@emotion/react'

// export default function BathroomPin({index, lat, lng}) {
export default function BathroomPin({index, lat, lng, selected}) {
  // console.log("a pin is selected: " + selected)
  const theme = useTheme()
  return (
    // <div lat={lat} lng={lng} style={{position:"relative", zIndex:100}}>
    <div style={{zIndex:100}}>
      {selected ?
      // <img src={require("./pin.png")} lat={lat} lng={lng} style={{height:"60px", position:"absolute", filter: "drop-shadow(1px 2px 3px #00000044)"}} />
      <>
      <img src={require("./pin.png")} lat={lat} lng={lng} style={{height:"60px", position:"absolute", left: "-30px", top:"-60px", filter: "drop-shadow(2px 3px 5px #ffffff44)"}} />
      <Typography sx={{color:'text.primary', position:"absolute", left: "-9px", top:"-62px", fontWeight:"500", fontSize:22}} >{String.fromCharCode((index + 65))}</Typography>
      </>
      : 
      <>
      <img src={require("./pin.png")} lat={lat} lng={lng} style={{height:"40px", position:"absolute", left: "-20px", top:"-40px", filter: "drop-shadow(1px 2px 3px #00000044)"}} />
      <Typography sx={{color:'text.primary', position:"absolute", left: "-5px", top:"-42px", fontWeight:"500", }} >{String.fromCharCode((index + 65))}</Typography>
      </>
      // <img src={require("./pin.png")} lat={lat} lng={lng} style={{height:"40px", position:"absolute", filter: "drop-shadow(1px 2px 3px #00000044)"}} />
      }
    </div>
  )
}
