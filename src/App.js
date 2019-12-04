import React from "react";
import { Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import '../src/App.css'


export default class App extends React.Component {
  state = {
    currentUser: null,
    loaded: false,
    showEvent: {},
    allNearestEvents: [],
    allChoosenAreaEvents: [],
    allFreeEvents: [],
    allRandEvents: [],
    showEvents: []
  }

  componentDidMount(){
    const token = localStorage.token
    this.setState({
      loaded: true
    })
    if(token){
      fetch("http://localhost:3000/api/v1/auto_login", {
        headers: {
          "authorization": token
        }
      })
      .then(res => res.json())
      .then(response =>{
        if (response.errors){
          alert(response.errors)
        } else {
          this.setState({
            currentUser: response
          })
        }
      })
    }
  }

  setUser = (response) => {
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.token = response.token
    })
    
  }

  logout = () => {
    this.setState({
      currentUser: null
    }, () => {
      localStorage.removeItem("token")
    })
  }

  chooseEvent= event =>{
    this.setState({
      showEvent: event
    })
  }

  setContainerId = id => {
    switch (id) {
      case 0:
          this.setState({
            showEvents: this.state.allChoosenAreaEvents
          })
        break;
      case 1:
          this.setState({
            showEvents: this.state.allNearestEvents
          })
        break;
      case 2:
          this.setState({
            showEvents: this.state.allFreeEvents
          })
        break;
      case 3:
        this.setState({
          showEvents: this.state.allRandEvents
        })
      break;
      default:
        break;
    }

  }

  setAllNearesEvents= events =>{
    this.setState({
      allNearestEvents: events
    })
  }

  setAllChoosenEvents= events =>{
    this.setState({
      allChoosenAreaEvents: events
    })
  }

  setAllFreeEvents= events =>{
    this.setState({
      allFreeEvents: events
    })
  }

  setAllRandEvents= events =>{
    this.setState({
      allRandEvents: events
    })
  }

  render(){
    return (
      <div>
        {
          this.state.loaded ?
            <NavBar 
              currentUser={this.state.currentUser} 
              setUser={this.setUser} 
              logout={this.logout} 
              chosenEvent={this.state.showEvent} 
              chooseEvent={this.chooseEvent} 
              setAllNearesEvents={this.setAllNearesEvents}
              setAllChoosenEvents={this.setAllChoosenEvents}
              setAllFreeEvents={this.setAllFreeEvents}
              setAllRandEvents={this.setAllRandEvents}
              showEvents={this.state.showEvents}
              setContainerId={this.setContainerId}
            />
          :
            <h1 style={{textAlign: "center"}}>Loading...</h1>
        }
      </div>
    );
  }
}
