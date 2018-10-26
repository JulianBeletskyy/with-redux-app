import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { API_URL } from '../config'
import { logout } from '../actions/auth'

class MyApp extends App {
  	componentDidMount() {
  		const { reduxStore } = this.props
  		const { user: {token} } = reduxStore.getState()
		if (token) {
			fetch(`${API_URL}/login/check`, {headers: {'Authorization': `Bearer ${token}`}}).then(({redirected}) => {
				if (redirected) {
					reduxStore.dispatch(logout()).then(res => window.location.href = '/')
				}
			})
		}
  	}

	render() {
		const {Component, pageProps, reduxStore} = this.props
		return (
		  	<Container>
				<Provider store={reduxStore}>
			  		<Component {...pageProps} />
				</Provider>
		  	</Container>
		)
	}
}
export default withReduxStore(MyApp)
