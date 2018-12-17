import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/header'
import Footer from '../components/footer'
import Alert from '../components/alert'
import loadable from '@loadable/component'

const MainModal = loadable(() => import('../components/modal'))
const Credits = loadable(() => import('../components/forms/credits'))

class Layout extends Component {
    getImage = link => {
        const { userAgent } = this.props
        if( /firefox/i.test(userAgent) )
          return link
        else if( /chrome/i.test(userAgent) )
          return link.replace('jpg', 'webp')
        else if( /safari/i.test(userAgent) )
          return link
        else if( /msie/i.test(userAgent) )
          return link
        else
          return link
    }
	render() {
		const { children, credits, country, token, active } = this.props
		return (
			<div>
				<header>
					<Header />
			    </header>
			    <main className="main-layout" style={{backgroundImage: `url(${this.getImage('https://d2etktq4v0899q.cloudfront.net/static/assets/img/image.jpg')})`}}>
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