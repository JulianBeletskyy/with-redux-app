import React, { Component } from 'react';


export class Avatar extends Component {
    render() {
    	const { src = '/static/assets/img/default-avatar.jpg' } = this.props
        return (
            <div className="avatar-wrap">
                <div className="avatar-hover" onClick={this.props.onClick} >
                    <span>edit</span>
                </div>
                <img src={src} className="avatar-img" alt="" />
            </div>
        )
    }
}

export default Avatar
