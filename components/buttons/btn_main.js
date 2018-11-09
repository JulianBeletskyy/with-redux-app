import React, { Component } from 'react'

class BtnMain extends Component {
    render() {
        const { type = 'button', bsStyle, onClick, disabled, text, icon, id = '' } = this.props
        return (
            <button
                type={type}
                className={`main button ${bsStyle}`}
                onClick={onClick}
                id={id}
                disabled={disabled} >
                <span>{icon} {text}</span>
            </button>
        );
    }
}

export default BtnMain