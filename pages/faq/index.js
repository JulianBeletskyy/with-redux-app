import React, { Component } from 'react'
import Layout from '../../layouts/stories'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import Questions from './questions'
import { setUiKey } from '../../actions/ui'
import BtnMain from '../../components/buttons/btn_main'
import { Router } from '../../routes'
import MemberCarouselSmall from '../../components/block/member_carousel_small'

class Faq extends Component {
	
    goToRegistration = () => {
        const { dispatch } = this.props
        dispatch(setUiKey('showRegistration', true))
        Router.pushRoute('/')
        window.scrollTo(0,0)
    }

	render() {
        const { token, country } = this.props
		return (
			<Layout>
				<Row>
            		<Col sm={9}>
						<h1 className="font-bebas">FAQ</h1>
			            <hr />
                        <Questions />
		            </Col>
		            <Col sm={3}>
                        {
                            !token &&   <FormGroup className="text-center">
                                            <BtnMain
                                                bsStyle="success"
                                                text="Sign Up"
                                                onClick={this.goToRegistration} />
                                        </FormGroup>
                        }
                        <hr />
                        { country === 'UA' && !token ? null : <MemberCarouselSmall /> }
                	</Col>
            	</Row>
            </Layout>
		)
	}
}

const mapStateToProps = state =>
    ({
        country: state.signup.country,
        token: state.user.token,
    })

export default connect(mapStateToProps)(Faq)