import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PAYPAL_EMAIL } from '../../config'
import { getMemberships } from '../../actions/membership'
import PlanItem from '../block/plan_item'

export class Membership extends Component {
	constructor() {
        super()
        this.user = {}
        this.state = {
            plan: {
                id: 0,
                name: '',
                amount: 0.00,
                period: 0,
                user_id: 0,
                value_id: 0
            },
            currency: 'USD'
        }
    }

    printPlans = (plan, i) => {
    	return <div className="col-lg-3 col-md-6" key={i}><PlanItem onChoose={this.setForm} options={plan} /></div>
    }

    setForm = param => {
    	const { membership, userId } = this.props
        const plan = membership.find(i => i.id == param.membership_id)

        this.setState({
            plan : {
                id: param.membership_id,
                name: plan.name,
                period: param.month,
                amount: param.one_payment,
                user_id: userId,
                value_id: param.id
            }
        }, () => {
           this.refs.createSubscription.submit()
        })
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getMemberships())
    }

    render() {
    	const { membership } = this.props
        return (
            <div className="row">
                <form ref="createSubscription" action="https://www.paypal.com/cgi-bin/websc" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                    <input type="hidden" name="business" value={ PAYPAL_EMAIL } />
                    <input type="hidden" name="item_name" value={ this.state.plan.name } />
                    <input type="hidden" name="no_note" value="1" />
                    <input type="hidden" name="no_shipping" value="1" />
                    <input type="hidden" name="return" value={ 'http://' + window.location.host } />
                    <input type="hidden" name="src" value="1" />
                    <input type="hidden" name="a3" value={ this.state.plan.amount } />
                    <input type="hidden" name="p3" value={ this.state.plan.period } />
                    <input type="hidden" name="t3" value="M" />
                    <input id="customData" type="hidden" name="custom" value={ JSON.stringify(this.state.plan) } />
                    <input type="hidden" name="currency_code" value={ this.currency } />
                </form>
                { membership.map((plan, i) => this.printPlans(plan, i)) }
            </div>
        )
    }
}

const mapStateToProps = state =>
	({
	    membership: state.membership.membership,
	    userId: state.user.data.id,
	})

export default connect(mapStateToProps)(Membership)