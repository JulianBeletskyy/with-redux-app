import * as types from '../actions/types.js'

const initialState = {
    attach: [],
    incoming: [],
    outgoing: [],
    draft: [],
    deleted: [],
    contacts: [],
    message: {
        sender_avatar: '',
        sender_first_name: '',
        sender_id: '',
        translation: '',
        original: '',
        receiver_avatar: '',
        receiver_first_name: '',
        receiver_id: '',
    },
    newMessage: {
        avatar: '',
        first_name: '',
        receiver_id: '',
    },
    sendingMessage: {},
    buyingAttach: {},
}

const message = (message = initialState, action = {}) => {
    switch (action.type) {
        case types.ADD_ATTACH_MESSAGE:
            return Object.assign({}, message, {
                attach: [...message.attach, ...action.data]
            })
        case types.CLEAR_ATTACH_MESSAGE:
            return Object.assign({}, message, {
                attach: message.attach.filter((item, i) => i !== action.key)
            })
        case types.SET_MESSAGES:
            return Object.assign({}, message, {
                [action.key]: action.data
            })
        case types.SET_MESSAGE:
            return Object.assign({}, message, {
                message: action.data
            })
        case types.SET_NEW_MESSAGE:
            return Object.assign({}, message, {
                newMessage: action.data
            })
        case types.SET_SENDING_MESSAGE:
            console.log(action.data)
            return Object.assign({}, message, {
                sendingMessage: action.data
            })
        case types.SET_BUYING_ATTACH:
            return Object.assign({}, message, {
                buyingAttach: action.data
            })
        default:
            return message;
    }
}

export default message