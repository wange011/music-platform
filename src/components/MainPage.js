import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainPage extends Component {

    constructor(props) {

        super(props);

        //State maintains filtered list from props
        this.state = {
            artList: props.artList,
            writingList: props.writingList,
            musicList: props.musicList
        }
    
    }

    handleFilter = () => {
        //filter from props
    }

    render() {

        let artListHTML = this.state.artList.map( (artwork) => {
            return(
                <Link to={"/view/" + artwork.objectId} >
                    <div className="Artwork">
                        <img src={artwork.objectPreviewImageUrl} />
                        <div className="ArtworkOverlay">
                            <p>{artwork.objectTitle}</p>
                        </div>    
                    </div> 
                </Link>
            )
        });

        return(
            <div className="MainPage col-sm-9">
                <div className = "ArtList">
                    <h1>Featured Artworks</h1>
                    {artListHTML}
                </div>    
            </div>
        )
    }
}

export default MainPage;