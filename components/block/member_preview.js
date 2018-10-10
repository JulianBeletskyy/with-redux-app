import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleFavorite } from '../../actions/members'
import { Router } from '../../routes'

class MemberPreview extends Component {
	toggleFavorite = value => e => {
		e.preventDefault()
		e.stopPropagation()
		const { dispatch, member, type } = this.props
		dispatch(toggleFavorite(member.id, !value, type))
	}

	goTo = link => e => {
		e.preventDefault()
		e.stopPropagation()
		const { onClickItem = null } = this.props
		if (onClickItem) {
			this.props.onClickItem()
		} else {
			Router.pushRoute(link)
		}
	}

    render() {
    	const { member, stars = true, onClickItem = null, token } = this.props
    	const link = token ?  `/member/${member.id.toString()}` : `/`
        return (
            <div className="form-group">
	            <div className="member-preview-wrap">
                    <a href={link} onClick={this.goTo(link)}>
	                    <span>
	    	            	<div className="member-preview-img-wrap">
	    	                	<img src={member.avatar} className="member-preview-img" alt="" />
	    	            	</div>
	    	            	<div className="member-preview-info">
	    		                <div className="text-center">
	    		                	<div className="font-bebas">
	    		                		<strong className="member-preview-info-name">{member.first_name}</strong>
	    		            		</div>
	    		                	<div>{`${member.age} years`}</div>
	    		                	<div className="ellipsis">{`${member.country}, ${member.state ? `${member.state}, ` : ''} ${member.city}`}</div>
	    		                </div>
	    	                </div>
	                        {
	                            stars
	                            ?   member.favorite
	                                ? <i className="fas fa-star" id="heart" onClick={this.toggleFavorite(false)}></i>
	                                : <i className="far fa-star" id="heart" onClick={this.toggleFavorite(true)}></i>
	                            : null
	                        }
                        </span>
                    </a>
	            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({token: state.user.token})

export default connect(mapStateToProps)(MemberPreview)