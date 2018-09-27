import React, { Component } from 'react'
import Head from 'next/head'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Layout from '../../layouts'

class About extends Component {
	render() {
		return (
			<Layout>
				<Head>
					<link rel="stylesheet" href="/static/assets/css/about.css" />
				</Head>
				<div className="pt-100" id="about-container">
	                <Grid>
	                    <div className="bg-white p-15">
	                        <h1 className="font-bebas">About Company</h1>
	                        <hr />

	                        <h2 className="text-center form-group p-15 works-big-title fs-48">
	                            <span className="text-uppercase"><span className="underline-text">Life In Love</span> has been in business for several years.</span>
	                        </h2>
	                        <div className="row">
	                            <div className="col-sm-12">
	                                <div className="text-center form-group p-15 mb-35 color-888 fs-18 lh-18">
	                                    We’ve witnessed the successful union of countless couples. Our clients’ satisfaction stems from the fact that we have an earnest desire to break down barriers –  geographical, cultural or language – and connect individuals across borders. We have programs and procedures in place to assist our clients with making a connection with the person of their dreams. We’ve also developed a comprehensive vetting procedure for all individuals that we accept as clients. Whether you employ our services as a gentleman in search of his soul mate, or a lady seeking her ‘knight’; the process of carefully screening clients to validate each person’s legitimacy, is carefully executed for every applicant. Our organization is reputable, responsible and ethical in our business dealings. We value relationships, respect your time and most of all, we appreciate you as our valued client.
	                                </div>
	                            </div>
	                        </div>
	                        
	                        <hr />

	                        <div className="pt-50">
	                            <Row>
	                                <Col sm={6}>
	                                    <div className="works-title works-big-title fs-36">
	                                        <span className="text-uppercase"><span className="underline-text">Life In Love</span> maintains an impressive roster of Ukrainian and Russian women.</span>
	                                    </div>
	                                    <div className="color-888 pt-15 fs-18 lh-18 form-group">
	                                        We’ve often been asked “what’s so special about a Ukrainian or Russian woman?” … The answer? Everything! In addition to their obvious beauty, Ukrainian and Russian women are educated and intelligent. They’re also smart enough to know that family matters. They’re loving mothers, attentive & caring partners and they’re well versed in the domestic, emotional and physical responsibilities of a wife.
	                                    </div>
	                                </Col>
	                                <Col sm={6}>
	                                    <Row>
	                                        <Col xs={6}>
	                                            <div className="infoItemImg1">
	                                            </div>
	                                        </Col>
	                                        <Col xs={6}>
	                                            <div className="infoItemImg2">
	                                            </div>
	                                        </Col>
	                                    </Row>
	                                </Col>
	                            </Row>
	                        </div>

	                        <div className="pt-50 pb-50">
	                        </div>

	                        <div className="backgroundGrey">
	                            <Row>
	                                <Col sm={6}>
	                                    <img src="/assets/img/about-4.jpg" alt="" className="img-responsive" />
	                                </Col>
	                                <Col sm={6}>
	                                    <div className="works-title works-big-title pt-50 fs-36">
	                                        <span className="text-uppercase">If you’re ready to meet the lady of your dreams; we’re ready to connect you!</span>
	                                    </div>
	                                    <div className="color-888 pt-15 form-group fs-18 lh-18">
	                                        Take the first step – complete the questionnaire on this site. Need more information? Please review the How it works and Services pages on our site, and feel free to Contact Us if you have further questions.
	                                    </div>
	                                    <div className="form-group">
	                                        
	                                    </div>
	                                </Col>
	                            </Row>
	                        </div>

	                        <div className="pt-50 pb-50 px-15 testimonials-slider">
	                            
	                        </div>
	                        <div className="lastPart">
	                            <h4>SO WHAT’S NEXT?</h4>
	                            <h1>ARE YOU READY? <a href="javascript:;" onClick={this.getSignUp}>LET’S WORK!</a></h1>
	                            
	                        </div>
		                </div>
		            </Grid>
	            </div>
			</Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        
    })

export default connect(
    mapStateToProps
)(About)