import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { favouritesCharacters } from "../../state";
import { getCharacterDetails } from "../../utils/api";
import { Loading } from "../loading/Loading";

import "./CharactersDetails.css";

export const CharactersDetails = (props) => {
  const [activeTab, setActiveTab] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [characterDetails, setCharacterDetails] = useState(undefined);
  const [favourites, setFavouritesCharacters] =
    useRecoilState(favouritesCharacters);
  const { id } = props.match.params;

  const handleTabClick = (tabIdString) => {
    setActiveTab(tabIdString);
  };

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
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <span className="infoCharacter__name">{characterDetails.name}</span>
          <div className="infoCharacterDetailsContainer">
            <div className="infoCharacter__left">
              <span className="infoCharacter__description">description</span>
              <span className="infoCharacter__description">
                {characterDetails.description}
              </span>
            </div>
            <div className="infoCharacter__right">
              <div className="characterImage__mask">
                <img
                  className="highResolution"
                  alt=""
                  src={`${characterDetails?.thumbnail?.path}.${characterDetails?.thumbnail?.extension}`}
                ></img>
              </div>
            </div>
          </div>

          <ul className="navigation__list">
            <li
              className="navigation__item comics"
              onClick={() => handleTabClick("comics")}
            >
              comics
            </li>
            <li
              className="navigation__item events"
              onClick={() => handleTabClick("events")}
            >
              events
            </li>
            <li
              className="navigation__item series"
              onClick={() => handleTabClick("series")}
            >
              series
            </li>
            <li
              className="navigation__item stories"
              onClick={() => handleTabClick("stories")}
            >
              stories
            </li>
          </ul>

          <div className="infoCharacterDetailsContainer">
            {activeTab === "comics" ? () => {} : null}
            {activeTab === "events" ? () => {} : null}
            {activeTab === "series" ? () => {} : null}
            {activeTab === "stories" ? () => {} : null}
          </div>
        </>
      )}
    </div>
  );
};
