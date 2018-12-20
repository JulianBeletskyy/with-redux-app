import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import BtnUpload from '../buttons/btn_upload'
import BtnSignUp from '../buttons/btn_signup'
import BtnFacebook from '../buttons/btn_facebook'
import BtnGoogle from '../buttons/btn_google'
import { setSignupKey, skipStep, sendSignUpThree } from '../../actions/signup'
import { setAlert } from '../../actions/ui'
import Cropper from 'react-cropper'
import Head from 'next/head'

export class StepAvatar extends Component {

	onDrop = files => {
    	const { dispatch } = this.props
        dispatch(setSignupKey('file', files[files.length - 1]))
        let reader = new FileReader();
        reader.readAsDataURL(files[files.length - 1])
        reader.onload = () => {
            dispatch(setSignupKey('avatar', reader.result))
        }
    }

    facebookSignUp = () => {
        const { dispatch } = this.props

        window.FB.login(response => {
            window.FB.api('/me', {fields: ['picture.width(2048)']}, response => {
                if (response.picture.data.url) {
                    fetch(response.picture.data.url).then(res => {
                        const result = res.blob()
                        result.then(responseImg => {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                                dispatch(setSignupKey('avatar', reader.result))
                            }
                            reader.readAsDataURL(responseImg)
                        })
                    })
                }  
            });
        }, {scope: 'public_profile, email'});
    }

    googleInit = () => {
        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                'client_id': '302424178229-bknqjip1oet2lt421171ck6sl1l9li4o.apps.googleusercontent.com',
                'cookiepolicy': 'single_host_origin',
                'scope': 'profile email'
            });
            const element = document.getElementById('google')

            auth2.attachClickHandler(element, {}, this.googleSignUp)
       })
    }

    googleSignUp = googleUser => {
        const { dispatch } = this.props
        dispatch(setSignupKey('avatar', googleUser.w3.Paa))
    }

    skip = () => {
    	const { dispatch } = this.props
        dispatch(skipStep(4, this.props.custom_remember_token))
        dispatch(setSignupKey('step', 3))
    }

    prevStep = () => {
        const { dispatch } = this.props
        const step = this.props.role === 'client' ? 7 : 5
        dispatch(setSignupKey('step', step))
    }

    getSignUpThree = () => {
        gtag('event', '4step', {'event_category': '4step', 'event_action': 'registraciya7'}) // google metrics

        const { dispatch } = this.props
        if (! this.refs.cropper && this.props.role === 'client') {
            this.skip()
            return
        } else if (! this.refs.cropper) {
            dispatch(setAlert('Avatar is required', 'error'))
            return
        }
        
        const crop = this.refs.cropper.getData()

        const data = {
            width: crop.width.toFixed(),
            height: crop.height.toFixed(),
            x: crop.x.toFixed(),
            y: crop.y.toFixed(),
            avatar: this.props.avatar,
            custom_remember_token: this.props.custom_remember_token
        }
        const step = this.props.role === 'client' ? 3 : 6

    	dispatch(sendSignUpThree(data, step, this.props.role))
        
    }

    componentDidMount() {
        this.googleInit()
        /*const el = document.getElementById('register-3step')
        if (el) {
            el.setAttribute('onclick', "ga('send', 'event', '3step', 'registraciya'); return true;")
        }*/
    }

    render() {
    	const content = this.props.avatar
	    	? 	<Cropper
		            ref='cropper'
		            src={this.props.avatar}
		            style={{ height: '200px', width: '100%', margin: '0 auto' }}
		            aspectRatio={1 / 1}
		            guides={false}
		            background={false} /> 
	        : 	<img src="/static/assets/img/default-avatar.jpg" className="default-avatar" alt="" />

        return (
            <form noValidate={true}>
                <Head>
                    <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/cropper.css"/>
                </Head>
                <Row>
                    <Col xs={12} className="text-center">
                        <FormGroup>
                            <h3 className="title">Choose and load primary photo to your profile</h3>
                        </FormGroup>
                    </Col>
                    <Col sm={5}>
                        <div className="upload-btn-group">
                            <FormGroup>
                                <BtnUpload
                                    className="w-100"
                                    onChange={this.onDrop}
                                    text="upload photo" />
                            </FormGroup>
                            <FormGroup>
                                <BtnFacebook
                                    title="Upload from Facebook" onClick={this.facebookSignUp} />
                            </FormGroup>
                            <FormGroup>
                                <BtnGoogle
                                    title="Upload from Google" />
                            </FormGroup>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <div className="title text-center text-step-two">
                            <FormGroup className="text-center">
                                <span className="small-italic">
                                    Use A Clear Photo <br />
                                    Be Alone In Your Photo <br />
                                    Be In A Well-Lit Place</span>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col sm={5}>
                        <FormGroup>
                            { content }
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup className="text-center position-relative">
                    <BtnSignUp
                        text="Prev"
                        orientation="left"
                        onClick={this.prevStep} />
                    <BtnSignUp
                        id="register-3step"
                        text="Next"
                        orientation="right"
                        onClick={this.getSignUpThree} />
                        { this.props.role === 'client' && <a href="javascript:;" className="skip-link" onClick={this.skip}>Skip</a> }
                </FormGroup>
            </form>
        );
    }
}

const mapStateToProps = state =>
	({
	    role: state.signup.data.role,
	    avatar: state.signup.avatar,
	    custom_remember_token: state.signup.custom_remember_token,
	})

export default connect(mapStateToProps)(StepAvatar)