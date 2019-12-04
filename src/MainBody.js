import React, {Fragment} from 'react';
import IntroVid from './IntroVid'
import Map from './Map'
import CardsContainer from './CardsContainer'
import CardInfo from './CardInfo'

class MainBody extends React.Component {
    state = {
        showArea: "",
        showLat: 0,
        showLong: 0,
        mapClicked: false,
        randArea: {},
        loaded: false,
        chosenArea: {}
    }

    selectRandArea = areaObj => {
        this.setState({
            randArea: areaObj,
            loaded: true
        })
    }

    passCoords = (area, lat, long) => {
        this.setState({
            showArea: area,
            showLat: lat,
            showLong: long,
            mapClicked: true
        })
    }

    render(){
        return (
            <div>   
                {
                    Object.keys(this.state.chosenArea).length === 0 ?
                    <Fragment>
                        <IntroVid />
                        <h1 className="main_text">Events Map by Areas:</h1>
                        <Map passCoords={this.passCoords} selectRandArea={this.selectRandArea}/>
                        {
                            this.state.loaded ?
                            <Fragment>
                                {
                                    this.state.mapClicked ?
                                    <Fragment>
                                        <h1 className="main_text">Events in {this.state.showArea}:</h1>
                                        <CardsContainer  id={0} lat={this.state.showLat} long={this.state.showLong}/>
                                    </Fragment>
                                    :
                                    null
                                }
                                <h1 className="main_text">Nearest Events:</h1>
                                <CardsContainer  id={1}/>
                                <h1 className="main_text">Recomended Free:</h1>
                                <CardsContainer id={2}/>
                                <h1 className="main_text">Picks by Neighbourhood({this.state.randArea.area}):</h1>
                                <CardsContainer id={3} lat={this.state.randArea.geometry.coordinates[1]} long={this.state.randArea.geometry.coordinates[0]}/>
                            </Fragment>
                            :
                            <h1>Loading...</h1>
                        }
                    </Fragment>
                    :
                    <CardInfo />
                }
            </div>
        );
    }
}

export default MainBody;