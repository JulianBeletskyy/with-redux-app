import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap'
import Layout from '../../layouts/blogs'
import BtnMain from '../../components/buttons/btn_main'

class Testimonials extends Component {
	constructor(props) {
		super(props)
	}

	printTestimonials = (item, i) => {
		return 	<div key={i} className="testimonials-item-wrap">
                    <div className="row">
	                    <div className="col-sm-4 text-center">
	                        <img src={item.img} className="testimonials-item-img" alt="" />
	                    </div>
	                    <div className="col-sm-8">
	                        <div className="testimonials-item-text">{item.text}</div>
	                        <div className="row">
	                            <div className="col-sm-6">
	                                <div className="testimonials-item-name">{item.name}</div>
	                            </div>
	                            <div className="col-sm-6 text-center">
	                                <div className="testimonials-item-name">
	                                    <BtnMain
	                                        bsStyle="success"
	                                        text="Review"
	                                        onClick={this.onClick} />
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
                </div>
	}

	onClick = () => {

	}

	render() {
		const { testimonials } = this.props
		console.log(this.props)
		return (
			<Layout>
				<h1 className="font-bebas">Testimonials</h1>
                <p className="text-justify">Dear Members, we are pleased to present you our clients' testimonials. Here you can read experience and appreciation of those who have found their beloved with our help. As well as opinions and suggestions from those who are still in the search of their soulmate.</p>
                <hr />
            	<div>
                   { testimonials.map((item, i) => this.printTestimonials(item, i)) }
                </div>
        	</Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        testimonials: state.ui.testimonials
    })

export default connect(
    mapStateToProps
)(Testimonials)