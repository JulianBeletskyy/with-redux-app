import React, { Component } from 'react'
import { connect } from 'react-redux'
import Echo from 'laravel-echo/dist/echo'
import Socketio from 'socket.io-client'

class Socket extends Component {
	constructor() {
		super()
		this.id = false
	}
	componentWillReceiveProps(nextProps) {
		if (!this.id && nextProps.userId) {
			this.id = nextProps.userId
			this.openSocket()
		}
	}

	openSocket = () => {
		const {userId, token} = this.props
		let echo = new Echo({
			broadcaster: 'socket.io',
		  	host: window.location.hostname + ':6001',
			client: Socketio,
			auth: {
				headers: {
					 'Authorization': 'Bearer ' + token,
				},
			},
	  	});
		console.log(this.id)
	  	echo.private('user.'+this.id)
			.listen('Broadcasting.Message.Translate', (e) => {
				console.log(e);
			})
	}
    componentDidMount() {
	  	// console.log(this.props)
    	//const socket = openSocket('wss://echo.websocket.org')

    	/*websocket.onopen = evt => {
    		websocket.send('hello lifeinlove');
	 	};

	 	websocket.onmessage = evt => {
	 		console.log(evt)
	 	};

    	/*socket.on('FromAPI', data => {
    		console.log(data)
    	})*/
    }

    render() {
        return (
           <div></div>
        );
    }
}

const mapStateToProps = state => ({token: state.user.token, userId: state.user.data.id})

export default connect(mapStateToProps)(Socket)