import React, { Component } from 'react'

class ReceiverInfo extends Component {
	constructor() {
		super()
		this.state = {
            tempList: []
        }
	}

	thisRef = (ref) => {
        this.props.inputRef(ref)
        this.input = ref
    }

    handleChange = () => {
    	let tempList = []
    	if (this.input.value) {
    		tempList = this.props.list.filter(item => {
	    		return (item.first_name).toLowerCase().indexOf(this.input.value.toLowerCase().replace(' ', '')) + 1 || (item.last_name).toLowerCase().indexOf(this.input.value.toLowerCase().replace(' ', '')) + 1
	    	})
    	}
    	
    	this.setState({tempList: tempList})
    }

    choose = item => e => {
    	this.input.value = ''
    	this.setState({tempList: []})
    	this.props.onClick(item)
    }

    printList = (item, i) => {
    	return 	<div key={i} className="receiver-list-item" onClick={this.choose(item)}>
    				<img className="receiver-item-img" src={item.avatar} alt="" />
    				<span>{`${item.first_name} ${item.last_name}`}</span>
				</div>
    }

    render() {
    	const { receiver, clearReceiver } = this.props
        return (
            <div className="receiver-wrap">
            	{
            		receiver.id
            		? 	<div>
            				<div className="receiver-item  font-bebas}"><span className="{style.underlineText}">Receiver</span></div>
		        			<img className="receiver-item-img" src={receiver.avatar.croped || receiver.avatar} alt="" />
							<span>{`${receiver.first_name} ${receiver.last_name}`}</span>
							<span className="receiver-btn" onClick={clearReceiver}><i className="fas fa-times text-danger"></i></span>
						</div>
            		: 	<div>
                            <input
    		                    className="receiver-input form-control"
    		                    ref={this.thisRef}
    		                    type="text"
    		                    onChange={this.handleChange}
    		                    placeholder="Choose receiver" />
    		                <div className="receiver-list-wrap">
    			        		{this.state.tempList.map((item, i) => this.printList(item, i))}
    			        	</div>
                        </div>
            	}
            </div>
        );
    }
}

export default ReceiverInfo