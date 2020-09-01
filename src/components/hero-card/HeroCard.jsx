
import React from 'react';
import './HeroCard.css';
import { useHistory } from "react-router-dom";
import { Favourite } from "./../favourite/Favourite";

export const HeroCard = (props) => {

    const history = useHistory();

    return (
        <div className="card" onClick={() => {
            history.push(`/characters/${props.heroId}`);
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
            <Favourite></Favourite>
        </div>
    )
}
