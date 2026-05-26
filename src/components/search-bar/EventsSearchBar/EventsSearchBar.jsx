import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchTextState } from "../../../state";
import { getEventsSearchSuggestions } from "../../../utils/api";

import "./EventsSearchBar.css";

const EventsSearchBar = () => {
  const history = useHistory();
  const [text, setText] = useRecoilState(searchTextState);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      getEventsSearchSuggestions(text).then((response) => {
        setSuggestions(
          response.map((ev) => ({
            name: ev.name,
            siteDetailUrl: ev.siteDetailUrl,
          }))
        );
        setIsLoading(false);
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text]);

  const goToEvents = () => {
    setText("");
    history.push(`/events`);
  };

  return (
    <div className="SearchBar-suggestions__container">
      <input
        type="text"
        className="suggestions__input"
        placeholder="event name…"
        value={text}
        onChange={onChange}
      />

      {text && text.length > 0 ? (
        <ul className="SearchBar-suggestions__list">
          {suggestions.map((e, i) => (
            <li
              key={i}
              className="suggestions__list--element"
              onClick={() => {
                setText("");
                if (e.siteDetailUrl) {
                  window.open(e.siteDetailUrl, "_blank", "noopener,noreferrer");
                } else {
                  history.push(`/events`);
                }
              }}
            >
              {e.name}
            </li>
          ))}
          {isLoading && (
            <li className="suggestions__list--final-element">Loading…</li>
          )}
          {!isLoading && text.length > 0 && (
            <li className="suggestions__list--final-element" onClick={goToEvents}>
              All search results
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default EventsSearchBar;
