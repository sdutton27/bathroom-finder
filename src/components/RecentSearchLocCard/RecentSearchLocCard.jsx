import React from 'react'

import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'

import { useTheme } from '@emotion/react'
// <RecentSearchLocCard originName={search.origin_name} originAddress={search.origin_address} image={search.photo_base_64}/>
export default function RecentSearchLocCard({originName, originAddress, image}) {
    const theme = useTheme()
    return (
    <Card align="center" sx={{ backgroundColor: 'background.loc_card', width: "66vw", position: "relative", zIndex:"speed dial",}}>
      <CardActionArea align="center" sx={{width: "60px"}}>
        <CardMedia
          component="img"
          
          height="60px"
          image={image}
          alt="image of location"
          sx={{borderRadius:"4px", padding:"5px"}}
        />
        </CardActionArea>
        <Typography sx={{position: "absolute", zIndex:"modal", left:"20px", top:"30px"}}>{originName}</Typography>
        <Typography sx={{position: "absolute", zIndex:"modal", right:"20px", top:"30px" }}>{originAddress}</Typography>
        {/* <CardContent sx={{padding:0}}>
          <Typography gutterBottom sx={{whiteSpace: "pre-line", fontSize:'8px', color:'text.primary', padding: '1px 3px', textAlign:'center'}}>
          {originName}<br/>{originAddress}
          </Typography>
        </CardContent> */}
      
    </Card>
    )
}
