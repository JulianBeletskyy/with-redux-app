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
		return (
			<Layout>
				<div className="story-list-header">
					<h1>{story.client_name} & {story.girl_name}</h1>
				</div>
				<div className="story-list-story">{story.story}</div>
				<div>
					<img src={story.image} alt="" className="img-responsive" />
				</div>
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