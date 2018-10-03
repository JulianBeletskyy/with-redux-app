import React, { Component } from 'react'

class BtnFacebook extends Component {
    render() {
        return (
            <button
                type="button"
                className="btn btn-default btn-facebook"
                onClick={this.props.onClick} >
                <i className="fab fa-facebook"></i>
                <span>{this.props.title}</span>
            </button>
        );
    }
}

export default BtnFacebook