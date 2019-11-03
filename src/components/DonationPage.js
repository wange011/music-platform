import React, { Component } from 'react';

class DonationPage extends Component {

    handleDonate = (e) => {
        
    }

    render() {

        return(
            <div className="DonationPage">
                <form className="w3-container">

                    <label>Username</label>
                    <input className="w3-round" type="text"></input>

                    <label>Password</label>
                    <input className="w3-round" type="text"></input>

                    <button className="w3-button" onClick={(e) => this.handleDonate(e)}>Donate</button>

                </form>
            </div>
        )
    }
}

export default DonationPage;