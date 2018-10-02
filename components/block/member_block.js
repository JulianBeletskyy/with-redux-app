import React, { Component } from 'react'
import { Row, Col, FormGroup } from 'react-bootstrap'
import MemberPreview from './member_preview'

class MemberBlock extends Component {

    printList = (member, i) => {
        return <Col key={i} sm={3} xs={6}>
                    <MemberPreview
                        onClickItem={this.props.onClickItem}
                        stars={this.props.stars}
                        like={this.props.stars}
                        onClick={this.props.onClickItem}
                        type={this.props.type}
                        member={member} />
                </Col>
    }

    render() {
        const { list = [], more, onClick } = this.props
        return (
            <div>
                <Row>{ list.map((member, i) => this.printList(member, i)) }</Row>
                {
                    more 
                    ?   <FormGroup className="font-bebas text-center fs-18">
                            <a href="javascript:;" onClick={onClick}><strong>see more</strong></a>
                        </FormGroup>
                    :   null
                }
            </div>
        )
    }
}

export default MemberBlock