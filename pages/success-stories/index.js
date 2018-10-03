import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import Layout from '../../layouts/stories'
import { getStories } from '../../actions/ui'
import BtnMain from '../../components/buttons/btn_main'
import { Router } from '../../routes'

class SuccessStories extends Component {

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(getStories())
	}

	goToStory = id => e => {
		Router.pushRoute(`/success-stories/${id}`)
	}

	getText = text => text.length > 250 ? text.slice(0, 250) + '...' : text

	printStories = (item, i) => {
		return 	<Col key={i} xs={12} md={4}>
					<div className="story-list-item">
						<div className="story-list-img-wrap">
							<img src={item.image} className="img-responsive story-list-img" alt="" />
						</div>
						<div className="story-list-names">{item.client_name} & {item.girl_name}</div>
						<div className="story-list-story">{this.getText(item.story)}</div>
						<div className="text-center">
							<BtnMain text="See More" bsStyle="outline" onClick={this.goToStory(item.id)} />
						</div>
					</div>
				</Col>
	}

	render() {
		const { stories } = this.props

		return (
			<Layout>
				<div className="story-list-header">
					<h1>Success Stories</h1>
					<p className="text-center">
						I've started my search because it was something new fo me. I don't want to hide that I was not successful on love. I was born in a big family and I was always dreaming to follow my parents' example. Once during the time break I was drinking my coffee...
						I've started my search because it was something new fo me. I don't want to hide that I was not successful on love. I was born in a big family and I was always dreaming to follow my parents' example. Once during the time break I was drinking my coffee...
						I've started my search because it was something new fo me. I don't want to hide that I was not successful on love. I was born in a big family and I was always dreaming to follow my parents' example. Once during the time break I was drinking my coffee...
						I've started my search because it was something new fo me. I don't want to hide that I was not successful on love. I was born in a big family and I was always dreaming to follow my parents' example. Once during the time break I was drinking my coffee...
					</p>
				</div>
                <p>Note: <span className="small-italic">We are glad to share great successful love stories with you, although most of couples prefer to keep Happiness in Silence. With that we post only some of those couples who gave us personal permission.</span></p>
                <hr />
            	<Row>
                   { stories.map((item, i) => this.printStories(item, i)) }                   
                </Row>
        	</Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        stories: state.ui.stories
    })

export default connect(
    mapStateToProps
)(SuccessStories)