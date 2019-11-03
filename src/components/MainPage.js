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

    componentDidUpdate = () => {
        if (this.state.artList.length == 0 && this.state.writingList == 0 && this.state.musicList == 0) {
            this.setState({
                artList: this.props.artList,
                writingList: this.props.writingList,
                musicList: this.props.musicList
            })
        }
    }

    handleFilter = (e) => {
        
        e.preventDefault();

        let form = e.target.closest('form');

        let text = form.getElementsByTagName('input')[0].value;

        if (text === "") {

            this.setState({
                artList: this.props.artList,
                writingList: this.props.writingList,
                musicList: this.props.musicList
            });

            return;
        }

        let newArtList = this.props.artList.filter((artwork) => {

            console.log(artwork.title)
            console.log(text)
            return artwork.title.toLowerCase().replace(/\s+/g, '').includes(text.toLowerCase().replace(/\s+/g, ''));

        });

        let newWritingList = this.props.writingList.filter((artwork) => {

            return artwork.title.toLowerCase().replace(/\s+/g, '').includes(text.toLowerCase().replace(/\s+/g, ''));

        });

        let newMusicList = this.props.musicList.filter((artwork) => {

            return artwork.title.toLowerCase().replace(/\s+/g, '').includes(text.toLowerCase().replace(/\s+/g, ''));

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
                <Link to={"/view/" + artwork.object_id}>
                    <div className="Artwork">
                        <img src={artwork.url} />
                        <div className="ArtworkOverlay">
                            <p>{artwork.title}</p>
                        </div>
                        <Link to={"/donate/" + artwork.object_id + "/mainpage" }>
                            <button className="w3-circle">
                                <img src={donIcon} />
                            </button>
                        </Link>    
                    </div> 
                </Link>
            )
        });

        return(
            <div className="MainPage">
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