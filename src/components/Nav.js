import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../res/home-24px.svg';
import favIcon from '../res/favorite-24px.svg';
import accIcon from '../res/account_circle-24px.svg';

class Nav extends Component {

    componentDidMount = (e) => {
        document.getElementsByClassName("Nav")[0].getElementsByClassName("Link")[0].classList.add("active");
    }

    handleSwitch = (e) => {
        let currentActive = document.getElementsByClassName("Nav")[0].getElementsByClassName("active")[0];
        if (currentActive) {

            currentActive.classList.remove("active");
            console.log("Removed active")
            console.log(currentActive)

        }
        e.target.closest(".Link").classList.add("active");
    }

    render() {
        return(
            <div className="Nav">
                
                <div className="LinkContainer">
                    <Link to="/" onClick={(e) => this.handleSwitch(e)}>
                        <div className="Link">
                            <img src={homeIcon}></img>
                            <p>Home</p>
                        </div>    
                    </Link>
                    <Link to="/favorites" onClick={(e) => this.handleSwitch(e)}>
                        <div className="Link">
                            <img src={favIcon}></img>
                            <p>Favorites</p>
                        </div>    
                    </Link>
                </div>

                <div className="ProfileLinkContainer">
                    <Link to="/account" onClick={(e) => this.handleSwitch(e)}>
                        <div className="Link" id="AccountLink">
                            <img src={accIcon}></img>
                            <p>Account Info</p>
                        </div>
                    </Link>
                </div>    

            </div>
        )
    }
}

export default Nav;