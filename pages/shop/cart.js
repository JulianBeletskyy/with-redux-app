import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import { getUserInfo } from '../../actions/user'
import { getAllMembers } from '../../actions/members'
import { setCart, setReceiverToShop, buyProducts } from '../../actions/shop'
import ReceiverInfo from '../../components/block/receiver_info'

class Cart extends Component {

    constructor(props) {
        super(props)
        const { dispatch } = props
        dispatch(getUserInfo())
        dispatch(getAllMembers())
    }

    setReceiver = receiver => {
    	const { dispatch } = this.props
        dispatch(setReceiverToShop(receiver))
    }

    clearReceiver = () => {
    	const { dispatch } = this.props
        dispatch(setReceiverToShop({}))
    }

    getCart = () => {
        const data = window.localStorage.getItem(`cart-${this.props.userId}`);
        return JSON.parse(data ? data : '[]');
    }

    getTotal = () => {
        let total = 0
        this.props.cart.map((item, i) => {
            total += item.product.price * item.count
        })
        return total.toFixed(2)
    }

    removeFromCart = product => e => {
    	const { dispatch } = this.props

    	let cart = this.getCart()
        cart = cart.map(item => {
            if (item.product.id === product.id) {
                item.count--
            }
            return item
        })

        cart = cart.filter(item => item.count !== 0)
        
        window.localStorage.setItem(`cart-${this.props.userId}`, JSON.stringify(cart));
        dispatch(setCart(this.getCart()))
    }

    removeItemCart = product => e => {
    	const { dispatch } = this.props

    	let cart = this.getCart()
        cart = cart.filter(item => item.product.id !== product.id)

        window.localStorage.setItem(`cart-${this.props.userId}`, JSON.stringify(cart))
        dispatch(setCart(this.getCart()))
    }

    clearCart = () => {
    	const { dispatch } = this.props

        window.localStorage.setItem(`cart-${this.props.userId}`, '[]');
        dispatch(setCart(this.getCart()))
    }

    addToCart = product => e => {
    	const { dispatch } = this.props

    	let cart  = this.getCart()
        let check = false

        cart = cart.map(item => {
            if (item.product && item.product.id === product.id) {
                item.count++
                check = true;
            }
            return item
        })

        if (!check) {
            cart.push({product: product, count: 1});
        }
        
        window.localStorage.setItem(`cart-${this.props.userId}`, JSON.stringify(cart));
        dispatch(setCart(this.getCart()))
    }

    printCart = (item, i) => {
    	const { product } = item
    	return  <tr className="font-bebas" key={i}>
                    <td><img className="cart-thumbnail" src={product.image} alt="" /></td>
                    <td><span>{product.name}</span></td>
                    <td className="text-center"><span>${product.price}</span></td>
                    <td className="text-center">
                        <span>
                            {
                                item.count > 1
                                ?   <span onClick={this.removeFromCart(product)} className="pull-left pointer">
                                        <i className="fas fa-minus"></i>
                                    </span>
                                :   <span className="hidden">
                                        <i className="fas fa-minus"></i>
                                    </span>
                            }
                            
                            {item.count}
                            <span onClick={this.addToCart(item.product)} className="pull-right pointer">
                                <i className="fas fa-plus"></i>
                            </span> 
                        </span>
                    </td>
                    <td className="text-center">
                        <strong>${(item.count * product.price).toFixed(2)}</strong>
                    </td>
                    <td>
                        <span className="pointer" onClick={this.removeItemCart(item.product)}>
                            <i className="fas fa-times text-danger"></i>
                        </span>
                    </td>
                </tr>
    }

    checkOut = () => {
        window.paypal.Button.render({
            env: 'production', // sandbox | production
            commit: true,
            style: {
                label: 'paypal',
                size:  'large',    // small | medium | large | responsive
                shape: 'rect',     // pill | rect
                color: 'blue',     // gold | blue | silver | black
                tagline: false    
            },
            client: {
                sandbox:    'AfDGqe6kXnSsTM9gDI2OZdUXxrydoxVCG7CZbp76Nr-NdDvHjyKs7W52X7n8s8_i4k6cQqwF7gor72f_',
                production: 'AUjZF0corGMnwDfnp4_EGJkFESZn6u96_wnxqVL2XNQ_RCkqnHjLJaNRKSB9j4Ypn4LniWukXuSJ_bF7'
            },
            payment: (data, actions) => {
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: this.getTotal(), currency: 'USD' }
                            }
                        ]
                    }
                });
            },

            onAuthorize: (data, actions) => {
                const { cart, receiver, dispatch } = this.props
                return actions.payment.execute().then(() => {
                    let temp = {}
                    for (let k in cart) {
                        temp[cart[k].product.id] = cart[k].count
                    }

                    const mas = {
                        girl_id: receiver.id,
                        paypal_id:  data.paymentID,
                        products: temp
                    }

                    dispatch(buyProducts(mas))
                    this.clearCart()
                    this.clearReceiver()
                });
            }
        }, '#paypal-button-cart');
    }

    renderPayPal = () => {
        if (!window.paypal) {
            const script = document.createElement('script')
            script.src = 'https://www.paypalobjects.com/api/checkout.js'

            script.onload = () => {
                this.checkOut()
            }
            document.body.appendChild(script)
        } else {
            this.checkOut()
        }
    }

    componentDidMount() {
        this.renderPayPal()
    }

    render() {
    	const { cart, membersList, receiver } = this.props
    	const hiddenClass = cart.length && receiver.id ? '' : 'hidden'
        return (
            <Layout>
            	<div className="pt-15">
                    <div className="pt-66 bg-blue">
                        <Grid className="bg-white pt-15 pb-50">
                        	<Row>
				                <Col xs={12}>
				                    <FormGroup>
				                        <div className="table-responsive">
				                            <table className="table">
				                                <thead>
				                                    <tr className="{style.titleTable}">
				                                        <th>&nbsp;</th>
				                                        <th>Products</th>
				                                        <th className="text-center">Price</th>
				                                        <th className="text-center">Quantity</th>
				                                        <th className="text-center">Total</th>
				                                        <th>&nbsp;</th>
				                                    </tr>
				                                </thead>
				                                <tbody className="{style.tableBody}">
				                                    { cart.map((item, i) => this.printCart(item, i)) }
				                                </tbody>
				                                <tfoot>
				                                    <tr className="{style.titleTable}">
				                                        <td></td>
				                                        <td></td>
				                                        <td className="text-center"></td>
				                                        <td className="text-right font-bebas">
				                                            <strong>Total:</strong>
				                                        </td>
				                                        <td className="text-center font-bebas">
				                                            <strong>${this.getTotal()}</strong>
				                                        </td>
				                                        <td></td>
				                                    </tr>
				                                </tfoot>
				                            </table>
				                        </div>
				                    </FormGroup>
				                    <FormGroup>
				                    &nbsp;
				                    </FormGroup>
				                    <Row>
				                        <Col sm={8}>
				                            <FormGroup>
				                                <ReceiverInfo 
				                                    inputRef={ref => { this.receiver = ref }} 
				                                    receiver={receiver}
				                                    onClick={this.setReceiver}
				                                    clearReceiver={this.clearReceiver}
				                                    list={membersList} />
				                            </FormGroup>
				                        </Col>
				                        <Col sm={4}>
				                            <div className={`${hiddenClass} text-center`} id="paypal-button-cart"></div>
				                        </Col>
				                    </Row>
				                </Col>
				            </Row>
                        </Grid>
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = state =>
    ({
        categories: state.shop.categories,
        userId: state.user.data.id,
        cart: state.shop.cart,
        receiver: state.shop.receiver,
        membersList: state.members.list,
    })

export default connect(
    mapStateToProps
)(Cart)
