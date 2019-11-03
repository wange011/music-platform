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
      set state depending on response
    }) */

    this.setState({
      loggedIn: true,
      username: "wange011"
    })

  }

  render() {

    if(this.state.loggedIn) {
      
      return(
        <div className="App">
          <Home username={this.state.username}/>
        </div>  
      )

    } else {
      
      return(
        <div className="App">
          <div className="Login col-sm-6">
            <form className="w3-container">

              <label>Username</label>
              <input className="w3-round" type="text" onSubmit={(e) => {e.preventDefault()}}></input>

              <label>Password</label>
              <input className="w3-round" type="text" onSubmit={(e) => {e.preventDefault()}}></input>

              <button className="w3-button" onClick={() => this.handleLogin()}>Login</button>
              <a><p>I don't have an account</p></a>

            </form>
          </div>
        </div>  
      )
    
    }

  }

}

export default App;
