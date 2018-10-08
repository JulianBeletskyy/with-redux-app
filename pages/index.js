import React, { Component } from 'react'
import { connect } from 'react-redux'
import { activateUser, setRecoveryHash } from '../actions/auth'
import Header from '../components/header'
import Layout from '../layouts'
import Landing from '../components/Landing.js'
import Client from './main/client'
import { toggleModal } from '../actions/ui'

class Index extends Component {
	static async getInitialProps({query}) {
	    return {hash: query.hash, recovery: query.recovery}
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
		const { dispatch, hash, recovery } = this.props
		this.deviceId()
		if (hash) {
			dispatch(activateUser(hash))
		}
		if (recovery) {
			dispatch(setRecoveryHash(recovery))
			dispatch(toggleModal(true, 'recovery'))
		}
	}

	render () {
		const { token, active } = this.props
		return (
			<div className="App">
				<Layout>
					{token ? <Client /> : <Landing />}
				</Layout>
			</div>
		)
	}
}

const mapStateToProps = state =>
	({
		token: state.user.token,
		active: state.user.data.active,
	})

export default connect(mapStateToProps)(Index)