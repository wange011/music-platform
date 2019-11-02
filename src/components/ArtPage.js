import React, { Component } from 'react';

class ArtPage extends Component {

    handleDonate = () => {
        
    }

    render() {

        return(
            <div className="Favorites col-sm-9">
                <p>{this.props.match.params.objectId}</p>
            </div>
        )
    }
}

export default ArtPage;