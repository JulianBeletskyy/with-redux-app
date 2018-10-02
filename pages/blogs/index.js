import React, { Component } from 'react'
import Layout from '../../layouts/blogs'
import { getBlogs } from '../../actions/ui'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Router } from '../../routes'

class Blog extends Component {
	constructor(props) {
		super(props)
		const { dispatch } = props
		dispatch(getBlogs())
	}

	goToBlog = id => e => {
		Router.pushRoute(`/blogs/${id}`)
	}

	printBlogs = (blog, i) => {
		return 	<div key={i} className="blogPreviewWrap" onClick={this.goToBlog(blog.id)}>
					<Row>
		        		<Col sm={6}>
		        			<div className="imgWrap">
		        				<img src={blog.image} alt="" />
		        			</div>
		        		</Col>
		        		<Col sm={6}>
		        			<div className="blogPreviewTitle">
		        				<h3>{blog.title}</h3>
		        			</div>
		        			<div>
		        				{blog.description}
		                        <br />
		                        <br />
		        			</div>
		        		</Col>
		        	</Row>
		        	<div className="date">
						{blog.created_at}
					</div>
				</div>
	}

	render() {
		const { list } = this.props.blogs
		return (
			<Layout>
        		<h1 className="font-bebas">Blog</h1>
                <hr />
				{ list.map((blog, i) => this.printBlogs(blog, i)) }
			</Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        blogs: state.ui.blogs
    })

export default connect(
    mapStateToProps
)(Blog)