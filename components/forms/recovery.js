import React, { Component } from 'react'
import { connect } from 'react-redux'
import Validator from '../../validate'
import { FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import BtnMain from '../buttons/btn_main'
import { sendRecovery, updatePassword } from '../../actions/auth'
import { toggleModal, setAlert } from '../../actions/ui'

class Recovery extends Component {

    recovery = () => {
        const { dispatch, recoveryHash } = this.props
        let error = 1
        error *= Validator.check(this.email.value, ['required', 'email'], 'Email')
        if (error) {
            const data = {
                email: this.email.value,
                url: window.location.href + 'recovery/{hash}'
            }
            dispatch(sendRecovery(data)).then(res => {
                if (res) {
                    dispatch(toggleModal(false, 'recovery'))
                }
            })
        }
    }

    update = () => {
        const { dispatch, recoveryHash } = this.props
        let error = 1
        error *= Validator.check(this.new_password.value, ['required'], 'New password')
        error *= Validator.check(this.confirm_password.value, ['required'], 'Confirm password')

        if (error && this.new_password.value !== this.confirm_password.value) {
            dispatch(setAlert('The passwords aren\'t same, retype it one more time, please!', 'error'))
            error = 0
        }

        if (error) {
            const data = {
                'password': this.new_password.value,
                'password_confirmation': this.confirm_password.value
            }
            dispatch(updatePassword(data, recoveryHash)).then(res => {
                if (res) {
                    dispatch(toggleModal(false, 'recovery'))
                }
            })
        }
    }

    render() {
        const { recoveryHash } = this.props
        return (
            <form noValidate={true}>
                {
                    recoveryHash
                    ?   <div>
                           <FormGroup>
                                <TextField 
                                    type="password"
                                    placeholder="New password"
                                    inputRef={ref => { this.new_password = ref }} />
                            </FormGroup>

                            <FormGroup>
                                <TextField 
                                    type="password"
                                    placeholder="Confirm password"
                                    inputRef={ref => { this.confirm_password = ref }} />
                            </FormGroup>
                            <FormGroup className="text-center">
                                <BtnMain
                                    bsStyle="success"
                                    onClick={this.update}
                                    text="Recovery" />
                            </FormGroup>
                        </div>
                    :   <div>
                            <FormGroup>
                                <TextField 
                                    type="email"
                                    placeholder="Enter email"
                                    inputRef={ref => { this.email = ref }} />
                            </FormGroup>
                            <FormGroup className="text-center">
                                <BtnMain
                                    bsStyle="success"
                                    onClick={this.recovery}
                                    text="Recovery" />
                            </FormGroup>
                        </div>
                }
            </form>
        )
    }
}

const mapStateToProps = state => ({recoveryHash: state.user.recoveryHash})

export default connect(mapStateToProps)(Recovery)