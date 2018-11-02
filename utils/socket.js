import Echo from 'laravel-echo/dist/echo'
import Socketio from 'socket.io-client'
import store from '../store'
import { setOpenSocket, getUserFullInfo, getUserInfo, setOnlineUsers, addOnlineUsers, removeOnlineUsers } from '../actions/user'
import { getUnreadMessage, getMail } from '../actions/message'
import { setCallIn, setCallOut, setRoomHash, setRoomId, setInviteOponent, toggleChat, setTypingRoom, setOponentVideo } from '../actions/chat'
import { logout } from '../actions/auth'
import { setAlert } from '../actions/ui'
import { Router } from '../routes'

var globalEcho
var globalChat
var globalOnline
var globalRoom

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
		console.log(globalEcho)
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

		channel.listen('.WhenInviteChat', ({sender, hash, roomId}) => {
			dispatch(setCallIn(true))
			dispatch(setRoomHash(hash))
			dispatch(setRoomId(roomId))
			dispatch(setInviteOponent(sender))
		})

		channel.listen('.WhenInviteCancel', ({name}) => {
			const { chat: { callIn } } = store.getState()
			callIn ? dispatch(setCallIn(false)) : dispatch(setCallOut(false))		
			dispatch(setRoomHash(''))
			dispatch(setInviteOponent({}))
			dispatch(setAlert(`${name} was canceled call.`, 'error'))
		})

		channel.listen('.WhenInviteTake', ({data}) => {
			const { chat: { roomId } } = store.getState()
			dispatch(setCallOut(false))
			dispatch(toggleChat('open'))
			connectToRoom(roomId)
		})
	}
}

export const connectToRoom = id => {
	const room = globalEcho.private(`room.${id}`)
	const { dispatch } = store
	let timeout
	globalRoom = room

	globalRoom.listenForWhisper('typing', ({message}) => {
		clearTimeout(timeout)
        dispatch(setTypingRoom(message))
        timeout = setTimeout(() => {
        	dispatch(setTypingRoom(''))
        }, 1000)
    })

    globalRoom.listenForWhisper('videoChange', ({data}) => {
    	dispatch(setOponentVideo(data))
    })
}

export const typingInRoom = userName => {
	globalRoom.whisper('typing', {
		message: `${userName} is typing`
	})
}

export const sendVideoInRoom = data => {
	globalRoom.whisper('videoChange', {data})
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