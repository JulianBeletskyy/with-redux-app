import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/header'
import Footer from '../components/footer'
import Alert from '../components/alert'
import loadable from '@loadable/component'
import { getImage } from '../utils'

const MainModal = loadable(() => import('../components/modal'))
const Credits = loadable(() => import('../components/forms/credits'))

class Layout extends Component {
	render() {
		const { children, credits, country, token, active, userAgent } = this.props
		return (
			<div>
				<header>
					<Header />
			    </header>
			    <main 
                    className="main-layout"
                    style={{backgroundImage: `url(${getImage('https://d2etktq4v0899q.cloudfront.net/static/assets/img/image.jpg', userAgent)})`}}>
			      { children }
			    </main>
			    <footer>
			    	{ (!token && country === 'UA') || (token && !active) ? null : <Footer /> }
			    </footer>
                {
                    credits
                    ?   <MainModal
                            body={<Credits />}
                            title="Dibs"
                            show={credits}
                            keyModal="credits" />
                    :   null
                }
                <Alert />
		    </div>
		)
	}
}

const mapStateToProps = state =>
    ({
        credits: state.ui.modals.credits,
        token: state.user.token,
        country: state.signup.country,
        active: state.user.data.active,
    })

export default connect(mapStateToProps)(Layout)