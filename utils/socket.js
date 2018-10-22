import Echo from 'laravel-echo/dist/echo'
import Socketio from 'socket.io-client'
import store from '../store'
import { setOpenSocket, getUserFullInfo } from '../actions/user'
import { getUnreadMessage } from '../actions/message'
import { logout } from '../actions/auth'

export const openSocket = () => {
	const { user } = store.getState()
	if (user.data.id && !user.openSocket) {
		const echo = new Echo({
			broadcaster: 'socket.io',
		  	host: `${window.location.hostname}:6001`,
			client: Socketio,
			auth: {
				headers: {
					 'Authorization': `Bearer ${user.token}`,
				},
			},
	  	})

	  	const { dispatch } = store
	  	const { listen } = echo.private(`user.${user.data.id}`)

	  	dispatch(setOpenSocket(true))
	  	
	  	listen('.WhenMessageTranslate', ({data}) => {
			if (data) {
				dispatch(getUnreadMessage())
			}
		})

		listen('.WhenUserLogin', ({token}) => {
			if (token !== user.token) {
				dispatch(logout()).then(res => {
					window.location.href = '/'
				})
			}
		})

		listen('.WhenAdminChangeUser', ({data}) => {
			if (data) { dispatch(getUserFullInfo()) }
		})
	}
}