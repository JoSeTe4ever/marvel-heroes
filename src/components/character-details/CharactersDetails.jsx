import React, { useState, useEffect } from 'react';
import { getCharacterDetails } from '../../utils/api'
import MarvelButton from "./../button/MarvelButton"
import { useRecoilState } from 'recoil';
import { favouritesCharacters } from "../../state";

import "./CharactersDetails.css"

const CharactersDetails = () => {

    const [characterDetails, setCharacterDetails] = useState(undefined);
    const [favourties, setFavouritesCharacters] = useRecoilState(favouritesCharacters);

    useEffect(() => {
        const { id } = this.props.match.params
        getCharacterDetails(id).then(details => {
            if (details && details.length > 0) {
                setCharacterDetails({ characterDetails: details[0] });
            }
        })
    }, []); //

    if (this.state.characterDetails) {
        return (
            <div className="characterDetailsContainer">
                <MarvelButton text="add to favourites" onClickedAction={() => {
                    setFavouritesCharacters([...favouritesCharacters, this.state.characterDetails.id])
                }}></MarvelButton>
                <img className="highResolution" alt="" src={`${this.state.characterDetails.thumbnail.path}.${this.state.characterDetails.thumbnail.extension}`}></img>
                <span>CHARACTER DETAILSSSSSSSSSSSS</span>
            </div>);
    }
    return null;

}