
import React from 'react';
import './HeroCard.css';
import { useHistory } from "react-router-dom";

export const HeroCard = (props) => {

    const history = useHistory();

    return (
        <div className="card" onClick={() => {
            history.push("/characters/32332");
        }}>
            <span className="card-title">{props.heroName}</span>
            <div className="image-container">
                <img src={props.imgUrl}
                    alt={props.heroName}
                    className="card-thumb-frame__thumbnail"></img>

            </div>
            <span className="card-description">{props.heroDescription}</span>
            <span className="card-comics-count"></span>
            <span className="card-series-count"></span>
        </div>
    )
}
