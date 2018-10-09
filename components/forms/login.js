import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import BtnMain from '../buttons/btn_main'
import { toggleModal } from '../../actions/ui'
import { login } from '../../actions/auth'
import store from '../../store'
import { Router } from '../../routes'

class Login extends Component {
    constructor() {
        super()
        this.auth = {}
        this.state = {
            email: true,
            password: true,
            message: ''
        }
    }

    handleSubmit = e => {
    	e.preventDefault()
    	const data = {
            email: this.auth.email.value,
            password: this.auth.password.value
        }
        store.dispatch(login(data)).then(res => {
            if (res) {
                window.location.href = '/'
            }
        })
    }
    
    showRecovery = () => {
        store.dispatch(toggleModal(true, 'recovery'))
        store.dispatch(toggleModal(false, 'login'))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} noValidate={true}>
                <FormGroup>
                    <TextField 
                        type="email"
                        className={this.state.email !== true ? 'border-bottom-danger' : ''}
                        description={<span className="text-danger">{this.state.email}</span>}
                        placeholder="Enter email"
                        inputRef={ref => { this.auth.email = ref }} />
                </FormGroup>
                <div>&nbsp;</div>
                <FormGroup>
                    <TextField 
                        type="password"
                        className={this.state.password !== true ? 'border-bottom-danger' : ''}
                        description={<span className="text-danger">{this.state.password}</span>}
                        placeholder="Enter password"
                        inputRef={ref => { this.auth.password = ref }} />
                </FormGroup>
                <FormGroup className="text-right">
                    <span className="pull-left text-danger">{this.state.message}</span>
                    <a href="javascript:;" onClick={this.showRecovery}>Forgot password?</a>
                </FormGroup>
                <FormGroup className="text-center">
                    <BtnMain
                        type="submit"
                        bsStyle="success"
                        text="Log In"/>
                </FormGroup>
            </form>
        );
    }
}

export default Login