import React, { Component } from 'react'
import { connect } from 'react-redux'
import Registration from './registration'
import BtnMain from '../components/buttons/btn_main'
import { setUiKey, getStories, toggleModal } from '../actions/ui'
import { setSignupKey } from '../actions/signup'
import { Router } from '../routes'
import { getPublicMembers } from '../actions/members'
// import Slider from 'react-slick'
import { makeCDN } from '../utils'
import loadable from '@loadable/component'

const MemberBlock = loadable(() => import('../components/block/member_block'))
const MainModal = loadable(() => import('../components/modal'))
const Slider = loadable(() => import('react-slick'))

class Landing extends Component {
	constructor() {
		super()
		this.mount = false
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
		window.scrollTo(0,0)
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
        const description = story.texts[1].slice(0, 250)
        return  <div className="landing-story-wrap" key={i} onClick={() => this.goToStory(story.id)}>
                    <div className="row">
                        <div className="col-xs-4">
                            <img src={makeCDN(story.files[0])} alt="" className="img-responsive" />
                        </div>
                        <div className="col-sm-8">
                            <h3>
                                <span>{story.texts[0]}</span>
                            </h3>
                            <p>{description}...</p>
                        </div>
                    </div>
                </div>
	}

	printTestimonials = (item, i) => {
		const imgStyle = {
            backgroundImage: `url(${this.getImage(makeCDN(item.img))})`,
            height: 120,
            backgroundPosition: '50%',
            width: 120,
            borderRadius: '50%',
            margin: '0 auto',
            backgroundSize: 'cover'
        }
		return	<div className="col-sm-4" sm={4} key={i}>
                    <div className="text-center landing-item-testimonial p-15 pointer" onClick={this.openTestimonial(item)}>
	                    <div style={imgStyle}></div>
	                    <div className="landing-testimonial-text">{this.getText(item.text)}</div>
	                    <div className="landing-testimonial-name">{item.name}</div>
	                </div>
                </div>
	}

	openLogin = e => {
		e.preventDefault()
		const { dispatch } = this.props
		dispatch(toggleModal(true, 'login'))
	}

	getImage = link => {
		const { userAgent } = this.props
        if( /firefox/i.test(userAgent) )
          console.log('firefox')
        else if( /chrome/i.test(userAgent) )
          return link.replace('jpg', 'webp')
        else if( /safari/i.test(userAgent) )
          console.log('safari')
        else if( /msie/i.test(userAgent) )
          console.log('msie')
        else
          return link
	}

	componentDidMount() {
		this.mount = true
		const { dispatch } = this.props
		setTimeout(() => {
			dispatch(getPublicMembers(this.state.type))
			dispatch(getStories())
		}, 500)
		

		window.addEventListener('scroll', e => {
			const el = document.getElementById('advantages')
			const btn = document.getElementById('scroll-btn')
			if (el && el.scrollHeight >= document.documentElement.scrollTop && ! this.state.advantagesFirst) {
				if (this.mount) {
					this.setState({advantagesFirst: true})
                	setTimeout(() => {this.setState({advantagesSecond: true})}, 300)
				}
            }
            if (btn && document.documentElement.scrollTop >= 600) {
            	if (!btn.classList.contains('active')) {
            		btn.classList.add('active')
            	}
            } else if (btn && btn.classList.contains('active')) {
				btn.classList.remove('active')
            }
		})
	}

	componentWillUnmount() {
		this.mount = false
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
	                        <div className="row">
	                            <div className={`col-sm-12 col-md-${col}`}>
	                                <div className={`wrapRegistration ${showRegistration && 'active'}`}>
	                                	<div className="headerPanel panel headerPanel panel-default">
											<div className="panel-heading">
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
													&nbsp;
													<span className="position-relative already-member-wrap">
														<a href="javascript:;" style={{color: 'rgb(39, 194, 211)', paddingRight: 40}} className="pointer" onClick={this.openLogin}> Log in</a>
														<span className="already-member">Already a Member?</span>
													</span>
												</h3>
											</div>
											<div className="panel-body">
												<Registration />
											</div>
										</div>
	                                </div>
	                            </div>
	                            {
	                            	! showRegistration
	                            	&& 	<div className="wrapLogin col-sm-12 col-md-6">
		                                    <div>
		                                        <h1 className="text-white main">
		                                            Premier Matchmaking company to Find Your Ukrainian Lady
		                                        </h1>
		                                        <h2 className="text-white text-center">
		                                            We are not Gods to predict your future but we have something to make you closer to your dream come true.
		                                            <br />
		                                            <a className="landing-link" onClick={this.getRegistration} href="javascript:;"> Join Now</a>
		                                        </h2>
		                                   </div>
		                                   <div className="btn-login text-center">
		                                        <BtnMain
		                                            text="Free Sign Up"
		                                            onClick={this.getRegistration} />
		                                    </div>
			                            </div>
	                            }
	                        </div>
	                    </div>
	                </div>
				</div>
				{
					!showRegistration && country !== 'UA'
					? 	<div>
							<div id="advantages" className="advantWrap">
								<h2 className="advantTitle">Competitive <span className="underlineText">Advantages</span></h2>
								<div className="row">
									<div className="col-sm-4 col-xs-12">
										<div className={`advantItem ${this.state.advantagesFirst ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />Free registration with full professional service</span>
										</div>
									</div>
									<div className="col-sm-4 col-xs-12">
										<div className={`advantItem ${this.state.advantagesFirst ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />All letters from ladies are free to read</span>
										</div>
									</div>
									<div className="col-sm-4 col-xs-12">
										<div className={`advantItem ${this.state.advantagesFirst ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />All ladies' profiles real and verified</span>
										</div>
									</div>
									<div className="col-sm-4 col-xs-12">
										<div className={`advantItem ${this.state.advantagesSecond ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />Upgrade your membership and get access to all additional photos and videos of all ladies</span>
										</div>
									</div>
									<div className="col-sm-4 col-xs-12">
										<div className={`advantItem ${this.state.advantagesSecond ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />Verify your profile and get opportunity to share direct contact with ladies</span>
										</div>
									</div>
									<div className="col-sm-4 col-xs-12">
										<div className={`advantItem ${this.state.advantagesSecond ? 'slideInUp animated' : ''}`}>
											<span><i className="fas fa-clipboard-list fa-3x"></i><br />You can find the One among hundreds of beautiful Ukrainian brides</span>
										</div>
									</div>
								</div>
							</div>
							<div className="landing-member-wrap" style={{backgroundImage: `url(${this.getImage('https://d2etktq4v0899q.cloudfront.net/static/assets/img/image-51.jpg')})`}}>
								<h2 className="landing-title"><span className="underlineText">Ladies</span></h2>
								<div className="container">
			                        <div className="pb-50 text-center">
			                            <div className="row">
			                                <div className="col-xs-4">
			                                    <div className="landing-switch-members" onClick={this.toggleMembers('new')}>
			                                        <span className={this.state.type === 'new' ? 'underlineText' : ''}>New</span>
			                                    </div>
			                                </div>
			                                <div className="col-xs-4">
			                                    <div className="landing-switch-members" onClick={this.toggleMembers('popular')}>
			                                        <span className={this.state.type === 'popular' ? 'underlineText' : ''}>Popular</span>
			                                    </div>
			                                </div>
			                                <div className="col-xs-4">
			                                    <div className="landing-switch-members" onClick={this.goToMembers()}>
			                                        <span>Show more</span>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        {
			                        	publicList.length
			                        	? 	<MemberBlock 
					                			list={publicList}
					                			stars={false}
					                			more={false}
					                			onClickItem={this.getRegistration}
					                			type="viewed" />
			                        	: 	null
			                        }
			                    </div>
							</div>
							<div className="landing-third-wrap">
			                    <div className="container">
			                        <h2 className="text-center">
			                            Hundreds of real verified profiles of Ukrainian Ladies! Say YES to the only one among many ladies waiting for fiance's confess:)
			                            <br />
			                            <a className="landing-link-search" onClick={this.goToMembers()} href="/members"> Search Now!</a>
			                        </h2>
			                        <div className="text-center form-group">
			                            <BtnMain
			                                text="Sign Up"
			                                onClick={this.getRegistration} />
			                        </div>
			                    </div>
			                </div>
			                <div className="landing-stories-wrap" style={{backgroundImage: `url(${this.getImage('https://d2etktq4v0899q.cloudfront.net/static/assets/img/image-21.jpg')})`}}>
			                    <h2 className="text-center landing-title">
			                        <span className="underlineText">Success Stories</span>
			                    </h2>
			                    <div>
			                        <div className="container">
			                            <div className="landing-stoies-title text-center p-15 mb-15">
			                                <span>So many people found their happiness here. Once made a step for luck. Ready to be Next? Read all successful Stories.</span>
			                            </div>
			                            <div className="form-group">
			                                { stories.map((story, i) => this.printStories(story, i)) }
			                            </div>
			                            <div className="form-group text-center">
			                                <BtnMain
			                                    text="More stories"
			                                    onClick={this.goToStories} />
			                            </div>
			                        </div>
			                    </div>
			                </div>
			                <div className="landing-hiw-wrap">
			                    <div className="container">
				                    <h2 className="text-center landing-title">
				                        How it <span className="underlineText">works?</span>
				                    </h2>
			                        <h2 className="text-center">Brick to brick. Step to step. Your choice is made and you feel great:)</h2>
			                        <h2 className="text-center">Take 3 Easy Steps to Start Your Story:</h2>
			                        <div className="landing-steps-wrap">
			                            <div className="row">
			                                <div className="col-sm-4">
			                                    <div className="landing-step">
			                                        <div className="text-center pointer" onClick={this.getRegistration}>
			                                            <i className="fas fa-user fa-4x"></i>
			                                            <div className="landing-step-desc">
			                                                <span className="font-arial">Create your profile, add photos</span>
			                                            </div>
			                                        </div>
			                                    </div>
			                                </div>
			                                <div className="col-sm-4">
			                                    <div className="landing-step">
			                                        <div className="text-center pointer" onClick={this.goToMembers()}>
			                                            <i className="fas fa-images fa-4x"></i>
			                                            <div className="landing-step-desc">
			                                                <span className="font-arial">Browse our Gallery</span>
			                                            </div>
			                                        </div>
			                                    </div>
			                                </div>
			                                <div className="col-sm-4">
			                                    <div className="landing-step">
			                                        <div className="text-center">
			                                            <i className="fas fa-comments fa-4x"></i>
			                                            <div className="landing-step-desc">
			                                                <span className="font-arial">Start Communication</span>
			                                            </div>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        <h2 className="text-center">Any questions? Apply to Our Friendly Staff</h2>
			                    </div>
			                </div>
			                <div className="landing-testimonials-wrap" style={{backgroundImage: `url(${this.getImage('https://d2etktq4v0899q.cloudfront.net/static/assets/img/image-31.jpg')})`}}>
		                        <h2 className="landing-title"><span className="underlineText">Testimonials</span></h2>
		                        <div className="container">
		                            <div className="testimonials-slider form-group row">
		                            {
		                            	testimonials.length
		                            	? 	<Slider {...settings}>
			                                	{ testimonials.map((item, i) => this.printTestimonials(item, i)) }
			                                </Slider>
		                            	: 	null
		                            }
		                            </div>
		                            <div className="form-group text-center">
		                                <BtnMain
		                                    text="More testimonials"
		                                    onClick={this.goToTestimonials} />
		                            </div>
		                        </div>
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
				{
					testimonialsModal
					? 	<MainModal
		                    body={<div>
		                            <img src={this.testimonialImg} className="img-responsive" alt="" />
		                            <div className="text-center font-bebas pt-15">
		                            	<a href="/testimonials" onClick={this.goToTestimonials}>View All Testimonials</a>
		                        	</div>
		                        </div>}
		                    title="Testimonials"
		                    show={testimonialsModal}
		                    keyModal="testimonials" />
					: 	null
				}
			</div>
		)
	}
}

const mapStateToProps = ({ui, signup, members}) =>
    ({
        country: signup.country,
        step: signup.step,
        publicList: members.public,
        showRegistration: ui.showRegistration,
        stories: ui.stories,
        testimonials: ui.testimonials,
        testimonialsModal: ui.modals.testimonials,
    })

export default connect(mapStateToProps)(Landing)