import { get, post } from '../api'
import * as types from './types.js'
import Cookies from 'js-cookie'
import { toggleModal } from './ui'
import { Router } from '../routes'
import { setUserInfo } from './user'

export const login = data => dispatch => {
	return post('login', true, data).then(res => {
		if (res.data) {
			dispatch(toggleModal(false, 'login'))
			dispatch(setToken(res.data))
			return true
		}
	})
}

export const logout = () => dispatch => {
    dispatch(removeToken())
    return Promise.resolve(true)
}

export const removeToken = () => {
	Cookies.remove('token')
	return {
		type: types.REMOVE_TOKEN,
	}
}

export const setToken = token => {
	Cookies.set('token', token)
	return {
        type: types.SET_TOKEN,
        token
    }
}

export const resendEmail = email => dispatch => {
	return get(`resend/${email}`, true).then(res => {
		if (res.data) { return true }
	})
}

export const setTokenServer = token => {
	return {
        type: types.SET_TOKEN,
        token
    }
}

export const activateUser = hash => dispatch => {
	return get(`activate/${hash}`, true).then(res => {
		if (res.data) {
			dispatch(setToken(res.data))
			dispatch(setUserInfo({active: true}))
			Router.pushRoute('/')
		}
	})
}

export const updatePassword = (data, hash) => dispatch => {
	return post(`password/${hash}`, true, data).then(res => {
		if (res.data) {
			dispatch(setRecoveryHash(''))
			return true
		}
	})
}

export const setRecoveryHash = value =>
	({
		type: types.SET_RECOVERY_HASH,
		value,
	})

export const sendRecovery = data => dispatch => {
	return post(`recovery`, true, data).then(res => {
		if (res.data) {
			return true
		}
	})
}