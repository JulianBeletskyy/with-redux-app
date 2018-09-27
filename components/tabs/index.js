import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab } from 'react-bootstrap'
import { setActiveTab } from '../../actions/ui'

export class CustomTabs extends Component {
	handleSelect = key => {
		const { dispatch, tabKey } = this.props
		console.log(this.props)
		dispatch(setActiveTab(key, tabKey))
		this.props.onChange(key)
	}

	printTabs = (tab, i) => {
  		return <Tab key={i} eventKey={tab.eventKey} title={tab.title}><div className="pt-15">{tab.content}</div></Tab>
  	}

    render() {
    	const { tabs, activeTab, tabKey } = this.props
        return (
            <div className="tabs-wrap">
				<Tabs id="tab" activeKey={activeTab[tabKey]} onSelect={this.handleSelect}>
					{ tabs.map((tab, i) => this.printTabs(tab, i)) }	
				</Tabs>
			</div>
        )
    }
}

const mapStateToProps = state =>
	({
	    activeTab: state.ui.tab
	})

export default connect(
    mapStateToProps
)(CustomTabs)
