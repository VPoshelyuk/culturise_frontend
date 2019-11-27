import React,{ useState } from 'react'
import MapGL, {GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN='pk.eyJ1Ijoidi1wYXNoYWxpdWsiLCJhIjoiY2szaGZtMzF1MGM0aDNjbXN3emd2bm9qaiJ9.FDxxP93p6jNROtLNi3TgcQ'

const geolocateStyle = {
  float: 'left',
  margin: '10px',
  padding: '10px'
};

const Map = () => {

  const [viewport, setViewPort ] = useState({
    width: 1380,
    height: 700,
    latitude: 40.7008,
    longitude: -74.0060,
    zoom: 10
  })

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 10 })
  
  return (
    <div style={{ margin: "auto", width: "1380px", height: "400px", overflow: "hidden", borderRadius: "25px"}}>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  )
}

export default Map