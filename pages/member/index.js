import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import { getMember, toggleInterest, toggleFavorite, getContactsDetails, addViewed, sendVideoRequest } from '../../actions/members'
import { makeCall } from '../../actions/chat'
import { toggleModal, setAlert } from '../../actions/ui'
import { setReceiverToShop } from '../../actions/shop'
import Loader from '../../components/loader'
import { MONTH } from '../../config'
import LinkIcon from '../../components/list/link_icon'
import AvatarMember from '../../components/avatar/avatar_member'
import MemberGallery from '../../components/gallery/member_gallery'
import FullScreenSlider from '../../components/gallery/full_screen_slider'
import Alert from '../../components/alert'
import { Router } from '../../routes'
import MainModal from '../../components/modal'
import MessageModal from '../../components/forms/message_modal'
import { getUserInfo } from '../../actions/user'
import { loginWithHash } from '../../actions/auth'
import VideoSlider from '../../components/gallery/video_slider'
import NotActive from '../../components/NotActive'

const testUsers = [221, 286]

class Member extends Component {
    static async getInitialProps({query}) {
        return {id: query.id, loginHash: query.loginHash}
    }

    constructor(props) {
        super(props)
        const { dispatch } = props
        dispatch(getMember(props.id))
        dispatch(getUserInfo())
        this.state = {
            showSlider: false
        }
    }

    checkRequest = () => {
        return this.props.id * 1 === this.props.member.id
    }

    getBirthday = date => {
        return `${date.day} ${MONTH[date.month - 1]}`
    }

    getAge = date => {
        const [d,m,y] = date.split('/')
        const birthday = new Date(`${y}-${m}-${d}`)
        const ageDifMs = Date.now() - birthday.getTime()
        const ageDate = new Date(ageDifMs)
        return `${Math.abs(ageDate.getUTCFullYear() - 1970)} y.o.`
    }

    openMemberImages = i => e => {
        const { dispatch, userId } = this.props
        if (!userId) {
            dispatch(toggleModal(true, 'login'))
            return
        }
        this.setState({showSlider: true, initialSlide: i+1})
    }

    closeSlider = () => {
        this.setState({showSlider: false})
    }

    toggleInterest = () => {
        const { dispatch, member, testing, userId } = this.props
        if (!userId) {
            dispatch(toggleModal(true, 'login'))
            return
        }
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
        if(!member.interest) {
            dispatch(toggleInterest(member.id, member.interest))
        }
    }

    toggleFavorite = () => {
        const { dispatch, member, testing, userId } = this.props
        if (!userId) {
            dispatch(toggleModal(true, 'login'))
            return
        }
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
        dispatch(toggleFavorite(member.id, member.favorite)).then(res => {
            if (res) {
                dispatch(getMember(member.id))
            }
        })
    }

    getContactsDetails = () => {
        const { dispatch, member, testing, userId } = this.props
        if (!userId) {
            dispatch(toggleModal(true, 'login'))
            return
        }
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
        dispatch(getContactsDetails(member.id))
    }

    goToShop = () => {
        const { dispatch, member, userId } = this.props
        if (!userId) {
            dispatch(toggleModal(true, 'login'))
            return
        }
        dispatch(setReceiverToShop(member))
        Router.pushRoute('/shop')
    }

    openModal = () => {
        const { dispatch, userId } = this.props
        if (!userId) {
            dispatch(toggleModal(true, 'login'))
            return
        }
        dispatch(toggleModal(true, 'message'))
    }

    checkView = () => {
        const { dispatch, id } = this.props

        let localStorage = window.localStorage
        let date = new Date();
        date = date.getTime() / 1000
        date = date.toFixed(0)
        let viewed = localStorage.getItem('viewed')
        if (! viewed) {
            let data = [{[id]: date}]
            localStorage.setItem('viewed', JSON.stringify(data))
            dispatch(addViewed(id))
        } else {
            let data = JSON.parse(localStorage.viewed)

            for (let k in data) {
                if (data[k][id] < date - 60) {
                    data.splice(k, 1)
                }
            }

            let check = data.some((element, index, array) => {
                if (id in array[index]) {
                    return true
                }
            })
            
            if (! check) {
                data.push({[id]: date})
                dispatch(addViewed(id))
            }
            
            localStorage.setItem('viewed', JSON.stringify(data))
        }
    }

    inviteToChat = () => {
        const { dispatch, member, testing, userId } = this.props
        if (!userId) {
            dispatch(toggleModal(true, 'login'))
            return
        }
        if (testing) {
            dispatch(setAlert('Not available for test user', 'error'))
            return
        }
        dispatch(makeCall(member.id, member.first_name, member.avatar.croped))
    }

    sendVideoRequest = e => {
        e.preventDefault()
        e.stopPropagation()
        const { dispatch, member, membership } = this.props
        if (membership.name !== 'VIP') {
            dispatch(setAlert('Only for VIP Membership', 'error'))
            return
        }
        
        
        dispatch(sendVideoRequest(member.id)).then(res => {
            if (res) {
                dispatch(toggleModal(true, 'videoRequestMessage'))
            }
        })
    }

    componentDidMount() {
        const { loginHash, dispatch, id } = this.props
        if (loginHash) {
            dispatch(loginWithHash(loginHash)).then(res => {
                if (res) {
                    dispatch(getMember(id))
                    dispatch(getUserInfo())
                    Router.pushRoute(`/member/${id}`)
                }
            })
        } else {
            dispatch(getMember(id))
            dispatch(getUserInfo())
        }
        this.checkView()
    }

	render() {
        const { member, role, modal, active, userId } = this.props
        
		return (
			<Layout>
                <div className="pt-15">
                    <div className="pt-66 bg-blue">
                        <div className="bg-white pt-15 pb-50 container">
                            {
                                ! this.checkRequest()
                                ?   <Loader />
                                :   <div className="row">
                                        <div className="col-md-3 col-lg-4">
                                            <div className="form-group">
                                                <AvatarMember
                                                    src={member.avatar.croped} 
                                                    onClick={this.openMemberImages(-1)} />
                                            </div>
                                            {
                                                member.gallery.length
                                                ?  <div className="form-group">
                                                        <MemberGallery list={[...member.gallery]} onClick={this.openMemberImages} memberId={member.id} />
                                                    </div>
                                                :   null
                                            }
                                            {
                                                member.video.length
                                                ?  <div>
                                                        <div className="font-bebas">Video</div>
                                                        <VideoSlider memberId={member.id} video={member.video} />
                                                    </div>
                                                :   null
                                            }
                                        </div>
                                        <div className="col-md-5 col-lg-4">
                                            <div>
                                                <strong className={`font-bebas fs-36 ${member.role}-color`}>{member.first_name}</strong>
                                                <strong className="fs-18">,&nbsp;{member.age} y.o.</strong>
                                            </div>
                                            <div>
                                                <span className="fs-20 font-bebas">{member.profile_id}</span>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">From: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.city}, {member.state ? `${member.state}, ` : ''} {member.country}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Seeking: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{role === 'client' ? 'man' : 'woman'} from {member.match.from} to {member.match.to}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Birthdate: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{this.getBirthday(member.birthday)}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Star sign: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.zodiac.replace(/^\w/, c => c.toUpperCase())}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Height: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.height.cm} cm / {member.height.inch}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Weight: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.weight.kg} kg / {member.weight.lbs} lbs</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Body style: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.body_style.value || 'N/A'}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Eye color: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.eyes}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Eyewear: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.eye_wear.value || 'N/A'}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Hair Color: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.hair_color}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Hair Length: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.hair_length}</div>
                                                </div>
                                            </div>
                                                {
                                                    role !== 'client'   
                                                    ?   <div className="row">
                                                            <div className="col-xs-5">
                                                                <span className="font-bebas fs-18">Ethnicity: </span>
                                                            </div>
                                                            <div className="col-xs-7">
                                                                <div>{member.ethnicity || 'N/A'}</div>
                                                            </div>
                                                        </div>
                                                    :   null
                                                }
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Religion: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.religion}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Marital Status: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.marital_status}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Children: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.children}</div>
                                                </div>
                                            </div>
                                            {
                                                member.about_children.length
                                                ?   <div className="row">
                                                        <div className="col-xs-5">
                                                            <span className="font-bebas fs-18">About Children: </span>
                                                        </div>
                                                        <div className="col-xs-7">
                                                            <div>{member.about_children.map((item, i) => <div key={i}><span className="text-capitalize">{item.sex}</span> - {this.getAge(item.birth)}</div>)}</div>
                                                        </div>
                                                    </div>
                                                :   null
                                            }
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Want children: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.want_children}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Education: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.education}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Field of work: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.field_of_work.value || 'N/A'}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Employment Status: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.employment_status.value || 'N/A'}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Smoke: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.smoke}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <span className="font-bebas fs-18">Drink: </span>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div>{member.drink}</div>
                                                </div>
                                            </div>
                                            {
                                                member.languages.length
                                                ?   <div className="row">
                                                        <div className="col-xs-5">
                                                            <span className="font-bebas fs-18">Languages: </span>
                                                        </div>
                                                        <div className="col-xs-7">
                                                            <div>{member.languages.map((item, i) => <div key={i}>{item.name} - {item.level_value}</div>)}</div>
                                                        </div>
                                                    </div>
                                                :   null
                                            }
                                        </div>
                                        <div className="col-md-4">
                                            <div className="row">
                                                <div className="col-sm-6 col-lg-6 col-md-12">
                                                    <LinkIcon 
                                                        text={member.interest ? "Interest Expressed" : "Express interest"}
                                                        onClick={this.toggleInterest}
                                                        className={`${member.interest ? `cursor-normal` : ``}`}
                                                        color="#FF8DA1" 
                                                        icon="fas fa-heart" />
                                                </div>
                                                <div className="col-sm-6 col-lg-6 col-md-12">
                                                    <LinkIcon 
                                                        text={member.favorite ? "Remove from favorite" : "Add to favorite"}
                                                        onClick={this.toggleFavorite}
                                                        color="#FFD700"
                                                        icon="fas fa-star" />
                                                </div>
                                                <div className="col-sm-6 col-lg-6 col-md-12">
                                                    <LinkIcon
                                                        onClick={this.openModal}
                                                        text="Send Letter"
                                                        color="#27C2D3"
                                                        icon="fas fa-envelope" />
                                                </div>
                                                {
                                                    role === 'client'
                                                    ?   <div className="col-sm-6 col-lg-6 col-md-12">
                                                            <LinkIcon
                                                                text="Invite to Video-Chat"
                                                                icon="fas fa-comment"
                                                                color="#FF0000"
                                                                onClick={this.sendVideoRequest} />
                                                        </div>
                                                    :   null
                                                }
                                                {
                                                    role === 'client'
                                                    ?   <div>
                                                            <div className="col-sm-6 col-lg-6 col-md-12">
                                                                <LinkIcon 
                                                                    text="Share contact details"
                                                                    onClick={this.getContactsDetails}
                                                                    color="#6A74C3"
                                                                    icon="fas fa-address-card" />
                                                            </div>
                                                            <div className="col-sm-6 col-lg-6 col-md-12">
                                                                <LinkIcon 
                                                                    text="Send gift"
                                                                    color="#40E0D0"
                                                                    onClick={this.goToShop}
                                                                    icon="fas fa-gift" />
                                                            </div>
                                                        </div>
                                                    :   null
                                                }
                                            </div>
                                            <hr />
                                            <h4 className="text-dark-blue"><strong>Interests</strong></h4>
                                            <div>{member.interests_value.join(', ')}</div>
                                            <h4 className="text-dark-blue"><strong>More about me</strong></h4>
                                            <div>{member.about_me}</div>
                                            <h4 className="text-dark-blue"><strong>The one I would like to meet</strong></h4>
                                            <div>{member.like_to_meet}</div>
                                            {
                                                role === 'client'
                                                ?   <div>
                                                        <h4 className="text-dark-blue"><strong>More about my leisure time</strong></h4>
                                                        <div>{member.leisure_time}</div>
                                                        <h4 className="text-dark-blue"><strong>About my family</strong></h4>
                                                        <div>{member.about_family}</div>
                                                        <h4 className="text-dark-blue"><strong>My Future Goals</strong></h4>
                                                        <div>{member.future_goals}</div>
                                                    </div>
                                                :   null
                                            }
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                {
                    this.state.showSlider
                    &&  <FullScreenSlider
                            backDrop={this.closeSlider}
                            initialSlide={this.state.initialSlide}
                            memberId={member.id}
                            list={[{src: member.avatar.original}, ...member.gallery]} />
                }
                <Alert />
                { !active && <NotActive /> }
                <MainModal
                    body={<MessageModal memberId={member.id} />}
                    title="Send Message"
                    show={modal}
                    keyModal="message" />
            </Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
    	member: state.members.member,
        role: state.user.data.role,
        modal: state.ui.modals.message,
        membership: state.user.data.membership,
        active: state.user.data.active,
        userId: state.user.data.id,
        testing: state.user.testing,
    })

export default connect(mapStateToProps)(Member)