import * as types from './types.js'
import { post, message, get, remove } from '../api'
import {  getUserInfo, setUserInfo } from './user'

export const sendMessage = data => dispatch => {
	let formData = new FormData()
    if (data.attachment.length) {
        data.attachment.forEach(item => {
            formData.append('attachment[]', item)
        })
    }
    formData.append('original', data.original)
    formData.append('receiver_id', data.receiver_id)
    
	return message(`user/message/send`, true, formData).then(res => {
		if (res.data) {
			return true
		} else if (res.validate) {
			if (res.validate['_service']) {
				return res.validate['_service']
			}
		}
	})
}

export const buyMessage = data => dispatch => {
	let formData = new FormData()
    if (data.attachment.length) {
        data.attachment.forEach(item => {
            formData.append('attachment[]', item)
        })
    }
    formData.append('original', data.original)
    formData.append('receiver_id', data.receiver_id)

    return message(`user/message/buy`, true, formData).then(res => {
    	if (res.data) {
    		dispatch(getUserInfo())
    		return true
    	}
    	dispatch(getUserInfo())
		return true
    })
}

export const getMail = type => dispatch => {
	return get(`user/message/${type}`).then(res => {
		if (res.data) {
			dispatch(setMessages(res.data, type))
			dispatch(getUnreadMessage())
		}
	})
}

export const getMessage = (id, key) => dispatch => {
	return get(`user/message/${key}/${id}`).then(res => {
		if (res.data) {
			dispatch(setMessage(res.data))
			dispatch(getUnreadMessage())
		}
	})
}

export const getUnreadMessage = () => dispatch => {
	return get(`user/all-unread-message`).then(res => {
		if (res.data) {
			dispatch(setUserInfo({unread_message: res.data.count}))
		}
	})
}

export const removeMessage = (id, type) => dispatch => {
	return remove(`user/message/${id}/remove`, true).then(res => {
		if (res.data) {
			dispatch(getMail(type))
		}
	})
}

export const removeMessagePermanent = (id, type) => dispatch => {
	return remove(`user/message/${id}/removepermanent`)
}

export const restoreMessage = (id, type) => dispatch => {
	return get(`user/message/${id}/restore`).then(res => {
		if (res.data) {
			dispatch(getMail(type))
			return true
		}
	})
}

export const saveDraft = data => dispatch => {
	let formData = new FormData()
    if (data.attachment.length) {
        data.attachment.forEach(item => {
            formData.append('attachment[]', item)
        })
    }
    formData.append('original', data.original)
    formData.append('receiver_id', data.receiver_id)

	return message(`user/message/draft${data.id ? `/${id}` : ''}`, true, formData).then(res => {
		if (res.data) {
			return true
		}
	})
}

export const removeDraft = id => dispatch => {
	return remove(`user/message/draft/${id}`, true).then(res => {
		if (res.data) {
			dispatch(getMail('draft'))
		}
	})
}

export const showAttach = data => dispatch => {
	return post(`user/message/attachment/see`, true, data).then(res => {
		if (res.data) {
			dispatch(setMessage(res.data))
			return true
		}
		return false
	})
}

export const buyAttach = data => dispatch => {
	return post(`user/message/attachment/buy`, true, data).then(res => {
		if (res.data) {
			dispatch(setMessage(res.data))
			dispatch(getUserInfo())
		}
	})
}

export const setBuyingAttach = data =>
	({
		type: types.SET_BUYING_ATTACH,
		data,
	})

export const setSendingMessage = data =>
	({
		type: types.SET_SENDING_MESSAGE,
		data,
	})

export const setNewMessage = data =>
	({
		type: types.SET_NEW_MESSAGE,
		data,
	})

export const setMessage = data =>
	({
		type: types.SET_MESSAGE,
		data
	})

export const setMessages = (data, key) =>
	({
		type: types.SET_MESSAGES,
		data,
		key	
	})

export const addAttachMessage = data =>
	({
		type: types.ADD_ATTACH_MESSAGE,
		data,
	})

export const clearAttachMessage = key =>
	({
		type: types.CLEAR_ATTACH_MESSAGE,
		key,
	})