import React, { Component } from 'react';
import upIcon from '../res/add-24px.svg';

class UploadPage extends Component {

    handleUpload = (e) => {

        let file = e.target.files[0];

        let name = file.name;

        e.target.closest(".FileUpload").getElementsByTagName("label")[0].getElementsByClassName("FileName")[0].innerHTML = name;

        e.target.closest(".FileUpload").getElementsByTagName("label")[0].getElementsByTagName("img")[0].style.visibility = "hidden";

    }

    render() {
        return(
            <div className="UploadPage col-sm-9 row">
                <div className="UploadForm col-sm-6">
                    <label>Title</label>
                    <input className="w3-input" type="text"  />

                    <label>Url</label>
                    <input className="w3-input" type="text" placeholder="Optional" />
                    <button className="w3-button" onClick={(e) => this.handleSubmit(e)}>Upload</button>
                </div>

                <div className="FileUpload col-sm-6">
                    <label for="file-upload" class="custom-file-upload">
                        <img src={upIcon}></img>
                        <p class="FileName" />
                    </label>    
                    <input id="file-upload" type="file" onChange={(e) => {this.handleUpload(e)}}/>
                </div>    

            </div>
        )
    }
}

export default UploadPage;