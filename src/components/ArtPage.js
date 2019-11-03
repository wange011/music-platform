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
            if (piece.object_id == this.props.match.params.object_id) {
                artwork = piece;
                recommended = this.props.artList.filter((artwork) => {
                    return piece.object_id != artwork.object_id
                });
                break;
            }
        }

        for (var i = 0; i < this.props.writingList.length; i++) {
            let piece = this.props.writingList[i];
            if (piece.object_id == this.props.match.params.object_id) {
                artwork = piece;
                recommended = this.props.writingList.filter((artwork) => {
                    return piece.object_id != artwork.object_id
                });
                break;
            }
        }

        for (var i = 0; i < this.props.musicList.length; i++) {
            let piece = this.props.musicList[i];
            if (piece.object_id == this.props.match.params.object_id) {
                artwork = piece;
                recommended = this.props.musicList.filter((artwork) => {
                    return piece.object_id != artwork.object_id
                });
                break;
            }
        }

        if (!artwork) {
            return(
                <div className="ArtPageWrapper"></div>
            )
        }

        if (artwork.creation_type === "IMAGE") {

            let artListHTML = recommended.map( (artwork) => {
                return(
                    <Link to={"/view/" + artwork.object_id} >
                        <div className="Artwork">
                            <img src={artwork.url} />
                        </div> 
                    </Link>
                )
            });

            return(
                <div className="ArtPage">
                    <Link to="/">
                        <button className="BackButton w3-circle">
                            <img src={backIcon} />
                        </button>
                    </Link>
                    <div className="ArtCard">
                        <img src={artwork.url} />
                        <p>{artwork.title}</p>
                        <Link to={"/donate/" + artwork.object_id + "/artpage" }>
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
            )
        } 
    }
}

export default ArtPage;