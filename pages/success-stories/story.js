import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts/stories'
import { getStory } from '../../actions/ui'

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
				<div>
					<img src={story.image} alt="" className="img-responsive" />
				</div>
				<div dangerouslySetInnerHTML={{__html: html}} />
			</Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        story: state.ui.story
    })

export default connect(
    mapStateToProps
)(Story)