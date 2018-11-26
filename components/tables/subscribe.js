import React, { Component } from 'react'
import { connect } from 'react-redux'
import BtnMain from '../../components/buttons/btn_main'
import { toggleModal, setUiKey } from '../../actions/ui'
import MainModal from '../../components/modal'
import Subscribe from '../../components/forms/subscribe'

class SubscribeTable extends Component {
	state = {
        titleSubscribe: '',
    }

	openSubscribe = plan => e => {
        const { token, dispatch } = this.props
        this.setState({titleSubscribe: plan})
        dispatch(toggleModal(true, 'subscribe'))
    }

	render() {
		const { subscribe } = this.props

		return (
			<div className="table-responsive">
                <table className="table table-bordered table-striped text-center">
                    <thead>
                        <tr>
                            <th className="text-left">Membership Benefits</th>
                            <th className="text-center">Gold</th>
                            <th className="text-center">Platinum</th>
                            <th className="text-center">VIP</th>
                        </tr>
                    </thead>
                    <tbody>
                    	<tr>
                    		<td className="text-left"><strong>Free Dibs</strong></td>
                    		<td><strong>10 dibs per month</strong></td>
                    		<td><strong>20 dibs per month</strong></td>
                    		<td><strong>30 dibs per month</strong></td>
                    	</tr>
                        <tr>
                            <td className="text-left">Video Call</td>
                            <td>-</td>
                            <td>-</td>
                            <td>20 minutes per month</td>
                        </tr>
                        <tr>
                            <td className="text-left">Expression of Interest</td>
                            <td>+</td>
                            <td>+</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td className="text-left">Send Letter -1st Letter FREE</td>
                            <td>+</td>
                            <td>+</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td className="text-left">% Discount on ALL dib Packages</td>
                            <td>10% Discount</td>
                            <td>20% Discount</td>
                            <td>30% Discount</td>
                        </tr>
                        <tr>
                            <td className="text-left">View Photos in Profiles</td>
                            <td>+</td>
                            <td>+</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td className="text-left">View Videos in Profiles</td>
                            <td>+</td>
                            <td>+</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td className="text-left">Save Profile Photos</td>
                            <td>3 Included</td>
                            <td>5 Included</td>
                            <td>10 Included</td>
                        </tr>
                        <tr>
                            <td className="text-left">Accept/Send Private Photos FREE*</td>
                            <td>10 photos per month</td>
                            <td>15 photos per month</td>
                            <td>25 photos per month</td>
                        </tr>
                        <tr>
                            <td className="text-left">Share Contact Info **</td>
                            <td>-</td>
                            <td>-</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td className="text-left">Price</td>
                            <td>$15.99 Monthly</td>
                            <td>$29.99 Monthly</td>
                            <td>$59.99 Monthly</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                               <BtnMain
                                    bsStyle="success"
                                    text="Subscribe"
                                    onClick={this.openSubscribe('gold')} /> 
                            </td>
                            <td>
                               <BtnMain
                                    bsStyle="success"
                                    text="Subscribe"
                                    onClick={this.openSubscribe('platinum')} /> 
                            </td>
                            <td>
                               <BtnMain
                                    bsStyle="success"
                                    text="Subscribe"
                                    onClick={this.openSubscribe('vip')} /> 
                            </td>
                        </tr>
                    </tbody>
                </table>
                <MainModal
                    body={<Subscribe name={this.state.titleSubscribe} />}
                    title={this.state.titleSubscribe}
                    show={subscribe}
                    keyModal="subscribe" />
            </div>
		)
	}
}

const mapStateToProps = ({user, ui: {modals}}) => ({token: user.token, subscribe: modals.subscribe})

export default connect(mapStateToProps)(SubscribeTable)