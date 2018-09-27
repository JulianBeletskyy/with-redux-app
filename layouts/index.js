import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Header from '../components/header'
import MainModal from '../components/modal'
import Credits from '../components/forms/credits'
import Membership from '../components/forms/membership'
import Alert from '../components/alert'
import { startChecker } from '../utils'
import { isAuthentificate } from '../utils'

class Layout extends Component {
	constructor(props) {
		super(props)
		const { token, dispatch } = props
		if (token) {
			isAuthentificate()
		}
	}
	render() {
		const { children, credits, membership } = this.props
		return (
			<div>
				<header>
					<Header />
			    </header>
			    <main className="main-layout">
			      { children }
			    </main>
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
        token: state.user.token
    })

export default connect(mapStateToProps)(Layout)