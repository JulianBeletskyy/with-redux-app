import React, { Component } from 'react'
import { connect } from 'react-redux'
import { activateUser, setRecoveryHash, loginWithHash } from '../actions/auth'
import Header from '../components/header'
import Layout from '../layouts'
import Landing from '../components/Landing'
import Client from './main/client'
import { toggleModal } from '../actions/ui'
import MainModal from '../components/modal'
import { Router } from '../routes'

class Index extends Component {
	static async getInitialProps({query}) {
	    return {
	    	hash: query.hash,
	    	recovery: query.recovery,
	    	redirect: query.paypal,
	    	loginHash: query.loginHash,
	    }
  	}

	deviceId = () => {
        const localStorage = window.localStorage
        const deviceId = localStorage.getItem('deviceId')
        if (! deviceId) {
        	const temp = this.chr4() + this.chr4() + '-' + this.chr4() +'-' + this.chr4() +'-' + this.chr4() + '-' + this.chr4() + this.chr4() + this.chr4()
            localStorage.setItem('deviceId', temp)
        }
    }

    chr4 = () => Math.random().toString(16).slice(-4)

	componentDidMount() {
		const { dispatch, hash, recovery, redirect, loginHash } = this.props
		this.deviceId()
		if (hash) {
			dispatch(activateUser(hash))
		}
		if (recovery) {
			dispatch(setRecoveryHash(recovery))
			dispatch(toggleModal(true, 'recovery'))
		}
		if (redirect === 'paypal') {
			Router.push('/')
			dispatch(toggleModal(true, 'paypal'))
		}
		if (loginHash) {
			dispatch(loginWithHash(loginHash)).then(res => {
				if (res) {
					window.location.href = '/'
				}
			})
		}
	}

	render () {
		const { token, active, paypal } = this.props
		return (
			<div className="App">
				<Layout>
					{token ? <Client /> : <Landing />}
				</Layout>
				<MainModal
                    body={<div>Dear Sir, your payment is pending. Please, wait until PayPal aproves your purchase. As soon as your payment completed, you will be able to use your Membership and all privilleges it gives.</div>}
                    title="PayPal"
                    show={paypal}
                    keyModal="paypal" />
			</div>
		)
	}
}

const mapStateToProps = state =>
	({
		token: state.user.token,
		active: state.user.data.active,
		paypal: state.ui.modals.paypal,
	})

export default connect(mapStateToProps)(Index)