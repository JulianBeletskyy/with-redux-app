import React, { Component } from 'react'
import { connect } from 'react-redux'
import { activateUser, setRecoveryHash, loginWithHash } from '../actions/auth'
import Layout from '../layouts'
import { toggleModal } from '../actions/ui'
import { Router } from '../routes'
import loadable from '@loadable/component'
import Loader from '../components/loader'

const MainModal = loadable(() => import('../components/modal'))
const Client = loadable(() => import('./main/client'), {fallback: <Loader />})
const Landing = loadable(() => import('../components/Landing'), {fallback: <div style={{minHeight: '100vh'}}></div>})

class Index extends Component {
	static async getInitialProps({query, req}) {
		const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
	    return {
	    	hash: query.hash,
	    	recovery: query.recovery,
	    	redirect: query.paypal,
	    	loginHash: query.loginHash,
	    	userAgent: userAgent,
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
		if (redirect === 'login') {
			Router.push('/')
			dispatch(toggleModal(true, 'login'))
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
		const { token, active, paypal, userAgent } = this.props
		return (
			<div className="App">
				<Layout userAgent={userAgent}>
					{token ? <Client /> : <Landing userAgent={userAgent} />}
				</Layout>
				{
					paypal
					? 	<MainModal
		                    body={<div>Dear Sir, your payment is pending. Please, wait until PayPal aproves your purchase. As soon as your payment completed, you will be able to use your Membership and all privilleges it gives.</div>}
		                    title="PayPal"
		                    show={paypal}
		                    keyModal="paypal" />
					: 	null
				}
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