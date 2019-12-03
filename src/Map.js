import React from 'react'
import ReactMapGL,{GeolocateControl, Marker} from 'react-map-gl'
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN='pk.eyJ1Ijoidi1wYXNoYWxpdWsiLCJhIjoiY2szaGZtMzF1MGM0aDNjbXN3emd2bm9qaiJ9.FDxxP93p6jNROtLNi3TgcQ'

const geolocateStyle = {
  float: 'left',
  padding: '10px'
};

class Map extends React.Component{
  state = {
    viewport:{
      width: 1380,
      height: 400,
      latitude: 40.75,
      longitude: -74.0060, //NYC Coordinates 
      zoom: 10
    },
    areas: []
  }

  componentDidMount(){
    fetch('http://localhost:4000/areas')
    .then(resp => resp.json())
    .then(fetchedAreas => this.setState({areas: fetchedAreas}))
  }

  getMarkerInfo = e => {
    e.persist()
    this.props.passCoords(e.target.id, e.target.dataset.lat, e.target.dataset.long)
  }
  
  render(){
    return (
      <div style={{ margin: "auto", maxWidth: "1380px", maxHeight: "400px", overflow: "hidden", borderRadius: "25px"}}>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={viewport => this.setState({viewport})}
          maxZoom={13}
        >
          {this.state.areas.map(area => <Marker key={area.id} latitude={area.geometry.coordinates[1]} longitude={area.geometry.coordinates[0]}>
            <p style={{fontSize: "8px"}} data-lat={area.geometry.coordinates[1]} data-long={area.geometry.coordinates[0]} onClick={this.getMarkerInfo} id={area.area}>🖼</p>
          </Marker>)}
        
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

