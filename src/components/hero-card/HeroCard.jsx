
import React, { Component } from 'react';
import './HeroCard.css';
export default class HeroCard extends Component {

    render() {
        return (
            <div className="card">
                <span className="card-title">{this.props.heroName}</span>
                <div className="image-container">
                    <img src={this.props.imgUrl}
                        alt={this.props.heroName}
                        className="card-thumb-frame__thumbnail"></img>

                </div>
                <span className="card-description">{this.props.heroDescription}</span>
                <span className="card-comics-count"></span>
                <span className="card-series-count"></span>
            </div>
        )
    }
}
