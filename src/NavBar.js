import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from './Home'
import LogIn from './LogIn'
import SignUp from './SignUp'

export default function NavBar () {
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
                                <li>
                                <Link to="/login">Log In</Link>
                                </li>
                                <li>
                                <Link to="/signup">Sign Up</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
        
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/login">
                        <LogIn />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
