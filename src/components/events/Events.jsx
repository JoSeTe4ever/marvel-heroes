import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getEvents } from '../../utils/api';
import './Events.css';

const LIMIT = 20;

const ACTION_WORDS = ['BOOM!', 'KRAK!', 'ZZZAP!', 'WHAM!', 'KAPOW!', 'THOOM!', 'BZZZT!'];

function EventCard({ event, index }) {
  const actionWord = ACTION_WORDS[index % ACTION_WORDS.length];
  const tiltClass = index % 2 === 0 ? 'event-card--tilt-right' : 'event-card--tilt-left';

  return (
    <article
      className={`event-card ${tiltClass}`}
      tabIndex={0}
      aria-label={event.name}
      onClick={() => event.siteDetailUrl && window.open(event.siteDetailUrl, '_blank', 'noopener,noreferrer')}
    >
      <div className="event-card__action-word">{actionWord}</div>
      {event.publisher && (
        <div className="event-card__publisher-badge">{event.publisher}</div>
      )}
      <div className="event-card__image-wrap">
        <img
          className="event-card__image"
          src={event.thumbnail?.url || '/img/1920px-MarvelLogo.svg.jpg'}
          alt={event.name}
          loading="lazy"
        />
        <div className="event-card__image-overlay" aria-hidden="true" />
      </div>
      <div className="event-card__body">
        <h3 className="event-card__title">{event.name}</h3>
        <div className="event-card__meta">
          {event.issueCount > 0 && (
            <span className="event-card__badge event-card__badge--issues">
              ⚡ {event.issueCount} issues
            </span>
          )}
        </div>
        {event.description && (
          <p className="event-card__desc">{event.description}</p>
        )}
      </div>
    </article>
  );
}

function Events() {
  const [eventsList, setEventsList] = useState([]);
  const [, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const loaderRef = useRef(null);
  const isFirstLoad = useRef(true);

  const fetchEvents = useCallback(async (currentOffset, query) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const options = { limit: LIMIT, offset: currentOffset };
      if (query) options.nameStartsWith = query;
      const response = await getEvents(options);
      const results = response.data.results || [];
      if (currentOffset === 0) {
        setEventsList(results);
      } else {
        setEventsList((prev) => [...prev, ...results]);
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
    setEventsList([]);
    setOffset(0);
    setHasMore(true);
    isFirstLoad.current = true;
  }, [search]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      fetchEvents(0, search);
    }
  }, [eventsList, search, fetchEvents]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setOffset((prev) => {
            const next = prev + LIMIT;
            fetchEvents(next, search);
            return next;
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isLoading, hasMore, search, fetchEvents]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  return (
    <div className="events-page">
      {/* Hero header */}
      <header className="events-hero">
        <div className="events-hero__stars" aria-hidden="true" />
        <div className="events-hero__burst" aria-hidden="true" />
        <h1 className="events-hero__title">
          <span className="events-hero__title-marvel">MARVEL</span>
          <span className="events-hero__title-events">EVENTS</span>
        </h1>
        <p className="events-hero__sub">Every story arc. Every epic battle. Every legend.</p>
      </header>

      {/* Search */}
      <form className="events-search" onSubmit={handleSearch}>
        <div className="events-search__bubble">
          <input
            className="events-search__input"
            type="text"
            placeholder="Search events… e.g. Civil War"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search events"
          />
          <button className="events-search__btn" type="submit">
            FIND!
          </button>
        </div>
      </form>

      {/* Grid */}
      <main className="events-grid">
        {eventsList.map((ev, i) => (
          <EventCard key={ev.id} event={ev} index={i} />
        ))}
      </main>

      {/* Loader sentinel */}
      <div ref={loaderRef} className="events-loader">
        {isLoading && (
          <div className="events-loader__spinner" aria-label="Loading events">
            <span className="events-loader__ring" />
            <span className="events-loader__text">LOADING…</span>
          </div>
        )}
        {!isLoading && !hasMore && eventsList.length > 0 && (
          <div className="events-loader__end">— THE END OF ALL THINGS —</div>
        )}
        {!isLoading && !hasMore && eventsList.length === 0 && (
          <div className="events-loader__end">No events found. Try another search!</div>
        )}
      </div>
    </div>
  );
}

export default Events;
