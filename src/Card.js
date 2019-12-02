import React from "react";

export default class Card extends React.Component{
    render(){
        console.log(this.props.event)
        return (
            <div>
                <h1>{this.props.event.Name}</h1>
                <img src={this.props.event.Image[2].src} alt="event pic"/>
                <a>More info</a>
            </div>
        );
    }
}