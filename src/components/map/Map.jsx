import React, { useContext } from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'

import { ThemeContext } from '../../context/ThemeContext'

import mapStylesDark from './mapStylesDark'
import mapStylesLight from './mapStylesLight'

// for LocationPin
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

const Map = ({location, zoomLevel}) => {
  const {currentTheme} = useContext(ThemeContext)
  console.log({location})
  return (
    <div className="map">
      {/* <h2 className="map-h2">Come visit us at our campus</h2> */}

      <div className="google-map">
                                              {/* API KEY - move this */}
        <GoogleMapReact bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} 
                        defaultCenter={location} 
                        center={location}
                        defaultZoom={zoomLevel}
                        options={{disableDefaultUI: true, zoomControl:true, styles: (currentTheme === "primaryTheme" ? mapStylesLight: mapStylesDark)}}
        >

          {/* <LocationPin lat={location.lat} lng={location.lng} text={location.address}/> */}
        </GoogleMapReact>
      </div>

    </div>
  )
} 
export default Map;


const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)