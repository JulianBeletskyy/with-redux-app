import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from '../inputs/checkbox'
import { toggleHidden } from '../../actions/user'

class SettingsForm extends Component {
    toggleHide = val => {
    	const { dispatch } = this.props
    	dispatch(toggleHidden(val))
    }

    render() {
    	const { hidden, hidden_request } = this.props
        return (
            <div>
            	<Checkbox 
            		onChange={this.toggleHide}
            		title="Hide My Profile"
            		value={hidden}
            		disabled={hidden_request} />
            </div>
        )
    }
}

const mapStateToProps = state =>
	({
	    hidden: state.user.data.hidden,
	    hidden_request: state.user.data.hidden_request,
	})

export default connect(
    mapStateToProps
)(SettingsForm)
