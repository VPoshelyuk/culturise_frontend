import React,{ useState, useEffect } from 'react'
import ReactMapGL,{GeolocateControl, Marker} from 'react-map-gl'
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN='pk.eyJ1Ijoidi1wYXNoYWxpdWsiLCJhIjoiY2szaGZtMzF1MGM0aDNjbXN3emd2bm9qaiJ9.FDxxP93p6jNROtLNi3TgcQ'

const geolocateStyle = {
  float: 'left',
  // marginTop: '150px',
  // marginLeft: '20px',
  padding: '10px'
};

// const markerList=[
//   {lat: 17.441013,
//   long: 78.391796,
//   name: “ABC Hospitals”,
//   info: 10},
//   { lat:17.442889,
//   long: 78.396873,
//   name: “XYZ Hospitals”,
//   info: 20},
//   {lat: 17.441681,
//   long: 78.394357,
//   name: “NRI Hospitals”,
//   info: 10}
//   ];
class Map extends React.Component{
  state = {
    viewport:{
      width: 1380,
      height: 700,
      latitude: 40.75,
      longitude: -74.0060, //NYC Coordinates 
      zoom: 10
    }
  }
  // const [viewport, setViewPort ] = useState({
  //   width: 1380,
  //   height: 700,
  //   latitude: 40.75,
  //   longitude: -74.0060, //NYC Coordinates 
  //   zoom: 10
  // })

  getMarkerInfo = e => {
    e.persist()
    console.log(e.target.parentNode)
  }
  
  render(){
    return (
      <div style={{ margin: "auto", width: "1380px", height: "400px", overflow: "hidden", borderRadius: "25px"}}>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={viewport => this.setState({viewport})}
          maxZoom={13}
        >
          <Marker latitude={40.75} longitude={-74} >
            <p onClick={this.getMarkerInfo} id="FiDi">l</p>
          </Marker>
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{enableHighAccuracy: true}}
          />
        </ReactMapGL>
      </div>
  
    )
  }
}

export default Map

