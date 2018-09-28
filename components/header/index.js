import React, { Component } from 'react'
import { NavDropdown, Navbar } from 'react-bootstrap'
import store from '../../store'
import { connect } from 'react-redux'
import { toggleModal, MyCountry } from '../../actions/ui'
import { logout } from '../../actions/auth'
import MainModal from '../modal'
import Support from '../forms/support'
import Login from '../forms/login'
import Recovery from '../forms/recovery'
import { Router } from '../../routes'
import { getUnreadMessage } from '../../actions/message'
import { setCart } from '../../actions/shop'

class PublicHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown: false
        }
        const { dispatch, token } = props
        dispatch(MyCountry())
        if (token) {
            dispatch(getUnreadMessage())
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
        store.dispatch(toggleModal(true, 'login'))
    }

    showSupport = () => e => {
        e.preventDefault()
        store.dispatch(toggleModal(true, 'support'))
    }

    logOut = () => e => {
        e.preventDefault()
        store.dispatch(logout()).then(res => {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId && nextProps.userId !== this.props.userId) {
            const { dispatch } = this.props
            dispatch(setCart(this.getCart(nextProps.userId)))
        }
    }

    render() {
        const { country } = this.props.signup
        const { token, support, login, recovery, role, unreadMessage, cart } = this.props
        console.log(cart)
        return (
            <div>
                <Navbar className="title" fixedTop collapseOnSelect={true} onToggle={this.setNavExpanded}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" onClick={this.goTo('/')}>
                                <img alt="a real dating site" src="/static/assets/img/logo-dark.svg" className="brandImg img-responsive" />
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse id="collapse" className="collapse-head">
                        <ul className="navBar nav navbar-nav navbar-right">
                            {
                                (country !== 'UA' && ! token) &&    <NavDropdown role="presentation" title="About" id="dropdown">
                                                                        <a href="/about" onClick={this.goTo('/about')}>About Company</a>
                                                                        <a href="/how-it-works" onClick={this.goTo('/how-it-works')}>How it works?</a>
                                                                        <a href="/testimonials" onClick={this.goTo('/testimonials')}>Testimonials</a>
                                                                        <a href="/success-stories" onClick={this.goTo('/success-stories')}>Success stories</a>
                                                                    </NavDropdown>
                            }
                            { token &&  <li role="presentation">
                                            <a href="/mail/incoming" onClick={this.goTo('/mail/incoming')}>Mail</a>
                                            {unreadMessage ? <span className="badge-message">{unreadMessage}</span> : null}
                                        </li>
                            }
                            { token && <li role="presentation"><a href="/profile/info" onClick={this.goTo('/profile/info')}>My Profile</a></li> }

                            { (country !== 'UA' || (token && role === 'client')) && <li role="presentation"><a href="/girls" onClick={this.goTo('/girls')}>Girls</a></li> }

                            { (country !== 'UA' || (token && role === 'girl')) && <li role="presentation"><a href="/men" onClick={this.goTo('/men')}>Men</a></li> }

                            { token &&  <NavDropdown role="presentation" title="Contacts" id="dropdown">
                                            <a href="/contacts/favorite" onClick={this.goTo('/contacts/favorite')}>Favorite</a>
                                            <a href="/contacts/interests" onClick={this.goTo('/contacts/interest')}>My interests</a>
                                        </NavDropdown> 
                            }
                            { (country !== 'UA' || (token && role === 'client')) && <li role="presentation"><a href="/services" onClick={this.goTo('/services')}>Services</a></li> }
                            { country !== 'UA' && ! token && <li role="presentation"><a href="/success-stories" onClick={this.goTo('/success-stories')}>Success Stories</a></li>}
                            { (country !== 'UA' || token) && <li role="presentation"><a href="/blogs" onClick={this.goTo('/blogs')}>Blog</a></li> }
                            { country !== 'UA' && ! token && <li role="presentation"><a href="/how-it-works" onClick={this.goTo('/how-it-works')}>How it works?</a></li> }
                            { (token && role === 'client') && <li role="presentation"><a href="/shop" onClick={this.goTo('/shop')}>Shop</a></li> }
                            {
                                ! token &&  <NavDropdown 
                                                role="presentation"
                                                eventKey={2}
                                                title="Support" 
                                                id="support-nav-dropdown">
                                                <a href="javascript:;" onClick={this.showSupport()}>Send Request</a>
                                                <a href="/faq" onClick={this.goTo('/faq')}>FAQ</a>
                                            </NavDropdown>
                            }
                            {
                                (token && role === 'client') && <NavDropdown role="presentation" title="About" id="dropdown">
                                                                    <a href="/about" onClick={this.goTo('/about')}>About Company</a>
                                                                    <a href="/how-it-works" onClick={this.goTo('/how-it-works')}>How it works?</a>
                                                                    <a href="/testimonials" onClick={this.goTo('/testimonials')}>Testimonials</a>
                                                                    <a href="/success-stories" onClick={this.goTo('/success-stories')}>Success stories</a>
                                                                </NavDropdown>
                            }
                            {
                                (token && role === 'client') && <li role="presentation">
                                                                    <a href="/shop/cart" onClick={this.goTo('/shop/cart')}>
                                                                    <i className="fas fa-shopping-cart"></i></a>
                                                                    { cart.length ? <span className="badge-message">{this.countCart()}</span> : null }
                                                                </li>
                                
                            }
                            {
                                token
                                ? <li><a href="javascript:;" onClick={this.logOut()}>Log Out</a></li>
                                : <li><a href="javascript:;" onClick={this.showLogIn()}>Log In</a></li>
                            }
                        </ul>
                    </Navbar.Collapse>
                </Navbar>
                <MainModal
                    body={<Support />}
                    title="Send Request"
                    show={support}
                    keyModal="support" />
                <MainModal
                    body={<Login />}
                    title="Log In"
                    show={login}
                    keyModal="login" />
                <MainModal
                    body={<Recovery />}
                    title="Recovery"
                    show={recovery}
                    keyModal="recovery" />
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
    })

export default connect(
    mapStateToProps
)(PublicHeader)