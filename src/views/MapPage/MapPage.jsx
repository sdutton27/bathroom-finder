import React, {useContext, useEffect, useState} from 'react'
import { NavContext } from '../../context/NavContext'
import Map from '../../components/Map/Map' // import the map here
import SearchBar from '../../components/SearchBar/SearchBar'

import GoogleMapReact from 'google-map-react'

import { useTheme } from '@emotion/react'

import './mappage.css'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SearchSwitch from '../../components/SearchSwitch/SearchSwitch'

export default function MapPage() {
  const [coordinates, setCoordinates] = useState({ lat: 40.71427, lng: -74.00597})
  const {setCurrentPage} = useContext(NavContext)
  const [switchChecked, setSwitchChecked] = useState(false)
  
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
    <Box className='page-container map-page' sx={{backgroundColor: 'background.default', flexGrow: 1}}>
      {/* {/* <Grid container spacing={2} sx={{marginTop: '0px', marginLeft: '0px', width: '100%'}}>
        {/* Map
        <MapSection location={location} zoomLevel={8} /> {/* include it here */}
          {/* <Grid item container direction="column" spacing={2}  xs={12} s={8}>
            <Grid item container direction="row">
              <Grid item>
                <SearchSwitch/>
              </Grid>
              <Grid item>
              <SearchBar width={'180px'}/>
              </Grid>
              <Grid item>
              <Typography sx={{color:'text.primary'}}>The search bar</Typography>
              </Grid>
            </Grid>
            <Grid item> */}
              {/* <Map location={coordinates} zoomLevel={12}/> */}
            {/* <GoogleMapReact bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} defaultCenter={location} defaultZoom={8}></GoogleMapReact> */}
            {/* </Grid>
          </Grid>
          <Grid container item xs={12} s={4}>
            <Grid item >
              <Typography align="center" sx={{color:'text.primary'}}>Bathrooms Nearby</Typography>
            </Grid> 
            <Grid item>
              <Typography sx={{color:'text.primary'}}>Search Results Here</Typography>
            </Grid> 
          </Grid>
      </Grid> */} 
      <Grid container spacing={2} sx={{flexGrow: 1, marginTop: '0px', marginLeft: '0px', width: '100%'}}>
        <Grid item container spacing={2} xs={12} sm={8}>
          <Grid item container>
            <Grid item>
              <SearchSwitch/>
            </Grid>
            <Grid item>
            <SearchBar width={'180px'}/>
            </Grid>
            <Grid item>
            <Typography sx={{color:'text.primary'}}>The search bar</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} >
          {/* <Grid item>
            <Typography>hi</Typography>
            </Grid> */}
            <Grid item xs={12} sx={{height: '100%'}}>
            <Map location={coordinates} zoomLevel={12}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={4} direction="column">
            <Grid item >
              <Typography align="center" sx={{color:'text.primary'}}>Bathrooms Nearby</Typography>
            </Grid> 
            <Grid item>
              <Typography align="center" sx={{color:'text.primary'}}>Search Results Here</Typography>
            </Grid> 
          </Grid>
      </Grid>
      <Typography align="center" sx={{color:'text.primary'}}>This will be the Recent History/Favorites</Typography>
    </Box>
  )
}
