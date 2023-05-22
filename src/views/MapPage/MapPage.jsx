import React, {useContext, useEffect, useState} from 'react'
import { NavContext } from '../../context/NavContext'
import Map from '../../components/Map/Map' // import the map here

import GoogleMapReact from 'google-map-react'

import { useTheme } from '@emotion/react'

import './mappage.css'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function MapPage() {
  const [coordinates, setCoordinates] = useState({ lat: 40.71427, lng: -74.00597})
  const {setCurrentPage} = useContext(NavContext)
  
  useEffect(()=>{
    setCurrentPage('map');
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}})=>{
      console.log({latitude, longitude})
      setCoordinates({ lat: latitude, lng: longitude })
  })
  },[])

    // const location = {
    //     //address: '1600 Amphitheatre Parkway, Mountain View, california.',
    //     //lat: 37.42216,
    //     //lng: -122.08427,
    //     lat: 40.703827492564244, lng: -74.03279209014894
    // }
    const theme = useTheme()
  return (
    <Box className='page-container map-page' sx={{backgroundColor: 'background.default'}}>
      <Grid container spacing={2} sx={{marginTop: '0px', marginLeft: '0px', width: '100%'}}>
        {/* Map
        <MapSection location={location} zoomLevel={8} /> {/* include it here */}
          <Grid item xs={12} sm={8}>
            <Typography sx={{color:'text.primary'}}>The search bar</Typography>
            <Map location={coordinates} zoomLevel={12}/>
            {/* <GoogleMapReact bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} defaultCenter={location} defaultZoom={8}></GoogleMapReact> */}
          </Grid>
          <Grid item>
            <Typography align="center" sx={{color:'text.primary'}}>Bathrooms Nearby</Typography>
            <Typography sx={{color:'text.primary'}}>Search Results Here</Typography>
          </Grid>
      </Grid>
      <Typography align="center" sx={{color:'text.primary'}}>This will be the Recent History/Favorites</Typography>
    </Box>
  )
}
