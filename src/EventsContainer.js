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
                    <Fragment>
                        <h1 className="main_text">More events:</h1>
                        <div className="cards">
                            {this.props.showEvents.map(event => <Card key={event.Name} event={event} chooseEvent={this.props.chooseEvent} cardClicked={this.cardClicked} />)}
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <Redirect to="/event"/>
                    </Fragment>
            }
            </Fragment>
            );
    }
}