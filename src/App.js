import React from "react";
import NavBar from './NavBar'
import '../src/App.css'


export default class App extends React.Component {
  state = {
    currentUser: null
  }

  componentDidMount(){
    const token = localStorage.token
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
      // this.props.history.push("/login")
    })
  }

  render(){
    console.log(this.state.currentUser)
    return (
      <div>
        {
          this.state.loaded ?
            <NavBar currentUser={this.state.currentUser} setUser={this.setUser} logout={this.logout}/>
          :
            <h1 style={{textAlign: "center"}}>Loading...</h1>

        }
      </div>
    );
  }
}
