import React, {Fragment} from "react";
import { Redirect } from "react-router-dom"
import Card from './Card'

export default class CardsContainer extends React.Component{
    state = {
        clicked: false
    }

    cardClicked = () => {
        this.setState({
            clicked: true
        })
    }

    render(){
        return (
            <Fragment>
            {!this.state.clicked ?
                    <div className="cards">
                        {this.props.showEvents.map(event => <Card key={event.Name} event={event} chooseEvent={this.props.chooseEvent} cardClicked={this.cardClicked} />)}
                    </div>
                    :
                    <Fragment>
                        <Redirect to="/event"/>
                    </Fragment>
            }
            </Fragment>
            );
    }
}