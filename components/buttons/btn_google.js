import React, { Component } from 'react'

class BtnGoogle extends Component {
    render() {
        return (
            <button
                type="button"
                onClick={this.props.onClick}
                className="btn btn-default btn-google"
                id="google" >
                <i className="fab fa-google-plus-square"></i>
                <span>{this.props.title}</span>
            </button>
        );
    }
}

export default BtnGoogle