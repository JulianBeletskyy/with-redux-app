import React, { Component } from 'react'

class SelectField extends Component {
    constructor(props) {
        super(props)
        this.state = {value: props.value || ''}
    }
    
    printOptions = (option, i) => <option key={i} id={option.value} value={option.value}>{option.name}</option>

    handleChange = ({target: {value}}) => {
        this.setState({value})

        if (this.props.onChange) {
            this.props.onChange(value)
        }
    }

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value ? nextProps.value : ''
        if (! this.state.value && value !== this.state.value && value !== this.props.value) {
            this.setState({value: value})
        }
    }

    render() {
        const { label, placeholder, inputRef, value, options } = this.props
        let classSelect = placeholder ? ' title' : ''
        return (
            <div className="wrap-select-field">
                {this.props.label ? <label>{this.props.placeholder}</label> : ''}
                <select 
                    className="select-field form-control" 
                    ref={inputRef}
                    value={this.state.value}
                    onChange={this.handleChange} >
                    { options.map((option, i) => this.printOptions(option, i)) }
                </select> 
            </div>
        );
    }
}

export default SelectField