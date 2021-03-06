import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from '../../routes'
import { setUiKey, toggleModal } from '../../actions/ui'

class Footer extends Component {

    goTo = link => e => {
    	e.preventDefault()
    	Router.pushRoute(link)
    }

    showSignUp = () => {
        const { dispatch } = this.props
        dispatch(setUiKey('showRegistration', true))
        Router.pushRoute('/')
        window.scrollTo(0,0)
    }

    showLogin = () => {
        const { dispatch } = this.props
        dispatch(toggleModal(true, 'login'))
    }

    render() {
    	const { role, token } = this.props
        return (
            <div className="footer-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <ul>
	                            {
	                                token && role === 'client'
	                                ?   <li>
	                                        <i className="far fa-user"></i>
	                                        <a href="/services" onClick={this.goTo('/subscribe')}>Membership</a>
	                                    </li>
	                                :   null 
	                            }   
                                <li>
                                    <i className="fas fa-question-circle"></i>
                                    <a href="/how-it-works" onClick={this.goTo('/how-it-works')}>How it works</a>
                                </li>
                                <li>
                                    <i className="fas fa-briefcase"></i>
                                    <a href="/faq" onClick={this.goTo('/faq')}>FAQ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <ul>
                                <li>
                                    <i className="fas fa-info-circle"></i>
                                    <a href="/about" onClick={this.goTo('/about')}>About Us</a>
                                </li>
                                <li>
                                    <i className="far fa-heart"></i>
                                    <a href="/success-stories" onClick={this.goTo('/success-stories')}>Success Stories</a>
                                </li>
                                <li>
                                    <i className="fas fa-globe"></i>
                                    <a href="/blogs" onClick={this.goTo('/blogs')}>Blogs</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                        {
                            !token
                            ?   <ul>
                                    <li>
                                        <i className="fas fa-user-plus"></i>
                                        <a href="javascript:;" onClick={this.showSignUp}>Join Free</a>
                                    </li>                            
                                    <li>
                                        <i className="fas fa-sign-in-alt"></i>
                                        <a href="javascript:;" onClick={this.showLogin}>Member Login</a>
                                    </li>
                                </ul>
                            :   null
                        }   
                        </div>
                    </div>
                    <div className="footer-bottom">
                        Copyright &copy; Lifeinlove - All Rights Reserved 2018
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
	({
		token: state.user.token,
		role: state.user.data.role,
	})

export default connect(mapStateToProps)(Footer)