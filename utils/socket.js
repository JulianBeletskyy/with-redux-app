import Echo from 'laravel-echo/dist/echo'
import Socketio from 'socket.io-client'
import store from '../store'
import { setOpenSocket, getUserFullInfo } from '../actions/user'
import { getUnreadMessage, getMail } from '../actions/message'
import { logout } from '../actions/auth'
import { Router } from '../routes'

var globalEcho

export const openSocket = () => {
	const { user } = store.getState()
	if (user.data.id && !user.openSocket) {
	  	const { dispatch } = store
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
		globalEcho = echo

	  	const channel = echo.private(`user.${user.data.id}`)

	  	const publicChannel = echo.channel('public')

	  	dispatch(setOpenSocket(true))

	  	publicChannel.listen('.NeedReload', ({data}) => {
	  		if (data) {
	  			window.location.reload(true)	
	  		}
	  	})
	  	
	  	channel.listen('.WhenMessageTranslate', ({data}) => {
			if (data) {
				dispatch(getUnreadMessage())
				const slug = Router.router.query.slug
				if (slug) {
					dispatch(getMail(slug))
				}
			}
		})

		channel.listen('.WhenUserLogin', ({token}) => {
			if (token !== user.token) {
				dispatch(logout()).then(res => {
					window.location.href = '/'
				})
			}
		})

		channel.listen('.WhenAdminChangeUser', ({data}) => {
			if (data) { dispatch(getUserFullInfo()) }
		})
	}
}

export const closeSocket = () => {
	const { user } = store.getState()
	globalEcho.leave(`user.${user.data.id}`)
}