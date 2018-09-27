import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'

class TextField extends Component {
    constructor(props) {
        super(props)
        this.input = null
        this.state = {value: props.value, active: false}
    }

    thisRef = ref => {
        this.props.inputRef(ref)
        this.input = ref
    }

    handleChange = ({target: {value}}) => {
        this.setState({value, active: true})
        if (this.props.onChange) {
           this.props.onChange(value)
        }
    }

    handleBlur = () => {
        if (!this.state.value) {
            this.setState({active: false})
        }
    }

    componentDidMount() {
        if (this.props.value && !this.state.active) {
            this.setState({active: true})
        }
    }

	render() {
		const { label, placeholder, type = 'text', thisRef, className, value, description, name, disabled } = this.props
		return (
			<div className="text-field-wrap">
                {label ? <label>{placeholder}</label> : null}
                <input
                    type={type}
                    disabled={disabled}
                    ref={this.thisRef}
                    name={name}
                    onBlur={this.handleBlur}
                    className={`text-field form-control ${className}`}
                    onChange={this.handleChange}
                    defaultValue={value} />
                {label ? null : <div className={`text-field-placeholder ${this.state.active ? 'active' : ''}`}>{placeholder}</div>}
                {description ? <span className="text-field-description">{description}</span> : null}
            </div>
		)
	}
}

export default TextField