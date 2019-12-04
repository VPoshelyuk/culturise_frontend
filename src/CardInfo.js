import React from "react";

export default class Card extends React.Component{
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
                <h3>{this.props.chosenEvent.Venue.DaysClosed.fri}</h3>
                <h3>{this.props.chosenEvent.Venue.ScheduleDetails}</h3>
                <img onClick={()=>{console.log("you dick")}} src="https://www.freeiconspng.com/uploads/heart-png-8.png" width="50" alt="Like" />
            </div>
        );
    }
}