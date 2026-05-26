import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchTextState } from "../../../state";
import { getCreatorsSearchSuggestions } from "../../../utils/api";

import "./CreatorsSearchBar.css";

const CreatorsSearchBar = () => {
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
      getCreatorsSearchSuggestions(text).then((response) => {
        const creatorNames = response.map((creator) => ({
          name: creator.name,
          creatorId: creator.id,
          siteDetailUrl: creator.siteDetailUrl,
        }));
        setSuggestions(creatorNames);
        setIsLoading(false);
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text]);

  const goToCreatorsResults = () => {
    setText("");
    history.push(`/creators`);
  };

  return (
    <div className="SearchBar-suggestions__container">
      <input
        type="text"
        className="suggestions__input"
        placeholder="creator name…"
        value={text}
        onChange={onChange}
      />

      {text && text.length > 0 ? (
        <ul className="SearchBar-suggestions__list">
          {suggestions.map((e) => (
            <li
              key={e.creatorId}
              className="suggestions__list--element"
              onClick={() => {
                setText("");
                history.push(`/creators/${e.creatorId}`);
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
              onClick={goToCreatorsResults}
            >
              All search results
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default CreatorsSearchBar;
