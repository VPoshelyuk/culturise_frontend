import React from "react";

export default class Card extends React.Component{
    render(){
        return (
            <a href="#">
            <figure style={{backgroundImage: `url(${this.props.event.Image[2].src})`}}>
                <figcaption>
                <h4> <span>{this.props.event.Name}</span></h4>
                </figcaption>
            </figure></a>
            // <div className="cardContainer">
            //     <h1>{this.props.event.Name}</h1>
            //     <img src={this.props.event.Image[2].src} alt="event pic"/>
            //     <p>More info</p>
            // </div>
        );
    }
}