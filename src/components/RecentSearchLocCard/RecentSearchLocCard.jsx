import React from 'react'

import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'

import { useTheme } from '@emotion/react'
// <RecentSearchLocCard originName={search.origin_name} originAddress={search.origin_address} image={search.photo_base_64}/>
export default function RecentSearchLocCard({originName, originAddress, image}) {
    const theme = useTheme()
    return (
    <Card align="right" sx={{ backgroundColor: 'background.loc_card', width: "100%",height: "70px", position: "relative", zIndex:"speed dial",}}>
      
      <Typography align="left" sx={{fontSize:"20px", position: "absolute", zIndex:"modal", left:"20px", top:"10px",}}><b>{originName}</b></Typography>
      <br/>
      <Typography align="left" sx={{fontSize:"12px", position: "absolute", zIndex:"modal", left:"20px", top:"42px",}}>{originAddress}</Typography>
      {/* <Typography sx={{position: "absolute", zIndex:"modal", left:"20px", top:"10px",}}>{originAddress}</Typography> */}

      <CardActionArea justifyContent="center" sx={{position:"absolute", top: "0px", right:"0px", marginRight:"5px", width: "60px", height: "70px"}}>
        
      {image === "" ? <></>:
        <CardMedia
          component="img"
          height="60px"
          image={image}
          alt="image of location"
          sx={{borderRadius:"10px", padding:"5px", alignSelf:"center"}}
        />
    }
        </CardActionArea>
    
        {/* <Typography sx={{position: "absolute", zIndex:"modal", left:"20px", top:"10px", paddingRight:"calc(100% - 30px)"}}>{originName}</Typography> */}
        {/* <Typography sx={{position: "absolute", zIndex:"modal", right:"20px", top:"10px", paddingLeft:"calc(100% - 30px)"}}>{originAddress}</Typography> */}
        
        {/* <CardContent sx={{padding:0}}>
          <Typography gutterBottom sx={{whiteSpace: "pre-line", fontSize:'8px', color:'text.primary', padding: '1px 3px', textAlign:'center'}}>
          {originName}<br/>{originAddress}
          </Typography>
        </CardContent> */}
      
    </Card>
    )
}
