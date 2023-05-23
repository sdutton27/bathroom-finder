import React, {useContext, useEffect, useState} from 'react'
import { NavContext } from '../../context/NavContext'
import Map from '../../components/Map/Map' // import the map here
import SearchBar from '../../components/SearchBar/SearchBar'

import GoogleMapReact from 'google-map-react'
import { Autocomplete } from '@react-google-maps/api'

import { useTheme } from '@emotion/react'

import './mappage.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SearchSwitch from '../../components/SearchSwitch/SearchSwitch';
import { TextField } from '@mui/material';

export default function MapPage() {
  const [coordinates, setCoordinates] = useState({ lat: 40.71427, lng: -74.00597})
  const {setCurrentPage} = useContext(NavContext)
  const [switchChecked, setSwitchChecked] = useState(false)

  const [autocomplete, setAutocomplete] = useState(null);
  const [locationSearchVal, setLocationSearchVal] = useState("");
  const [searchLocPhoto, setSearchLocPhoto] = useState('')
  const [searchLocBase64, setSearchLocBase64] = useState('')

  const handleSearchChange = (e) => {
    setLocationSearchVal(e.target.value)
  }

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    // console.log(autocomplete.gm_bindings_.bounds."502".Rj.formattedPrediction);
    console.log(autocomplete)
    console.log(autocomplete['gm_accessors_']['place']['Is']['Rj']['gm_accessors_']['place']['Rj']['formattedPrediction'])
    setLocationSearchVal(autocomplete['gm_accessors_']['place']['Is']['Rj']['gm_accessors_']['place']['Rj']['formattedPrediction'])  

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // if just one location
    if (!switchChecked) {
      // on google maps documentation
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      // let's set the coordinates
      setCoordinates({lat, lng});
      getGooglePlacesInfo(locationSearchVal);
      setLocationSearchVal(""); // reset the search
      searchBathroomsAroundLoc(lat, lng);
    }
    
  }

  const searchBathroomsAroundLoc = async (lat, lng)=> {
    const url = `http://127.0.0.1:5000/api/search-around-loc/${lat.toString()}/${lng.toString()}`;
    const options = {
        // mode: 'no-cors',
        method: "GET",
        headers: {
            "Content-Type": 'application/json'
        }
    };
    const res = await fetch(url, options);
    const data = await res.json();
    if (data.status === 'ok'){
        // Show success msg
        console.log(data)
        console.log('success')
    }
  }

  const getGooglePlacesInfo = async (locationSearchVal) => {
    const locationSearchFormatted = locationSearchVal.split(' ').join('%20')
    const url = `http://127.0.0.1:5000/api/google-places/${locationSearchFormatted}`;
    const options = {
        // mode: 'no-cors',
        method: "GET",
        headers: {
            "Content-Type": 'application/json'
        }
    };
    const res = await fetch(url, options);
    const data = await res.json();
    if (data.status === 'ok'){
        // Show success msg
        console.log(data)
        console.log('successfully got places data')
        try {
          setSearchLocPhoto(data['data']['candidates'][0]['photos'][0]['photo_reference'])
        } catch {
          setSearchLocPhoto('')
          setSearchLocBase64('')
        }
        // console.log(data['data']['candidates'][0]['photos'][0]['photo_reference'])
    }
  }
  
  const getSearchLocPhoto = async (searchLocPhoto) => {
    const url = `http://127.0.0.1:5000/api/google-places-photo/${searchLocPhoto}`;
    const options = {
        // mode: 'no-cors',
        method: "GET",
        headers: {
            "Content-Type": 'image/jpeg' // let's just assume jpeg ?
        }
    };
    const res = await fetch(url, options);
    const data = await res.json();
    if (data.status === 'ok'){
        // Show success msg
        console.log(data)
        console.log('successfully got photo')
        setSearchLocBase64(data['base_64_image'])
    }
  }

  useEffect(()=>{
    if (searchLocPhoto !== '') {
      console.log('op! we have a photo to place')
      getSearchLocPhoto(searchLocPhoto);
    }
  },[searchLocPhoto])

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
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <SearchSwitch switchChecked={switchChecked} setSwitchChecked={setSwitchChecked}/>
            </Grid>
            <form onSubmit={handleSubmit}>
              {switchChecked ? 
              <>
              <Grid item>
              {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
                <SearchBar placeholder="Choose starting point..." width={'180px'}/>
              {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
              {/* </Autocomplete> */}
              </Grid>
              <Grid item>
              <SearchBar placeholder="Choose destination..." width={'180px'}/>
              </Grid>
              </>
              : 
              <Grid item>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <SearchBar placeholder="Search for any location" width={'180px'} value={locationSearchVal} onChange={handleSearchChange}/>
              {/* <SearchBar placeholder="Search for any location" width={'180px'} value={locationSearchVal} onChange={handleSearchChange}/> */}
              </Autocomplete>
              </Grid>
            }
            <Grid item>
              <Button type="submit" sx={{width: "50px", borderRadius:"8px", minWidth: "24px", padding: "5px", backgroundColor:'success.main'}}>Go</Button>
            </Grid>
            </form>
          </Grid>
          <Grid item container xs={12} >
          {/* <Grid item>
            <Typography>hi</Typography>
            </Grid> */}
            <Grid item xs={12} sx={{height: '100%'}}>
            <Map location={coordinates} zoomLevel={13}/>
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
        { searchLocBase64 !== "" ? 
        <img src={`data:image/jpeg;base64,${searchLocBase64}`} style={{opacity: '.7'}} />
        : <></>}
    </Box>
  )
}
