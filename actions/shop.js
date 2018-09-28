import * as types from './types.js'
import { get } from '../api'

export const getCategories = () => dispatch => {
	return get(`client/shop/category`).then(res => {
		if (res.data) {
			dispatch(setCategories(res.data))
		}
	})
}

export const setCart = cart =>
	({
		type: types.SET_CART,
		cart,
	})

export const setCategories = data =>
	({
		type: types.SET_CATEGORIES,
		data,
	})

export const setReceiverToShop = data =>
	({
		type: types.SET_RECEIVER_TO_SHOP,
		data
	})