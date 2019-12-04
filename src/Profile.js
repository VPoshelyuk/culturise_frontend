import React, {Fragment} from "react";
import FavCard from './FavCard'

export default class CardsContainer extends React.Component{
    state = {
        fav_events: []
    }

    componentDidMount(){
        this.renderMyFavs()
    }

    renderMyFavs = () => {
        fetch("http://localhost:3000/api/v1/ufav_show", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id
            })
            })
            .then(res => res.json())
            .then(resp => this.setState({fav_events: resp}))
    }
    render(){
        console.log()
        return (
            <Fragment>
                {this.state.fav_events !== undefined ? 
                <div className="cards">
                    <h1>Events you added to Favorites:</h1>
                    {this.state.fav_events.map(event => <FavCard key={event.Name} event={event} />)}
                </div>
                :
                null
                }
            </Fragment>
        );
    }
}

// chooseEvent={this.props.chooseEvent} cardClicked={this.props.cardClicked}