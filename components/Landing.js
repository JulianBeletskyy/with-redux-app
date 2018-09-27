import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, Panel } from 'react-bootstrap'
import Registration from './registration'
import BtnMain from '../components/buttons/btn_main.js'
import { setUiKey } from '../actions/ui'
import { setSignupKey } from '../actions/signup'

class Landing extends Component {
	constructor() {
		super()
		this.elements = {}
	}

	getRegistration = () => {
		const { dispatch } = this.props
		dispatch(setUiKey('showRegistration', true))
	}

	closeRegistation = () => {
		const { dispatch } = this.props
		dispatch(setUiKey('showRegistration', false))
		dispatch(setSignupKey('step', 0))
	}

	render() {
		const { showRegistration, step } = this.props
		let col = 6, active = ''
		if (showRegistration) {
			col = 12
		}

		return (
			<div className="homeWrapper">
				<div className="pt-100">
					<div className="mainPart">
	                    <div className="innerMain container">
	                        <Row>
	                            <Col md={col} sm={12} >
	                                <div className={`wrapRegistration ${showRegistration && 'active'}`}>
	                                	<Panel bsClass="headerPanel panel">
											<Panel.Heading>
												{
													showRegistration && (step === 0 || step === 4)
													&& 	<span onClick={this.closeRegistation} className="closeBtn">
															<i className="fas fa-times pull-right"></i>
														</span>
												}
												<h3 className="title">
													<i className="fas fa-address-card"></i>
													&nbsp;
													Free Sign Up
												</h3>
											</Panel.Heading>
											<Panel.Body>
												<Registration />
											</Panel.Body>
										</Panel>
	                                </div>
	                            </Col>
	                            {
	                            	! showRegistration
	                            	&& 	<Col md={6} sm={12} className="wrapLogin">
			                                <div>
			                                    <div>
			                                        <h1 className="text-white main">
			                                            Premier Matchmaking company to Find Your Ukrainian Lady
			                                        </h1>
			                                        <h2 className="text-white text-center">
			                                            We are not Gods to predict your future but we have something to make you closer to your dream come true.
			                                            <br />
			                                            <a className="joinLink" onClick={this.getRegistration} href="javascript:;"> Join Now</a>
			                                        </h2>
			                                   </div>
			                                   <div className="btn-login text-center">
			                                        <BtnMain
			                                            type="button"
			                                            bsStyle="success"
			                                            text="Free Sign Up"
			                                            onClick={this.getRegistration} />
			                                    </div>
			                                </div>
			                            </Col>
	                            }
	                        </Row>
	                    </div>
	                </div>
				</div>

				<div id="advantages" className="advantWrap">
					<h2 className="advantTitle">Competitive <span className="underlineText">Advantages</span></h2>
					<Row>
						<Col xs={12} sm={4}>
							<div ref={ref => this.elements.first = ref} className="advantItem">
								<span><i className="fas fa-clipboard-list fa-3x"></i><br />Free registration with full professional service</span>
							</div>
						</Col>
						<Col xs={12} sm={4}>
							<div ref={ref => this.elements.second = ref} className="advantItem">
								<span><i className="fas fa-clipboard-list fa-3x"></i><br />All letters from ladies are free to read</span>
							</div>
						</Col>
						<Col xs={12} sm={4}>
							<div ref={ref => this.elements.third = ref} className="advantItem">
								<span><i className="fas fa-clipboard-list fa-3x"></i><br />All ladies' profiles real and verified</span>
							</div>
						</Col>
						<Col xs={12} sm={4}>
							<div ref={ref => this.elements.forth = ref} className="advantItem">
								<span><i className="fas fa-clipboard-list fa-3x"></i><br />Upgrade your membership and get access to all additional photos and videos of all ladies</span>
							</div>
						</Col>
						<Col xs={12} sm={4}>
							<div ref={ref => this.elements.fifth = ref} className="advantItem">
								<span><i className="fas fa-clipboard-list fa-3x"></i><br />Verify your profile and get opportunity to share direct contact with ladies</span>
							</div>
						</Col>
						<Col xs={12} sm={4}>
							<div ref={ref => this.elements.sixth = ref} className="advantItem">
								<span><i className="fas fa-clipboard-list fa-3x"></i><br />You can find the One among hundreds of beautiful Ukrainian brides</span>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state =>
    ({
        showRegistration: state.ui.showRegistration,
        step: state.signup.step,
    })

export default connect(
    mapStateToProps
)(Landing)