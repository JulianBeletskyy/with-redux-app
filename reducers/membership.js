import * as types from '../actions/types.js'

const initialState = {
    packages: [],
    activePackage: {id: 0},
    membership: [],
}

const membership = (membership = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_PACKAGES:
            return Object.assign({}, membership, {
                packages: action.data
            });
        case types.SET_PACKAGE:
            return Object.assign({}, membership, {
                activePackage: action.data
            });
        case types.SET_MEMBERSHIPS:
            return Object.assign({}, membership, {
                membership: action.data
            })
        default:
            return membership;
    }
}

export default membership