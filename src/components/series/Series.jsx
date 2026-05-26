import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getSeries } from '../../utils/api';
import './Series.css';

const LIMIT = 20;

const ACTION_WORDS = ['POW!', 'ZAP!', 'BAM!', 'WHAM!', 'KA-BOOM!', 'SMASH!', 'THWIP!'];

function SeriesCard({ series, index }) {
  const actionWord = ACTION_WORDS[index % ACTION_WORDS.length];
  const tiltClass = index % 2 === 0 ? 'series-card--tilt-right' : 'series-card--tilt-left';

  return (
    <article className={`series-card ${tiltClass}`} tabIndex={0} aria-label={series.name}>
      <div className="series-card__action-word">{actionWord}</div>
      {series.publisher && (
        <div className="series-card__publisher-badge">{series.publisher}</div>
      )}
      <div className="series-card__image-wrap">
        <img
          className="series-card__image"
          src={series.thumbnail?.url || '/img/1920px-MarvelLogo.svg.jpg'}
          alt={series.name}
          loading="lazy"
        />
      </div>
      <div className="series-card__body">
        <h3 className="series-card__title">{series.name}</h3>
        <div className="series-card__meta">
          {series.startYear && (
            <span className="series-card__badge series-card__badge--year">
              📅 {series.startYear}
            </span>
          )}
          {series.episodeCount > 0 && (
            <span className="series-card__badge series-card__badge--episodes">
              📖 {series.episodeCount} eps
            </span>
          )}
        </div>
        {series.description && (
          <p className="series-card__desc">{series.description}</p>
        )}
      </div>
    </article>
  );
}

function Series() {
  const [seriesList, setSeriesList] = useState([]);
  const [, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const loaderRef = useRef(null);
  const isFirstLoad = useRef(true);

  const fetchSeries = useCallback(async (currentOffset, query) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const options = { limit: LIMIT, offset: currentOffset };
      if (query) options.nameStartsWith = query;
      const response = await getSeries(options);
      const results = response.data.results || [];
      if (currentOffset === 0) {
        setSeriesList(results);
      } else {
        setSeriesList((prev) => [...prev, ...results]);
      }
      const total = response.data.total || 0;
      setHasMore(currentOffset + results.length < total && results.length === LIMIT);
    } catch {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore]);

  // Initial load and search changes
  useEffect(() => {
    setSeriesList([]);
    setOffset(0);
    setHasMore(true);
    isFirstLoad.current = true;
  }, [search]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      fetchSeries(0, search);
    }
  }, [seriesList, search, fetchSeries]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setOffset((prev) => {
            const next = prev + LIMIT;
            fetchSeries(next, search);
            return next;
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isLoading, hasMore, search, fetchSeries]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  return (
    <div className="series-page">
      {/* Hero header */}
      <header className="series-hero">
        <div className="series-hero__dots" aria-hidden="true" />
        <div className="series-hero__burst" aria-hidden="true" />
        <h1 className="series-hero__title">
          <span className="series-hero__title-marvel">MARVEL</span>
          <span className="series-hero__title-series">SERIES</span>
        </h1>
        <p className="series-hero__sub">Explore every saga. Relive every epic.</p>
      </header>

      {/* Search */}
      <form className="series-search" onSubmit={handleSearch}>
        <div className="series-search__bubble">
          <input
            className="series-search__input"
            type="text"
            placeholder="Search series… e.g. X-Men"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search series"
          />
          <button className="series-search__btn" type="submit">
            FIND!
          </button>
        </div>
      </form>

      {/* Grid */}
      <main className="series-grid">
        {seriesList.map((s, i) => (
          <SeriesCard key={s.id} series={s} index={i} />
        ))}
      </main>

      {/* Loader sentinel */}
      <div ref={loaderRef} className="series-loader">
        {isLoading && (
          <div className="series-loader__spinner" aria-label="Loading series">
            <span className="series-loader__ring" />
            <span className="series-loader__text">LOADING…</span>
          </div>
        )}
        {!isLoading && !hasMore && seriesList.length > 0 && (
          <div className="series-loader__end">— END OF THE UNIVERSE —</div>
        )}
        {!isLoading && !hasMore && seriesList.length === 0 && (
          <div className="series-loader__end">No series found. Try another search!</div>
        )}
      </div>
    </div>
  );
}

export default Series;
