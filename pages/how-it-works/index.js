import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import Layout from '../../layouts'
import { Router } from '../../routes'
import { getPublicMembers } from '../../actions/members'
import MembersCarousel from '../../components/block/members_carousel'
import Registration from '../../components/registration'
import { setUiKey } from '../../actions/ui'
import { getImage } from '../../utils'

class Works extends Component {
    static async getInitialProps({req}) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
        return {
            userAgent: userAgent,
        }
    }

    state = {type: 'popular'}

    toggleMembers = type => e => {
        const { dispatch } = this.props
        dispatch(getPublicMembers(type))
        this.setState({type})
    }

    getText = text => text.length > 180 ? text.slice(0, 180) + '...' : text

    printTestimonials = (item, i) => {
        if (i === 2) { return false }
        const imgStyle = {
            backgroundImage: `url(${item.img})`,
            height: 120,
            backgroundPosition: '50%',
            width: 120,
            borderRadius: '50%',
            margin: '0 auto',
            backgroundSize: 'cover'
        }
        return  <Col sm={4} key={i}>
                    <div className="text-center landing-item-testimonial p-15 box-shadow">
                        <div style={imgStyle}></div>
                        <div className="landing-testimonial-text">{this.getText(item.text)}</div>
                        <div className="landing-testimonial-name">{item.name}</div>
                    </div>
                </Col>
    }

    goToMembers = e => {
        e.preventDefault()
        Router.pushRoute('/members')
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(setUiKey('showRegistration', true))
        dispatch(getPublicMembers(this.state.type))
    }

	render() {
        const { testimonials, publicList, showRegistration, step, userAgent } = this.props
		return (
            <Layout>
        		<div className="pt-100">
                    <div className="container">
                        <div className="bg-white p-15">
                            <h1 className="font-bebas">How It Works?</h1>
                            <hr />
                            <div className="service-wrap-items service-wrap-header">
                                <div className="service-left-item">
                                    <h1 className="title text-right">
                                        Life In Love<br />
                                        is pleased to present<br />
                                        the crème de la<br />
                                        crème of Ukrainian<br />
                                        and Russian beauties.
                                    </h1>
                                    <div className="text-right" style={{lineHeight: 2}}>
                                        <strong>The ladies in our portfolio have all been pre-screened to verify their background, marital status and their eligibility to enter a committed relationship. All ladies have been cleared and are 100% ready and available to enter a relationship with our clients.</strong>
                                    </div>
                                </div>
                                <div className="service-right-item">
                                    <img
                                        src={getImage('https://d2etktq4v0899q.cloudfront.net/static/assets/img/Lifeinlove+HOW+IT+WORKS-+page+photo.jpg', userAgent)}
                                        className="img-responsive form-group"
                                        alt="" />
                                </div>
                            </div>

                            <div className="service-wrap-items service-wrap-header">
                                <div className="service-left-item">
                                </div>
                                <div className="service-right-item">
                                    <div className="color-888" style={{lineHeight: 2}}>
                                        To connect with your future soul mate, you must take the first step by completing the questionnaire on this site. Once you’ve submitted your information, you may be granted access to view our active library of interested ladies. Each file provides statistical information and other details to help you select the lady that most closely fits your desire for the ideal partner. 
                                        <br />
                                        <br />
                                        Are you ready to meet your Love? Follow the steps below:
                                    </div>
                                </div>
                            </div>

                            <div className="service-wrap-items">
                                <div className="service-left-item">
                                    <div className="text-right title service-left-title">
                                        01<br />
                                        COMPLETE YOUR<br />
                                        PROFILE
                                    </div>
                                </div>
                                <div className="service-right-item">
                                    <div className="service-inner-text">
                                        Developing a sincere and honest relationship begins with transparency. We want to know the true you.
                                        The list of questions is provided to help our clients get to know you better. What are your likes?
                                        Your hobbies? How would you describe your personality?
                                        What do you do for work? The more honest your responses, the more likely it is that you’ll find a compatible match.
                                    </div>
                                </div>
                            </div>

                            <div className="service-wrap-items">
                                <div className="service-left-item">
                                    <div className="text-right title service-left-title">
                                        02<br />
                                        UPLOAD A PHOTO<br />
                                    </div>
                                </div>
                                <div className="service-right-item">
                                    <div className="service-inner-text">
                                        We want to see you! Our initial attraction to an individual, is almost exclusively based on appearance.
                                        It’s human nature. Within the first seconds of seeing someone, we decide if the person seems friendly, interesting, kind or fun.
                                        That’s why it’s imperative that you upload a profile picture. Statistics show that profiles without a photo have a lower chance of being viewed.
                                        To increase the likelihood of being selected, upload a recent (within the last 2 years), clear, photo of yourself.
                                        <br />
                                        <br />
                                        You must be the only person in the shot.
                                        Make sure the background is not distracting. Smile.
                                        Your potential mate will be interested in learning more about your home life also.
                                        Include pictures of your family, your hobbies, pets, activities that you participate in, where you live, your work and other things that interest you. Upload as many pictures as you can.
                                    </div>
                                </div>
                            </div>

                            <div className="service-wrap-items">
                                <div className="service-left-item">
                                    <div className="text-right title service-left-title">
                                        03<br />
                                        CHOOSE A PACKAGE<br />
                                    </div>
                                </div>
                                <div className="service-right-item">
                                    <div className="service-inner-text">
                                        Our goal at Life In Love, is to help you navigate the intricacies of communicating with your foreign connections.
                                        We want to simplify the process of finding lasting love.
                                        Since you’re checking out our site, we assume you’ve done your research and you’ve discovered that Life In Love is an ethical organization that’s made up of caring people who are genuinely interested in helping you find Love that Lasts.
                                        <br />
                                        <br />
                                        Maybe there are other areas that you need help with - such as the language and geographic barriers?
                                        We offer various services to assist with those needs. Please see further information under the “Services” tab.
                                    </div>
                                </div>
                            </div>

                            <div className="service-wrap-items">
                                <div className="service-left-item">
                                    <div className="text-right title service-left-title">
                                        04<br />
                                        THE LADY OF YOUR<br />
                                        DREAMS AWAITS!
                                    </div>
                                </div>
                                <div className="service-right-item">
                                    <div className="service-inner-text">
                                        You’re looking for the single female of your dreams - someone who is ready to build a real relationship and start a family.
                                        Our platform is just the right place to find her! We have tons of eligible ladies waiting to meet you.
                                        Select one of our Membership plans and start communicating with your potential mate.
                                        <br />
                                        <br />
                                        When you find a lady that’s interested, and you want to set-up a personal meeting, Life in Love is ready to orchestrate the meeting of your dreams.
                                        Please see further information under the “Services” tab.
                                    </div>
                                </div>
                            </div>

                            <div className="service-wrap-items">
                                <div className="service-left-item">
                                    <div className="text-right title service-left-title">
                                        05<br />
                                        YOUR HAPPINESS<br />
                                        IS OUR PRIORITY
                                    </div>
                                </div>
                                <div className="service-right-item">
                                    <div className="service-inner-text">
                                        The Life In Love team is focused on delivering exceptional customer service.
                                        We want to be sure you’re happy with your connections and satisfied with your experience.
                                        If you have any questions or concerns, please contact us immediately.
                                        You may message us via the contacts option provided on this site.
                                    </div>
                                </div>
                            </div>
                            
                            <div className="works-member-block clearfix">
                                <div className="clearfix pt-15">
                                    { testimonials.map((item, i) => this.printTestimonials(item, i)) }
                                </div>
                                <div className="col-sm-12 clearfix pv-40">
                                    <div className="form-group">
                                        <Row>
                                            <Col xs={4} className="text-center">
                                                <div className="member-switch" onClick={this.toggleMembers('new')}>
                                                    <span className={this.state.type === 'new' ? 'underline-text' : ''}>New</span>
                                                </div>
                                            </Col>
                                            <Col xs={4} className="text-center">
                                                <div className="member-switch" onClick={this.toggleMembers('popular')}>
                                                    <span className={this.state.type === 'popular' ? 'underline-text' : ''}>Popular</span>
                                                </div>
                                            </Col>
                                            <Col xs={4} className="text-center">
                                                <a href="/members" className="member-switch" onClick={this.goToMembers}>
                                                    <span>Show more</span>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                    <MembersCarousel items={publicList} />
                                </div>
                            </div>
                                <Panel bsClass="headerPanel panel">
                                    <Panel.Heading>
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
                            <hr />
                            <div className="color-888 fs-12">
                                Disclaimer:<br />
                                Although all clients are properly vetted to ensure honest connections, <strong>Life in Love</strong> is not responsible for connections that do not result in a successful bond or a lasting relationship. The <strong>Life in Love</strong> staff will make every effort to assist our clients in securing genuine contacts; but clients are advised they enter into the contract at their own risk. <strong>Life In Love</strong> does not implicitly or explicitly guarantee clients will find their soul mate or lasting love using any marriage service.
                            </div>
    	                </div>
    	            </div>
                </div>
            </Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        testimonials: state.ui.testimonials,
        publicList: state.members.public,
        token: state.user.token,
        showRegistration: state.ui.showRegistration,
        step: state.signup.step,
    })

export default connect(mapStateToProps)(Works)