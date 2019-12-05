import React, {Fragment} from "react";
import { Redirect } from 'react-router-dom'
import Card from './Card'

export default class CardsContainer extends React.Component{
    state = {
        nearestEvents: [],
        loaded: false,
        clicked: false
    }
    
    componentDidMount(){
        switch (this.props.id) {
            case 0:
                fetch(`http://localhost:3000/api/v1/nearest`,{
                    method: "POST",
                    headers:{
                        "accepts": "application/json",
                        "content-type": "application/json"
                    },
                    body:JSON.stringify({
                        latitude: this.props.lat,
                        longitude: this.props.long
                    })
                })
                .then(resp => resp.json())
                .then(data => {
                    this.setState({
                        nearestEvents: data !== undefined  ? data.Events.Event.slice(0, 5) : [], loaded: true})
                    if(data.Events.Event !== undefined && data.Events.Event.length > 4)this.props.setAllChoosenEvents(data.Events.Event)
                })
                break;
            case 1:
                const options = {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
                const success = pos => {
                    const crd = pos.coords;
                    fetch(`http://localhost:3000/api/v1/nearest`,{
                        method: "POST",
                        headers:{
                            "accepts": "application/json",
                            "content-type": "application/json"
                        },
                        body:JSON.stringify({
                            latitude: crd.latitude,
                            longitude: crd.longitude
                        })
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        this.setState({
                            nearestEvents: data !== undefined  ? data.Events.Event.slice(0, 5) : [], loaded: true})
                        if(data !== undefined && data.Events.Event.length > 4)this.props.setAllNearesEvents(data.Events.Event)
                        this.props.setMyCoords(crd.latitude, crd.longitude)
                    })
                }
                const error = err => {
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                }
                
                navigator.geolocation.getCurrentPosition(success, error, options);
                break;
            case 2:
                fetch(`http://localhost:3000/api/v1/free`)
                .then(resp => resp.json())
                .then(data => {
                    this.setState({
                        nearestEvents: data !== undefined  ? data.Events.Event.slice(0, 5) : [], loaded: true})
                    if(data !== undefined && data.Events.Event.length > 4)this.props.setAllFreeEvents(data.Events.Event)
                })
                break;
            case 3:
                fetch(`http://localhost:3000/api/v1/nearest`,{
                    method: "POST",
                    headers:{
                        "accepts": "application/json",
                        "content-type": "application/json"
                    },
                    body:JSON.stringify({
                        latitude: this.props.lat,
                        longitude: this.props.long
                    })
                })
                .then(resp => resp.json())
                .then(data => {
                    this.setState({
                        nearestEvents: data !== undefined  ? data.Events.Event.slice(0, 5) : [], loaded: true})
                    if(data !== undefined && data.Events.Event.length > 4)this.props.setAllRandEvents(data.Events.Event)
                })
                break;
            default:
                break;
        }
    } 

    componentDidUpdate(prevProps){
        if(this.props.id === 0 && prevProps.lat !== this.props.lat && prevProps.long !== this.props.long){
            console.log("hi")
            fetch(`http://localhost:3000/api/v1/nearest`,{
                method: "POST",
                headers:{
                    "accepts": "application/json",
                    "content-type": "application/json"
                },
                body:JSON.stringify({
                    latitude: this.props.lat,
                    longitude: this.props.long
                })
            })
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    nearestEvents: data !== undefined  ? data.Events.Event.slice(0, 5) : [], loaded: true})
                if(data.Events.Event !== undefined && data.Events.Event.length > 4)this.props.setAllChoosenEvents(data.Events.Event)
            })
        }
    }

    render(){
        return (
            <div>   
                {this.state.loaded ?
                <div className="cards">
                    {!this.state.clicked ?
                        <Fragment>
                        {this.state.nearestEvents !== undefined ? this.state.nearestEvents.map(event => <Card key={event.Name} event={event} chooseEvent={this.props.chooseEvent} cardClicked={this.props.cardClicked} />) : null}
                        {
                            this.state.nearestEvents.length > 0 ?
                                this.state.nearestEvents.length > 4 ?
                                    <p onClick={()=>{this.props.setContainerId(this.props.id); this.setState({clicked: true})}} >Show me more!</p>
                                :
                                    null
                            :
                                <p style={{paddingLeft: "40px"}}>No events to show, sorry!</p>
                        }
                        </Fragment>
                        :
                        <Redirect to="/events" />
                    }
                </div>
                :
                <div>
                    <h1>Loading...</h1>
                </div>
                    
            
                }
            </div>
        );
    }
}