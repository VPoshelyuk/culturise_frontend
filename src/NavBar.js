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

export default function NavBar (props) {
    return (
        <Router>
            <div>
                <header>
                    <div className="container">
                        <img className="logo" src="./images/nav_logo.png" alt="NavBar logo" />
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
                                        <a>{props.currentUser.username}</a>
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
                    <Route path="/logout">
                        <LogOut logout={props.logout}/>
                    </Route>
                    <Route path="/login">
                        <LogIn setUser={props.setUser} currentUser={props.currentUser} />
                    </Route>
                    <Route path="/signup">
                        <SignUp setUser={props.setUser} currentUser={props.currentUser} />
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
