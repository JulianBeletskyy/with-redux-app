import Echo from 'laravel-echo/dist/echo'
import Socketio from 'socket.io-client'
import store from '../store'
import { setOpenSocket, getUserFullInfo, getUserInfo, setOnlineUsers, addOnlineUsers, removeOnlineUsers } from '../actions/user'
import { getUnreadMessage, getMail } from '../actions/message'
import { logout } from '../actions/auth'
import { Router } from '../routes'

var globalEcho
var globalChat
var globalOnline

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
	  	const onlineChannel = echo.join('presence-channel')
	  	//const chat = echo.private(`chat`)
	  	globalOnline = onlineChannel
	  	
  		

  		onlineChannel.here(userIds => {
	  			dispatch(setOnlineUsers(userIds))
	  		})
	  		.joining(id => {
	  			dispatch(addOnlineUsers(id))
	  		})
	  		.leaving(id => {
	  			dispatch(removeOnlineUsers(id))
	  		})
	  	
	  	dispatch(setOpenSocket(true))

	  	publicChannel.listen('.NeedReload', ({data}) => {
	  		if (data) {
	  			window.location.reload(true)
	  		}
	  	})

	  	//globalChat = chat

	    /*globalChat.listenForWhisper('typing', ({message}) => {
	        console.log(message)
	    })*/

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
			if (data) {
				dispatch(getUserInfo())
				dispatch(getUserFullInfo())
			}
		})
	}
}

export const startTyping = userName => {
	globalChat.whisper('typing', {
        message: `${userName} is typing`
    })
}

export const closeSocket = () => {
	const { user } = store.getState()
	const { dispatch } = store

	if (globalEcho) {
		globalEcho.leave(`user.${user.data.id}`)
		globalEcho.leave(`presence-channel`)
		dispatch(setOpenSocket(false))
	}
}