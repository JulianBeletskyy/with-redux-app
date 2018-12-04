import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts/stories'
import { getStory } from '../../actions/ui'
import { makeCDN } from '../../utils'

class Story extends Component {
	static async getInitialProps({query}) {
		return {id: query.slug}
	}

	componentDidMount() {
		const { dispatch, id } = this.props
		dispatch(getStory(id))
	}

	render() {
		const { story } = this.props
		const html = story.story ? story.story.replace(/&nbsp;/g, ' ') : ''
		return (
			<Layout>
				<div className="story-list-header">
					<h1>{story.client_name} & {story.girl_name}</h1>
				</div>
				<div className="form-group">
					<img src={makeCDN(story.image)} alt="" className="img-responsive" />
				</div>
				<div className="story-text" dangerouslySetInnerHTML={{__html: html}} />
			</Layout>
		)
	}
}

const mapStateToProps = ({ui: {story}}) => ({story})

export default connect(mapStateToProps)(Story)