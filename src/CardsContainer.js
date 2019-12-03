import React from "react";
import Card from './Card'

export default class CardsContainer extends React.Component{
    state = {
        nearestEvents: [],
        upcomingEvents: [],
        randomBoroughEvents: [],
        loaded: false
    }

    componentDidMount(){
        switch (this.props.id) {
            case 1:
                const options = {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
                const success = pos => {
                    const crd = pos.coords;
                    fetch(`http://localhost:3000/api/v1/events`,{
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
                    .then(data => this.setState({nearestEvents: data.Events.Event.slice(0, 5), loaded: true}))
                }
                    
                const error = err => {
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                }
                
                navigator.geolocation.getCurrentPosition(success, error, options);
                break;
            case 2:
                fetch(`http://localhost:3000/api/v1/events`,{
                    method: "POST",
                    headers:{
                        "accepts": "application/json",
                        "content-type": "application/json"
                    },
                    body:JSON.stringify({
                        latitude: 40.694669,
                        longitude: -73.9784867
                    })
                })
                .then(resp => resp.json())
                .then(data => this.setState({nearestEvents: data.Events.Event.slice(0, 5), loaded: true}))
                break;
            case 3:
                fetch(`http://localhost:3000/api/v1/events`,{
                    method: "POST",
                    headers:{
                        "accepts": "application/json",
                        "content-type": "application/json"
                    },
                    body:JSON.stringify({
                        latitude: 40.721952,
                        longitude: -74.000144
                    })
                })
                .then(resp => resp.json())
                .then(data => this.setState({nearestEvents: data.Events.Event.slice(0, 5), loaded: true}))
                break;
            default:
                break;
        }
    } 

    render(){
        return (
            <div>
                {this.state.loaded ?
                <div>
                    {this.state.nearestEvents !== undefined ? this.state.nearestEvents.map(event => <Card key={event.Name} event={event}/>) : null}
                    <p>More info</p>
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