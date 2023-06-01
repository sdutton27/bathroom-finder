import React, { useContext, useEffect, useState } from 'react'
import { NavContext } from '../../context/NavContext'
import Map from '../../components/Map/Map' // import the map here
import SearchBar from '../../components/SearchBar/SearchBar'

import GoogleMapReact from 'google-map-react'
import { Autocomplete } from '@react-google-maps/api'

import { useTheme } from '@emotion/react'

import TransgenderIcon from '@mui/icons-material/Transgender';
import AccessibleIcon from '@mui/icons-material/Accessible';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

import './mappage.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SearchSwitch from '../../components/SearchSwitch/SearchSwitch';
import { TextField } from '@mui/material';
import SearchCard from '../../components/SearchCard/SearchCard'
import BathroomCard from '../../components/BathroomCard/BathroomCard'
import BathroomList from '../../components/BathroomList/BathroomList'

import { FavoritesContext } from '../../context/FavoritesContext'
import FavoritesCard from '../../components/FavoritesCard/FavoritesCard'
import { RecentSearchContext } from '../../context/RecentSearchContext'
import { UserContext } from '../../context/UserContext'
import { BathroomsContext } from '../../context/BathroomsContext'

import RecentSearches from '../../components/RecentSearches/RecentSearches'

export default function MapPage() {
  const [coordinates, setCoordinates] = useState({ lat: 40.71427, lng: -74.00597 })
  const { setCurrentPage } = useContext(NavContext)
  const [switchChecked, setSwitchChecked] = useState(false)

  const [autocomplete, setAutocomplete] = useState(null);
  const [locationSearchVal, setLocationSearchVal] = useState("");
  //const [placeID, setPlaceID] = useState(""); we could have this if we wanted to search via place_id instead of the title but the title works just fine 
  // const [currentLoc, setCurrentLoc] = useState("");

  const [originName, setOriginName] = useState("New York City");
  const [originAddress, setOriginAddress] = useState("New York, NY");
  // we will also have destination


  const [searchLocPhoto, setSearchLocPhoto] = useState('')
  const [searchLocBase64, setSearchLocBase64] = useState('')
  const [centerCoords, setCenterCoords] = useState({ lat: 40.71427, lng: -74.00597 })
  const [bounds, setBounds] = useState('') // these will automatically be set for us pretty immediately? 

  //const [bathrooms, setBathrooms] = useState([])
  const {bathrooms, setBathrooms} = useContext(BathroomsContext)

  const [childClicked, setChildClicked] = useState(null)

  const { getFavorites } = useContext(FavoritesContext)
  const { recentSearches, setRecentSearches, addRecentSearchLoc } = useContext(RecentSearchContext)

  // for the filtering buttons - just going to do this on frontend 
  const [genderNeutralFilter, setGenderNeutralFilter] = useState(false)
  const [accessibleFilter, setAccessibleFilter] = useState(false)
  const [changingTableFilter, setChangingTableFilter] = useState(false)


  const { user, getUser } = useContext(UserContext)

  const handleSearchChange = (e) => {
    setLocationSearchVal(e.target.value)

    // addToFavorites({"msg":"3", "id":3})
    // console.log({favorites})
    //console.log(user)
    //console.log(recentSearches)
  }


  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {

    // console.log(autocomplete.gm_bindings_.bounds."502".Rj.formattedPrediction);
    // console.log(autocomplete)
    //console.log(autocomplete['gm_accessors_']['place']['Is']['Rj']['gm_accessors_']['place']['Rj']['formattedPrediction'])
    //setLocationSearchVal(autocomplete['gm_accessors_']['place']['Is']['Rj']['gm_accessors_']['place']['Rj']['formattedPrediction']) 
    setLocationSearchVal(autocomplete['gm_accessors_']['place']['Rj']['formattedPrediction'])
    // console.log(autocomplete['gm_accessors_']['place']['Rj']['place']['place_id'])

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // if just one location
    if (!switchChecked) {
      // on google maps documentation
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      // let's set the coordinates
      setCoordinates({ lat, lng });
      setCenterCoords({ lat, lng });
      getGooglePlacesInfo(locationSearchVal);
      // setCurrentLoc(locationSearchVal); // the text for the photo
      setLocationSearchVal(""); // reset the search
      //searchBathroomsAroundLoc(lat, lng); // deleting this because it will already be called since the bounds will change 
    }

  }

  const searchBathroomsAroundLoc = async (lat, lng, north, east, south, west) => {
    // console.log({lat, lng})
    const url = `http://127.0.0.1:5000/api/search-around-loc/${lat.toString()}/${lng.toString()}/${north.toString()}/${east.toString()}/${south.toString()}/${west.toString()}`;
    const options = {
      // mode: 'no-cors',
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${user.apitoken}`
      }
    };
    const res = await fetch(url, options);
    const data = await res.json();
    if (data.status === 'ok') {
      // Show success msg
      // console.log(data)
      // console.log('success')
    }
    setBathrooms(data.results)
  }

  const getGooglePlacesInfo = async (locationSearchVal) => {
    const locationSearchFormatted = locationSearchVal.split(' ').join('%20')
    const url = `http://127.0.0.1:5000/api/google-places/${locationSearchFormatted}`;
    const options = {
      // mode: 'no-cors',
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${user.apitoken}`
      }
    };
    const res = await fetch(url, options);
    const data = await res.json();
    if (data.status === 'ok') {
      // Show success msg
      //console.log(data)
      //console.log('successfully got places data')
      //console.log(data['data']['candidates'][0]['name'])
      setOriginName(data['data']['candidates'][0]['name'])
      setOriginAddress(data['data']['candidates'][0]['formatted_address'])
      //console.log(data['data']['candidates'][0]['formatted_address'])

      // Make sure name is formatted properly on SearchCard -- NOTE THIS IS WHAT WE WILL USE TO PLUG INTO RECENT SEARCH TABLE 
      // setCurrentLoc(data['data']['candidates'][0]['name'] + "\n" + data['data']['candidates'][0]['formatted_address'])
      // setOriginName

      try {
        setSearchLocPhoto(data['data']['candidates'][0]['photos'][0]['photo_reference'])
        //   // add to recent searches 
        //   const photo_64 = await getSearchLocPhoto(data['data']['candidates'][0]['photos'][0]['photo_reference'])
        // setRecentSearches((prev)=>{
        //   return [
        //     ...prev,
        //     {
        //       "origin_name" : data['data']['candidates'][0]['name'],
        //       "origin_address" : data['data']['candidates'][0]['formatted_address'],
        //       "photo_base_64" : `data:image/jpeg;base64,${photo_64}`,
        //       "destination_name" : "", // someday this will not be null
        //       "destination_address" : "" // someday this will not be null
        //     }
        //   ]
        // })
        // addRecentSearchLoc(data['data']['candidates'][0]['name'], data['data']['candidates'][0]['formatted_address'], `data:image/jpeg;base64,${photo_64}`
        //                   ) // we will eventually add destination here too 

      } catch {
        setRecentSearches((prev) => {
          return [
            ...prev,
            {
              "origin_name": data['data']['candidates'][0]['name'],
              "origin_address": data['data']['candidates'][0]['formatted_address'],
              "photo_base_64": "",
              "destination_name": "", // someday this will not be null
              "destination_address": "" // someday this will not be null
            }
          ]
        })
        addRecentSearchLoc(data['data']['candidates'][0]['name'], data['data']['candidates'][0]['formatted_address'], ""
        ) // we will eventually add destination here too 


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
        "Content-Type": 'image/jpeg', // let's just assume jpeg ?
        Authorization: `Bearer ${user.apitoken}`
      }
    };
    const res = await fetch(url, options);
    const data = await res.json();
    if (data.status === 'ok') {
      // Show success msg
      // console.log(data)
      // console.log('successfully got photo')
      setSearchLocBase64(`data:image/jpeg;base64,${data['base_64_image']}`)
      // console.log(data['base_64_image'])
      return `data:image/jpeg;base64,${data['base_64_image']}`
    } else {
      return null
    }
  }

  const recentSearchesFunc = async () => {
    if (searchLocPhoto !== '') {
      // console.log('op! we have a photo to place')
      const photo_64 = await getSearchLocPhoto(searchLocPhoto);

      // add to recent searches 
      // const photo_64 = await getSearchLocPhoto(data['data']['candidates'][0]['photos'][0]['photo_reference'])
      // setRecentSearches((prev)=>{
      //   return [
      //     ...prev,
      //     {
      //       "origin_name" : originName,
      //       "origin_address" : originAddress,
      //       "photo_base_64" : photo_64,
      //       "destination_name" : "", // someday this will not be null
      //       "destination_address" : "" // someday this will not be null
      //     }
      //   ]
      // })
      addRecentSearchLoc(originName, originAddress, photo_64,
      ) // we will eventually add destination here too 
    } else {
      // setRecentSearches((prev)=>{
      //   return [
      //     ...prev,
      //     {
      //       "origin_name" : originName,
      //       "origin_address" : originAddress,
      //       "photo_base_64" : "",
      //       "destination_name" : "", // someday this will not be null
      //       "destination_address" : "" // someday this will not be null
      //     }
      //   ]
      // })
      addRecentSearchLoc(originName, originAddress, ""
      ) // we will eventually add destination here too 

    }
  }

  useEffect(() => {
    // if (searchLocPhoto !== '') {
    //   // console.log('op! we have a photo to place')
    //   const photo_64 = await getSearchLocPhoto(searchLocPhoto);

    //   // add to recent searches 
    //   // const photo_64 = await getSearchLocPhoto(data['data']['candidates'][0]['photos'][0]['photo_reference'])
    //   setRecentSearches((prev)=>{
    //     return [
    //       ...prev,
    //       {
    //         "origin_name" : data['data']['candidates'][0]['name'],
    //         "origin_address" : data['data']['candidates'][0]['formatted_address'],
    //         "photo_base_64" : `data:image/jpeg;base64,${photo_64}`,
    //         "destination_name" : "", // someday this will not be null
    //         "destination_address" : "" // someday this will not be null
    //       }
    //     ]
    //   })
    //   addRecentSearchLoc(data['data']['candidates'][0]['name'], data['data']['candidates'][0]['formatted_address'], `data:image/jpeg;base64,${photo_64}`
    //                     ) // we will eventually add destination here too 
    // } else {
    //   setRecentSearches((prev)=>{
    //     return [
    //       ...prev,
    //       {
    //         "origin_name" : data['data']['candidates'][0]['name'],
    //         "origin_address" : data['data']['candidates'][0]['formatted_address'],
    //         "photo_base_64" : "",
    //         "destination_name" : "", // someday this will not be null
    //         "destination_address" : "" // someday this will not be null
    //       }
    //     ]
    //   })
    //   addRecentSearchLoc(data['data']['candidates'][0]['name'], data['data']['candidates'][0]['formatted_address'], ""
    //                     ) // we will eventually add destination here too 

    // }
    recentSearchesFunc();
  }, [searchLocPhoto])

  useEffect(() => {
    setCurrentPage('map');
    getFavorites();
    // getUser();
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      // console.log({latitude, longitude})
      setCoordinates({ lat: latitude, lng: longitude })
      setCenterCoords({ lat: latitude, lng: longitude })
      setOriginName("My Location")
      setOriginAddress("My Location")

    })


    // setFavorites([{"msg":1},{"msg":2},{"msg":3}])
    // searchBathroomsAroundLoc(coordinates.lat, coordinates.lng);
    // console.log("bounds: " + bounds)
    // let's try getting the place info based on those coords 
    //const geocoder = new google.maps.Geocoder();

  }, [])

  useEffect(() => {
    if (bounds != "") {
      //searchBathroomsAroundLoc(coordinates.lat, coordinates.lng);
      searchBathroomsAroundLoc(centerCoords.lat, centerCoords.lng, bounds.ne.lat, bounds.ne.lng, bounds.sw.lat, bounds.sw.lng); // around center so that the search changes depending on what's on the screen 
      // console.log("bounds: north: " + bounds['ne']['lat'] + " east: " + bounds.ne.lng + " south: " + bounds['sw']['lat'] + " west: " + bounds.sw.lng)
    }
  }, [bounds])

  // if we would rather reverse geocode things 
  // const geocodeLatLng = async () => {
  //   const {Geocoder}  = await google.maps.importLibrary("geocoding")
  //   const response = await Geocoder.geocode({location: coordinates})
  //   console.log('geocoding')
  //   console.log(response.results[0])
  //   console.log(response.results[0].formatted_address)
  // }

  useEffect(()=>{
    console.log({genderNeutralFilter})
  },[genderNeutralFilter])

  const handleCheck = (e) => {
    console.log(e.target.name)
    if (e.target.name === 'genderNeutral') {
      setGenderNeutralFilter(prev=>(!prev))
    } else if (e.target.name === 'accessible') {
      setAccessibleFilter(prev=>(!prev))
    } else if (e.target.name === 'changingTable') {
      setChangingTableFilter(prev=>(!prev))
    }
   }

  // const location = {
  //     //address: '1600 Amphitheatre Parkway, Mountain View, california.',
  //     //lat: 37.42216,
  //     //lng: -122.08427,
  //     lat: 40.703827492564244, lng: -74.03279209014894
  // }
  const theme = useTheme()
  return (
    <Box className='page-container map-page' sx={{ backgroundColor: 'background.default', flexGrow: 1 }}>
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
      <Grid container spacing={2} sx={{ flexGrow: 1, marginTop: '0px', marginLeft: '0px', width: '100%' }}>
        <Grid item container spacing={2} xs={12} sm={8} >
          <Grid item container direction="row" xs={12} spacing={1} alignItems="center" justifyContent="center">
            <Grid item xs={2} sx={{marginTop: "0px !important"}}>
              <SearchSwitch switchChecked={switchChecked} setSwitchChecked={setSwitchChecked} />
            </Grid>
            
              <form onSubmit={handleSubmit}>
              <Grid item container direction="row" xs={12}>
                {switchChecked ?
                <></>
                  // <>
                  //   <Grid item xs={10}>
                  //     {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
                  //     <SearchBar placeholder="Choose starting point..." width={'180px'} />
                  //     {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                  //     {/* </Autocomplete> */}
                  //   </Grid>
                  //   <Grid item xs={2}>
                  //     <SearchBar placeholder="Choose destination..." width={'180px'} />
                  //   </Grid>
                  // </>
                  :
                  <Grid item xs={10}>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                      <SearchBar placeholder="Search for any location" width={'180px'} value={locationSearchVal} onChange={handleSearchChange} />
                      {/* <SearchBar placeholder="Search for any location" width={'180px'} value={locationSearchVal} onChange={handleSearchChange}/> */}
                    </Autocomplete>
                  </Grid>
                }
                <Grid item xs={2}>
                  <Button type="submit" sx={{ width: "50px", borderRadius: "8px", minWidth: "24px", padding: "5px", backgroundColor: 'success.main' }}>Go</Button>
                </Grid>
                </Grid>
              </form>
            
          </Grid>
          <Grid item container justifyContent="center" xs={12} >
            {/* <Grid item>
            <Typography>hi</Typography>
            </Grid> */}
            <Grid item xs={12} sx={{ height: '66vh', position: "relative", paddingLeft: "0px"}}>
              {/* <Map childClicked={childClicked} setChildClicked={setChildClicked} bathrooms={bathrooms} location={coordinates} zoomLevel={15} bounds={bounds} setBounds={setBounds} setCenterCoords={setCenterCoords} centerCoords={centerCoords} /> */}
              <Map childClicked={childClicked} setChildClicked={setChildClicked} location={coordinates} zoomLevel={15} bounds={bounds} setBounds={setBounds} setCenterCoords={setCenterCoords} centerCoords={centerCoords} />
              {searchLocBase64 !== "" ?
                <SearchCard image_src={searchLocBase64} originName={originName} originAddress={originAddress} />
                // <img src={`data:image/jpeg;base64,${searchLocBase64}`} style={{opacity: '.7'}} />
                : <></>}
              {/* { searchLocBase64 !== "" ? 
              <Map bathrooms={bathrooms} searchCard={<SearchCard image_src={`data:image/jpeg;base64,${searchLocBase64}`} loc_name={currentLoc}/>} bounds={bounds} location={coordinates} zoomLevel={15} setBounds ={setBounds} setCenterCoords={setCenterCoords} centerCoords={centerCoords}/>
              :
              <Map bathrooms={bathrooms} location={coordinates} zoomLevel={15} bounds={bounds} setBounds ={setBounds} setCenterCoords={setCenterCoords} centerCoords={centerCoords}/>
              } */}

            </Grid>

            <Typography sx={{ fontSize: "20px", color: 'text.primary' }}>Recent Searches</Typography>
              
            <RecentSearches />
          
          
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={4} direction="column">
          <Grid item sx={{paddingTop: "0px !important"}}>
            <Typography align="center" sx={{ fontSize: "20px", color: 'text.primary' }}>Nearby Bathrooms</Typography>
          </Grid>
          <Grid item container justifyContent="center" direction="row">
            <Grid item className="toggle">
              <input name="genderNeutral" type="checkbox"  onChange={handleCheck}/>
              <span className="button"></span>
              <TransgenderIcon className="label" />
            </Grid>
            <Grid item className="toggle">
              <input name="accessible" type="checkbox" onChange={handleCheck}/>
              <span className="button"></span>
              <AccessibleIcon className="label" />
            </Grid>
            <Grid item className="toggle">
              <input name="changingTable" type="checkbox" onChange={handleCheck}/>
              <span className="button"></span>
              <BabyChangingStationIcon className="label" />
            </Grid>
          </Grid>
          {/* <BathroomList genderNeutralFilter={genderNeutralFilter} accessibleFilter={accessibleFilter} changingTableFilter={changingTableFilter}  originName={originName} originAddress={originAddress} childClicked={childClicked} bathrooms={bathrooms} /> */}
          <BathroomList genderNeutralFilter={genderNeutralFilter} accessibleFilter={accessibleFilter} changingTableFilter={changingTableFilter}  originName={originName} originAddress={originAddress} childClicked={childClicked} />
          {/* <Grid item sx={{height: '66vh', overflow:'scroll'}}>
              {bathrooms?.map((bathroom, i)=>(
            
                <BathroomCard cardWidth='186' id={bathroom.id} key={i} index={i} 
                name={bathroom.name} street={bathroom.street} 
                city={bathroom.city}
                state={bathroom.state} country={bathroom.country} 
                directions={bathroom.directions} comment={bathroom.comment} 
                rating={(bathroom.upvote /(bathroom.upvote + bathroom.downvote)) * 5} 
                accessible={bathroom.accessible} 
                changingTable={bathroom.changing_table} unisex={bathroom.unisex}
                />
                
              ))}
            </Grid>  */}
        </Grid>
      </Grid>
      {/* <Typography align="center" sx={{ color: 'text.primary' }}>This will be the Recent History/Favorites</Typography> */}

      {/* <RecentSearches /> */}

      {/* { searchLocBase64 !== "" ? 
        <SearchCard image_src={`data:image/jpeg;base64,${searchLocBase64}`} loc_name={currentLoc}/>
        // <img src={`data:image/jpeg;base64,${searchLocBase64}`} style={{opacity: '.7'}} />
        : <></>} */}
      {/* <BathroomCard cardWidth='186' id='7447' /> */}
      {/* <Box align="center">
          {favorites?.map((bathroom, i)=>(
            // <Typography key={i} sx={{color:'text.primary', marginLeft:40}} onClick={()=>{removeFromFavorites(bathroom)}}>{bathroom.name}</Typography>
            <FavoritesCard key={i} bathroom={bathroom}/>
          ))}
        </Box> */}
    </Box>
  )
}
