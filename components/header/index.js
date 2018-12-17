import React, { Component } from 'react'
import { NavDropdown, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toggleModal, MyCountry } from '../../actions/ui'
import { logout } from '../../actions/auth'
import { Router } from '../../routes'
import { getUnreadMessage } from '../../actions/message'
import { setCart } from '../../actions/shop'
import BtnMain from '../buttons/btn_main'
import loadable from '@loadable/component'

const MainModal = loadable(() => import('../modal'))
const Support = loadable(() => import('../forms/support'))
const Login = loadable(() => import('../forms/login'))
const Recovery = loadable(() => import('../forms/recovery'))


class PublicHeader extends Component {
    constructor() {
        super()
        this.state = {
            dropdown: false
        }
    }

    getCart = id => {
        const data = window.localStorage.getItem(`cart-${id}`);
        return JSON.parse(data ? data : '[]');
    }

    countCart = () => {
        let count = 0
        for (let prod of this.props.cart) {
            count += prod.count
        }
        return count
    }

    showLogIn = () => e => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(toggleModal(true, 'login'))
    }

    showSupport = () => e => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(toggleModal(true, 'support'))
    }

    logOut = () => e => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(logout()).then(res => {
            if (res) {
                Router.pushRoute('/')
            }
        })
    }

    toggleDropDown = () => {
        this.setState({open: !this.state.open})
    }

    goTo = link => e => {
        e.preventDefault()
        Router.pushRoute(link)
    }

    getActiveClass = type => {
        const { router } = Router
        if (router && router.pathname.split('/')[1] === type) {
            return 'active'
        }
        return ''
    }

    closeModal = () => {
        const { dispatch } = this.props
        dispatch(toggleModal(false, 'videoRequestMessage'))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId && nextProps.userId !== this.props.userId) {
            const { dispatch } = this.props
            dispatch(setCart(this.getCart(nextProps.userId)))
        }
    }

    componentDidMount() {
        const { dispatch, token } = this.props
        dispatch(MyCountry())
        if (token) {
            dispatch(getUnreadMessage())
        }
    }

    render() {
        const { country } = this.props.signup
        const { token, support, login, recovery, role, unreadMessage, cart, active, videoRequestMessage } = this.props

        return (
            <div>
                <Navbar className="title" fixedTop collapseOnSelect={true} onToggle={this.setNavExpanded}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" onClick={this.goTo('/')}>
                                <img alt="a real dating site" style={{maxWidth: 150}} src="https://d2etktq4v0899q.cloudfront.net/static/assets/img/logo-dark.svg" className="brandImg img-responsive" />
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse id="collapse" className="collapse-head">
                        <ul className="navBar nav navbar-nav navbar-right">
                            {
                                (country !== 'UA' && ! token)  
                                ?   <NavDropdown role="presentation" title="About" id="dropdown">
                                        <a href="/about" onClick={this.goTo('/about')}>About Company</a>
                                        <a href="/how-it-works" onClick={this.goTo('/how-it-works')}>How it works?</a>
                                        <a href="/testimonials" onClick={this.goTo('/testimonials')}>Testimonials</a>
                                        <a href="/success-stories" onClick={this.goTo('/success-stories')}>Success stories</a>
                                    </NavDropdown>
                                :   null
                            }
                            { 
                                (token && active)
                                ?   <li role="presentation" className={this.getActiveClass('mail')}>
                                        <a href="/mail/incoming" onClick={this.goTo('/mail/incoming')}>Mail</a>
                                        {unreadMessage ? <span className="badge-message">{unreadMessage}</span> : null}
                                    </li>
                                :   null
                            }
                            { 
                                (token && active) 
                                ?   <li role="presentation"><a href="/profile/info" onClick={this.goTo('/profile/info')}>My Profile</a></li>
                                :   null
                            }
                            {   
                                (token && active)
                                ?   role === 'client'
                                    ?   <li role="presentation"><a href="/girls" onClick={this.goTo('/girls')}>Ladies</a></li>
                                    :   <li role="presentation"><a href="/men" onClick={this.goTo('/men')}>Men</a></li>
                                :   country !== 'UA' ? <li role="presentation"><a href="/members" onClick={this.goTo('/members')}>Ladies</a></li> : null

                            }
                            { 
                                (token && active) 
                                ?   <NavDropdown role="presentation" title="Contacts" id="dropdown">
                                        <a href="/contacts/favorite" onClick={this.goTo('/contacts/favorite')}>Favorite</a>
                                        <a href="/contacts/interests" onClick={this.goTo('/contacts/interest')}>My interests</a>
                                    </NavDropdown>
                                :   null
                            }
                            {
                                token && role === 'client'
                                ?   <li role="presentation"><a href="/videocall" onClick={this.goTo('/videocall')}>Video Call</a></li>
                                :   null
                            }
                            { 
                                (country !== 'UA' || (token && role === 'client' && active))
                                ?   <li role="presentation"><a href="/services" onClick={this.goTo('/services')}>Services</a></li>
                                :   null
                            }
                            { 
                                country !== 'UA' && ! token
                                ?   <li role="presentation"><a href="/success-stories" onClick={this.goTo('/success-stories')}>Success Stories</a></li>
                                :   null
                            }
                            { 
                                (country !== 'UA' || (token && active))
                                ?    <li role="presentation" className={this.getActiveClass('blogs')}><a href="/blogs" onClick={this.goTo('/blogs')}>Blog</a></li>
                                :   null
                            }
                            { 
                                country !== 'UA' && ! token
                                ?   <li role="presentation"><a href="/how-it-works" onClick={this.goTo('/how-it-works')}>How it works?</a></li>
                                :   null
                            }
                            { 
                                (token && role === 'client' && active)
                                ?   <li role="presentation"><a href="/shop" onClick={this.goTo('/shop')}>Shop</a></li>
                                :   null
                            }
                            {
                                (! token || (token && !active)) 
                                ?   <NavDropdown 
                                        role="presentation"
                                        eventKey={2}
                                        title="Support" 
                                        id="support-nav-dropdown">
                                        <a href="javascript:;" onClick={this.showSupport()}>Send Request</a>
                                        <a href="/faq" onClick={this.goTo('/faq')}>FAQ</a>
                                    </NavDropdown>
                                :   null
                            }
                            {
                                (token && role === 'client' && active)
                                ?   <NavDropdown role="presentation" title="About" id="dropdown">
                                        <a href="/about" onClick={this.goTo('/about')}>About Company</a>
                                        <a href="/how-it-works" onClick={this.goTo('/how-it-works')}>How it works?</a>
                                        <a href="/testimonials" onClick={this.goTo('/testimonials')}>Testimonials</a>
                                        <a href="/success-stories" onClick={this.goTo('/success-stories')}>Success stories</a>
                                    </NavDropdown>
                                :   null
                            }
                            {
                                (token && role === 'client' && active)
                                ?   <li role="presentation">
                                        <a href="/shop/cart" onClick={this.goTo('/shop/cart')}>
                                        <i className="fas fa-shopping-cart"></i></a>
                                        { cart.length ? <span className="badge-message">{this.countCart()}</span> : null }
                                    </li>
                                :   null
                                
                            }
                            {
                                token
                                ? <li><a href="javascript:;" onClick={this.logOut()}>Log Out</a></li>
                                : <li><a href="javascript:;" onClick={this.showLogIn()}>Log In</a></li>
                            }
                        </ul>
                    </Navbar.Collapse>
                </Navbar>
                {
                    support
                    ?   <MainModal
                            body={<Support />}
                            title="Send Request"
                            show={support}
                            keyModal="support" />
                    :   null
                }
                {
                    login
                    ?   <MainModal
                            body={<Login />}
                            title="Log In"
                            show={login}
                            keyModal="login" />
                    :   null
                }
                {
                    recovery
                    ?   <MainModal
                            body={<Recovery />}
                            title="Recovery"
                            show={recovery}
                            keyModal="recovery" />
                    :   null
                }
                {
                    videoRequestMessage
                    ?   <MainModal
                            body={  <div>
                                        <div className="form-group">
                                            We have received your request. You will get the notification as soon as the lady confirms time and date.
                                        </div>
                                        <div className="text-center">
                                            <BtnMain onClick={this.closeModal} text="OK" />
                                        </div>
                                    </div>}
                            title="Video Request"
                            show={videoRequestMessage}
                            keyModal="videoRequestMessage" />
                    :   null
                }
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        signup: {
            country: state.signup.country
        },
        support: state.ui.modals.support,
        login: state.ui.modals.login,
        recovery: state.ui.modals.recovery,
        userId: state.user.data.id,
        token: state.user.token,
        role: state.user.data.role,
        unreadMessage: state.user.data.unread_message,
        cart: state.shop.cart,
        active: state.user.data.active,
        videoRequestMessage: state.ui.modals.videoRequestMessage,
    })

export default connect(mapStateToProps)(PublicHeader)