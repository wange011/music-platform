import React, { Component } from 'react';
import backIcon from '../res/arrow_back-24px.svg'
import donIcon from '../res/attach_money-24px.svg';
import { Link } from 'react-router-dom';

class ArtPage extends Component {

    handleClickDonate = () => {

    }

    render() {

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
        
        if (artwork.objectType === "art") {
            return(
                <div className="ArtPage col-sm-9">
                    <Link to="/">
                        <button className="BackButton w3-circle">
                            <img src={backIcon} />
                        </button>
                    </Link>
                    <div className="ArtCard">
                        <img src={artwork.objectPreviewImageUrl} />
                        <p>{artwork.objectTitle}</p>
                        <Link to={"/donate/" + artwork.objectId + "/artpage" }>
                            <button className="w3-button">
                                <img src={donIcon} />
                                <p>Donate</p>
                            </button>
                        </Link>
                    </div>
                    <h1>Some Other Works You Might Be Interested In</h1>

                </div>
            )
        } 
    }
}

export default ArtPage;