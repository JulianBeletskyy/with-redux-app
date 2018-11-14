import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import Tabs from '../../components/tabs'
import { setActiveTab } from '../../actions/ui'
import { getUserFullInfo } from '../../actions/user'
import { Router } from '../../routes'
import EditForm from '../../components/forms/edit'
import OtherForm from '../../components/forms/other'
import ContactForm from '../../components/forms/contact'
import PasswordForm from '../../components/forms/password'
import SettingsForm from '../../components/forms/settings'

class Edit extends Component {
	static async getInitialProps({query}) {
        return {type: query.slug}
    }

    handleChangeProfile = key => {
        const { dispatch } = this.props
        dispatch(setActiveTab(key, 'edit'))
        Router.pushRoute(`/edit/${key}`)
    }

    componentDidMount() {
        const { dispatch, type } = this.props
        dispatch(setActiveTab(type, 'edit'))
        dispatch(getUserFullInfo())
    }

    render() {
        const { role } = this.props
    	let tabList = [
    		{
                eventKey: 'info',
                title: 'Edit', 
                content: <EditForm />
            }, {
                eventKey: 'other',
                title: 'Other Information', 
                content: <OtherForm />
            }, {
            	eventKey: 'contact',
                title: 'Contact Info', 
                content: <ContactForm />
            }
        ]

        if (role === 'client') {
            tabList = [
                ...tabList, 
                {
                    eventKey: 'password',
                    title: 'Password',
                    content: <PasswordForm />
                }, {
                    eventKey: 'settings',
                    title: 'Account Settings', 
                    content: <SettingsForm />
                }
            ]
        }
            
        return (
            <Layout>
            	<PrivateLayout>
            		<div className="pt-15">
                        <Tabs
                            onChange={this.handleChangeProfile}
                            tabKey="edit"
                            tabs={tabList} />
	                </div>
        		</PrivateLayout>
            </Layout>
        )
    }
}

const mapStateToProps = ({user: {data}}) => ({role: data.role})

export default connect(mapStateToProps)(Edit)