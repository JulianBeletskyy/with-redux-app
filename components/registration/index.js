import React, { Component } from 'react'
import { connect } from 'react-redux'
import StepZero from './step_zero'
import loadable from '@loadable/component'

const StepOneClient = loadable(() => import('./step_one_client'))
const StepTwoClient = loadable(() => import('./step_two_client'))
const StepThreeClient = loadable(() => import('./step_three_client'))
const StepAvatar = loadable(() => import('./step_avatar'))
const StepConfirm = loadable(() => import('./step_confirm'))
const StepOneGirl = loadable(() => import('./step_one_girl'))
const StepTwoGirl = loadable(() => import('./step_two_girl'))
const StepThreeGirl = loadable(() => import('./step_three_girl'))

class Registration extends Component {

    render() {
        const { step } = this.props
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
            <div>{ content }</div>
        )
    }
}

const mapStateToProps = ({signup: {step}}) => ({step})

export default connect(mapStateToProps)(Registration)