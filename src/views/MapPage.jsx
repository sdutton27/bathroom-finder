import React from 'react'
import MapSection from '../components/map/Map' // import the map here

export default function MapPage() {

    const location = {
        //address: '1600 Amphitheatre Parkway, Mountain View, california.',
        //lat: 37.42216,
        //lng: -122.08427,
        lat: 19.07596, 
        lng: 72.87764,
    }

  return (
    <div>
        MapPage
        <MapSection location={location} zoomLevel={8} /> {/* include it here */}
    </div>
  )
}
