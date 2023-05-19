import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'

// for LocationPin
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

const Map = ({location, zoomLevel}) => {
  return (
    <div className="map">
      <h2 className="map-h2">Come visit us at our campus</h2>

      <div className="google-map">
                                              {/* API KEY - move this */}
        <GoogleMapReact bootstrapURLKeys={{key: 'AIzaSyDR9Y6zy7jtXkmZGb8gOkk6VbmHvHLHC9s'}} defaultCenter={location} defaultZoom={zoomLevel}>
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