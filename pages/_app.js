import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import Socket from '../components/socket'

class MyApp extends App {
	render() {
		const {Component, pageProps, reduxStore} = this.props
		return (
		  	<Container>
				<Provider store={reduxStore}>
			  		<Component {...pageProps} />
				</Provider>
				<Socket store={reduxStore} />
		  	</Container>
		)
	}
}
export default withReduxStore(MyApp)
