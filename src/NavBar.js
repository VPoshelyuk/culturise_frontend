import React, {Fragment} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from './Home'
import LogIn from './LogIn'
import SignUp from './SignUp'
import LogOut from './LogOut'
import Profile from './Profile'
import CardInfo from './CardInfo'
import EventsContainer from './EventsContainer'

export default function NavBar (props) {
    return (
        <Router>
            <div>
                <header>
                    <div className="container">
                        <a href="/"><img className="logo" src="./images/nav_logo.png" alt="NavBar logo"/></a>
                        <nav>
                            <ul>
                                <li>
                                <Link to="/">Home</Link>
                                </li>
                                {props.currentUser === null ?
                                <Fragment>
                                    <li>
                                    <Link to="/login">Log In</Link>
                                    </li>
                                    <li>
                                    <Link to="/signup">Sign Up</Link>
                                    </li>
                                </Fragment>
                                :
                                <Fragment>
                                    <li>
                                    <Link to="/profile">{props.currentUser.username}</Link>
                                    </li>
                                    <li>
                                    <Link to="/logout">Log Out</Link>
                                    </li>
                                </Fragment>
                                }
                            </ul>
                        </nav>
                    </div>
                </header>
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/logout">
                        <LogOut logout={props.logout}/>
                    </Route>
                    <Route exact path="/login">
                        <LogIn setUser={props.setUser} currentUser={props.currentUser} />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp setUser={props.setUser} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile currentUser={props.currentUser} />
                    </Route>
                    <Route exact path="/events">
                        <EventsContainer 
                            showEvents={props.showEvents}
                            chooseEvent={props.chooseEvent}
                        />
                    </Route>
                    <Route exact path="/event">
                        {
                            Object.keys(props.chosenEvent).length !== 0 ?
                                <CardInfo chosenEvent={props.chosenEvent} currentUser={props.currentUser} />
                            :
                                <Home 
                                chooseEvent={props.chooseEvent}
                                setAllNearesEvents={props.setAllNearesEvents}
                                setAllChoosenEvents={props.setAllChoosenEvents}
                                setAllFreeEvents={props.setAllFreeEvents}
                                setAllRandEvents={props.setAllRandEvents}
                                setContainerId={props.setContainerId}
                                />  
                        }
                    </Route>
                    <Route exact path="/">
                        <Home 
                            chooseEvent={props.chooseEvent}
                            setAllNearesEvents={props.setAllNearesEvents}
                            setAllChoosenEvents={props.setAllChoosenEvents}
                            setAllFreeEvents={props.setAllFreeEvents}
                            setAllRandEvents={props.setAllRandEvents}
                            setContainerId={props.setContainerId}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
