import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { favouritesCharacters } from "../../state";
import { getCharacters } from "../../utils/api";
import { Favourite } from "../favourite/Favourite";
import "./Characters.css";

const LIMIT = 20;
const ACTION_WORDS = ['HERO!', 'MIGHTY!', 'SHIELD!', 'AVENGE!', 'EXCELSIOR!', 'SMASH!', 'THWIP!'];

function CharacterCard({ character, index }) {
  const history = useHistory();
  const favourites = useRecoilValue(favouritesCharacters);
  const actionWord = ACTION_WORDS[index % ACTION_WORDS.length];
  const tiltClass = index % 2 === 0 ? 'char-card--tilt-right' : 'char-card--tilt-left';

  return (
    <article
      className={`char-card ${tiltClass}`}
      tabIndex={0}
      aria-label={character.name}
      onClick={() => history.push(`/characters/${character.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && history.push(`/characters/${character.id}`)}
    >
      <div className="char-card__action-word">{actionWord}</div>
      <div className="char-card__fav">
        <Favourite isSelected={favourites.some(f => f.toString() === character.id.toString())} />
      </div>
      <div className="char-card__image-wrap">
        <img
          className="char-card__image"
          src={character.thumbnail?.url || '/img/1920px-MarvelLogo.svg.jpg'}
          alt={character.name}
          loading="lazy"
        />
        <div className="char-card__image-overlay" aria-hidden="true" />
      </div>
      <div className="char-card__body">
        <h3 className="char-card__title">{character.name}</h3>
        <div className="char-card__meta">
          {character.comics?.available > 0 && (
            <span className="char-card__badge char-card__badge--comics">
              📚 {character.comics.available} comics
            </span>
          )}
        </div>
        {character.description && (
          <p className="char-card__desc">{character.description}</p>
        )}
      </div>
    </article>
  );
}

function Characters() {
  const [charactersList, setCharactersList] = useState([]);
  const [, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('Spider');
  const [searchInput, setSearchInput] = useState('');
  const loaderRef = useRef(null);
  const isFirstLoad = useRef(true);

  const fetchCharacters = useCallback(async (currentOffset, query) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await getCharacters({ nameStartsWith: query || 'Spider', limit: LIMIT, offset: currentOffset });
      const results = response.data.results || [];
      if (currentOffset === 0) {
        setCharactersList(results);
      } else {
        setCharactersList(prev => [...prev, ...results]);
      }
      const total = response.data.total || 0;
      setHasMore(currentOffset + results.length < total && results.length === LIMIT);
    } catch {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    setCharactersList([]);
    setOffset(0);
    setHasMore(true);
    isFirstLoad.current = true;
  }, [search]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      fetchCharacters(0, search);
    }
  }, [charactersList, search, fetchCharacters]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setOffset(prev => {
            const next = prev + LIMIT;
            fetchCharacters(next, search);
            return next;
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isLoading, hasMore, search, fetchCharacters]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim() || 'Spider');
  };

  return (
    <div className="chars-page">
      {/* Hero header */}
      <header className="chars-hero">
        <div className="chars-hero__stars" aria-hidden="true" />
        <div className="chars-hero__burst" aria-hidden="true" />
        <h1 className="chars-hero__title">
          <span className="chars-hero__title-marvel">MARVEL</span>
          <span className="chars-hero__title-chars">CHARACTERS</span>
        </h1>
        <p className="chars-hero__sub">Earth's Mightiest Heroes — and Villains.</p>
      </header>

      {/* Search */}
      <form className="chars-search" onSubmit={handleSearch}>
        <div className="chars-search__bubble">
          <input
            className="chars-search__input"
            type="text"
            placeholder="Search characters… e.g. Spider-Man"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search characters"
          />
          <button className="chars-search__btn" type="submit">FIND!</button>
        </div>
      </form>

      {/* Grid */}
      <main className="chars-grid">
        {charactersList.map((c, i) => (
          <CharacterCard key={c.id} character={c} index={i} />
        ))}
      </main>

      {/* Loader sentinel */}
      <div ref={loaderRef} className="chars-loader">
        {isLoading && (
          <div className="chars-loader__spinner">
            <span className="chars-loader__ring" />
            <span className="chars-loader__text">ASSEMBLING…</span>
          </div>
        )}
        {!isLoading && !hasMore && charactersList.length > 0 && (
          <div className="chars-loader__end">— ROSTER COMPLETE —</div>
        )}
        {!isLoading && !hasMore && charactersList.length === 0 && (
          <div className="chars-loader__end">No characters found. Try another search!</div>
        )}
      </div>
    </div>
  );
}

export default Characters;
