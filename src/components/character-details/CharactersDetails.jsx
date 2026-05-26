import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { favouritesCharacters } from "../../state";
import {
  getCharacterDetails,
  getComicsByCharacterId,
  getStoriesByCharacterId,
  getSeriesByCharacterId,
} from "../../utils/api";
import { Loading } from "../loading/Loading";
import { useParams } from "react-router-dom";
import { Favourite } from "../favourite/Favourite";

import "./CharactersDetails.css";

const TABS = [
  { id: "comics",  label: "Comics"  },
  { id: "series",  label: "Series"  },
  { id: "stories", label: "Stories" },
];

function TabCard({ item, onClick }) {
  return (
    <div
      className="detail-tab-card"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick && onClick()}
      role="button"
      aria-label={item.title || item.name}
    >
      <div className="detail-tab-card__img-wrap">
        <img
          className="detail-tab-card__img"
          src={item.thumbnail?.url || '/img/1920px-MarvelLogo.svg.jpg'}
          alt={item.title || item.name}
          loading="lazy"
        />
        <div className="detail-tab-card__overlay" aria-hidden="true" />
      </div>
      <div className="detail-tab-card__title">{item.title || item.name}</div>
    </div>
  );
}

export const CharactersDetails = (props) => {
  const [activeTab, setActiveTab] = useState("comics");
  const [isLoading, setIsLoading] = useState(true);
  const [characterDetails, setCharacterDetails] = useState(undefined);
  const [comicsByCharacter, setComicsByCharacter] = useState([]);
  const [seriesByCharacter, setSeriesByCharacter] = useState([]);
  const [storiesByCharacter, setStoriesByCharacter] = useState([]);

  const [favourites, setFavouritesCharacters] = useRecoilState(favouritesCharacters);

  const { id: paramId } = useParams();
  const id = props.match?.params?.id || paramId || window.location.pathname.split("/").pop();

  const isFav = favourites.some(f => f.toString() === id.toString());

  const toggleFav = (e) => {
    e.stopPropagation();
    setFavouritesCharacters(
      isFav ? favourites.filter(f => f.toString() !== id.toString()) : [...favourites, id]
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getCharacterDetails(id)
      .then((details) => {
        if (details && details.length > 0) setCharacterDetails(details[0]);
      })
      .finally(() => setIsLoading(false));

    getComicsByCharacterId(id).then((data) => {
      if (data && data.length > 0) setComicsByCharacter(data);
    });
    getSeriesByCharacterId(id).then((data) => {
      if (data && data.length > 0) setSeriesByCharacter(data);
    });
    getStoriesByCharacterId(id).then((data) => {
      if (data && data.length > 0) setStoriesByCharacter(data);
    });
  }, [id]);

  const tabData = {
    comics:  comicsByCharacter,
    series:  seriesByCharacter,
    stories: storiesByCharacter,
  };

  if (isLoading) return <div className="char-detail-page"><Loading /></div>;

  if (!characterDetails) {
    return (
      <div className="char-detail-page">
        <div className="char-detail-notfound">Character not found</div>
      </div>
    );
  }

  const bgImage = characterDetails.thumbnail?.url || '/img/1920px-MarvelLogo.svg.jpg';

  return (
    <div className="char-detail-page">
      {/* ── Hero Banner ── */}
      <section
        className="char-detail-hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="char-detail-hero__overlay" />
        <div className="char-detail-hero__content">
          <div className="char-detail-hero__portrait-wrap">
            <img
              className="char-detail-hero__portrait"
              src={bgImage}
              alt={characterDetails.name}
            />
          </div>
          <div className="char-detail-hero__info">
            <h1 className="char-detail-hero__name">{characterDetails.name}</h1>
            {characterDetails.description && (
              <p className="char-detail-hero__desc">{characterDetails.description}</p>
            )}
            <button
              className={`char-detail-hero__fav-btn ${isFav ? 'is-fav' : ''}`}
              onClick={toggleFav}
              aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
            >
              {isFav ? '❤️ Saved' : '🤍 Save'}
            </button>
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <nav className="char-detail-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`char-detail-tab ${activeTab === tab.id ? 'char-detail-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tabData[tab.id]?.length > 0 && (
              <span className="char-detail-tab__count">{tabData[tab.id].length}</span>
            )}
          </button>
        ))}
      </nav>

      {/* ── Tab Content ── */}
      <section className="char-detail-content">
        {tabData[activeTab].length === 0 ? (
          <div className="char-detail-empty">No {activeTab} data available.</div>
        ) : (
          <div className="char-detail-grid">
            {tabData[activeTab].map((item, i) => (
              <TabCard
                key={item.id || i}
                item={item}
                onClick={
                  activeTab === 'comics' && item.id
                    ? () => window.location.assign(`/comics/${item.id}`)
                    : item.resourceURI
                    ? () => window.open(item.resourceURI, '_blank', 'noopener,noreferrer')
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};


