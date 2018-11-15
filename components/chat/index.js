import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleChat } from '../../actions/chat'
import { connectToRoom, typingInRoom, sendVideoInRoom } from '../../utils/socket'
import TextArea from '../inputs/textarea'
import BtnMain from '../buttons/btn_main'

var peer
var hasAddTrack = false

class Chat extends Component {
	constructor() {
		super()
		this.state = {
			message: ''
		}
		this.selfVideo = null
		this.oponentVideo = null
		this.connectVideo = false
	}
	

	close = () => {
		const { dispatch } = this.props
		dispatch(toggleChat('close'))
	}

	minimize = () => {
		const { dispatch } = this.props
		dispatch(toggleChat('minimize'))
	}

	open = () => {
		const { dispatch, chat } = this.props
		dispatch(toggleChat('open'))
	}

	handleChange = value => {
		this.setState({message: value})
		const { userName } = this.props
		typingInRoom(userName)
	}

	createPeerConnection = () => {
		peer = new RTCPeerConnection({
		    iceServers: [
	      		{
			        urls: "turn:localhost",
			        username: "webrtc",
			        credential: "turnserver"
	      		}
		    ]
	  	})

	  	hasAddTrack = (peer.addTrack !== undefined)

	  	peer.onnegotiationneeded = () => {
		    peer.createOffer()
		    .then(offer => {
	      		return peer.setLocalDescription(offer).then(() => {
		      		this.sendToServer(offer)
			    })
		    })
	  	}

	  	if (hasAddTrack) {
		    peer.ontrack = this.handleTrackEvent
	  	} else {
		    peer.onaddstream = this.handleAddStreamEvent
	  	}
	  	console.log('create peer')
	}

	handleTrackEvent = event => {
		console.log('handleTrackEvent')
	  this.oponentVideo.srcObject = event.streams[0]
	}

	handleAddStreamEvent = event => {
		console.log('handleTrackEvent')
  		this.oponentVideo.srcObject = event.stream
	}

	sendToServer = data => {
		sendVideoInRoom(data)
	}

	start = () => {
		this.createPeerConnection()
	}

	showMe = () => {
		window.navigator.mediaDevices.getUserMedia({
	        audio: true,
	        video: true
      	}).then(stream => {
      		this.selfVideo.src = window.URL.createObjectURL(stream);
      		this.selfVideo.srcObject = stream;

          	stream.getTracks().forEach(track => peer.addTrack(track, stream));
        })
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.chat.oponentVideo).length && !this.connectVideo) {
			this.showOponent(nextProps.chat.oponentVideo)
			this.connectVideo = true
		}
	}

	showOponent = (data) => {
		if (! peer) {
			this.createPeerConnection()
		}
		peer.setRemoteDescription(new RTCSessionDescription(data)).then(() => {
	        return navigator.mediaDevices.getUserMedia({
          		audio: true,
          		video: true
	        });
      	})
      	.then(stream => {
	        const localStream = stream;
	        this.oponentVideo.src = window.URL.createObjectURL(localStream);
	        this.oponentVideo.srcObject = localStream;

	        peer.addStream(localStream);
      	})
      	.then(() => {
	        return peer.createAnswer();
      	})
      	.then(answer => {
	        return peer.setLocalDescription(answer);
      	})
	}

	componentDidMount() {
		//connectToRoom()
	}

    render() {
    	const { state, chat } = this.props
        return (
            <div className={`wrap-chat ${state}-chat`}>
            	<div className="text-right icon-block">
            		{ state === 'open' && <i className="far fa-window-minimize pointer" onClick={this.minimize}></i> }
            		{ state === 'minimize' && <i className="far fa-window-maximize pointer" onClick={this.open}></i> }
            		<i className="fas fa-times pointer" onClick={this.close}></i>
            	</div>
            	<div>
            		<TextArea inputRef={ref => this.input = ref} value={this.state.message} onChange={this.handleChange} />
            		<div>{chat.typing}</div>
            	</div>
            	<div>
            		<video autoPlay={true} ref={ref => this.selfVideo = ref}></video>
            	</div>
            	<div>
            		<video autoPlay={true} ref={ref => this.oponentVideo = ref}></video>
            	</div>
            	<div>
            		<BtnMain text="start" onClick={this.start} />
            		<BtnMain text="show me" onClick={this.showMe} />
            	</div>
            </div>
        );
    }
}

const mapStateToProps = state =>
	({
		chat: state.chat,
		userName: state.user.data.first_name,
	})

export default connect(mapStateToProps)(Chat)
