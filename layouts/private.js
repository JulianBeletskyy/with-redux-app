import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getUserInfo } from '../actions/user'
import GirlMenu from '../components/menus/girl_menu'
import ClientMenu from '../components/menus/client_menu'
import MobileMenu from '../components/menus/mobile_menu'
import AvatarGallery from '../components/gallery/avatar_gallery'
import MainModal from '../components/modal'
import NotActive from '../components/NotActive'
import Head from 'next/head'

class Private extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props
        dispatch(getUserInfo())
    }

    render() {
    	const { children, role, avatar, active } = this.props
        return (
            <div className="pt-80 bg-blue position-relative">
                <Head>
                    <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/cropper.css"/>
                </Head>
                <Grid id="profile">
                    <Row>
                        <Col md={9} className="bg-white">
                        	{ children }
                        </Col>
                        <Col md={3} smHidden xsHidden>
                            { role === 'client' ? <ClientMenu /> : <GirlMenu /> }
                        </Col>
                    </Row>
                </Grid>
                { !active && <NotActive /> }
                <MobileMenu client={role === 'client'} />
                <MainModal
                    body={<AvatarGallery />}
                    title="Avatar"
                    show={avatar}
                    size="lg"
                    keyModal="avatar" />
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        token: state.user.token,
        role: state.user.data.role,
        avatar: state.ui.modals.avatar,
        active: state.user.data.active,
    })

export default connect(mapStateToProps)(Private)
