import React, { Component } from 'react'

class FullScreenPreview extends Component {

    render() {
    	const { src, show, onClose = () => {}, video = false } = this.props
        return (
            show && <div className="wrap-fullscreen-preview" onClick={onClose}>
            	{ src && <img src={src} alt="" className="" /> }
            	{ video && <video controlsList="nodownload" src={video} controls></video>}
            </div>
        );
    }
}

export default FullScreenPreview
