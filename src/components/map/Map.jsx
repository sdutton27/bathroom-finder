import React, { useEffect, useContext, useState } from 'react'
import GoogleMapReact from 'google-map-react'

import './map.css'

import { ThemeContext } from '../../context/ThemeContext'

import mapStylesDark from './mapStylesDark'
import mapStylesLight from './mapStylesLight'

import BathroomPin from '../BathroomPin/BathroomPin'

import { Typography } from '@mui/material'

// for LocationPin
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { BathroomsContext } from '../../context/BathroomsContext'

const Map = ({childClicked, setChildClicked, location, zoomLevel, bounds, setBounds, setCenterCoords, centerCoords}) => {
  const {currentTheme} = useContext(ThemeContext)
  // console.log({location})
  // console.log(zoomLevel)
  // const [photoLat, setPhotoLat] = useState(0.0)
  // const [photoLng, setPhotoLng] = useState(0.0)
  const {bathrooms, setBathrooms, filteredBathrooms} = useContext(BathroomsContext)

  // const getPhotoLat = () => {
  //   if (bounds != '') {
  //     const north = bounds.ne.lat 
  //   const south = bounds.sw.lat
  //   const diff = north - south
  //   setPhotoLat(south + (diff / 4.5))
  //   console.log(photoLat)
  //   }
  //   // const north = bounds.ne.lat 
  //   // const south = bounds.sw.lat
  //   // const diff = north - south
  //   // setPhotoLat(south + (diff / 5))
  //   // console.log(photoLat)
  // }

  // async function initMap() {
  //   const { Map } = await google.maps.importLibrary("maps");
  // }
  // const getPhotoLng = () => {
  //   // const east = bounds.ne.lng 
  //   // const west = bounds.sw.lng
  //   // const diff = east - west
  //   // setPhotoLng(west + diff / 5)
  //   if (bounds != '') {
  //     // setPhotoLng(bounds.sw.lng)
  //     const east = bounds.ne.lng 
  //   const west = bounds.sw.lng
  //   const diff = east - west
  //   setPhotoLng(west + (diff /50))
  //   }
  //   // setPhotoLng(bounds.sw.lng)
  // }

  // useEffect(()=>{
  //   getPhotoLat()
  //   getPhotoLng()
  // },[bounds])

  // useEffect(()=>{
  //   const infoWindow = new google.maps.InfoWindow({
  //     content: "",
  //     disableAutoPan: true,
  //   });
  //   // Create an array of alphabetical characters used to label the markers.
  //   const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   // Add some markers to the map.
  //     const markers = bathrooms.map((position, i) => {
  //     const label = labels[i % labels.length];
  //     const marker = new google.maps.Marker({
  //       position,
  //       label,
  //     });
  
  //     // markers can only be keyboard focusable when they have click listeners
  //     // open info window when marker is clicked
  //     marker.addListener("click", () => {
  //       infoWindow.setContent(label);
  //       infoWindow.open(map, marker);
  //     });
  //     return marker;
  //   });
  
  //   // Add a marker clusterer to manage the markers.
  //   new MarkerClusterer({ markers, map });
  // },[])

  return (
    <div className="map">
      {/* <h2 className="map-h2">Come visit us at our campus</h2> */}

      <div className="google-map" style={{position: "absolute", zIndex:0, top:0, left:0}}>
                                              {/* API KEY - move this */}
        <GoogleMapReact bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} 
                        defaultCenter={location} 
                        center={centerCoords}
                        defaultZoom={zoomLevel}
                        options={{disableDefaultUI: true, zoomControl:true, styles: (currentTheme === "primaryTheme" ? mapStylesLight: mapStylesDark)}}
                        onChildClick={(child)=>{setChildClicked(child)}}
                      
                        onChange={(e)=>{
                          //console.log(e)
                          setCenterCoords({ lat: e.center.lat, lng: e.center.lng })
                          setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                          // getPhotoLat()
                          // getPhotoLng()
                      }}
        >
          {/* <Typography sx={{zIndex:100}}>hi</Typography> */}
          {/* {bathrooms?.map((bathroom, i)=><BathroomPin key={i} lat={bathroom.latitude} lng={bathroom.longitude} index={i}/>)} */}
          {filteredBathrooms !== [] ? 
            filteredBathrooms?.map((bathroom, i)=>(
              <BathroomPin key={i} selected={Number(childClicked) === i} lat={bathroom.latitude} lng={bathroom.longitude} index={i}/>
              // <BathroomPin key={i} position={{lat:bathroom.latitude, lng:bathroom.longitude}} index={i}/>
            ))
          :
          bathrooms?.map((bathroom, i)=>(
            <BathroomPin key={i} selected={Number(childClicked) === i} lat={bathroom.latitude} lng={bathroom.longitude} index={i}/>
            // <BathroomPin key={i} position={{lat:bathroom.latitude, lng:bathroom.longitude}} index={i}/>
          ))}
          {/* {<div lat={photoLat} lng={photoLng}>{searchCard}</div>} */}
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