import React from 'react';
import FactoryReactMapboxGl from 'react-mapbox-gl';
import mapboxgl,{ GeolocateControl } from "mapbox-gl";
import IntroVid from './IntroVid'
import Map from './Map'
import CardsContainer from './CardsContainer'

class MainBody extends React.Component {
    render(){
        return (
            <div>
                <IntroVid />
                <p>nearest map?</p>
                <Map />
                {/* <div ref={el => this.mapContainer = el} className="mapContainer" /> */}
                <p>nearest carousel</p>
                <CardsContainer />
                <p>top picks</p>
                <p>picks by neighbourhood</p>
            </div>
            
        );
    }
}

export default MainBody;