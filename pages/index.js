import React, { Component } from 'react'
import { connect } from 'react-redux'
import { activateUser } from '../actions/auth'
import Header from '../components/header'
import Layout from '../layouts'
import Landing from '../components/Landing.js'
import Client from './main/client'

class Index extends Component {
	static async getInitialProps({query}) {
	    return {hash: query.hash}
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
		const { dispatch, hash } = this.props
		this.deviceId()
		if (hash) {
			dispatch(activateUser(hash))
		}
	}

	render () {
		const { token } = this.props
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
		token: state.user.token
	})

export default connect(mapStateToProps)(Index)
