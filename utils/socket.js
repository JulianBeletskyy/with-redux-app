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

	  	store.dispatch(setOpenSocket(true))
	  	const channel = echo.private(`user.${user.data.id}`)
	  	
	  	channel.listen('.WhenMessageTranslate', ({data}) => {
	  		console.log(data)
	  		console.log('WhenMessageTranslate')
			if (data) {
				store.dispatch(getUnreadMessage())
			}
		})
	}
}