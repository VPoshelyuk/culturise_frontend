import React from "react";
import Card from './Card'

export default class CardsContainer extends React.Component{
    state = {
        nearestEvents: [],
        allEvents: [],
        loaded: false
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
                .then(data => this.setState({allEvents: data.Events.Event, nearestEvents: data.Events.Event.slice(0, 5), loaded: true}))
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
                    .then(data => this.setState({allEvents: data.Events.Event, nearestEvents: data.Events.Event !== undefined ? data.Events.Event.slice(0, 5) : [], loaded: true}))
                }
                    
                const error = err => {
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                }
                
                navigator.geolocation.getCurrentPosition(success, error, options);
                break;
            case 2:
                fetch(`http://localhost:3000/api/v1/free`)
                .then(resp => resp.json())
                .then(data => this.setState({allEvents: data.Events.Event, nearestEvents: data.Events.Event !== undefined ? data.Events.Event.slice(0, 5) : [], loaded: true}))
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
                .then(data => this.setState({nearestEvents: data.Events.Event.slice(0, 5), loaded: true}))
                break;
            default:
                break;
        }
    } 

    componentWillUpdate(){
        if(this.props.id === 0){
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
            .then(data => this.setState({allEvents: data.Events.Event, nearestEvents: data.Events.Event.slice(0, 5), loaded: true}))
        }
    }

    render(){
        return (
            <div>   
                {this.state.loaded ?
                <div className="cards">
                    {this.state.nearestEvents !== undefined ? this.state.nearestEvents.map(event => <Card key={event.Name} event={event}/>) : null}
                    {
                        this.state.nearestEvents.length > 0 ?
                            <p>Show me more!</p>
                        :
                            <p style={{paddingLeft: "40px"}}>No events to show, sorry!</p>
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