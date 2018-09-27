import React, { Component } from 'react'
import Validator from '../../validate'
import { FormGroup } from 'react-bootstrap'
import TextField from '../inputs/text_field'
import BtnMain from '../buttons/btn_main'
import store from '../../store'
import { sendRecovery } from '../../actions/auth'
import { toggleModal } from '../../actions/ui'

class Recovery extends Component {

    recovery = () => {
        let error = 1
        error *= Validator.check(this.email.value, ['required', 'email'], 'Email')
        if (error) {
            const data = {
                email: this.email.value,
                url: window.location.href + 'recovery/{hash}'
            }
            store.dispatch(sendRecovery(data)).then(res => {
                if (res) {
                    store.dispatch(toggleModal(false, 'recovery'))
                }
            })
        }
    }

    render() {
        return (
            <form noValidate={true}>
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
            </form>
        )
    }
}

export default Recovery
