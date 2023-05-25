import React, { useEffect, useContext, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'

import { ThemeContext } from '../../context/ThemeContext'

import mapStylesDark from './mapStylesDark'
import mapStylesLight from './mapStylesLight'

import BathroomPin from '../BathroomPin/BathroomPin'

// for LocationPin
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

const Map = ({bathrooms, location, zoomLevel, bounds, setBounds, setCenterCoords, centerCoords, searchCard}) => {
  const {currentTheme} = useContext(ThemeContext)
  // console.log({location})
  // console.log(zoomLevel)
  const [photoLat, setPhotoLat] = useState(0.0)
  const [photoLng, setPhotoLng] = useState(0.0)

  const getPhotoLat = () => {
    if (bounds != '') {
      const north = bounds.ne.lat 
    const south = bounds.sw.lat
    const diff = north - south
    setPhotoLat(south + (diff / 4.5))
    console.log(photoLat)
    }
    // const north = bounds.ne.lat 
    // const south = bounds.sw.lat
    // const diff = north - south
    // setPhotoLat(south + (diff / 5))
    // console.log(photoLat)
  }

  const getPhotoLng = () => {
    // const east = bounds.ne.lng 
    // const west = bounds.sw.lng
    // const diff = east - west
    // setPhotoLng(west + diff / 5)
    if (bounds != '') {
      // setPhotoLng(bounds.sw.lng)
      const east = bounds.ne.lng 
    const west = bounds.sw.lng
    const diff = east - west
    setPhotoLng(west + (diff /50))
    }
    // setPhotoLng(bounds.sw.lng)
  }

  useEffect(()=>{
    getPhotoLat()
    getPhotoLng()
  },[bounds])

  return (
    <div className="map">
      {/* <h2 className="map-h2">Come visit us at our campus</h2> */}

      <div className="google-map">
                                              {/* API KEY - move this */}
        <GoogleMapReact bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} 
                        defaultCenter={location} 
                        center={centerCoords}
                        defaultZoom={zoomLevel}
                        options={{disableDefaultUI: true, zoomControl:true, styles: (currentTheme === "primaryTheme" ? mapStylesLight: mapStylesDark)}}
                        sx={{position: 'absolute', zIndex:'modal'}}
                        onChange={(e)=>{
                          //console.log(e)
                          setCenterCoords({ lat: e.center.lat, lng: e.center.lng })
                          setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                          getPhotoLat()
                          getPhotoLng()
                      }}
        >
          {bathrooms?.map((bathroom, i)=>(
            <div 
            lat={bathroom.latitude}
            lng={bathroom.longitude}
            key={i}
            style={{position:"relative"}}
            >
              {/* <img src={require("./pin.png")} style={{height:"40px"}}/> */}
              <BathroomPin index={i}/>
            </div>
          ))}
          {<div lat={photoLat} lng={photoLng}>{searchCard}</div>}
          <LocationPin lat={location.lat} lng={location.lng} text={location.address}/>
        </GoogleMapReact>
      </div>

    </div>
  )
} 
export default Map;


const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" style={{width: "50px", height: "50px", position: "relative", top: "-50px", left: "-25px"}}/>
    {/* <p className="pin-text">{text}</p> */}
    
  </div>
)