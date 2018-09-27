import * as types from '../actions/types.js'

const initialState = {
    receiver: {},
}

const shop = (shop = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_RECEIVER_TO_SHOP:
            return Object.assign({}, shop, {
                receiver: action.data
            })
        default:
            return shop;
    }
}

export default shop