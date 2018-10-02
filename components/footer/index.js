import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Router } from '../../routes'

class Footer extends Component {

    goTo = link => e => {
    	e.preventDefault()
    	Router.pushRoute(link)
    }

    render() {
    	const { role, token } = this.props
        return (
            <div className="footer-wrap">
                <Grid>
                    <Row>
                        <Col sm={4}>
                            <ul>
	                            {
	                                token && role === 'client'
	                                ?   <li>
	                                        <i className="far fa-user"></i>
	                                        <a href="/services" onClick={this.goTo('/services')}>Membership</a>
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
                        </Col>
                        <Col sm={4}>
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
                        </Col>
                        <Col sm={4}>
                            <ul>
                                <li>
                                    <i className="fas fa-user-plus"></i>
                                    <a href="javascript:;" onClick={this.showSignUp}>Join Free</a>
                                </li>                            
                                <li>
                                    <i className="fas fa-sign-in-alt"></i>
                                    <a href="javascript:;" onClick={this.showLogin}>Member Login</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <div className="footer-bottom">
                        Copyright &copy; Lifeinlove - All Rights Reserved 2018
                    </div>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state =>
	({
		token: state.user.token,
		role: state.user.data.role,
	})

export default connect(
    mapStateToProps
)(Footer)
