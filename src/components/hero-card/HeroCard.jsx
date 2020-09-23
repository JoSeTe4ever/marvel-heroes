
import React from 'react';
import { useHistory } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { favouritesCharacters } from "../../state";
import { Favourite } from "./../favourite/Favourite";
import './HeroCard.css';

export const HeroCard = (props) => {

    const history = useHistory();
    const favourites = useRecoilValue(favouritesCharacters);

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
            <Favourite isSelected={favourites.some(e => e.toString() === props.heroId.toString())}></Favourite>
        </div>
    )
}
