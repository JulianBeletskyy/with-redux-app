import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import Tabs from '../../components/tabs'
import { setActiveTab } from '../../actions/ui'
import { Router } from '../../routes'
import Info from '../../components/block/info_block'
import MembershipInfo from '../../components/block/membership_block'
import DibsInfo from '../../components/block/dibs_block'
import Gallery from '../../components/block/gallery'
import VideoBlock from '../../components/block/video_block'
import { getUserFullInfo } from '../../actions/user'

class Profile extends Component {
	static async getInitialProps({query}) {
        return {type: query.slug}
    }

    constructor(props) {
        super(props)
        const { dispatch, type } = props
        dispatch(setActiveTab(type, 'profile'))
        dispatch(getUserFullInfo())
    }

    handleChangeProfile = key => {
        const { dispatch } = this.props
        dispatch(setActiveTab(key, 'profile'))
        Router.pushRoute(`/profile/${key}`)
    }

	render() {
		const { role } = this.props
		const defaultTabs = [
            {
                eventKey: 'info',
                title: 'Info', 
                content: <Info />
            }, {
                eventKey: 'gallery',
                title: 'Gallery', 
                content: <Gallery />
            } 
        ]

        const clientTabs = [{
            eventKey: 'membership',
            title: 'Membership', 
            content: <MembershipInfo />
        }, {
            eventKey: 'credits',
            title: 'Dibs & Bonuses', 
            content: <DibsInfo />
        }]

        const girlTabs = [{
        	eventKey: 'video',
            title: 'Video', 
            content: <VideoBlock />
        }]

        const tabList = role === 'client' ? [...defaultTabs, ...clientTabs] : [...defaultTabs, ...girlTabs]

		return (
            <Layout>
            	<PrivateLayout>
            		<div className="pt-15">
                        <Tabs
                            onChange={this.handleChangeProfile}
                            tabKey="profile"
                            tabs={tabList} />
	                </div>
        		</PrivateLayout>
            </Layout>
		)
	}
}

const mapStateToProps = ({user: {data}}) => ({ role: data.role })

export default connect(mapStateToProps)(Profile)