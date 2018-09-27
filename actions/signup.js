import * as types from './types.js'
import { post, image } from '../api'

export const setSignupKey = (key, value) =>
	({
		type: types.SET_SIGNUP_KEY,
		key,
		value,
	})

export const setSignupDataKey = data =>
	({
		type: types.SET_SIGNUP_DATA_KEY,
		data,
	})

export const skipStep = (step, token) => dispatch => {
	return post(`signup/skip/${step}`, false, {custom_remember_token: token})
}

export const sendSignUpBefore = data => dispatch => {
	return post(`signup/before`, false, data).then(res => {
		if (res.data) {
			dispatch(setSignupKey('custom_remember_token', res.data))
		}
	})
}

export const sendSignUpStart = (data, step) => dispatch => {
	return post(`signup/start`, true, data).then(res => {
		if (res.data) {
			dispatch(setSignupKey('custom_remember_token', res.data))
			dispatch(setSignupDataKey(data))
			dispatch(setSignupKey('step', step))
		}
	})
}

export const sendSignUpOne = (data, step, role) => dispatch => {
	return post(`signup/${role}/step/two`, false, data).then(res => {
		if (res.data) {
			dispatch(setSignupDataKey(data))
			dispatch(setSignupKey('step', step))
		}
	})
}

export const sendSignUpTwo = (data, step, role) => dispatch => {
	return post(`signup/${role}/step/three`, false, data).then(res => {
		if (res.data) {
			dispatch(setSignupDataKey(data))
			dispatch(setSignupKey('step', step))
		}
	}) 
}

export const sendSignUpThree = (data, step, role) => dispatch => {
	let formData = new FormData()
    formData.append('avatar', data.avatar)
    formData.append('height', data.height)
    formData.append('width', data.width)
    formData.append('x', data.x)
    formData.append('y', data.y)
    formData.append('custom_remember_token', data.custom_remember_token)

	return image(`signup/${role}/step/four`, false, formData).then(res => {
		if (res.data) {
			dispatch(setSignupDataKey(data))
			dispatch(setSignupKey('step', step))
		}
	})
}

export const sendSignUpFour = data => dispatch => {
	return post(`signup/last`, false, data).then(res => {
		if (res.data) {
			dispatch(sendSignUpFinish(res.data, `${window.location.href}activate/{hash}`, localStorage.getItem('deviceId')))
		}
	})
}

export const sendSignUpFinish = (token, url, device_id) => dispatch => {
	return post(`signup/finish`, true, {custom_remember_token: token, url, device_id}).then(res => {
		dispatch(setSignupKey('step', 4))
	})
}