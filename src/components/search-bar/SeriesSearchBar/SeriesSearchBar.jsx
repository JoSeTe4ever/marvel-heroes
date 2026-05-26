import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchTextState } from "../../../state";
import { getSeriesSearchSuggestions } from "../../../utils/api";

import "./SeriesSearchBar.css";

const SeriesSearchBar = () => {
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
      getSeriesSearchSuggestions(text).then((response) => {
        const seriesNames = response.map((series) => ({
          name: series.name,
          seriesId: series.id,
          siteDetailUrl: series.siteDetailUrl,
        }));
        setSuggestions(seriesNames);
        setIsLoading(false);
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text]);

  const goToSeriesResults = () => {
    setText("");
    history.push(`/series`);
  };

  return (
    <div className="SearchBar-suggestions__container">
      <input
        type="text"
        className="suggestions__input"
        placeholder="series name…"
        value={text}
        onChange={onChange}
      />

      {text && text.length > 0 ? (
        <ul className="SearchBar-suggestions__list">
          {suggestions.map((e) => (
            <li
              key={e.seriesId}
              className="suggestions__list--element"
              onClick={() => {
                setText("");
                if (e.siteDetailUrl) {
                  window.open(e.siteDetailUrl, "_blank", "noopener,noreferrer");
                } else {
                  history.push(`/series`);
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
            <li
              className="suggestions__list--final-element"
              onClick={goToSeriesResults}
            >
              All search results
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default SeriesSearchBar;
