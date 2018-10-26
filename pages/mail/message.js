import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import Textarea from '../../components/inputs/textarea'
import BtnMain from '../../components/buttons/btn_main'
import UploadDropdown from '../../components/inputs/upload_dropdown'
import { getMessage, saveDraft, sendMessage, setSendingMessage, buyMessage, showAttach, buyAttach, setBuyingAttach, clearAttachAll } from '../../actions/message'
import { Router } from '../../routes'
import Loader from '../../components/loader'
import Validator from '../../validate'
import Alert from '../../components/alert'
import { setActiveTab, toggleModal } from '../../actions/ui'
import { LETTER_PRICE, PHOTO_PRICE } from '../../config'
import { confirmAlert } from 'react-confirm-alert'
import FullScreenPreview from '../../components/gallery/full_screen_preview'
import { startTyping } from '../../utils/socket'

class Message extends Component {
    static async getInitialProps({query}) {
        return {type: query.slug, id: query.id}
    }

    constructor(props) {
        super(props)
        const { dispatch, type, id } = props
        if (id !== 'new') {
            const key = type === 'draft' ? 'draft' : 'message'
            dispatch(getMessage(id, key))
        } else {
            this.new = true
        }

        this.state = {
            show: false,
            src: '',
            value: '',
        }
    }

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

    saveDraft = receiver_id => e => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const { dispatch, attach, newMessage } = this.props
            const data = {
                original: this.message.value,
                receiver_id: this.new ? newMessage.receiver_id : receiver_id,
                attachment: attach.map(item => item.src ? item.src : item)
            }
            dispatch(saveDraft(data)).then(res => {
                if (res) {
                    Router.pushRoute(`/mail/draft`)
                }
            })
        }
    }

    send = receiver_id => e => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const { dispatch, attach, newMessage } = this.props
            const data = {
                original: this.message.value,
                receiver_id: this.new ? newMessage.receiver_id : receiver_id,
                attachment: attach.map(item => item.src ? item.src : item)
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

    goTo = link => e => {
        e.preventDefault()
        Router.pushRoute(link)
    }

    getData = message => {
        const { type, role, userId, newMessage } = this.props
        const {
            sender_avatar,
            sender_first_name,
            sender_id,
            translation,
            original,
            receiver_avatar,
            receiver_first_name,
            receiver_id,
        } = this.props.message

        switch(type) {
            case 'outgoing':
                return {
                    fromTo: 'To',
                    avatar: this.new ? newMessage.avatar : receiver_avatar,
                    oponent: this.new ? newMessage.first_name : receiver_first_name,
                    member_id: this.new ? newMessage.receiver_id : receiver_id,
                    text: this.new ? '' : original
                }
            case 'deleted':
                return {
                    fromTo: userId === sender_id ? 'To' : 'From',
                    avatar: userId === sender_id ? receiver_avatar : sender_avatar,
                    oponent: userId === sender_id ? receiver_first_name : sender_first_name,
                    member_id: userId === sender_id ? receiver_id : sender_id,
                    text: userId === sender_id ? original : (role === 'client' ? translation : original)
                }
            default: 
                return {
                    fromTo: 'From',
                    avatar: sender_avatar,
                    oponent: sender_first_name,
                    member_id: sender_id,
                    text: role === 'client' ? translation : original
                }
        }
    }

    showPhoto = item => e => {
        if (item.confirm === '1' || this.props.role === 'girl' || this.props.message.my) {
            this.setState({show: true,src: item.img})
        }
    }

    closePreview = () => {
        this.setState({show: false, src: ''})
    }

    buyPhoto = attach_id => e => {
        const { dispatch, message, userCredits } = this.props
        const data = {
            message_id: message.id,
            attachment_id: attach_id
        }
        dispatch(showAttach(data)).then(res => {
            if (res !== true) {
                confirmAlert({
                    title: '',
                    message: 'You can\'t see this attachment.',
                    buttons: [
                        {
                            label: 'Cancel',
                            onClick: () => {return}
                        }, {
                            label: userCredits >= PHOTO_PRICE ? 'Use Dibs' : 'Buy Dibs',
                            onClick: () => {
                                if (userCredits >= PHOTO_PRICE) {
                                    dispatch(buyAttach(data))
                                } else {
                                    dispatch(setBuyingAttach(data))
                                    dispatch(toggleModal(true, 'credits'))
                                }
                            }
                        }
                    ]
                })
            }
        })
    }

    handleChange = value => {
        //const { userName } = this.props
        //startTyping(userName)
        this.setState({value})
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(clearAttachAll())
    }

    getText = text => text ? text.replace(new RegExp('&nbsp;', 'g'), ' ') : text

    render() {
        const { type, id, role, message, newMessage } = this.props
        const data = this.getData()
        return (
            <Layout>
            	<PrivateLayout>
                    {
                        this.new || message.id === id * 1
                        ?   <div className="pt-15">
                                <div className="font-bebas form-group">
                                    <a className="font-bebas" href={`/mail/${type}`} onClick={this.goTo(`/mail/${type}`)}><i className="fas fa-chevron-left"></i> Back to mail</a>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-2">
                                        <a href={`/member/${data.member_id}`} onClick={this.goTo(`/member/${data.member_id}`)}><img src={data.avatar} alt="" className="img-responsive pointer" /></a>
                                    </div>
                                    {
                                        ! this.new
                                        ?   <div className="col-sm-10">
                                                <div className="row form-group">
                                                    <div className="col-sm-2">
                                                        <strong>Name:</strong>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <a href={`/member/${data.member_id}`} onClick={this.goTo(`/member/${data.member_id}`)} style={{textDecoration: 'unset'}}>
                                                            <strong className={role === 'client' ? 'color-girl' : 'color-client'}>{data.oponent}</strong>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-sm-2">
                                                        <strong>Date:</strong>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        {message.date}
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-sm-2">
                                                        <strong>Message:</strong>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <pre dangerouslySetInnerHTML={{__html: this.getText(data.text)}} />
                                                    </div>
                                                </div>
                                                {
                                                    role !== 'client'
                                                    &&  <div className="row form-group">
                                                            <div className="col-sm-2">
                                                                <strong>Translate:</strong>
                                                            </div>
                                                            <div className="col-sm-10">
                                                                <span dangerouslySetInnerHTML={{__html: this.getText(message.translation)}} />
                                                            </div>
                                                        </div>
                                                }
                                                <div className="row form-group">
                                                    <div className="col-sm-2">
                                                        <strong>Attachment:</strong>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="row">
                                                            {
                                                                message.attachment && message.attachment.length
                                                                ?  message.attachment.map((item, key) => {
                                                                        return  <div key={key} className="col-xs-6">
                                                                                    <div className="attachmentWrap">
                                                                                        <img onClick={this.showPhoto(item)} className="img-responsive pointer" src={item.img} alt="" />
                                                                                        {
                                                                                            item.confirm !== '1' && ! message.my && role === 'client' && type !== 'draft'
                                                                                            &&  <span className="attachBtnWrap">
                                                                                                    <BtnMain
                                                                                                        type="button"
                                                                                                        bsStyle="success"
                                                                                                        text="Accept"
                                                                                                        onClick = {this.buyPhoto(item.id)} />
                                                                                                </span>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                    })
                                                                : null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        :   <div className="col-sm-10">
                                                <strong>To: </strong> {newMessage.first_name}
                                            </div>
                                    }
                                </div>
                                <div>
                                    <div className="form-group">
                                        <Textarea
                                            counter={4500}
                                            inputRef={ref => { this.message = ref }}
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                            placeholder="Message" />
                                    </div>
                                    <div className="form-group">
                                        <BtnMain
                                            bsStyle="success"
                                            text="Save to drafts"
                                            onClick={this.saveDraft(data.member_id)} />
                                        &nbsp;
                                        <BtnMain
                                            bsStyle="success"
                                            text={type === 'incoming' ? 'Reply' : 'Send'}
                                            onClick={this.send(data.member_id)} />
                                        <UploadDropdown />
                                    </div>
                                </div>
                            </div>
                        :   <Loader />
                    }
	                <Alert />
                    <FullScreenPreview src={this.state.src} show={this.state.show} onClose={this.closePreview} />
                </PrivateLayout>
            </Layout>
        );
    }
}

const mapStateToProps = state =>
    ({
        role: state.user.data.role,
        userName: state.user.data.first_name,
        userId: state.user.data.id,
        message: state.message.message,
        newMessage: state.message.newMessage,
        attach: state.message.attach,
        userCredits: state.user.data.credits,
    })


export default connect(mapStateToProps)(Message)