import { get, post } from '../api'
import * as types from './types.js'
import Cookies from 'js-cookie'
import { toggleModal } from './ui'
import { Router } from '../routes'

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
    dispatch(setTimeoutValue(false))
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

export const setTimeoutValue = value =>
	({
		type: types.SET_TIMEOUT_VALUE,
		value,
	})

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
			Router.pushRoute('/')
		}
	})
}

export const sendRecovery = data => dispatch => {
	return post(`recovery`, true, data).then(res => {
		if (res.data) {
			return true
		}
	})
}