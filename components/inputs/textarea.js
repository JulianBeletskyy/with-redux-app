import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'

class Textarea extends Component {
	constructor(props) {
        super(props)
        this.input = null
        this.state = {value: props.value, active: false}
    }

	thisRef = (ref) => {
        this.props.inputRef(ref)
        this.input = ref
    }

    handleBlur = () => {
        if (!this.state.value) {
            this.setState({active: false})
        }
    }

    handleChange = ({target: {value}}) => {
        const { counter } = this.props
        if (value.length > counter) {
            value = value.slice(0, counter)
        }
        this.setState({value, active: true})
        if (this.props.onChange) {
           this.props.onChange(value)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.value && nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value})
        }
    }

	render() {
		const { value = '', placeholder, label, className, counter = false } = this.props
		return (
			<div className="textarea-wrap">
                {label ? <label>{placeholder}</label> : null}
                <textarea 
                    ref={this.thisRef}
                    className="textarea-main form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.state.value}>
                </textarea>
                {label ? null : <span className={`textarea-placeholder ${this.state.active ? 'active' : ''}`}>{placeholder}</span>}
                { counter && <span className={`textarea-counter ${this.state.value.length === counter ? `danger` : ``}`}>{this.state.value.length} / {counter}</span> }
            </div>
		)
	}
}

export default Textarea