import React, { Component } from 'react'
import { Row, Grid, Col } from 'react-bootstrap'
import Layout from './index'

class Blog extends Component {
	render() {
		const { children } = this.props
		return (
			<Layout>
				<div className="pt-100">
		            <Grid>
		            	<div className="bg-white p-15">
		            		<Row>
			            		<Col sm={9}>
				            		{ children }
		                    	</Col>
		                    	<Col sm={3}>
		                    		
		                    	</Col>
	                    	</Row>
		                </div>
		            </Grid>
	            </div>
            </Layout>
		)
	}
}

export default Blog