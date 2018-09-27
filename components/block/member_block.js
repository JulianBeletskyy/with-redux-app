import React, { Component } from 'react'
import { Row, Col, FormGroup } from 'react-bootstrap'
import MemberPreview from './member_preview.js'

class MemberBlock extends Component {

    printList = (member, i) => {
        return <Col key={i} sm={3} xs={6}>
                    <MemberPreview
                        like={this.props.stars}
                        onClick={this.props.onClickItem}
                        type={this.props.type}
                        member={member} />
                </Col>
    }

    render() {
        const { list = [], more, onClick } = this.props
        return (
            <Row>
                { list.map((member, i) => this.printList(member, i)) }
                {
                    more && <Col xs={12}>
                                <FormGroup className="font-bebas text-center fs-18">
                                    <a href="javascript:;" onClick={onClick}><strong>see more</strong></a>
                                </FormGroup>
                            </Col>
                }
            </Row>
        )
    }
}

export default MemberBlock