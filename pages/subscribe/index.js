import React, { Component } from 'react'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import SubscribeTable from '../../components/tables/subscribe'

class Subscribe extends Component {
	render() {
		return (
			<Layout>
				<PrivateLayout>
					<div className="pt-15">
						<SubscribeTable />
					</div>
				</PrivateLayout>
			</Layout>
		)
	}
}

export default Subscribe