import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import BtnMain from '../../components/buttons/btn_main'
import { toggleModal, setUiKey } from '../../actions/ui'
import { getUserInfo } from '../../actions/user'
import { Router } from '../../routes'
import SubscribeTable from '../../components/tables/subscribe'

class Services extends Component {
    state = {
        titleSubscribe: '',
    }

	resolveButtons = type => e => {
		const { dispatch, token } = this.props
		if (token) {
			dispatch(toggleModal(true, type))
		} else {
			dispatch(setUiKey('showRegistration', true))
			Router.pushRoute('/')
			window.scrollTo(0,0)
		}
	}

    componentDidMount() {
        const { dispatch, token } = this.props
        if (token) {
            dispatch(getUserInfo())
        }
    }

	render() {
		return (
			<Layout>
	            <div className="container pt-100">
	            	<div className="bg-white p-15">
	            		<h1 className="font-bebas">Services</h1>
                        <hr />
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="service-title-left">
                                       At <span className="underline-text">Life In Love,</span> our ultimate goal is to successfully create mutually compatible connections.
                                    </div>
                                </div>
                                <div className="col-sm-8 form-group">
                                    <div className="service-title-right">
                                        Approaching an attractive, desirable lady for the first time isn’t always easy. Your heart rate increases while beads of sweat roll down your temple. Although this is a natural response, your nervousness can negatively affect the outcome of your initial interaction. This is even more challenging when you’re attempting to connect with someone from a foreign culture, who speaks a different language.
                                    </div>
                                    <div className="color-888">
                                        As an active member of <strong>Life In Love</strong>, you can rest assured that we’ll be there to help you through the introductory process. We serve as a liaison between you and your desired mate. Our staff is comprised of residents from the local area, who are knowledgeable about the Ukrainian and Russian cultures. On your own, the culture and language barrier may be an obstacle – but as our client, you can relax in knowing we have a competent staff to guide you in understanding the culture, and our translators will help you communicate effectively with your potential mate.
                                        Clients sign up with us at different stages in their search for love. Some need a comprehensive plan with step-by-step directions; while others need assistance with one or two services. Whichever scenario applies to you; know that we’ve created our packages with you in mind. Our Membership Program offers a variety of plans. Depending on the benefits you desire, you may choose the Gold, Platinum or VIP Package.
                                        Now that you’re ready to enroll, please review the packages below and choose the plan that’s right for you.
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <SubscribeTable />
                                </div>
                                <div className="form-group col-sm-12">
                                    <div className="color-888">
                                        After trying this Sampler option, many clients decide to enroll in a monthly Membership Plan. If you opt for this route, you may convert to our Gold, Platinum or VIP packages at any time.
                                        Don’t forget you’ve got DIBS on all services we offer. Use your DIBS today! With Memership Plan the price of Dib starts from <strong>ONLY $0.52</strong> for each!
                                    </div>
                                </div>
                                <div className="col-sm-8 col-sm-offset-2">
                                    <div className=" table-responsive">
                                        <table className="table table-bordered credits-table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td>10 Dibs/$1.09 per Dib. - $10.99</td>
                                                    <td>1 private photo = 2 Dibs</td>
                                                </tr>
                                                <tr>
                                                    <td>20 Dibs/$0.99 per Dib. - $19.99</td>
                                                    <td>1 private video = 4 Dibs</td>
                                                </tr>
                                                <tr>
                                                    <td>50 Dibs/$0.94 per Dib. - $46.99</td>
                                                    <td>1 letter = 5 Dibs</td>
                                                </tr>
                                                <tr>
                                                    <td>100 Dibs/$0.89 per Dib. - $89.99</td>
                                                    <td rowSpan="3"></td>
                                                </tr>
                                                 <tr>
                                                    <td>200 Dibs/$0.84 per Dib. - $169.99</td>
                                                </tr>
                                                 <tr>
                                                    <td>500 Dibs/$0.74 per Dib. - $374.99</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group text-center">
                                        <BtnMain
                                            bsStyle="success"
                                            text="Buy dibs"
                                            onClick={this.resolveButtons('credits')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">01.</div>
                                        <span className="title-service">TRANSLATION SERVICES</span>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    When you enroll in this service we will translate your emails, letters and/or other communications to/from Russian or Ukrainian, English, German, Spanish, French or Portuguese. We can translate other languages as needed. Please contact us directly for special translation requests.
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-8 hidden-xs">
                                    Most packages include the option to share extra photos and video files with your potential mate. We highly recommend you engage is Video Chat as it gives both individuals the opportunity to see the other person’s smile, hear them speak and get a feel for their personality. Photo Sharing also helps both parties get to know their potential mate. Whether via photos or video, seeing the other person is a great way to help you both decide whether there is an attraction. We encourage you to take advantage of these resources.
                                </div>
                                <div className="col-sm-4">
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">02.</div>
                                        <span className="title-service">PHOTO & VIDEO SHARING</span>
                                    </div>
                                </div>
                                <div className="hidden-lg hidden-md col-sm-8 hidden-sm">
                                    Most packages include the option to share extra photos and video files with your potential mate. We highly recommend you engage is Video Chat as it gives both individuals the opportunity to see the other person’s smile, hear them speak and get a feel for their personality. Photo Sharing also helps both parties get to know their potential mate. Whether via photos or video, seeing the other person is a great way to help you both decide whether there is an attraction. We encourage you to take advantage of these resources.
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">03.</div>
                                        <span className="title-service">FACE-TO-FACE MEETING</span>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div>
                                        Ukraine is a well-kept secret as a beautiful tourist destination. The country is layered in mountains, such as the Carpathian Mountain which is perfect for skiing, fishing and hunting. The landscape is dotted with beautiful vineyards that yield grapes used to produce our native wines, table grapes, raisins and non-alcoholic grape juice.
                                    </div>
                                    <br />
                                    <div>
                                        Your plans to visit Ukraine must include a stop-over in Odessa. Located along the Black Sea, this popular vacation destination is known for its beaches and its shoreline is lined with quaint stores and intimate eateries. There are many other points of interest in Ukraine. Although you can plan the trip on your own, as residents we have the inside track on what to see, where to go, and things to do to ensure you enjoy your visit. When you enroll in this service, <strong>Life In Love</strong> will help with making all your travel arrangements. From reserving your airline tickets to recommending a safe place to stay, we can organize the entire trip on your behalf.
                                    </div>
                                    <br />
                                    <div>
                                        Our client’s satisfaction is our #1 priority. We can arrange a first-class trip with luxurious accommodations, fine dining restaurants with celebrity chefs and high-end shopping districts. We also organize trips for clients on a more modest budget. Since our services vary depending on the client’s needs, a fixed package price is not available. Please contact our service center directly and a staff member will provide an accurate package quote, based on the services you desire. If you opt to book the trip on your own, let us know when you’re coming, how long your trip will be, and the cities you plan to visit.
                                    </div>
                                    <br />
                                    <div>
                                        The most exciting aspect of your visit will undoubtedly be your face-to-face meeting with your love. You’ve waited a long time for this moment and everything must be perfect. Once you’ve advised us of your potential interest(s), our team will reach out to her to manage the logistics on our side, and we’ll be sure her availability is synced with your travel itinerary. Sign up for this service and we’ll confirm that every detail of your visit is well orchestrated to ensure a successful connection.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-8 hidden-xs">
                                    <div>
                                        As your relationship becomes more serious, you will need to start thinking about preparing legal documents such as immigration papers, your fiancée visa, other legal papers, etc. Many types of documents will need to be translated. We have assisted many couples with compiling the necessary paperwork to present to the authorities and we’re equipped to assist you as well.
                                    </div>
                                    <br />
                                    <div>
                                        If you’re a United States resident, one of the most important things to consider is the International Marriage Broker Regulation Act (IMBRA). IMBRA is a US Federal Statute that requires background checks for all Marriage Visa Sponsors. To be sure you’re legally covered before you travel, confirm any fees associated with IMBRA, and/or for further information, please check the US Citizen & Immigration Services site at USCIS.gov.
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">04.</div>
                                        <span className="title-service">DOCUMENT PREPARATION</span>
                                    </div>
                                </div>
                                <div className="col-sm-8 hidden-sm hidden-md hidden-lg">
                                    As your relationship becomes more serious, you will need to start thinking about preparing legal documents such as immigration papers, your fiancée visa, other legal papers, etc. Many types of documents will need to be translated. We have assisted many couples with compiling the necessary paperwork to present to the authorities and we’re equipped to assist you as well.
                                    If you’re a United States resident, one of the most important things to consider is the International Marriage Broker Regulation Act (IMBRA). IMBRA is a US Federal Statute that requires background checks for all Marriage Visa Sponsors. To be sure you’re legally covered before you travel, confirm any fees associated with IMBRA, and/or for further information, please check the US Citizen & Immigration Services site at USCIS.gov.
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-4" sm={4}>
                                    <div className="bg-gray service-wrap-title">
                                        <div className="service-number">05.</div>
                                        <span className="title-service">GIFT GIVING PROGRAM</span>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    Fact: Ladies love attention and affection. Ukrainian and Russian women are no different. They appreciate receiving flowers and gifts from their lover. Be romantic! Show your potential mate your undivided attention by sending a beautiful bouquet or a considerate gift, with a nice note. <strong>Life In Love</strong> can help with arranging delivery of your gifts to your mate. We can also have a photo taken of her surprise response when she receives the gift. Contact us for other great ideas of how to surprise your love. Let’s plan her surprise today!
                                </div>
                            </div>
                        </div>
                        <div className="service-title-right form-group">
                            Finding love abroad can be challenging – but it’s not impossible. <strong>Life In Love</strong> will guide you through the process. Sign up for our services and let us help you meet the lady of your dreams today!
                        </div>
                        <hr />
                        <div className="color-888 fs-12">
                            Disclosure:<br />
                            * Client agrees to send and/or receive private photos at his own discretion. Life In Love cannot be responsible for communications transmitted without prior knowledge and/or approval from our organization.
                            ** Life In Love respects our clients Right to Privacy. To maintain confidentiality, we encourage you to adhere to all conditions below:
                            <ul>
                                <li>Your potential mate speaks English at the Intermediate, Upper or Advanced Level</li>
                                <li>The lady agrees to share her credentials</li>
                                <li>Client’s Member Profile has been Verified</li>
                                <li>Both parties have accepted the Terms & Conditions</li>
                            </ul>
                        </div>
	                </div>
	            </div>
            </Layout>
        )
	}
}

const mapStateToProps = ({user, ui: {modals}}) => ({token: user.token, subscribe: modals.subscribe})

export default connect(mapStateToProps)(Services)