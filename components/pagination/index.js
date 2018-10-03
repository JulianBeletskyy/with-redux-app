import React, { Component } from 'react'

class Pagination extends Component {
	printPagination = (item, i) => {
		const activeClass = i+1 == this.props.current ? 'active' : ''
		return <div key={i} id={i + 1} onClick={this.props.onClick(i+1)} className={`pagination-item ${activeClass}`}>{i+1}</div>
	}

    render() {
    	const list = Array.apply(null, Array(this.props.total))
        return (
                <div className="pagination-wrap">
                    { list.map((item, i) => this.printPagination(item, i)) }
                </div>     	
        )
    }
}

export default Pagination