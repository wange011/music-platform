import React, { Component } from 'react';
import Home from './components/Home'
import './App.css';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      loggedIn: false
    }

  }

  handleLogin = () => {
    
    /* fetch('/login').then((response) => {

    }) */

    this.setState({
      loggedIn: true
    })

  }

  render() {

    if(this.state.loggedIn) {
      
      return(
        <div className="App">
          <Home />
        </div>  
      )

    } else {
      
      return(
        <div className="App">
          <div className="Login">
            <form className="w3-container">

              <label>First Name</label>
              <input className="w3-input" type="text"></input>

              <label>Last Name</label>
              <input className="w3-input" type="text"></input>

              <button className="w3-button w3-green" onClick={() => this.handleLogin()}></button>

            </form>
          </div>
        </div>  
      )
    
    }

  }

}

export default App;
