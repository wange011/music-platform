import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router-dom';
import donIcon from '../res/attach_money-24px.svg';


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

    handleFilter = (e) => {
        
        e.preventDefault();

        let form = e.target.closest('form');

        let text = form.getElementsByTagName('input')[0].value;

        console.log(this.props.artList);

        if (text === "") {

            this.setState({
                artList: this.props.artList,
                writingList: this.props.writingList,
                musicList: this.props.musicList
            });

            return;
        }

        let newArtList = this.props.artList.filter((artwork) => {

            return artwork.objectTitle.toLowerCase().replace(/\s+/g, '').includes(text.toLowerCase().replace(/\s+/g, ''));

        });

        let newWritingList = this.props.writingList.filter((artwork) => {

            return artwork.objectTitle.toLowerCase().replace(/\s+/g, '').includes(text.toLowerCase().replace(/\s+/g, ''));

        });

        let newMusicList = this.props.musicList.filter((artwork) => {

            return artwork.objectTitle.toLowerCase().replace(/\s+/g, '').includes(text.toLowerCase().replace(/\s+/g, ''));

        });

        this.setState({
            artList: newArtList,
            writingList: newWritingList,
            musicList: newMusicList
        });

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
                        <Link to={"/donate/" + artwork.objectId + "/mainpage" }>
                            <button className="w3-circle">
                                <img src={donIcon} />
                            </button>
                        </Link>    
                    </div> 
                </Link>
            )
        });

        return(
            <div className="MainPage col-sm-9">
                <div className="SearchBar" >
                    <form onSubmit={(e) => {this.handleFilter(e)}}>
                        <input type="text" placeholder="Search" onChange={(e) => {this.handleFilter(e)}} />
                    </form>     
                </div>
                <div className = "ArtList">
                    <h1>Featured Artworks</h1>
                    {artListHTML}
                </div>    
            </div>
        )
    }
}

export default MainPage;