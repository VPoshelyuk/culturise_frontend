import React from 'react';
import IntroVid from './IntroVid'
import Map from './Map'
import CardsContainer from './CardsContainer'

class MainBody extends React.Component {
    state = {
        showArea: "",
        showLat: 0,
        showLong: 0
    }

    passCoords = (area, lat, long) => {
        this.setState({
            showArea: area,
            showLat: lat,
            showLong: long
        })
    }

    render(){
        return (
            <div>
                <IntroVid />
                <h1 style={{marginLeft: "40px",textAlign: "left"}}>Events Map by Areas:</h1>
                <Map passCoords={this.passCoords}/>
                {/* <div ref={el => this.mapContainer = el} className="mapContainer" /> */}
                <h1>nearest carousel</h1>
                <CardsContainer  id={1}/>
                <h1>top picks</h1>
                <CardsContainer id={2}/>
                <h1>picks by neighbourhood</h1>
                <CardsContainer id={3}/>
            </div>
            
        );
    }
}

export default MainBody;