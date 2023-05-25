import React from 'react'

import { Typography } from '@mui/material'

export default function LocationPin({index}) {
  return (
    <>
    <img src={require("./pin.png")} style={{height:"40px", position:"absolute", filter: "drop-shadow(1px 2px 3px #00000044)"}}/>
    <Typography sx={{position:"absolute", left: "15px", top:"-2px", fontWeight:"500", }}>{String.fromCharCode((index + 65))}</Typography>
    </>
  )
}
