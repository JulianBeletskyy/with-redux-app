import React, { Component } from 'react'
import Layout from '../../layouts/blogs'
import { Router } from '../../routes'
import { connect } from 'react-redux'
import { getBlog } from '../../actions/ui'
import { FormGroup, Col, Row } from 'react-bootstrap'
import TextField from '../../components/inputs/text_field.js'
import BtnMain from '../../components/buttons/btn_main.js'
import Textarea from '../../components/inputs/textarea.js'

class Blog extends Component {
	static async getInitialProps({query}) {
	    return {id: query.slug}
  	}

  	constructor(props) {
  		super(props)
  		const { dispatch } = props
  		dispatch(getBlog(props.id))
  	}

  	printComments = (comment, i) => {
		return 	<div key={i} className="commentWrap">
					<div>
						<strong className="text-uppercase">{comment.name}</strong>
					</div>
					<div>{ comment.comment }</div>
					<div className="text-right">
						<span className="small-italic"><i>{comment.date}</i></span>
					</div>
				</div>
	}

  	setComment = () => {
  		const data = {
				name: this.name.value,
				comment: this.comment.value,
				post_id: this.props.id
			}
		console.log(data)
  	}

	render() {
		const { blog } = this.props
		let html = ''
        if (blog.post) {
            html = blog.post.replace(/&nbsp;/g, ' ')
        }
		return (
			<Layout>
				<div>
                    <FormGroup>
                        <h2>{blog.title}</h2>
                    </FormGroup>
                    <FormGroup>
                        <img className="img-responsive" src={blog.image} alt="" />
                        <hr />
                    </FormGroup>
                    <FormGroup>
                        <div dangerouslySetInnerHTML={{__html: html}} />
                    </FormGroup>
                    <hr />
                    <div>
                        <p className="blog-comments-title">Comments:</p>
                    </div>
                    <div>
                        { blog.comments.map((comment, i) => this.printComments(comment, i)) }
                    </div>
                    <Row className="pt-15">
                        <Col sm={6} smOffset={6}>
                            <FormGroup>
                                <TextField
                                    placeholder="First Name"
                                    inputRef={ref => { this.name = ref }}
                                    name="Name"
                                    key="name" />
                            </FormGroup>
                            <FormGroup>
                                <Textarea
                                    inputRef={ref => { this.comment = ref }}
                                    placeholder="Comment" />
                            </FormGroup>
                            <FormGroup className="text-right">
                                <BtnMain
                                    type="button"
                                    bsStyle="success"
                                    text="Comment"
                                    onClick = {this.setComment} />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
			</Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        blog: state.ui.blog
    })

export default connect(
    mapStateToProps
)(Blog)