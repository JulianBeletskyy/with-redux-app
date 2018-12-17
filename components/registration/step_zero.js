import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Radio } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import SelectField from '../inputs/select_field'
import Autocomplete from '../inputs/autocomplete'
import CheckboxField from '../inputs/checkbox_field'
import BtnSignUp from '../buttons/btn_signup'
import BtnFacebook from '../buttons/btn_facebook'
import BtnGoogle from '../buttons/btn_google'
import { setUiKey, getOptions, MyCountry } from '../../actions/ui'
import { setSignupDataKey, sendSignUpBefore, sendSignUpStart, setSignupKey } from '../../actions/signup'
import Validator from '../../validate'
import { monthArray, dayArray, yearArray } from '../../utils'

export class StepZero extends Component {
	constructor(props) {
		super(props)
		this.signup = {
            role: props.role,
            birth: {}
        }
        this.role = {}
        this.USState = ''

		this.state = {
			gender: 'client',
            social: false
		}
	}

    facebookSignUp = () => {
        gtag('event', 'facebook', {'event_category': 'facebook', 'event_action': 'registraciya2'}) // google metrics
        const { dispatch } = this.props
        window.FB.login(response => {
            window.FB.api('/me', {fields: ['first_name, last_name, email, picture.width(2048), gender, locale']}, response => {
                if (response.first_name) {
                    this.signup.first_name.value = response.first_name
                    this.signup.last_name.value = response.last_name
                    this.signup.email.value = response.email
                    this.role.female.checked = response.gender === 'female'
                    this.role.male.checked = response.gender === 'male'

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

                    const data = {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        email: response.email,
                        role: response.gender === 'female' ? 'girl' : 'client'
                    }
                    this.signup.role = data.role
                    dispatch(setSignupDataKey(data))
                }  
            });
        }, {scope: 'public_profile, email'});
    }

    googleInit = () => {
        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                'client_id': '567378795616-ng6a5sqd13t0ii0a9c5jcv8emrv3fc1g.apps.googleusercontent.com',
                'cookiepolicy': 'single_host_origin',
                'scope': 'profile email'
            });
            const element = document.getElementById('google')

            auth2.attachClickHandler(element, {}, this.googleSignUp)
       })
    }

    googleSignUp = googleUser => {
        gtag('event', 'google', {'event_category': 'google', 'event_action': 'registraciya3'}) // google metrics
        const { dispatch } = this.props

        this.signup.first_name.value = googleUser.w3.ofa
        this.signup.last_name.value = googleUser.w3.wea
        this.signup.email.value = googleUser.w3.U3

        const data = {
            first_name: googleUser.w3.ofa,
            last_name: googleUser.w3.wea,
            email: googleUser.w3.U3,
        }
        dispatch(setSignupDataKey(data))
        dispatch(setSignupKey('avatar', googleUser.w3.Paa))
    }

    getArray = array => {
        const temp = array.map(item => ({value: item.country_code, name: item.country_name}))
        return [{ 'value': '', 'name': 'Choose Country' }, ...temp]
    }

    toggleRole = ({currentTarget: {value}}) => {
    	this.signup.role = value
        this.setState({
            gender: value
        })
    }

    handleChangeCountry = value => {
        const { dispatch } = this.props
        dispatch(setSignupDataKey({'country': value}))
        this.signup.city.value = ''
    }

    setUSState = val => {
        this.USState = val
    }

    sendPreSignUp = () => {
        const data = {
            first_name: this.signup.first_name.value,
            last_name: this.signup.last_name.value,
            email: this.signup.email.value,
            role: this.signup.role,
            password: this.signup.password.value,
        }
        const { dispatch } = this.props 
        dispatch(sendSignUpBefore(data))
    }

    resolveRegistration = () => {
        const { dispatch, showRegistration, custom_remember_token } = this.props
        if (!showRegistration) {
            gtag('event', 'start', {'event_category': 'start', 'event_action': 'registraciya1'}) // google metrics
            dispatch(setUiKey('showRegistration', true))
            this.sendPreSignUp()
            const el = document.getElementById('register-btn')
            if (el) {
                el.setAttribute('onclick', "ga('send', 'event', '1step', 'registraciya'); return true;")
            }
            
            return
        }
        gtag('event', '1step', {'event_category': '1step', 'event_action': 'registraciya4'}) // google metrics
        let error = 1
        for (var k in this.signup.birth) {
            if (error) {
                error *= Validator.check(this.signup.birth[k].value, ['required'], 'Birthday')
            }
        }

        error *= Validator.check(this.signup.first_name.value, ['required', 'string', 'alphabet'], 'First Name')
        error *= Validator.check(this.signup.last_name.value, ['required', 'string', 'alphabet'], 'Last Name')
        error *= Validator.check(this.signup.email.value, ['required', 'email'], 'Email')
        error *= Validator.check(this.signup.password.value, ['required'], 'Password')
        error *= Validator.check(this.signup.country.value, ['required'], 'Country')
        error *= Validator.check(this.signup.city.value, ['required'], 'City')

        if (this.signup.role === 'client') {
            error *= Validator.check(this.signup.terms.checked, ['checked'], 'Terms & Privacy')
        }

        if (this.signup.role === 'girl') {
            error *= Validator.check(this.signup.mobile.value, ['required'], 'Phone')
        }

        if (error) {
            let data = {
                first_name: this.signup.first_name.value,
                last_name: this.signup.last_name.value,
                role: this.signup.role,
                birth: {
                    month: this.signup.birth.month.value,
                    day: this.signup.birth.day.value,
                    year: this.signup.birth.year.value
                },
                country: this.signup.country.value,
                city: this.signup.city.value,
                state: this.signup.country.value === 'US' ? this.USState : '',
                email: this.signup.email.value,
                password: this.signup.password.value,
            }

            if (custom_remember_token) {
                data.custom_remember_token = custom_remember_token
            }

            if (this.signup.role === 'client') {
                data.terms = this.signup.terms.checked
            }

            if (this.signup.role === 'girl') {
                data = {...data, 
                    facebook: this.signup.facebook.value,
                    vk: this.signup.vk.value,
                    other_social: this.signup.other_social.value,
                    mobile: this.signup.mobile.value
                }
            }

            const step = this.signup.role === 'client' ? 1 : 8

            dispatch(sendSignUpStart(data, step))
        }
    }

    initGoogleAnalytics = () => {
        const el = document.getElementById('register-btn')
        if (el) {
            el.setAttribute('onclick', "ga('send', 'event', 'start', 'registraciya'); return true;")
        }
        const fbBtn = document.getElementById('facebook-btn')
        if (fbBtn) {
            fbBtn.setAttribute('onclick', "ga('send', 'event', 'facebook', 'registraciya'); return true;")
        }
        const googleBtn = document.getElementById('google')
        if (googleBtn) {
            googleBtn.setAttribute('onclick', "ga('send', 'event', 'google', 'registraciya'); return true;")
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getOptions('countries')).then(res => {
            if (res) {
                dispatch(MyCountry())
            }
        })
        this.googleInit()
    }

    render() {
    	const {
            role,
            first_name,
            last_name,
            email,
            password,
            birth,
            country,
            city,
            terms,
            mobile,
            facebook,
            vk,
            other_social,
            showRegistration,
            countries
        } = this.props

    	const col = showRegistration ? 6 : 12
        return (
            <form noValidate={true}>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <div className="text-center title">
                                <span className="spanMale">Male</span>
                                <Radio 
                                    name="sex" 
                                    value="client"
                                    defaultChecked={role !== 'girl'}
                                    onChange={this.toggleRole}
                                    inputRef={ref => { this.role.male = ref }}
                                    className="gender"
                                    inline >
                                    <i className="fas fa-mars fa-2x"></i>
                                </Radio>
                                <Radio 
                                    name="sex" 
                                    value="girl"
                                    defaultChecked={role === 'girl'}
                                    onChange={this.toggleRole}
                                    inputRef={ref => { this.role.female = ref }}
                                    className="gender"
                                    inline >
                                    <i className="fas fa-venus fa-2x"></i>
                                </Radio>
                                <span className="spanFemale">Female</span>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-md-${col}`}>
                        <div className="row">
                            <div className={`col-sm-${col}`}>
                                <div className="form-group">
                                    <TextField
                                        placeholder="First Name"
                                        inputRef={ref => { this.signup.first_name = ref }}
                                        value={first_name}
                                        name="First Name"
                                        social={this.state.social} />
                                </div>
                            </div>
                            <div className={`col-sm-${col}`}>
                                <div className="form-group">
                                    <TextField
                                        placeholder="Last Name"
                                        inputRef={ref => { this.signup.last_name = ref }}
                                        name="Last Name"
                                        value={last_name}
                                        social={this.state.social}
                                        description={'* Your last name is not visible.'} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <TextField
                                type="email"
                                placeholder="Enter email"
                                inputRef={ref => { this.signup.email = ref }}
                                social={this.state.social}
                                value={email} />
                        </div>
                        <div className="form-group">
                            <TextField
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                inputRef={ref => { this.signup.password = ref }}
                                value={password} />
                        </div>
                        {
                            this.signup.role === 'girl' 
                            && 	<div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <SelectField
                                                    inputRef={ref => { this.signup.birth.month = ref }}
                                                    options={monthArray()}
                                                    value={birth.month} />
                                            </div>
                                            <div className="col-sm-4">
                                                <SelectField
                                                    inputRef={ref => { this.signup.birth.day = ref }}
                                                    options={dayArray()}
                                                    value={birth.day} />
                                            </div>
                                            <div className="col-sm-4">
                                                <SelectField
                                                    inputRef={ref => { this.signup.birth.year = ref }}
                                                    options={yearArray()}
                                                    value={birth.year} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            placeholder="Phone"
                                            inputRef={ref => { this.signup.mobile = ref }}
                                            value={mobile} />
                                    </div>
                                </div>
                        }  
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className={`rightPart ${showRegistration && 'active'}`}>
                            {
                                this.state.gender === 'client'
                                &&   <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <SelectField
                                                    inputRef={ref => { this.signup.birth.month = ref }}
                                                    options={monthArray()}
                                                    value={birth.month} />
                                            </div>
                                            <div className="col-sm-4">
                                                <SelectField
                                                    inputRef={ref => { this.signup.birth.day = ref }}
                                                    options={dayArray()}
                                                    value={birth.day} />
                                            </div>
                                            <div className="col-sm-4">
                                                <SelectField
                                                    inputRef={ref => { this.signup.birth.year = ref }}
                                                    options={yearArray()}
                                                    value={birth.year} />
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div className="form-group">
                                <SelectField
                                    inputRef={ref => { this.signup.country = ref }}
                                    options={this.getArray(countries)}
                                    value={country}
                                    name="country"
                                    onChange={this.handleChangeCountry}
                                    city={this.signup.city} />
                            </div>
                            <div className="form-group">
                                <Autocomplete 
                                    inputRef={ref => { this.signup.city = ref }}
                                    placeholder="City"
                                    country={country}
                                    setUSState={this.setUSState}
                                    value={city} />
                            </div>
                            {
                                this.signup.role === 'girl'
                                &&   <div>
                                        <div className="form-group">
                                            <TextField
                                                placeholder="Facebook"
                                                inputRef={ref => { this.signup.facebook = ref }}
                                                value={facebook} />
                                        </div>
                                        <div className="form-group">
                                            <TextField
                                                placeholder="VK"
                                                inputRef={ref => { this.signup.vk = ref }}
                                                value={vk} />
                                        </div>
                                        <div className="form-group">
                                            <TextField
                                                placeholder="Other social media"
                                                inputRef={ref => { this.signup.other_social = ref }}
                                                value={other_social} />
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="text-center col-xs-12">
                        {
                            this.signup.role === 'client'
                            &&   <CheckboxField
                                    inputRef={ref => { this.signup.terms = ref }}
                                    text={<span>By clicking "Join Us for Free" above you agree to <a href="/terms" target="_blank">"Terms of Use" & "Privacy Policy"</a></span>}
                                    value={terms} />
                        }
                        <div className="form-group">
                            <BtnSignUp
                                text="Join Us for Free"
                                orientation="right"
                                id="register-btn"
                                onClick={this.resolveRegistration} />
                        </div>
                        <div className="form-group">
                        </div>
                        {
                            this.signup.role === 'client'
                            &&   <div className="form-group">
                                    <h4 className="">Join With</h4>
                                    <div className="social-button text-center">
                                        <div className="form-group">
                                            <BtnFacebook id="facebook-btn" title="Join Up with Facebook" onClick={this.facebookSignUp} />
                                        </div>
                                        <div>
                                            <BtnGoogle id="google-btn" title="Join Up with Google" />
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state =>
	({
        first_name: state.signup.data.first_name,
        last_name: state.signup.data.last_name,
        role: state.signup.data.role,
        email: state.signup.data.email,
        password: state.signup.data.password,
        birth: state.signup.data.birth,
        country: state.signup.data.country,
        city: state.signup.data.city,
        terms: state.signup.data.terms,
        mobile: state.signup.data.mobile,
        facebook: state.signup.data.facebook,
        vk: state.signup.data.vk,
        other_social: state.signup.data.other_social,
        showRegistration: state.ui.showRegistration,
        countries: state.options.countries,
        custom_remember_token: state.signup.custom_remember_token,
	})

export default connect(mapStateToProps)(StepZero)