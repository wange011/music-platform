import React, { Component } from 'react';

class AccountDetails extends Component {

    render() {
        return(
            <div className="AccountDetails col-sm-9">
                <p>Account Details</p>
                <p>{this.props.username}</p>
            </div>
        )
    }
}

export default AccountDetails;