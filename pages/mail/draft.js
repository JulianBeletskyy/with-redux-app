import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import { getMessage, addAttachMessage, addAttachDraft, saveDraft, sendMessage, setSendingMessage, buyMessage, removeDraft, clearAttachAll, setMessagesKey } from '../../actions/message'
import { Router } from '../../routes'
import Textarea from '../../components/inputs/textarea'
import FullScreenPreview from '../../components/gallery/full_screen_preview'
import UploadDropdown from '../../components/inputs/upload_dropdown'
import BtnMain from '../../components/buttons/btn_main'
import { LETTER_PRICE, PHOTO_PRICE } from '../../config'
import { setActiveTab, toggleModal, setAlert } from '../../actions/ui'
import { confirmAlert } from 'react-confirm-alert'
import Loader from '../../components/loader'

class Draft extends Component {
    static async getInitialProps({query}) {
        return {id: query.id}
    }

    state = {
        show: false,
        src: '',
        filesPreview: []
    }

    goTo = link => e => {
    	e.preventDefault()
    	Router.pushRoute(link)
    }

    showPhoto = item => e => {
    	this.setState({show: true, src: item.src ? item.src : item})
    }

    closePreview = () => {
    	this.setState({show: false, src: ''})
    }

    getSrc = item => item.src ? item.src : item

    send = () => {
    	const { dispatch, attach, message, testing } = this.props
    	const data = {
    		original: this.message.value,
            receiver_id: message.receiver_id,
            attachment: attach.map(item => item.src ? item.src : item)
    	}
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
    	dispatch(sendMessage(data)).then(res => {
            if (res === true) {
                this.message.value = ''
                dispatch(setActiveTab('outgoing', 'mail'))
                Router.pushRoute('/mail/outgoing')
            } else {
                dispatch(setMessagesKey('letterPrice', res['_price_message']))
                this.showAlert(data)
            }
        })
    }

    showAlert = data => {
        const { dispatch, userCredits, letterPrice } = this.props
        //const messagePrice = LETTER_PRICE + (data.attachment.length * PHOTO_PRICE)

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
                    label: userCredits >= letterPrice ? 'Use Dibs' : 'Buy Dibs',
                    onClick: () => {
                        if (userCredits >= letterPrice) {
                            dispatch(buyMessage(data)).then(res => {
                                if (res) {
                                    dispatch(setActiveTab('outgoing', 'mail'))
                                    Router.pushRoute('/mail/outgoing')
                                }
                            })
                        } else {
                            dispatch(setSendingMessage({...data, letterPrice}))
                            dispatch(toggleModal(true, 'credits'))
                        }
                    }
                }
            ]
        })
    }

    save = () => {
    	const { dispatch, attach, message, id, testing } = this.props
    	const data = {
    		original: this.message.value,
            receiver_id: message.receiver_id,
            attachment: attach.map(item => item.src ? item.src : item),
            id: id,
    	}
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
    	dispatch(saveDraft(data)).then(res => {
    		if (res) {
    			Router.pushRoute('/mail/draft')
    		}
    	})
    }

    remove = () => {
        const { dispatch, id, testing } = this.props
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
        dispatch(removeDraft(id)).then(res => {
            if (res) {
                Router.pushRoute('/mail/draft')
            }
        })
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(clearAttachAll())
    }

    componentDidMount() {
        const { dispatch, id } = this.props
        dispatch(getMessage(id, 'draft')).then(res => {
            if (res.attachment) {
                const temp = res.attachment.map(item => ({id: item.id, src: item.img}))
                dispatch(addAttachDraft(temp))
                dispatch(addAttachMessage(temp))
            }
        })
    }

    render() {
    	const { message, draftAttach, id } = this.props
        return (
            <Layout>
            	<PrivateLayout>
                    {
                        message.id === id * 1
                        ?   <div>
                               <div className="pt-15">
                                    <div className="font-bebas form-group">
                                        <a className="font-bebas" href={`/mail/draft`} onClick={this.goTo(`/mail/draft`)}><i className="fas fa-chevron-left"></i> Back to mail</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <Textarea
                                        counter={4500}
                                        inputRef={ref => { this.message = ref }}
                                        value={message.original}
                                        placeholder="Message"
                                        label={true} />
                                </div>
                                {
                                    draftAttach.length
                                    ?   <div className="row">
                                            {   draftAttach.map((item, key) => {
                                                    return  <div key={key} className="col-xs-6">
                                                                <div className="attachmentWrap">
                                                                    <img onClick={this.showPhoto(item)} className="img-responsive pointer" src={this.getSrc(item)} alt="" />
                                                                </div>
                                                            </div>
                                                })
                                            }
                                        </div>
                                    :   null
                                }
                                <div className="form-group">
                                    <BtnMain
                                        bsStyle="success"
                                        text="Send"
                                        onClick={this.send} />
                                    &nbsp;
                                    <BtnMain
                                        bsStyle="success"
                                        onClick={this.save}
                                        text="Save message" />
                                    &nbsp;
                                    <BtnMain
                                        bsStyle="success"
                                        onClick={this.remove}
                                        text="Remove message" />
                                </div>
                                <div className="form-group">
                                    <UploadDropdown type="draft" />
                                </div> 
                            </div>
                        :   <Loader />
                    }
	                <FullScreenPreview src={this.state.src} show={this.state.show} onClose={this.closePreview} />
            	</PrivateLayout>
        	</Layout>
        );
    }
}

const mapStateToProps = ({message, user}) =>
	({
		message: message.message,
		attach: message.attach,
		draftAttach: message.draftAttach,
        userCredits: user.data.credits,
        testing: user.testing,
        letterPrice: message.letterPrice,
	})

export default connect(mapStateToProps)(Draft)