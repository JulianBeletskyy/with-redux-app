import * as types from '../actions/types.js'

const initialState = {
	callOut: false,
	callIn: false,
	roomHash: '',
	oponent: {},
}

const chat = (chat = initialState, action = {}) => {
	switch (action.type) {
		case types.SET_CALL_OUT:
			return Object.assign({}, chat, {
				callOut: action.value
			})
		case types.SET_CALL_IN:
			return Object.assign({}, chat, {
				callIn: action.value
			})
		case types.SET_ROOM_HASH:
			return Object.assign({}, chat, {
				roomHash: action.hash
			})
		case types.SET_INVITE_OPONENT:
			return Object.assign({}, chat, {
				oponent: action.data
			})
		default:
			return chat
	}
}

export default chat