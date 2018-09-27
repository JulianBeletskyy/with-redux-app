import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import MiddleString from '../list/middle_string'
import SmallDivider from '../list/small_divider'
import MiddleItem from '../list/middle_item'
import Avatar from '../avatar'
import { setActiveTab, toggleModal } from '../../actions/ui'

class GirlMenu extends Component {
    
    constructor(props) {
        super(props);
    }

    showAvatar = () => {
    	const { dispatch } = this.props
		dispatch(toggleModal(true, 'avatar'))
    }

    goToMail = () => {
    	const { dispatch } = this.props
		dispatch(setActiveTab('incoming', 'mail'))
    }

    render() {
    	const {
    		avatar,
			first_name,
			last_name,
			profile_id,
			view_profile,
			count_interest,
			count_favorite,
    	} = this.props

        return (
            <div className="wrapGirl p-15">
				<FormGroup className="px-15 text-center">
					<Avatar src={avatar.croped} onClick={this.showAvatar} />
				</FormGroup>
				<FormGroup className="text-center name-title">
					<h3><strong>{`${first_name} ${last_name}`}</strong></h3>
					<MiddleString
						text={profile_id}
						keyName="ID:" />
				</FormGroup>
				<FormGroup>
					<SmallDivider text="Activity" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={view_profile}
						keyName="Profile viewed:" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						link="mail/incoming"
						onClick={this.goToMail}
						text={count_interest}
						keyName="Interests received:" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={count_favorite}
						keyName="Favorited me:" />
				</FormGroup>
				<FormGroup>
					<SmallDivider text="Profile" />
				</FormGroup>
				<FormGroup>
					<MiddleItem
						text="View Profile"
						icon="fas fa-user"
						link="/profile/info"
						role="girl" />
					<MiddleItem
						text="Edit Profile"
						icon="fas fa-cog"
						link="/edit/info"
						role="girl" />
				</FormGroup>
			</div>
        );
    }
}

const mapStateToProps = state =>
	({
		avatar: state.user.data.avatar,
		first_name: state.user.data.first_name,
		last_name: state.user.data.last_name,
		profile_id: state.user.data.profile_id,
		view_profile: state.user.data.view_profile,
		count_interest: state.user.data.count_interest,
		count_favorite: state.user.data.count_favorite,
	})


export default connect(
	mapStateToProps
)(GirlMenu)
