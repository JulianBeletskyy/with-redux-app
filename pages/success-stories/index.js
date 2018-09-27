import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap'
import Layout from '../../layouts/stories'
import { getStories } from '../../actions/landing'
import fetch from 'isomorphic-unfetch'
import { API_URL } from '../../config'

class SuccessStories extends Component {
	static getInitialProps ({ reduxStore, req }) {
		console.log(reduxStore)
		console.log(req)
		//const isServer = !!req

		return {}
  	}

	constructor(props) {
		super(props)
		const { dispatch } = props
		dispatch(getStories())

	}

	render() {
		
		return (
			<Layout>
				<h1 className="font-bebas">Success Stories</h1>
                <p>Note: <span className="small-italic">We are glad to share great successful love stories with you, although most of couples prefer to keep Happiness in Silence. With that we post only some of those couples who gave us personal permission.</span></p>
                <hr />
            	<Row>
                   <div>List</div>
                   
                </Row>
        	</Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        
    })

export default connect(
    mapStateToProps
)(SuccessStories)