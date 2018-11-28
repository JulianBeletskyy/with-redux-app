import React, { Component } from 'react'
import MemberPreview from './member_preview'

class MemberBlock extends Component {

    printList = (member, i) => {
        return <div key={i} className="col-sm-3 col-xs-6">
                    <MemberPreview
                        onClickItem={this.props.onClickItem}
                        stars={this.props.stars}
                        like={this.props.stars}
                        onClick={this.props.onClickItem}
                        type={this.props.type}
                        member={member} />
                </div>
    }

    render() {
        const { list = [], more, onClick } = this.props
        return (
            <div>
                <div className="row">{ list.map((member, i) => this.printList(member, i)) }</div>
                {
                    more 
                    ?   <div className="form-group font-bebas text-center fs-18">
                            <a href="javascript:;" onClick={onClick}><strong>see more</strong></a>
                        </div>
                    :   null
                }
            </div>
        )
    }
}

export default MemberBlock