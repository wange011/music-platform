import React, { Component } from 'react';
import Home from './components/Home'
import './App.css';
import 'react-notifications/lib/notifications.css';


class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      loggedIn: false
    }

  }

  handleLogin = (e) => {
  
    e.preventDefault();

    let parent = e.target.closest(".w3-container");
    let uid = parent.getElementsByTagName('input')[1].value;

    fetch('http://localhost:8010/proxy/api/get_balance?source_uid=' + uid, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        
    }).then((response) => {

      if (response.ok) {
        
        return response.json();

      } else {
        
        return false;

      }

    }).then((json) => {

        if (json) {
          fetch('http://localhost:8010/proxy/api/get_transfers?uid=' + json.uid, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }).then((transfer_response) => {

            return transfer_response.json();

          }).then((transfer_json) => {
            
            this.setState({
              balance: json.balance,
              uid: json.uid,
              transfers: transfer_json,
              loggedIn: true
            })
          
          })
        }

    });

  }

  render() {

    if(this.state.loggedIn) {
      
      return(
        <div className="App">
          <Home uid={this.state.uid} balance={this.state.balance} transfers={this.state.transfers}/>
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
              <input className="w3-round" type="password" onSubmit={(e) => {e.preventDefault()}}></input>

              <button className="w3-button" onClick={(e) => this.handleLogin(e)}>Login</button>
              <a><p>I don't have an account</p></a>

            </form>
          </div>
        </div>  
      )
    
    }

  }

}

export default App;
