import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import MainModal from '../components/modal'
import Credits from '../components/forms/credits'
import Membership from '../components/forms/membership'
import Alert from '../components/alert'
import { isAuthentificate } from '../utils'
import { setTimeoutValue } from '../actions/auth'

class Layout extends Component {
	constructor(props) {
		super(props)
		/*const { token, dispatch, timeout } = props
		if (token && !timeout) {
			isAuthentificate()
			dispatch(setTimeoutValue(true))
		}*/
	}
	componentDidMount() {
		const { token, dispatch, timeout } = this.props
		if (token && !timeout) {
			isAuthentificate()
			dispatch(setTimeoutValue(true))
		}
	}
	render() {
		const { children, credits, membership, country, token, active } = this.props
		return (
			<div>
				<header>
					<Header />
			    </header>
			    <main className="main-layout">
			      { children }
			    </main>
			    <footer>
			    	{ (!token && country === 'UA') || (token && !active) ? null : <Footer /> }
			    </footer>
			    <MainModal
                    body={<Credits />}
                    title="Dibs"
                    show={credits}
                    keyModal="credits" />
                <MainModal
                    body={<Membership />}
                    title="Membership"
                    show={membership}
                    className="plans-modal"
                    size="lg"
                    keyModal="membership" />
                <Alert />
		    </div>
		)
	}
}

const mapStateToProps = state =>
    ({
        credits: state.ui.modals.credits,
        membership: state.ui.modals.membership,
        token: state.user.token,
        country: state.signup.country,
        timeout: state.user.timeout,
        active: state.user.data.active,
    })

export default connect(mapStateToProps)(Layout)