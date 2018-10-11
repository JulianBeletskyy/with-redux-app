import React, { Component } from 'react'
import { connect } from 'react-redux'
import MiddleString from '../list/middle_string'
import SmallDivider from '../list/small_divider'
import MiddleItem from '../list/middle_item'
import { FormGroup } from 'react-bootstrap'
import Avatar from '../avatar'
import { setActiveTab, toggleModal } from '../../actions/ui'
import { Credits } from '../forms/credits'
import MainModal from '../modal'

export class ClientMenu extends Component {
	showPlans = e => {
		const { dispatch } = this.props
		dispatch(toggleModal(true, 'membership'))
	}

	goToMail = () => {
		const { dispatch } = this.props
		dispatch(setActiveTab('incoming', 'mail'))
	}

	showAddCredits = () => {
		const { dispatch } = this.props
		dispatch(toggleModal(true, 'credits'))
	}

	showAvatar = () => {
		const { dispatch } = this.props
		dispatch(toggleModal(true, 'avatar'))
	}

    render() {
    	const { 
	    	avatar,
			first_name,
			profile_id,
			membership,
			view_profile,
			count_interest,
			count_favorite,
			credits,
		} = this.props

        return (
            <div className="wrapClient p-15">
				<FormGroup className="px-15 text-center">
					<Avatar src={avatar.croped} onClick={this.showAvatar} />
				</FormGroup>
				<FormGroup className="text-center name-title">
					<h3>
						<strong>{first_name}</strong>
					</h3>
					<MiddleString
						text={profile_id}
						keyName="ID:" />
				</FormGroup>
				<FormGroup>
				</FormGroup>
				<FormGroup>
					<MiddleString
						text={membership.value.month == 1 && membership.value.trial ? membership.name + ' (Trial)' : membership.name}
						keyName="Membership:"
						link=" "
						onClick={this.showPlans} />
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
						role="client" />
					<MiddleItem
						text="Edit Profile"
						icon="fas fa-cog"
						link="/edit/info"
						role="client" />
					<MiddleItem
						text="Change password"
						icon="fas fa-unlock-alt"
						link="/edit/password"
						role="client" />
					<MiddleItem
						text="Add Dibs"
						icon="fas fa-credit-card"
						onClick={this.showAddCredits}
						role="client" />
				</FormGroup>
				<FormGroup>
					<SmallDivider text="Info" />
				</FormGroup>
				<FormGroup>
					<MiddleString
						link="profile/credits"
						text={credits}
						keyName="Dibs Balance:" />
				</FormGroup>
				<FormGroup>
					<MiddleString text="0" keyName="Bonus Balance:" />
				</FormGroup>
				
			</div>
        );
    }
}

const mapStateToProps = state =>
	({
   		avatar: state.user.data.avatar,
		first_name: state.user.data.first_name,
		profile_id: state.user.data.profile_id,
		membership: state.user.data.membership,
		view_profile: state.user.data.view_profile,
		count_interest: state.user.data.count_interest,
		count_favorite: state.user.data.count_favorite,
		credits: state.user.data.credits,
	})

export default connect(mapStateToProps)(ClientMenu)