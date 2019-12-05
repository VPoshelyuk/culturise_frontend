import React, {Fragment} from "react";
import QRCode from 'react-qr-code';

export default class Card extends React.Component{
    handleFav = () => {
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
                venue_schedule_details: this.props.chosenEvent.Venue.Name, 
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
    }

    handleUnfav = () => {
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
    }

    render(){
        return (
            <div className="card-main">  
                <div className="not_so_main_div">
                    <div className="event_pic">
                        <img src={this.props.chosenEvent.Image[0].src.split("-")[0]} alt="card_pic" />
                    </div>
                    <h1>{this.props.chosenEvent.Name}</h1>
                    <h4>{this.props.chosenEvent.Media}</h4>
                    {this.props.chosenEvent.PermanentEvent === 1 ? <h3>Permanent event</h3> : null}
                    <h3>Day before end: {this.props.chosenEvent.DaysBeforeEnd}</h3>
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
                            <img onClick={this.handleFav} src="https://www.freeiconspng.com/uploads/heart-png-8.png" width="50" alt="Like" />
                            :
                            <img src="https://www.freeiconspng.com/uploads/delete-error-exit-remove-stop-x-cross-icon--28.png" width="50" alt="Dislike" />
                        }
                        </div>
                        :
                        null
                    }
            </div>
        );
    }
}