import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, Panel } from 'react-bootstrap'
import Registration from './registration'
import BtnMain from '../components/buttons/btn_main'
import { setUiKey, getStories, toggleModal } from '../actions/ui'
import { setSignupKey } from '../actions/signup'
import MemberBlock from '../components/block/member_block'
import { Router } from '../routes'
import { getPublicMembers } from '../actions/members'
import MainModal from '../components/modal'
import Slider from 'react-slick'
import { makeCDN } from '../utils'

class Landing extends Component {
	constructor() {
		super()
		this.elements = {}
		this.state = {
			type: 'popular',
			advantagesFirst: false,
			advantagesSecond: false,
		}
	}

	getRegistration = () => {
		gtag('event', 'start', {'event_category': 'start', 'event_action': 'registraciya1'}) // google metrics
		const { dispatch } = this.props
		window.scroll({top: 0,left: 0,behavior: 'smooth'})
		dispatch(setUiKey('showRegistration', true))
		const el = document.getElementById('register-btn')
		if (el) {
			el.setAttribute('onclick', "ga('send', 'event', '1step', 'registraciya'); return true;")
		}
	}

	closeRegistation = () => {
		const { dispatch } = this.props
		dispatch(setUiKey('showRegistration', false))
		dispatch(setSignupKey('step', 0))
	}

	goToMembers = () => e => {
		Router.pushRoute('/members')
	}

	goToStory = id => {
		Router.pushRoute(`/success-stories/${id}`)
	}

	goToStories = () => {
		Router.pushRoute('/success-stories')
	}

	goToTestimonials = e => {
		e.preventDefault()
		const { dispatch } = this.props
		window.scrollTo(0,0)
		dispatch(toggleModal(false, 'testimonials'))
		Router.pushRoute('/testimonials')
	}

	toggleMembers = type => e => {
		const { dispatch } = this.props
		dispatch(getPublicMembers(type))
		this.setState({type})
	}

	openTestimonial = item => e => {
		const { dispatch } = this.props
		this.testimonialImg = item.text_img
		dispatch(toggleModal(true, 'testimonials'))
	}

	goToTop = () => {
		window.scroll({
	  		top: 0, 
	  		left: 0, 
	  		behavior: 'smooth' 
		})
	}

	getText = text => text.length > 330 ? text.slice(0, 330) + '...' : text

	printStories = (story, i) => {
		if (i > 2) { return false }
        const description = story.story.slice(0, 250)
        return  <div className="landing-story-wrap" key={i} onClick={() => this.goToStory(story.id)}>
                    <div className="row">
                        <div className="col-xs-4">
                            <img src={makeCDN(story.image)} alt={story.client_name} className="img-responsive" />
                        </div>
                        <div className="col-sm-8">
                            <h3 className="{style.carouselName}">
                                <span>{story.client_name}</span>
                                &nbsp; & &nbsp;
                                <span>{story.girl_name}</span>
                            </h3>
                            <p>{description}...</p>
                        </div>
                    </div>
                </div>
	}

	printTestimonials = (item, i) => {
		const imgStyle = {
            backgroundImage: `url(${makeCDN(item.img)})`,
            height: 120,
            backgroundPosition: '50%',
            width: 120,
            borderRadius: '50%',
            margin: '0 auto',
            backgroundSize: 'cover'
        }
		return	<Col sm={4} key={i}>
                    <div className="text-center landing-item-testimonial p-15 pointer" onClick={this.openTestimonial(item)}>
	                    <div style={imgStyle}></div>
	                    <div className="landing-testimonial-text">{this.getText(item.text)}</div>
	                    <div className="landing-testimonial-name">{item.name}</div>
	                </div>
                </Col>
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(getPublicMembers(this.state.type))
		dispatch(getStories())

		window.addEventListener('scroll', e => {
			const el = document.getElementById('advantages')
			const btn = document.getElementById('scroll-btn')
			if (el && el.scrollHeight >= document.documentElement.scrollTop && ! this.state.advantagesFirst) {
                this.setState({advantagesFirst: true})
                setTimeout(() => {this.setState({advantagesSecond: true})}, 300)
            }
            if (btn && document.documentElement.scrollTop >= 600) {
            	if (!btn.classList.contains('active')) {
            		btn.classList.add('active')
            	}
            } else if (btn && btn.classList.contains('active')) {
				btn.classList.remove('active')
            }
		})

		/*const el = document.getElementById('signup-btn')
		if (el) {
			el.setAttribute('onclick', "ga('send', 'event', 'start', 'registraciya'); return true;")
		}
        const link = document.getElementById('signup-link')
        if (link) {
        	link.setAttribute('onclick', "ga('send', 'event', 'start', 'registraciya'); return true;")
        }*/
	}

	render() {
		const { showRegistration, step, publicList, stories, testimonials, testimonialsModal, country } = this.props

		let col = 6, active = ''
		if (showRegistration) {
			col = 12
		}

		const settings = {
            slidesToShow: 3,
            dots: false,
            arrows: true,
            infinite: true,
            autoplay: false,
            responsive: [
                {
                    breakpoint: 1120, 
                    settings: {slidesToShow: 2}
                },{
                    breakpoint: 798, 
                    settings: {slidesToShow: 1, arrows: false, dots: true}
                }
            ]
        };

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
			                                            <a id="signup-link" className="landing-link" onClick={this.getRegistration} href="javascript:;"> Join Now</a>
			                                        </h2>
			                                   </div>
			                                   <div className="btn-login text-center">
			                                        <BtnMain
			                                        	id="signup-btn"
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
				{
					!showRegistration && country !== 'UA'
					? 	<div>
							<div id="advantages" className="advantWrap">
								<h2 className="advantTitle">Competitive <span className="underlineText">Advantages</span></h2>
								<Row>
									<Col xs={12} sm={4}>
										<div ref={ref => this.elements.first = ref} className={`advantItem ${this.state.advantagesFirst ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />Free registration with full professional service</span>
										</div>
									</Col>
									<Col xs={12} sm={4}>
										<div ref={ref => this.elements.second = ref} className={`advantItem ${this.state.advantagesFirst ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />All letters from ladies are free to read</span>
										</div>
									</Col>
									<Col xs={12} sm={4}>
										<div ref={ref => this.elements.third = ref} className={`advantItem ${this.state.advantagesFirst ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />All ladies' profiles real and verified</span>
										</div>
									</Col>
									<Col xs={12} sm={4}>
										<div ref={ref => this.elements.forth = ref} className={`advantItem ${this.state.advantagesSecond ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />Upgrade your membership and get access to all additional photos and videos of all ladies</span>
										</div>
									</Col>
									<Col xs={12} sm={4}>
										<div ref={ref => this.elements.fifth = ref} className={`advantItem ${this.state.advantagesSecond ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />Verify your profile and get opportunity to share direct contact with ladies</span>
										</div>
									</Col>
									<Col xs={12} sm={4}>
										<div ref={ref => this.elements.sixth = ref} className={`advantItem ${this.state.advantagesSecond ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />You can find the One among hundreds of beautiful Ukrainian brides</span>
										</div>
									</Col>
								</Row>
							</div>
							<div className="landing-member-wrap">
								<h2 className="landing-title"><span className="underlineText">Ladies</span></h2>
								<Grid>
			                        <div className="pb-50">
			                            <Row>
			                                <Col xs={4} className="text-center">
			                                    <div className="landing-switch-members" onClick={this.toggleMembers('new')}>
			                                        <span className={this.state.type === 'new' ? 'underlineText' : ''}>New</span>
			                                    </div>
			                                </Col>
			                                <Col xs={4} className="text-center">
			                                    <div className="landing-switch-members" onClick={this.toggleMembers('popular')}>
			                                        <span className={this.state.type === 'popular' ? 'underlineText' : ''}>Popular</span>
			                                    </div>
			                                </Col>
			                                <Col xs={4} className="text-center">
			                                    <div className="landing-switch-members" onClick={this.goToMembers()}>
			                                        <span>Show more</span>
			                                    </div>
			                                </Col>
			                            </Row>
			                        </div>
			                        <MemberBlock 
			                			list={publicList}
			                			stars={false}
			                			more={false}
			                			onClickItem={this.getRegistration}
			                			type="viewed" />
			                    </Grid>
							</div>
							<div className="landing-third-wrap">
			                    <Grid>
			                        <h2 className="text-center">
			                            Hundreds of real verified profiles of Ukrainian Ladies! Say YES to the only one among many ladies waiting for fiance's confess:)
			                            <br />
			                            <a className="landing-link-search" onClick={this.goToMembers()} href="/members"> Search Now!</a>
			                        </h2>
			                        <FormGroup className="text-center">
			                            <BtnMain
			                                bsStyle="success"
			                                text="Sign Up"
			                                onClick={this.getRegistration} />
			                        </FormGroup>
			                    </Grid>
			                </div>
			                <div className="landing-stories-wrap">
			                    <h2 className="text-center landing-title">
			                        <span className="underlineText">Success Stories</span>
			                    </h2>

			                    <div className="{style.carouselWrap}">
			                        <Grid>
			                            <div className="landing-stoies-title text-center p-15 mb-15">
			                                <span>So many people found their happiness here. Once made a step for luck. Ready to be Next? Read all successful Stories.</span>
			                            </div>
			                            <div className="form-group">
			                                { stories.map((story, i) => this.printStories(story, i)) }
			                            </div>
			                            <div className="form-group text-center">
			                                <BtnMain
			                                    bsStyle="success"
			                                    text="More stories"
			                                    onClick={this.goToStories} />
			                            </div>
			                        </Grid>
			                    </div>
			                </div>
			                <div className="landing-hiw-wrap">
			                    <Grid>
				                    <h2 className="text-center landing-title">
				                        How it <span className="underlineText">works?</span>
				                    </h2>
			                        <h2 className="text-center">Brick to brick. Step to step. Your choice is made and you feel great:)</h2>
			                        <h2 className="text-center">Take 3 Easy Steps to Start Your Story:</h2>
			                        <div className="landing-steps-wrap">
			                            <Row>
			                                <Col xs={4}>
			                                    <div className="landing-step">
			                                        <div className="text-center">
			                                            <i className="fas fa-user fa-4x"></i>
			                                            <div className="landing-step-desc">
			                                                <span className="font-arial">Create your profile, add photos</span>
			                                            </div>
			                                        </div>
			                                    </div>
			                                </Col>
			                                <Col xs={4}>
			                                    <div className="landing-step">
			                                        <div className="text-center">
			                                            <i className="fas fa-images fa-4x"></i>
			                                            <div className="landing-step-desc">
			                                                <span className="font-arial">Browse our Gallery</span>
			                                            </div>
			                                        </div>
			                                    </div>
			                                </Col>
			                                <Col xs={4}>
			                                    <div className="landing-step">
			                                        <div className="text-center">
			                                            <i className="fas fa-comments fa-4x"></i>
			                                            <div className="landing-step-desc">
			                                                <span className="font-arial">Start Communication</span>
			                                            </div>
			                                        </div>
			                                    </div>
			                                </Col>
			                            </Row>
			                        </div>
			                        <h2 className="text-center">Any questions? Apply to Our Friendly Staff</h2>
			                    </Grid>
			                </div>
			                <div className="landing-testimonials-wrap">
		                        <h2 className="landing-title"><span className="underlineText">Testimonials</span></h2>
		                        <Grid>
		                            <Row className="testimonials-slider form-group">
		                            	<Slider {...settings}>
		                                	{ testimonials.map((item, i) => this.printTestimonials(item, i)) }
		                                </Slider>
		                            </Row>
		                            <div className="form-group text-center">
		                                <BtnMain
		                                    bsStyle="success"
		                                    text="More testimonials"
		                                    onClick={this.goToTestimonials} />
		                            </div>
		                        </Grid>
			                </div>
						</div>
					: 	null
				}
				<div id="scroll-btn" className="scroll-btn-wrap" onClick={this.goToTop}>
					<div className="wrap-scroll-sides">
						<div className="scroll-front">
                        	<span className="scroll-inner">to top</span>
	                    </div>
	                    <div className="scroll-back">
	                        <span className="scroll-inner"><i className="fas fa-chevron-up"></i></span>
	                    </div>
					</div>
				</div>

                <MainModal
                    body={<div>
                            <img src={this.testimonialImg} className="img-responsive" alt="" />
                            <div className="text-center font-bebas pt-15">
                            	<a href="/testimonials" onClick={this.goToTestimonials}>View All Testimonials</a>
                        	</div>
                        </div>}
                    title="Testimonials"
                    show={testimonialsModal}
                    keyModal="testimonials" />
			</div>
		)
	}
}

const mapStateToProps = state =>
    ({
        showRegistration: state.ui.showRegistration,
        step: state.signup.step,
        publicList: state.members.public,
        stories: state.ui.stories,
        testimonials: state.ui.testimonials,
        testimonialsModal: state.ui.modals.testimonials,
        country: state.signup.country,
    })

export default connect(mapStateToProps)(Landing)