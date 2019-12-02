import React from 'react';
import NavBar from './NavBar'
import MainBody from './MainBody'
import Footer from './Footer'

export default class Home extends React.Component{
  render(){
    return (
      <div className="App">
        <MainBody events={this.props.events}/>
        <Footer />
      </div>
    )
  }
}