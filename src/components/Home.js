import React, { Component } from 'react';
import Nav from './Nav';
import MainPage from './MainPage';
import ArtPage from './ArtPage';
import Favorites from "./Favorites";
import DonationPage from './DonationPage';
import UploadPage from './UploadPage';
import AccountDetails from './AccountDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';;

class Home extends Component {
    
    constructor(props) {

        super(props);
    
        //state needs account info: transfers, etc
        //list of artworks

        //!!!! Username is a prop
        this.state = {
            uid: props.uid,
            balance: props.balance,
            transfers: props.transfers,
            num_transfers: props.transfers.length,
            artList: [],
            writingList: [],
            musicList: []
        }

    }

    componentDidMount = () => {
        //Update the app every few seconds

        let getAll = () => {

            fetch('http://localhost:8010/proxy/api/get_all_objects', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
                
            }).then((response) => {
                return response.json()
            }).then((json) => {
                this.getArt(json.objects);
            });
        
            setTimeout(getAll, 5000);
        }
        
        let updateUser = () => {
            fetch('http://localhost:8010/proxy/api/get_balance?source_uid=' + this.state.uid, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                
            }).then((response) => {

                return response.json();

            }).then((json) => {

                if (json) {
                    fetch('http://localhost:8010/proxy/api/get_transfers?uid=' + this.state.uid, {
                    method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    }).then((transfer_response) => {

                        return transfer_response.json();

                    }).then((transfer_json) => {
                    
                        if (transfer_json.length != this.state.num_transfers) {
                            let transfer = transfer_json[transfer_json.length - 1];
                            if (this.state.balance < json.balance) {
                                this.createNotification(transfer);
                                this.setState({
                                    balance: json.balance,
                                    transfers: transfer_json,
                                    num_transfers: transfer_json.length
                                })

                                return;

                            }
                        }

                        this.setState({
                            balance: json.balance
                        })
                
                    })
                }

            });

            setTimeout(updateUser, 5000);

        }

        getAll();
        updateUser();

    }
    
    getArt = (objects) => {
        
        let newArtList = [];
        let newWritingList = [];
        let newMusicList = [];

        for (var i = 0; i<objects.length; i++) {

            let piece = objects[i];

            if (piece.creation_type === "IMAGE") {
                newArtList.push(piece);
            } if (piece.creation_type === "TEXT") {
                newWritingList.push(piece);
            } if (piece.creation_type === "MUSIC") {
                newMusicList.push(piece);
            }

        }

        this.setState({
            artList: newArtList,
            writingList: newWritingList,
            musicList: newMusicList
        })

    }

    createNotification = (transfer) => {
        NotificationManager.success('You were donated ' + transfer.amount + ' dollar(s)', 'Donation!');
    }    

    render() {
        return(
            <Router>
                <div className="Home row">

                    <Nav />
                    <NotificationContainer />
                    <Switch>
                        <Route path="/" exact render={() => <MainPage artList={this.state.artList} writingList={this.state.writingList} musicList={this.state.musicList}/>} />
                        <Route path="/favorites" render={() => <MainPage artList={this.state.artList} writingList={this.state.writingList} musicList={this.state.musicList}/>} />
                        <Route path="/account" render={() => <AccountDetails uid={this.props.uid} balance={this.props.balance}/>} />
                        <Route path="/view/:object_id" exact render={(props) => <ArtPage {...props} artList={this.state.artList} writingList={this.state.writingList} musicList={this.state.musicList}/>} />
                        <Route path="/donate/:object_id/:return" exact render={(props) => <DonationPage {...props} artList={this.state.artList} writingList={this.state.writingList} musicList={this.state.musicList} balance={this.state.balance} uid={this.state.uid} />}  />
                        <Route path="/upload" component={UploadPage} />
                    </Switch>

                </div>
            </Router>
        )
    }
}

export default Home;