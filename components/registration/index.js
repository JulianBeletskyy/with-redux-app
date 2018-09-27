import React, { Component } from 'react'
import { connect } from 'react-redux'
import StepZero from './step_zero'
import StepOneClient from './step_one_client'
import StepTwoClient from './step_two_client'
import StepThreeClient from './step_three_client'
import StepAvatar from './step_avatar'
import StepConfirm from './step_confirm'
import StepOneGirl from './step_one_girl'
import StepTwoGirl from './step_two_girl'
import StepThreeGirl from './step_three_girl'

class Registration extends Component {

    render() {
        const { step } = this.props.signup
        let content = <div></div>
        switch (step) {
            case 1:
                content = <StepOneClient />
                break
            case 7:
                content = <StepTwoClient />
                break
            case 2: 
                content = <StepAvatar />
                break
            case 3:
                content = <StepThreeClient />
                break
            case 4:
                content = <StepConfirm />
                break
            case 8:
                content = <StepOneGirl />
                break
            case 5: 
                content = <StepTwoGirl />
                break
            case 6:
                content = <StepThreeGirl />
                break
            default: content = <StepZero />
        }

        return (
            <div>
                { content }
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        signup: {
            step: state.signup.step
        }
    })

export default connect(
    mapStateToProps
)(Registration);