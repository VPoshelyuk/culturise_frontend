import React from "react";
import Card from './Card'

export default class CardsContainer extends React.Component{
    state = {
        events: [],
        loaded: false,
        current_lat: 40.75,
        current_long: -74.0060
    }

    componentDidMount(){
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        const success = pos => {
            const crd = pos.coords;
            fetch(`http://localhost:3000/api/v1/events`,{
                method: "POST",
                headers:{
                    accepts: "application/json",
                    "content-type": "application/json"
                },
                body:JSON.stringify({
                    latitude: crd.latitude,
                    longitude: crd.longitude
                })
            })
            .then(resp => resp.json())
            .then(data => this.setState({events: data.Events.Event, loaded: true}))
        }
            
        const error = err => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        navigator.geolocation.getCurrentPosition(success, error, options);
    } 

    render(){
        return (
            <div>
                {this.state.loaded ?
                <div>
                    {this.state.events !== undefined ? this.state.events.map(event => <Card event={event}/>) : null}
                    <p>More info</p>
                </div>
                :
                <div>
                    <h1>Loading</h1>
                </div>
                    
            
                }
            </div>
        );
    }
}