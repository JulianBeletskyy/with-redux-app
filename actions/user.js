import { get, post, message, put } from '../api'
import * as types from './types.js'
import { getMember } from './members'
import { openSocket } from '../utils/socket'
import { detectAdBlock } from '../utils'

export const getUserFullInfo = () => dispatch => {
	return get(`user/profile`).then(res => {
		if (res.data) {
			dispatch(setUserInfo(res.data))
		}
	})
}

export const getUserInfo = () => dispatch => {
	return get(`user`).then(res => {
		if (res.data) {
			dispatch(setUserInfo(res.data))
			openSocket()
			detectAdBlock(res.data.id)
		}
	})
}

export const getUserGallery = () => dispatch => {
	return get('gallery').then(res => {
		if (res.data) {
			dispatch(setUserInfo({gallery: res.data}))
			return true
		}
	})
}

export const rotateImgGallery = (id, angle) => dispatch => {
	dispatch({
		type: types.ROTATE_IMG_GALLERY,
		id,
		angle,
	})
	return post('gallery/rotate', false, {id, angle}).then(res => {
		console.log(res)
	})
}

export const getUserVideo = () => dispatch => {
	return get(`girl/video`).then(res => {
		if (res.data) {
			dispatch(setUserInfo({video: res.data}))
			return true
		}
	})
}

export const updateUser = data => dispatch => {
	return put(`user/profile`, true, data).then(res => {
		if (res.data) {
			console.log(res.data)
		}
	})
}

export const changePassword = data => dispatch => {
	return put(`password/update`, true, data)
}

export const addToGallery = data => dispatch => {
	let formData = new FormData()
    formData.append('image', data)

	return message(`gallery/add`, true, formData).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
		}
	})
}

export const removePhotos = data => dispatch => {
	return post(`gallery/remove`, true, data).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
		}
	})
}

export const toggleActive = (data, url) => dispatch => {
	return post(`gallery/${url}`, true, data).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
			return true
		}
	})
}

export const makePrivate = data => dispatch => {
	return post(`gallery/make/private`, true, data).then(res => {
		if (res.data) {
			dispatch(getUserGallery())
			return true
		}
	})
}

export const toggleHidden = val => dispatch => {
	return post(`client/hidden-request/${val ? `hidden` : `visible`}`).then(res => {
		if (res.data) {
			dispatch(setUserInfo({hidden_request: true}))
		}
	})
}

export const saveAvatar = data => dispatch => {
	return put(`gallery/avatar`, true, data).then(res => {
		if (res.data) {
			dispatch(getUserInfo())
			return true
		}
	})
}

export const buyVideo = (id, member_id) => dispatch => {
	return post(`gallery/video/buy`, true, {video_id: id}).then(res => {
		if (res.data) {
			dispatch(getMember(member_id))
			dispatch(getUserInfo())
		}
	})
}

export const setUserInfo = data =>
	({
		type: types.SET_USER_INFO,
		data,
	})

export const setOpenSocket = value =>
	({
		type: types.SET_OPEN_SOCKET,
		value,
	})