import Echo from 'laravel-echo/dist/echo'
import Socketio from 'socket.io-client'
import store from '../store'
import { setOpenSocket } from '../actions/user'
import { getUnreadMessage } from '../actions/message'

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

	  	dispatch(setOpenSocket(true))
	  	const channel = echo.private(`user.${user.data.id}`)
	  	
	  	channel.listen('.WhenMessageTranslate', ({data}) => {
			if (data) {
				dispatch(getUnreadMessage())
			}
		})

		channel.listen('.WhenUserLogin', event => {
			console.log(event)
			if (event.token !== user.token) {
				dispatch(logout())
			}
		})
	}
}