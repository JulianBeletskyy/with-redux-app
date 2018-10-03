import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import BtnMain from '../buttons/btn_main'
import Textarea from '../inputs/textarea'
import Validator from '../../validate'
import UploadDropdown from '../inputs/upload_dropdown'
import { sendMessage, setSendingMessage, buyMessage, saveDraft } from '../../actions/message'
import { setActiveTab, toggleModal } from '../../actions/ui'
import { Router } from '../../routes'
import { LETTER_PRICE, PHOTO_PRICE } from '../../config'
import { confirmAlert } from 'react-confirm-alert'

export class MessageModal extends Component {

    showAlert = data => {
        const { dispatch, userCredits } = this.props
        const messagePrice = LETTER_PRICE + (data.attachment.length * PHOTO_PRICE)

        confirmAlert({
            title: '',
            message: 'You do not have enough dibs to send message. Click Buy Dibs to chose the package.',
            buttons: [
                {
                    label: 'Cancel',
                    onClick: () => {
                        dispatch(setSendingMessage({}))
                    }
                }, {
                    label: userCredits >= messagePrice ? 'Use Dibs' : 'Buy Dibs',
                    onClick: () => {
                        if (userCredits >= messagePrice) {
                            dispatch(buyMessage(data)).then(res => {
                                if (res) {
                                    dispatch(toggleModal(false, 'message'))
                                    dispatch(setActiveTab('outgoing', 'mail'))
                                    Router.pushRoute('/mail/outgoing')
                                }
                            })
                        } else {
                            dispatch(setSendingMessage({...data, messagePrice}))
                            dispatch(toggleModal(true, 'credits'))
                        }
                    }
                }
            ]
        })
    }

    saveDraft = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const { dispatch, attach, newMessage } = this.props
            const data = {
                original: this.message.value,
                receiver_id: this.props.memberId,
                attachment: attach.map(item => item.src ? item.src : item)
            }
            dispatch(saveDraft(data)).then(res => {
                if (res) {
                    dispatch(toggleModal(false, 'message'))
                    Router.pushRoute(`/mail/draft`)
                }
            })
        }
    }

	send = () => {
		let error = 1
		error *= Validator.check(this.message.value, ['required'], 'Message')
		if (error) {
			const { dispatch, attach } = this.props
			const data = {
                original: this.message.value,
                receiver_id: this.props.memberId,
                attachment: attach.map(item => item.src ? item.src : item),
            }
            dispatch(sendMessage(data)).then(res => {
                switch (res) {
                    case true:
                        this.message.value = ''
                        dispatch(setActiveTab('outgoing', 'mail'))
                        Router.pushRoute('/mail/outgoing')
                        break
                    case 'limit_message':
                        this.showAlert(data)
                        break
                    default: return
                }
            })
		}
	}

    render() {
        console.log(this.props)
        return (
            <div>
                <FormGroup className="member">
    	           <Textarea
                        inputRef={ref => { this.message = ref }}
                        value={''}
                        placeholder="Message" />
                </FormGroup>
                <FormGroup>
                    <BtnMain
                        type="button"
                        bsStyle="success "
                        text="Save to drats"
                        onClick = {this.saveDraft} />
                    &nbsp;
                    <BtnMain
                        bsStyle="success"
                        text="Send"
                        onClick={this.send} />
                </FormGroup>
                <UploadDropdown />
            </div>
        )
    }
}

const mapStateToProps = state =>
	({
	    attach: state.message.attach,
        userCredits: state.user.data.credits,
	})

export default connect(
    mapStateToProps,
)(MessageModal)
