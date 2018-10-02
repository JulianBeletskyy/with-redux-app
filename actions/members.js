import * as types from './types.js'
import { get, post } from '../api'

export const getMembers = key => dispatch => {
	return get(`user/members/${key}`).then(res => {
		if (res.data) {
			dispatch(setMembersList(res, key))
		}
	})
}

export const getAllMembers = () => dispatch => {
	return get(`user/members`).then(res => {
		if (res.data) {
			dispatch(setAllMembers(res.data))
		}
	})
}

export const getPublicMembers = type => dispatch => {
	const link = type ? `members/${type}` : `members`
	return get(link).then(res => {
		if (res.data) {
			dispatch(setPublicMembers(res.data))
		}
	})
}

export const seeMoreMembers = (link, key) => dispatch => {
	return get(link).then(res => {
		if (res.data) {
			dispatch(addMemebers(res, key))
		}
	})
}

export const getMember = id => dispatch => {
	return get(`user/member/${id}`).then(res => {
		if (res.data) {
			dispatch(setMember(res.data))
		}
	})
}

export const toggleInterest = (id, value) => dispatch => {
	return get(`user/members/interest/${id}/${!value ? 'add' : 'remove'}`, true).then(res => {
		console.log(res)
	})
}

export const toggleFavorite = (id, value, type) => dispatch => {
	return get(`user/members/favorite/${id}/${!value ? 'add' : 'remove'}`, true).then(res => {
		if (res.data) {
			if (type === 'favorite' || type === 'interest') {
				dispatch(getContacts(type))
			} else {
				dispatch(getMembers(type))
			}
		}
	})
}

export const getContacts = type => dispatch => {
	return get(`user/members/${type}`).then(res => {
		if (res.data) {
			dispatch(setContacts({[type]: res.data}))
		}
	})
}

export const getSearch = data => dispatch => {
	return post(`user/search`, false, data).then(res => {
		if (res.data) {
			dispatch(setSearchList(res.data))
		}
	})
}

export const searchByProfileId = id => dispatch => {
	return get(`user/search/${id}`).then(res => {
		if (res.data) {
			dispatch(setSearchList([res.data]))
			return true
		}
	})
}

export const getPublicSearch = data => dispatch => {
	return post(`search`, false, data).then(res => {
		if (res.data) {
			dispatch(setPublicMembers(res.data))
		}
	})
}

export const addViewed = id => dispatch => {
	return get(`user/view/${id}`)
}

export const getContactsDetails = id => dispatch => {
	return get(`client/contacts/${id}`, true)
}

export const buyPhoto = (id, memberId) => dispatch => {
	return post(`gallery/photo/buy`, true, {photo_id: id}).then(res => {
		if (res.data) {
			dispatch(getMember(memberId))
		}
	})
}

export const setContacts = data =>
	({
		type: types.SET_CONTACTS,
		data,
	})

export const setAllMembers = data =>
	({
		type: types.SET_ALL_MEMBERS,
		data,
	})

export const setMember = data =>
	({
		type: types.SET_MEMBER,
		data,
	})

export const setPublicMembers = data =>
	({
		type: types.SET_PUBLIC_MEMBERS,
		data
	})

export const addMemebers = (data, key) =>
	({
		type: types.ADD_MEMBERS,
		data,
		key
	})

export const setMembersList = (data, key) =>
	({
		type: types.SET_MEMBERS_LIST,
		key,
		data,
	})

export const setSearchList = data =>
	({
		type: types.SET_SEARCH_LIST,
		data
	})