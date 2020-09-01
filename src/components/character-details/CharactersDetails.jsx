import React, { useState, useEffect } from 'react';
import { getCharacterDetails } from '../../utils/api'
import MarvelButton from "./../button/MarvelButton"
import { useRecoilState } from 'recoil';
import { favouritesCharacters } from "../../state";

import "./CharactersDetails.css"

export const CharactersDetails = (props) => {

    const [characterDetails, setCharacterDetails] = useState(undefined);
    const [favourites, setFavouritesCharacters] = useRecoilState(favouritesCharacters);

    useEffect(() => {
        const { id } = props.match.params
        getCharacterDetails(id).then(details => {
            if (details && details.length > 0) {
                setCharacterDetails(details[0]);
            }
        })
    }, []); //

    if (characterDetails) {
        return (
            <div className="characterDetailsContainer">
                <MarvelButton text="add to favourites" onClickedAction={() => {
                    setFavouritesCharacters([...favourites, characterDetails.id])
                }}></MarvelButton>
                <img className="highResolution" alt="" src={`${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`}></img>
                <span>CHARACTER DETAILSSSSSSSSSSSS</span>
            </div>);
    }
    return null;

}