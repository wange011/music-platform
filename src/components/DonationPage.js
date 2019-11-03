import React, { Component } from 'react';
import backIcon from '../res/arrow_back-24px.svg';
import payIcon from '../res/capital_one.png';
import { Link } from 'react-router-dom';

class DonationPage extends Component {

    constructor(props) {

        super(props);

        let artwork;

        for (var i = 0; i < this.props.artList.length; i++) {
            let piece = this.props.artList[i];
            if (piece.objectId == this.props.match.params.objectId) {
                artwork = piece;
                break;
            }
        }

        for (var i = 0; i < this.props.writingList.length; i++) {
            let piece = this.props.writingList[i];
            if (piece.objectId == this.props.match.params.objectId) {
                artwork = piece;
                break;
            }
        }

        for (var i = 0; i < this.props.musicList.length; i++) {
            let piece = this.props.musicList[i];
            if (piece.objectId == this.props.match.params.objectId) {
                artwork = piece;
                break;
            }
        }

        this.state = {
            piece: artwork,
            currentBalance: 100
        }
    
    }

    handleDonate = (e) => {
        
    }

    render() {

        let backString = "/";

        if (this.props.match.params.return === "artpage") {
            backString = "/view/" + this.state.piece.objectId; 
        }

        return(
            <div className="DonationPage col-sm-9">

                <Link to={backString} >
                    <button className="BackButton w3-circle">
                        <img src={backIcon} />
                    </button>
                </Link>

                <div className="DonationForm">

                    <div className="DonationInputs">
                        <label className="left">Donating To</label>
                        <label className="right">Donation Amount</label>

                        <input className="w3-input" type="text" placeholder={this.state.piece.objectAuthor} disabled />
                        <input className="w3-input" type="number" placeholder="1.00" onSubmit={(e) => {e.preventDefault()}} />

                        <label className="MessageLabel">Donation Message</label>
                        <textarea placeholder="Message" onSubmit={(e) => {e.preventDefault()}} ></textarea>
                    </div>    

                    <div className="PaymentMethods">
                        <h2>PAYMENT METHOD</h2>
                        <div className="PaymentMethod">
                            <img src={payIcon} />
                            <h3>Capital One Banking Account</h3>
                            <p>Current Balance: {this.state.currentBalance}</p>
                        </div>
                    </div>    

                    <button className="w3-button" onClick={(e) => this.handleDonate(e)}>Donate</button>

                </div>    

            </div>
        )
    }
}

export default DonationPage;