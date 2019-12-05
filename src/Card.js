import React, {Fragment} from "react";

export default class Card extends React.Component{
    render(){
        return (
        <Fragment>
        {this.props.event.image === undefined ?
            <a onClick={() => {this.props.chooseEvent(this.props.event); this.props.cardClicked()}}>
            <figure style={{backgroundImage: `url(${this.props.event.Image[2].src})`}}>
                <figcaption>
                <h4> <span>{this.props.event.Name}</span></h4>
                </figcaption>
            </figure></a>
            :
            <a>
            <figure style={{backgroundImage: `url(${this.props.event.image})`}}>
                <figcaption>
                <h4> <span>{this.props.event.name}</span></h4>
                </figcaption>
            </figure></a>
        }
        </Fragment>
        )
    }
}


