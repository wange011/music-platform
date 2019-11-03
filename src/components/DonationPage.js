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
            if (piece.object_id == this.props.match.params.object_id) {
                artwork = piece;
                break;
            }
        }

        for (var i = 0; i < this.props.writingList.length; i++) {
            let piece = this.props.writingList[i];
            if (piece.object_id == this.props.match.params.object_id) {
                artwork = piece;
                break;
            }
        }

        for (var i = 0; i < this.props.musicList.length; i++) {
            let piece = this.props.musicList[i];
            if (piece.object_id == this.props.match.params.object_id) {
                artwork = piece;
                break;
            }
        }

        this.state = {
            piece: artwork,
            balance: props.balance,
            uid: props.uid
        }
    
    }

    componentDidUpdate = () => {
        if (!this.state.piece) {
            let artwork;

            for (var i = 0; i < this.props.artList.length; i++) {
                let piece = this.props.artList[i];
                if (piece.object_id == this.props.match.params.object_id) {
                    artwork = piece;
                    break;
                }
            }

            for (var i = 0; i < this.props.writingList.length; i++) {
                let piece = this.props.writingList[i];
                if (piece.object_id == this.props.match.params.object_id) {
                    artwork = piece;
                    break;
                }
            }

            for (var i = 0; i < this.props.musicList.length; i++) {
                let piece = this.props.musicList[i];
                if (piece.object_id == this.props.match.params.object_id) {
                    artwork = piece;
                    break;
                }
            }

            this.setState({
                piece: artwork,
                balance: this.props.balance
            });
        }

        if (!this.state.uid) {
            this.setState({
                uid: this.props.uid
            })
        }

    }

    handleDonate = (e) => {
        
        let donationForm = e.target.closest('.DonationForm');

        let amount = donationForm.getElementsByTagName('input')[1].value;

        if (amount > this.state.balance) {
            return;
        }

        fetch('http://localhost:8010/proxy/api/make_transfer?source_uid=' + this.state.uid + 
        '&destination_uid=' + this.state.piece.author_id + '&amount=' + amount, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            
            if (response.ok) {
                let donationPage = donationForm.parentNode;
                donationPage.removeChild(donationForm);
                donationPage.getElementsByTagName('h1')[0].style.visibility = "visible";
            }

        });

    }

    render() {

        if (!this.state.piece) {
            return(
                <div className="DonationPage col-sm-9"></div>
            )
        }

        let backString = "/";

        if (this.props.match.params.return === "artpage") {
            backString = "/view/" + this.state.piece.object_id; 
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

                        <input className="w3-input" type="text" placeholder={this.state.piece.author_handle} disabled />
                        <input className="w3-input" type="number" placeholder="1.00" onSubmit={(e) => {e.preventDefault()}} />

                        <label className="MessageLabel">Donation Message</label>
                        <textarea placeholder="Message" onSubmit={(e) => {e.preventDefault()}} ></textarea>
                    </div>    

                    <div className="PaymentMethods">
                        <h2>PAYMENT METHOD</h2>
                        <div className="PaymentMethod">
                            <img src={payIcon} />
                            <h3>Capital One Banking Account</h3>
                            <p>Current Balance: {this.state.balance}</p>
                        </div>
                    </div>    

                    <button className="w3-button" onClick={(e) => this.handleDonate(e)}>Donate</button>

                </div>    

                <h1>Thanks For Your Donation!</h1>

            </div>
        )
    }
}

export default DonationPage;