import React, { Component } from 'react'
import { connect } from 'react-redux'
import BtnMain from '../buttons/btn_main'
import { Router } from '../../routes'
import { setNewMessage } from '../../actions/message'

class ContactItem extends Component {

	getMessage = e => {
		e.stopPropagation()
		const { dispatch, avatar, first_name, id } = this.props
		const data = {
			avatar: avatar,
			first_name: first_name,
			receiver_id: id,
		}
		dispatch(setNewMessage(data))
		Router.pushRoute('/mail/outgoing/new')
	}

	goToMember = e => {
		e.preventDefault()
		Router.pushRoute(`/member/${this.props.id}`)
	}

    render() {
    	const { avatar, first_name, id, role } = this.props
        return (
            <div className={`wrap-contact${role === 'girl' ? ' girl' : ''}`} onClick={this.goToMember}>
                <div className="contact-img">
                    <img src={avatar} alt="" className="img-responsive" />
                </div>
                <div className="contact-info">
                    <strong className="font-bebas">{first_name}</strong>
                </div>
                <div className="contact-btn">
                    <BtnMain
                        bsStyle="success"
                        text="Send Message"
                        onClick = {this.getMessage} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        role: state.user.data.role
    })

export default connect(mapStateToProps)(ContactItem)