import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getCreators } from '../../utils/api';
import './Creators.css';

const LIMIT = 20;

// Helper to safely extract date string from API response
function formatDate(dateValue) {
  if (!dateValue) return null;
  if (typeof dateValue === 'string') return dateValue;
  if (typeof dateValue === 'object' && dateValue.date) return dateValue.date;
  return null;
}

function CreatorStrip({ creator, index }) {
  const history = useHistory();
  const isEven = index % 2 === 0;
  const birthDate = formatDate(creator.birth);

  return (
    <article
      className={`creator-strip ${isEven ? 'creator-strip--even' : 'creator-strip--odd'}`}
      onClick={() => history.push(`/creators/${creator.id}`)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && history.push(`/creators/${creator.id}`)}
      aria-label={creator.name}
    >
      {/* Panel number badge */}
      <div className="creator-strip__panel-num">#{index + 1}</div>

      {/* Photo panel */}
      <div className="creator-strip__photo-panel">
        <div className="creator-strip__photo-frame">
          <img
            className="creator-strip__photo"
            src={creator.thumbnail?.url || '/img/1920px-MarvelLogo.svg.jpg'}
            alt={creator.name}
            loading="lazy"
          />
        </div>
        {creator.issueCount > 0 && (
          <div className="creator-strip__issue-count">{creator.issueCount} issues</div>
        )}
      </div>

      {/* Info panel */}
      <div className="creator-strip__info-panel">
        {/* Speech bubble arrow decoration */}
        <div className="creator-strip__bubble-arrow" aria-hidden="true" />

        <div className="creator-strip__caption-box">
          <h2 className="creator-strip__name">{creator.name}</h2>

          <div className="creator-strip__meta">
            {birthDate && (
              <span className="creator-strip__meta-item">🎂 {birthDate}</span>
            )}
            {creator.hometown && (
              <span className="creator-strip__meta-item">📍 {creator.hometown}</span>
            )}
            {creator.country && (
              <span className="creator-strip__meta-item">🌍 {creator.country}</span>
            )}
          </div>

          <p className="creator-strip__desc">{creator.description}</p>

          <div className="creator-strip__read-more">READ MORE →</div>
        </div>
      </div>
    </article>
  );
}

function Creators() {
  const [creatorsList, setCreatorsList] = useState([]);
  const [, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('Stan');
  const [searchInput, setSearchInput] = useState('');
  const loaderRef = useRef(null);
  const isFirstLoad = useRef(true);

  const fetchCreators = useCallback(async (currentOffset, query) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const options = { limit: LIMIT, offset: currentOffset };
      if (query) options.nameStartsWith = query;
      const response = await getCreators(options);
      const results = response.data.results || [];
      if (currentOffset === 0) {
        setCreatorsList(results);
      } else {
        setCreatorsList(prev => [...prev, ...results]);
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
    setCreatorsList([]);
    setOffset(0);
    setHasMore(true);
    isFirstLoad.current = true;
  }, [search]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      fetchCreators(0, search);
    }
  }, [creatorsList, search, fetchCreators]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setOffset(prev => {
            const next = prev + LIMIT;
            fetchCreators(next, search);
            return next;
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isLoading, hasMore, search, fetchCreators]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim() || 'Stan');
  };

  return (
    <div className="creators-page">
      {/* Hero header */}
      <header className="creators-hero">
        <div className="creators-hero__halftone" aria-hidden="true" />
        <h1 className="creators-hero__title">
          <span className="creators-hero__title-marvel">MARVEL</span>
          <span className="creators-hero__title-creators">CREATORS</span>
        </h1>
        <p className="creators-hero__sub">The legends behind the legends.</p>
      </header>

      {/* Search */}
      <form className="creators-search" onSubmit={handleSearch}>
        <div className="creators-search__bubble">
          <input
            className="creators-search__input"
            type="text"
            placeholder="Search creators… e.g. Jack Kirby"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search creators"
          />
          <button className="creators-search__btn" type="submit">FIND!</button>
        </div>
      </form>

      {/* Strip list */}
      <main className="creators-list">
        {creatorsList.map((c, i) => (
          <CreatorStrip key={c.id} creator={c} index={i} />
        ))}
      </main>

      {/* Loader */}
      <div ref={loaderRef} className="creators-loader">
        {isLoading && (
          <div className="creators-loader__spinner">
            <span className="creators-loader__ring" />
            <span className="creators-loader__text">LOADING…</span>
          </div>
        )}
        {!isLoading && !hasMore && creatorsList.length > 0 && (
          <div className="creators-loader__end">— END OF THE HALL OF FAME —</div>
        )}
        {!isLoading && !hasMore && creatorsList.length === 0 && (
          <div className="creators-loader__end">No creators found. Try another search!</div>
        )}
      </div>
    </div>
  );
}

export default Creators;
