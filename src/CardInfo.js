import React, {Fragment} from "react";
import QRCode from 'react-qr-code';

export default class Card extends React.Component{
    handleFav = () => {
        if(this.props.chosenEvent.Name !== undefined){
            fetch(`http://localhost:3000/api/v1/user_favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                name: this.props.chosenEvent.Name,
                image: this.props.chosenEvent.Image[2].src,
                venue_name: this.props.chosenEvent.Venue.Name, 
                venue_address: this.props.chosenEvent.Venue.Address, 
                venue_phone: this.props.chosenEvent.Venue.Phone, 
                venue_access: this.props.chosenEvent.Venue.Access, 
                venue_opening: this.props.chosenEvent.Venue.OpeningHour, 
                venue_closing: this.props.chosenEvent.Venue.ClosingHour, 
                venue_schedule_details: this.props.chosenEvent.Venue.ScheduleDetails, 
                media: this.props.chosenEvent.Media, 
                description: this.props.chosenEvent.Description, 
                price: this.props.chosenEvent.Price, 
                date_start: this.props.chosenEvent.DateStart, 
                date_end: this.props.chosenEvent.DateEnd, 
                days_before_end: this.props.chosenEvent.DaysBeforeEnd, 
                permanent_event: this.props.chosenEvent.PermanentEvent, 
                latitude: this.props.chosenEvent.Latitude, 
                longitude: this.props.chosenEvent.Longitude
            })
            })
            .then(res => res.json())
            .then(fav_event => this.props.addEvent(fav_event))
        }else{
            fetch(`http://localhost:3000/api/v1/user_favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                name: this.props.chosenEvent.name,
                image: this.props.chosenEvent.image,
                venue_name: this.props.chosenEvent.venue_name, 
                venue_address: this.props.chosenEvent.venue_address, 
                venue_phone: this.props.chosenEvent.venue_phone, 
                venue_access: this.props.chosenEvent.venue_access, 
                venue_opening: this.props.chosenEvent.venue_opening, 
                venue_closing: this.props.chosenEvent.venue_closing, 
                venue_schedule_details: this.props.chosenEvent.venue_schedule_details, 
                media: this.props.chosenEvent.media, 
                description: this.props.chosenEvent.description, 
                price: this.props.chosenEvent.price, 
                date_start: this.props.chosenEvent.date_start, 
                date_end: this.props.chosenEvent.date_end, 
                days_before_end: this.props.chosenEvent.days_before_end, 
                permanent_event: this.props.chosenEvent.permanent_event, 
                latitude: this.props.chosenEvent.latitude, 
                longitude: this.props.chosenEvent.longitude
            })
            })
            .then(res => res.json())
            .then(fav_event => this.props.addEvent(fav_event))
        }
    }

    handleUnfav = () => {
        if(this.props.chosenEvent.Name !== undefined){
            fetch(`http://localhost:3000/api/v1/delete_favorite`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: this.props.chosenEvent.Name
            })
            })
            .then(this.props.removeEvent(this.props.chosenEvent.Name))
        }else{
            fetch(`http://localhost:3000/api/v1/delete_favorite`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: this.props.chosenEvent.name
                })
                })
                .then(this.props.removeEvent(this.props.chosenEvent.name))
        }
    }

    render(){
        if(this.props.chosenEvent.Name !== undefined){
            console.log(this.props.chosenEvent)
            return (
                <div className="card-main">  
                    <div className="not_so_main_div">
                        <div className="event_pic">
                            <img src={this.props.chosenEvent.Image[0].src.split("-")[0]} alt="card_pic" />
                        </div>
                        <h1>{this.props.chosenEvent.Name}</h1>
                        <h4>{this.props.chosenEvent.Media}</h4>
                        {this.props.chosenEvent.PermanentEvent === 1 ? <h3>Permanent event</h3> : null}
                        <h3>This event ends in {this.props.chosenEvent.DaysBeforeEnd} days</h3>
                        <p>{this.props.chosenEvent.Description}</p><br/>
                        <div className="venue_info">
                            <h3>Venue and directions info:</h3>
                            <div className="event_qr">
                                <QRCode value={`https://www.google.com/maps/dir/?api=1&origin=${this.props.myLat},${this.props.myLong}&destination=${this.props.chosenEvent.Latitude},${this.props.chosenEvent.Longitude}`} />
                            </div>
                            <h3>{this.props.chosenEvent.Venue.Name}</h3>
                            <h3>{this.props.chosenEvent.Venue.Address}</h3>
                            <h3>{this.props.chosenEvent.Venue.Phone}</h3>
                            <h3>{this.props.chosenEvent.Venue.Access}</h3>
                            <h3>{this.props.chosenEvent.DateStart} - {this.props.chosenEvent.DateEnd}</h3>
                            <h3>{this.props.chosenEvent.Venue.OpeningHour} - {this.props.chosenEvent.Venue.ClosingHour}</h3>
                            <h3>{this.props.chosenEvent.Venue.ScheduleDetails}</h3>
                        </div>
                    </div>
                        {this.props.currentUser !== null ?
                            <div className="like_dislike">
                            {this.props.myEvents.filter(event => event.name === this.props.chosenEvent.Name).length === 0 ?
                                <img className="like_dislike_btn" onClick={this.handleFav} src="https://www.freeiconspng.com/uploads/heart-png-8.png" width="50" alt="Like" />
                                :
                                <img className="like_dislike_btn" onClick={this.handleUnfav} src="https://www.freeiconspng.com/uploads/delete-error-exit-remove-stop-x-cross-icon--28.png" width="50" alt="Dislike" />
                            }
                            </div>
                            :
                            null
                        }
                </div>
            )
        }else{
            console.log(this.props.chosenEvent)
            return (
                <div className="card-main">  
                    <div className="not_so_main_div">
                        <div className="event_pic">
                            <img src={this.props.chosenEvent.image} alt="card_pic" />
                        </div>
                        <h1>{this.props.chosenEvent.name}</h1>
                        <h4>{this.props.chosenEvent.media}</h4>
                        {this.props.chosenEvent.permanent_event === 1 ? <h3>Permanent event</h3> : null}
                        <h3>This event ends in  {this.props.chosenEvent.days_before_end} days</h3>
                        <p>{this.props.chosenEvent.description}</p><br/>
                        <div className="venue_info">
                            <h3>Venue and directions info:</h3>
                            <div className="event_qr">
                                <QRCode value={`https://www.google.com/maps/dir/?api=1&origin=${this.props.myLat},${this.props.myLong}&destination=${this.props.chosenEvent.Latitude},${this.props.chosenEvent.Longitude}`} />
                            </div>
                            <h3>{this.props.chosenEvent.venue_name}</h3>
                            <h3>{this.props.chosenEvent.venue_address}</h3>
                            <h3>{this.props.chosenEvent.venue_phone}</h3>
                            <h3>{this.props.chosenEvent.venue_access}</h3>
                            <h3>{this.props.chosenEvent.date_start} - {this.props.chosenEvent.date_end}</h3>
                            <h3>{this.props.chosenEvent.venue_opening} - {this.props.chosenEvent.venue_closing}</h3>
                            <h3>{this.props.chosenEvent.venue_schedule_details}</h3>
                        </div>
                    </div>
                        {this.props.currentUser !== null ?
                            <div className="like_dislike">
                            {this.props.myEvents.filter(event => event.name === this.props.chosenEvent.name).length === 0 ?
                                <img className="like_dislike_btn" onClick={this.handleFav} src="https://www.freeiconspng.com/uploads/heart-png-8.png" width="50" alt="Like" />
                                :
                                <img className="like_dislike_btn" onClick={this.handleUnfav} src="https://www.freeiconspng.com/uploads/delete-error-exit-remove-stop-x-cross-icon--28.png" width="50" alt="Dislike" />
                            }
                            </div>
                            :
                            null
                        }
                </div>
            )
        }
    }
}