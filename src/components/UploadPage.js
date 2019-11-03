import React, { Component } from 'react';
import upIcon from '../res/add-24px.svg';

class UploadPage extends Component {

    render() {
        return(
            <div className="UploadPage col-sm-9 row">
                <div className="UploadForm col-sm-6">
                    <label>Title</label>
                    <input className="w3-input" type="text"  />

                    <label>Url</label>
                    <input className="w3-input" type="text" placeholder="Optional" />
                </div>

                <div className="FileUpload col-sm-6">
                    <label for="file-upload" class="custom-file-upload">
                        <img src={upIcon}></img>
                    </label>    
                    <input id="file-upload" type="file" />
                </div>    

            </div>
        )
    }
}

export default UploadPage;