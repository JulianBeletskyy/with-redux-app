import * as types from '../actions/types.js'

const initialState = {
    receiver: {},
    categories: [],
    cart: [],
}

const shop = (shop = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_RECEIVER_TO_SHOP:
            return Object.assign({}, shop, {
                receiver: action.data
            })
        case types.SET_CATEGORIES:
        	return Object.assign({}, shop, {
                categories: action.data
            })
        case types.SET_CART:
            return Object.assign({}, shop, {
                cart: action.cart
            });
        default:
            return shop;
    }
}

export default shop