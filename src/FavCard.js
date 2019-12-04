import React from "react";

export default class Card extends React.Component{

    render(){
        return (
            <a>
            <figure style={{backgroundImage: `url(${this.props.event.image})`}}>
                <figcaption>
                <h4> <span>{this.props.event.name}</span></h4>
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

// onClick={() => {this.props.chooseEvent(this.props.event); this.props.cardClicked()}}
