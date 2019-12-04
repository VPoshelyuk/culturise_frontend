import React from "react";

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
                description: this.props.chosenEvent.Media, 
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
            .then(fav_event => console.log(fav_event))
    }

    render(){
        return (
            <div className="card-main">   
                <img src={this.props.chosenEvent.Image[0].src.split("-")[0]} alt="card_pic" />
                <h1>{this.props.chosenEvent.Name}</h1>
                <h4>{this.props.chosenEvent.Media}</h4>
                <h3>Venue and directions info:</h3>
                <h3>{this.props.chosenEvent.Venue.Name}</h3>
                <h3>{this.props.chosenEvent.Venue.Address}</h3>
                <h3>{this.props.chosenEvent.Venue.Phone}</h3>
                <h3>{this.props.chosenEvent.Venue.Access}</h3>
                <h3>{this.props.chosenEvent.Venue.OpeningHour} - {this.props.chosenEvent.Venue.ClosingHour}</h3>
                <h3>{this.props.chosenEvent.Venue.ScheduleDetails}</h3>
                <img onClick={this.handleFav} src="https://www.freeiconspng.com/uploads/heart-png-8.png" width="50" alt="Like" />
            </div>
        );
    }
}