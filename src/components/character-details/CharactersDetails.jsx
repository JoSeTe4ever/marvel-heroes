import React, { useState, useEffect } from "react";
import { getCharacterDetails } from "../../utils/api";
import MarvelButton from "./../button/MarvelButton";
import { useRecoilState } from "recoil";
import { favouritesCharacters } from "../../state";
import { Loading } from "../loading/Loading";

import "./CharactersDetails.css";

export const CharactersDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characterDetails, setCharacterDetails] = useState(undefined);
  const [favourites, setFavouritesCharacters] =
    useRecoilState(favouritesCharacters);
  const { id } = props.match.params;

  useEffect(() => {
    getCharacterDetails(id).then((details) => {
      if (details && details.length > 0) {
        setCharacterDetails(details[0]);
        setIsLoading(false);
      }
    });
  }, [id]); //

  return (
    <div className="characterDetailsContainer">
      <MarvelButton
        text="add to favourites"
        onClickedAction={() => {
          //Add only once.
          if (!favourites.some((e) => e === characterDetails.id)) {
            setFavouritesCharacters([...favourites, characterDetails.id]);
          }
        }}
      ></MarvelButton>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <img
          className="highResolution"
          alt=""
          src={`${characterDetails?.thumbnail?.path}.${characterDetails?.thumbnail?.extension}`}
        ></img>
      )}

      <span>CHARACTER DETAILSSSSSSSSSSSS</span>
    </div>
  );
};
