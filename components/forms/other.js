import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import Validator from '../../validate'
import BtnMain from '../buttons/btn_main'
import Textarea from '../inputs/textarea'
import { updateUser } from '../../actions/user'

export class OtherForm extends Component {
	constructor() {
		super()
		this.user = {}
	}

	save = () => {
		let error = 1
		const { dispatch, role } = this.props

        if (role === 'girl') {
            error *= Validator.check(this.user.about_me.value, ['required'], 'About Me')
            error *= Validator.check(this.user.like_to_meet.value, ['required'], 'The one I would like to meet')
            error *= Validator.check(this.user.about_family.value, ['required'], 'About my family')
            error *= Validator.check(this.user.leisure_time.value, ['required'], 'More about my Leisure time')
            error *= Validator.check(this.user.future_goals.value, ['required'], 'My future goals')
        }

        if (error) {
            let data = {
                like_to_meet: this.user.about_me.value,
                about_me: this.user.like_to_meet.value
            }
            if (role === 'girl') {
                data.about_family = this.user.about_family.value
                data.leisure_time = this.user.leisure_time.value
                data.future_goals = this.user.future_goals.value
            }
            dispatch(updateUser(data))
        }
	}

    render() {
    	const { 
    		about_me,
			about_family,
			leisure_time,
			future_goals,
			like_to_meet,
			role,
		} = this.props

        return (
            <div className={role}>
    			<Row>
    				<Col sm={12}>
    					<FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.about_me = ref }}
                                value={about_me}
                                placeholder="More about me"
                                label={true} />
                        </FormGroup>
                        {
                            role === 'girl'
                            ?   <div>
                                    <FormGroup>
                                        <Textarea
                                            inputRef={ref => { this.user.about_family = ref }}
                                            value={about_family}
                                            placeholder="About my family"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Textarea
                                            inputRef={ref => { this.user.leisure_time = ref }}
                                            value={leisure_time}
                                            placeholder="More about my Leisure time"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Textarea
                                            inputRef={ref => { this.user.future_goals = ref }}
                                            value={future_goals}
                                            placeholder="My future goals"
                                            label={true} />
                                    </FormGroup>
                                </div>
                            :   null
                        }
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.like_to_meet = ref }}
                                value={like_to_meet}
                                placeholder="The one I would like to meet"
                                label={true} />
                        </FormGroup>
    				</Col>
				</Row>
				<FormGroup className="text-right">
                    <BtnMain
                        bsStyle="success"
                        text="Save"
                        onClick={this.save} />
                </FormGroup>
			</div>
        )
    }
}

const mapStateToProps = state =>
	({
	    about_me: state.user.data.about_me,
		about_family: state.user.data.about_family,
		leisure_time: state.user.data.leisure_time,
		future_goals: state.user.data.future_goals,
		like_to_meet: state.user.data.like_to_meet,
		role: state.user.data.role,
	})

export default connect(mapStateToProps)(OtherForm)