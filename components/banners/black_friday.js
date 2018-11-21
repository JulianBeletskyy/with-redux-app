import React, { Component } from 'react'
import { Router } from '../../routes'

export class BlackFriday extends Component {
    goToServices = e => {
        e.preventDefault()
        Router.pushRoute('/services')
    }
    
    render() {
        return (
            <div className="black-friday-wrap">
                <div className="black-friday-img">
                    <img src="https://d2etktq4v0899q.cloudfront.net/static/assets/img/black_friday.png" alt="" className="img-responsive" />
                </div>
                <div className="black-friday-text">
                    Special Black Friday Offer!!!<br />
                    <br />
                    Purchase a <a href="/services" onClick={this.goToServices}>Platinum Membership</a> for 3 months<br />
                    and get the package of <a href="/services" onClick={this.goToServices}>35 Dibs</a> for Free!<br />
                    <br />
                    Three Days ONLY!<br />
                    Until 24th of November! 
                </div>
            </div>
        )
    }
}

export default BlackFriday