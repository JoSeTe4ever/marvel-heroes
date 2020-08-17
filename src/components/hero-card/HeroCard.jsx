import axios from 'axios';
import React, { Component } from 'react';

export default class HeroCard extends Component {

    render() {
        return (
            <div className="card">
                <span>{this.props.heroName}</span>
                <img src={this.props.imgUrl}
                    alt={this.props.heroName}
                    className="card-thumb-frame__thumbnail"></img>
            </div>
        )
    }
}
