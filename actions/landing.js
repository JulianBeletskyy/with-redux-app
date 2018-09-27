import { get } from '../api'
import * as types from './types.js'

export const getStories = () => dispatch => {
	return get('members').then(res => {
		if (res.data) {
			dispatch(setMembers(res.data))
		}
	})
}

export const setMembers = data =>
	({
		type: types.SET_MEMBERS,
		data
	})