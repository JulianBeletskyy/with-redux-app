import React, { Component } from 'react'

class AvatarMember extends Component {
    render() {
        const { onClick, src, className } = this.props
        return (
            <div className="avatar-member-wrap">
                <img onClick={onClick} src={src} className="img-responsive pointer margin-auto" alt="" />
            </div>
        );
    }
}

export default AvatarMember