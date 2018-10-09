import React, { Component } from 'react'
import { connect } from 'react-redux'
import Echo from 'laravel-echo/dist/echo'
import Socketio from 'socket.io-client'

class Socket extends Component {
    componentDidMount() {
    	//const websocket = new WebSocket('wss://echo.websocket.org')

    	/*const echo = new Echo({
	      	broadcaster: 'socket.io',
	      	host: 'wss://echo.websocket.org',  
	      	client: Socketio,
	      	auth: {
	          	headers: {
	               	'Authorization': 'Bearer ' + this.props.token,
	          	},
	      	},
	  	});

	  	console.log(echo)
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

const mapStateToProps = state => ({token: state.user.token})

export default connect(mapStateToProps)(Socket)