import { get, post } from '../api'
import * as types from './types.js'
import { getUserInfo } from './user'

export const getPackages = () => dispatch => {
	return get(`credits/active`).then(res => {
		if (res.data) {
			dispatch(setPackages(res.data))
		}
	})
}

export const buyPackage = data => dispatch => {
	return post(`client/credits/buy`, true, data).then(res => {
		if (res.data) {
			dispatch(getUserInfo())
            return true
		}
	})
}

export const getMemberships = () => dispatch => {
	return get(`memberships/active`).then(res => {
		if (res.data) {
			dispatch(setMemberships(res.data))
		}
	})
}

export const setMemberships = data =>
({
	type: types.SET_MEMBERSHIPS,
	data,
})

export const setPackage = data =>
	({
		type: types.SET_PACKAGE,
		data,
	})

export const setPackages = data =>
	({
		type: types.SET_PACKAGES,
		data,
	})