import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../layouts'
import PrivateLayout from '../../layouts/private'
import Tabs from '../../components/tabs'
import { Router } from '../../routes'
import { getMail } from '../../actions/message'
import MessagesList from '../../components/block/messages_list'
import { setActiveTab } from '../../actions/ui'
import Alert from '../../components/alert'

class Mail extends Component {
    static async getInitialProps({query}) {
        return {type: query.slug}
    }

    getMail = key => {
        const { dispatch } = this.props
        dispatch(getMail(key))
        Router.pushRoute(`/mail/${key}`)
    }

    componentDidMount() {
        const { dispatch, type } = this.props

        dispatch(getMail(type))
        dispatch(setActiveTab(type, 'mail'))
    }

    render() {
        const { 
            incoming,
            outgoing,
            draft,
            deleted,
            contacts,
            userId,
        } = this.props

        return (
            <Layout>
            	<PrivateLayout>
	                <div className="pt-15">
                        <Tabs
                            onChange={this.getMail}
                            tabKey="mail"
                            tabs={[
                                {
                                    eventKey: 'incoming',
                                    title: 'Inbox', 
                                    content: <MessagesList list={incoming} userId={userId} type="incoming" />
                                }, {
                                    eventKey: 'outgoing',
                                    title: 'Sent Mail', 
                                    content: <MessagesList list={outgoing} userId={userId} type="outgoing" />
                                }, {
                                    eventKey: 'draft',
                                    title: 'Drafts', 
                                    content: <MessagesList list={draft} userId={userId} type="draft" />
                                }, {
                                    eventKey: 'deleted',
                                    title: 'Deleted messages', 
                                    content: <MessagesList list={deleted} userId={userId} type="deleted" />
                                }, {
                                    eventKey: 'contacts',
                                    title: 'Contacts', 
                                    content: <MessagesList list={contacts} userId={userId} type="contacts" />
                                }
                            ]} />
	                </div>
                    <Alert />
                </PrivateLayout>
            </Layout>
        )
    }
}

const mapStateToProps = state =>
    ({
        incoming: state.message.incoming,
        outgoing: state.message.outgoing,
        draft: state.message.draft,
        deleted: state.message.deleted,
        contacts: state.message.contacts,
        userId: state.user.data.id,
        token: state.user.token,
    })

export default connect(mapStateToProps)(Mail)