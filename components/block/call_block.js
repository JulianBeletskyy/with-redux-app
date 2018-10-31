import React, { Component } from 'react'
import { connect } from 'react-redux'
import BtnMain from '../buttons/btn_main'
import { setCallIn, setCallOut, cancelInvite } from '../../actions/chat'

class CallBlock extends Component {

	cancelCall = () => {
		const { dispatch, callIn, callOut, oponent } = this.props
		callIn ? dispatch(setCallIn(false)) : dispatch(setCallOut(false))
		dispatch(cancelInvite(oponent.id))
		
	}

    render() {
    	const { callIn, callOut, oponent } = this.props
        return (
            <div className="wrap-call-block">
            	<div className="inner-call-block">
            		{
            			callIn 
            			&& 	<div>
			            		<div className="call-animation">
			            			<img src={oponent.avatar} className="call-avatar" alt="" />
			        			</div>
			            		<div className="font-bebas">{oponent.name} call you</div>
			            		<div className="wrap-call-buttons">
			            			<BtnMain text="Cancel" onClick={this.cancelCall} />
			            			<BtnMain text="Take Call" />
			            		</div>
		            		</div>
            		}
            		{
            			callOut
            			&& 	<div>
			            		<div className="call-animation">
			            			<img src={oponent.avatar} className="call-avatar" alt="" />
			        			</div>
			            		<div className="font-bebas">You call to {oponent.name}</div>
			            		<div className="wrap-call-buttons">
			            			<BtnMain text="Cancel" onClick={this.cancelCall} />
			            		</div>
		            		</div>
            		}
            	</div>
            </div>
        )
    }
}

const mapStateToProps = state =>
	({
		oponent: state.chat.oponent,
	})

export default connect(mapStateToProps)(CallBlock)
