import React, {Fragment} from 'react';
import { Redirect } from "react-router-dom"
import IntroVid from './IntroVid'
import Map from './Map'
import CardsContainer from './CardsContainer'

class MainBody extends React.Component {
    state = {
        showArea: "",
        showLat: 0,
        showLong: 0,
        mapClicked: false,
        randArea: {},
        loaded: false,
        clicked: false,
        chosenEvent: {}
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
    cardClicked = () => {
        this.setState({
            clicked: true
        })
    }

    render(){
        return (
            <div>   
                {
                    !this.state.clicked ?
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
                                        <CardsContainer  
                                            id={0} 
                                            lat={this.state.showLat} 
                                            long={this.state.showLong} 
                                            setAllChoosenEvents={this.props.setAllChoosenEvents}
                                            setContainerId={this.props.setContainerId}
                                            chooseEvent={this.props.chooseEvent}
                                            cardClicked={this.cardClicked}
                                            />
                                    </Fragment>
                                    :
                                    null
                                }
                                <h1 className="main_text">Nearest Events:</h1>
                                <CardsContainer  
                                    id={1} 
                                    setAllNearesEvents={this.props.setAllNearesEvents}
                                    setContainerId={this.props.setContainerId}
                                    chooseEvent={this.props.chooseEvent}
                                    cardClicked={this.cardClicked}
                                />
                                <h1 className="main_text">Recomended Free:</h1>
                                <CardsContainer
                                    id={2} 
                                    setAllFreeEvents={this.props.setAllFreeEvents}
                                    setContainerId={this.props.setContainerId}
                                    chooseEvent={this.props.chooseEvent}
                                    cardClicked={this.cardClicked}
                                    />
                                <h1 className="main_text">Picks by Neighbourhood({this.state.randArea.area}):</h1>
                                <CardsContainer 
                                    id={3} 
                                    lat={this.state.randArea.geometry.coordinates[1]} 
                                    long={this.state.randArea.geometry.coordinates[0]}
                                    setAllRandEvents={this.props.setAllRandEvents}
                                    setContainerId={this.props.setContainerId}
                                    chooseEvent={this.props.chooseEvent}
                                    cardClicked={this.cardClicked}
                                />
                            </Fragment>
                            :
                            <h1>Loading...</h1>
                        }
                    </Fragment>
                    :
                    <Fragment>
                        <Redirect to="/event"/>
                    </Fragment>
                }
            </div>
        );
    }
}

export default MainBody;