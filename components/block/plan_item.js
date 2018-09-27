import React, { Component } from 'react'
import { connect } from 'react-redux'

class PlanItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	active: false
        }
    }

    printPrice = (value, i) => {
    	let priceClass = ''
        switch(value.month) {
            case 3: priceClass = 'fs-20'; break;
            case 6: priceClass = 'fs-30'; break;
            case 12: priceClass = 'fs-37'; break;
        }

        if (value.month !== 1) {
            const opacity = value.month_payment ? 1 : 0
            return (<div key={i} className="wrap-prices-item" style={{opacity: opacity}}>
                        <span className={`price-item ${priceClass}`}>{value.month_payment ? '$' + value.month_payment : ''}</span>
                        <span className="ult_price_term ult-responsive"> per month</span>
                        <div className="fs-12" style={{opacity: 0.8}}>billed in one payment ${value.one_payment}</div>
                        <div>({value.month} month)</div>
                    </div>)
        }
    }

    printPriceButton = (value, i) => {
    	if (value.month_payment) {
            if (!value.trial || (value.trial && !this.props.use_trial)) {
                return (<div key={i} className="value-btn">
                            <button type="button" onClick={() => { this.setPlan(value) }} className="{style.buttonBottom}">${value.month_payment} / {value.month} month {value.trial ? (<div>( Trial )</div>) : ''}</button>
                        </div>)
            }
        }
    }

    setPlan = val => {
        this.props.onChoose(val)
        //this.hideValues()
        //store.dispatch(toggleModal(false, 'plans'))
    }

    showValues = () => {
    	this.setState({active: true})
    }

    hideValues = () => {
    	this.setState({active: false})
    }

    render() {
    	const {
			free_leter,
			name,
			values,
			private_photo,
			my_photo,
			view_photo,
			likes,
			discount,
			contact_details,
			id,
			currentId,
			view_video
		} = this.props.options

        return (
            <div className="wrap-plans">
                <div className="wrap-plans-inner">
                    <div className="title-plan">
                        <h3>{name}</h3>
                    </div>
                    <div className="wrap-prices">
                        { values.map((value, i) => this.printPrice(value, i)) }
                    </div>
                    <div>
                        <div className="wrap-plan-info">
                            <div>
                                <div>Send 1st free letter to any girl:<strong>{free_leter}</strong></div>
                                {
                                    name === 'Free'
                                    ? <div>Accept private photos:<strong>{private_photo}</strong></div>
                                    : <div>Accept/send private photos:<strong>{private_photo}</strong></div>
                                }
                                <div>Set photos in your profile:<strong>{my_photo}</strong></div>
                                <div>View photos in profiles:<strong>{view_photo}</strong></div>
                                <div>View videos in profiles:<strong>{view_video}</strong></div>
                                <div>Expression of Interest:<strong>{likes}</strong></div>
                                <div>Discount on ALL services:<strong>{discount}%</strong></div>
                                <div>Share contact details:<strong>{contact_details}</strong></div>
                            </div>
                        </div>
                        <span className="ult_price_term ult-responsive"></span> 
                    </div>
                        {
                            id === currentId
                            ?   <div className="btn-plan current">
                                    <span>Current</span>
                                </div>
                            :   name === 'Free'
	                            ?   <div className="btn-plan current">
	                                    <span>Free</span>
	                                </div>
	                            :   <div className="btn-plan">
	                                    <button type="button" onClick={this.showValues}>buy now</button>
	                                </div>
                        }

                        { id === currentId && <div onClick={this.showUnsubscribeModal} className="{style.buttonUnsubscribe}">Unsubscribe</div> }
                    <div className={`wrap-values-btn ${this.state.active ? 'active' : ''}`}>
                        <div className="value-btn">
                            <button onClick={this.hideValues}>
                                <i className="fas fa-angle-down"></i>
                            </button>
                        </div>
                        {values.map((value, i) => this.printPriceButton(value, i)) }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        currentId: state.user.data.membership.id,
        use_trial: state.user.data.use_trial,
    })

export default connect(
    mapStateToProps
)(PlanItem)
