import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { favouritesCharacters } from "../../state";
import {
  getCharacterDetails,
  getComicsByCharacterId,
  getEventsByCharacterId,
  getStoriesByCharacterId,
  getSeriesByCharacterId,
} from "../../utils/api";
import { Loading } from "../loading/Loading";
import { useParams } from 'react-router-dom';
import { StoriesByCharacter } from './storiesByCharacter/StoriesByCharacter'
import {ComicsByCharacter} from './comicsByCharacter/ComicsByCharacter'

import "./CharactersDetails.css";

export const CharactersDetails = (props) => {
  const [activeTab, setActiveTab] = useState("comics");

  const [isLoading, setIsLoading] = useState(true);
  const [characterDetails, setCharacterDetails] = useState(undefined);
  const [comicsByCharacter, setComicsByCharacter] = useState([]);
  const [eventsByCharacter, setEventsByCharacter] = useState([]);
  const [seriesByCharacter, setSeriesByCharacter] = useState([]);
  const [storiesByCharacter, setStoriesByCharacter] = useState([]);

  const [favourites, setFavouritesCharacters] =
    useRecoilState(favouritesCharacters);

  // Use useParams to get the id from the URL if it's defined in the route
  const { id: paramId } = useParams();

  // Check if the id is defined in props.match.params or extract it from the URL
  const id = props.match?.params?.id || paramId || window.location.pathname.split('/').pop();



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

    getComicsByCharacterId(id).then((comicDetails) => {
      if (comicDetails && comicDetails.length > 0) {
        setComicsByCharacter(comicDetails);
      }
    });

    getEventsByCharacterId(id).then((eventDetails) => {
      if (eventDetails && eventDetails.length > 0) {
        setEventsByCharacter(eventDetails);
      }
    });

    getSeriesByCharacterId(id).then((seriesDetails) => {
      if (seriesDetails && seriesDetails.length > 0) {
        setSeriesByCharacter(seriesDetails);
      }
    });

    getStoriesByCharacterId(id).then((storiesDetails) => {
      if (storiesDetails && storiesDetails.length > 0) {
        setStoriesByCharacter(storiesDetails);
      }
    });
  }, [id]);

  return (
    <div className="characterDetailsContainer">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <span className="infoCharacter__name">{characterDetails.name}</span>
          <div
            className="infoCharacterDetailsContainer"
            style={{
              backgroundImage: `url(${characterDetails?.thumbnail?.path}.${characterDetails?.thumbnail?.extension})`,
            }}
          >
            <div className="infoCharacter__left">
              <span className="infoCharacter__description">
                {characterDetails.description}
              </span>
            </div>
            <div className="infoCharacter__right">
              <div className="characterImage__mask">
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
            {activeTab === "comics" ? <ComicsByCharacter comics={comicsByCharacter}></ComicsByCharacter> : null}
            {activeTab === "events" ? <span>events</span> : null}
            {activeTab === "series" ? <span>series</span> : null}
            {activeTab === "stories" ? <StoriesByCharacter stories={storiesByCharacter}></StoriesByCharacter> : null}
          </div>
        </>
      )}
    </div>
  );
};
