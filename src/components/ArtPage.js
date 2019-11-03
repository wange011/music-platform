import React, { Component } from 'react';
import backIcon from '../res/arrow_back-24px.svg';
import donIcon from '../res/attach_money-24px.svg';
import { Link } from 'react-router-dom';

class ArtPage extends Component {

    render() {

        let artwork;
        let recommended;

        for (var i = 0; i < this.props.artList.length; i++) {
            let piece = this.props.artList[i];
            if (piece.objectId == this.props.match.params.objectId) {
                artwork = piece;
                recommended = this.props.artList.filter((artwork) => {
                    return piece.objectId != artwork.objectId
                });
                break;
            }
        }

        for (var i = 0; i < this.props.writingList.length; i++) {
            let piece = this.props.writingList[i];
            if (piece.objectId == this.props.match.params.objectId) {
                artwork = piece;
                recommended = this.props.writingList.filter((artwork) => {
                    return piece.objectId != artwork.objectId
                });
                break;
            }
        }

        for (var i = 0; i < this.props.musicList.length; i++) {
            let piece = this.props.musicList[i];
            if (piece.objectId == this.props.match.params.objectId) {
                artwork = piece;
                recommended = this.props.musicList.filter((artwork) => {
                    return piece.objectId != artwork.objectId
                });
                break;
            }
        }
        
        if (artwork.objectType === "art") {

            let artListHTML = recommended.map( (artwork) => {
                return(
                    <Link to={"/view/" + artwork.objectId} >
                        <div className="Artwork">
                            <img src={artwork.objectPreviewImageUrl} />
                        </div> 
                    </Link>
                )
            });

            return(
                <div className="ArtPageWrapper">
                    <div className="ArtPage col-sm-11">
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
                        <br></br>
                        <div className="recommended">
                            {artListHTML}
                        </div>    
                    </div>
                    <div className="spacing">
                    </div>    
                </div>    
            )
        } 
    }
}

export default ArtPage;