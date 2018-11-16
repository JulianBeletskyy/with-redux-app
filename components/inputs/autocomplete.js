import React, { Component } from 'react'

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            value: props.value,
            active: false
        }
        this.input = false
    }

    thisRef = (ref) => {
        this.props.inputRef(ref);
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

    initGoogle = () => {
        if (!this.state.value) {
            this.setState({active: false})
        }
        const script = document.createElement("script")
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyConxWeoxhyeKMSr8737_UYFE3grEi2bH0&libraries=places&language=en";

        script.onload = () => {
            this.setState({ready: true})
        }
        document.body.appendChild(script)
    }

    componentDidMount() {
        this.initGoogle()
        if (this.props.value && !this.state.active) {
            this.setState({active: true})
        }
    }

    setUSState = components => {
        components.forEach(item => {
            if (item.types.includes('administrative_area_level_1')) {
                this.props.setUSState(item.short_name)
            }
        })
    }

    render() {
        const { country = '', label, placeholder, value } = this.props
        const options = {types: ['(cities)'],componentRestrictions: {country: country}}
        if (this.state.ready) {
            const autocomplete = new window.google.maps.places.Autocomplete(this.input, options)
            
            window.google.maps.event.addDomListenerOnce(autocomplete, 'place_changed', () => {
                const place = autocomplete.getPlace()
                this.input.value = place.vicinity || place.name
                if (country === 'US') {
                    this.setUSState(place.address_components)
                }
            });
        }
        
        return (
            <div className="wrap-autocomplete">
                {label ? <label>{placeholder}</label> : null}
                <input
                    className="autocomplete-style form-control"
                    ref={this.thisRef}
                    type="text"
                    onBlur={this.handleBlur}
                    id="auocompleteInput"
                    defaultValue={value}
                    onChange={this.handleChange}
                    placeholder=" " />
                {label ? null : <div className={`autocomplete-placeholder ${this.state.active ? 'active' : ''}`}>{placeholder}</div>}
            </div>
        );
    }
}

export default Autocomplete