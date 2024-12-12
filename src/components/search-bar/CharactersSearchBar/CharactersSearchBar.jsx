import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  displayedCharacters,
  pagination,
  searchTextState,
} from "../../../state";
import {
  getCharactersSearchSuggestions,
  setCharactersByQuery,
} from "../../../utils/api";

import "./CharactersSearchBar.css";

const CharactersSearchBar = (props) => {
  const history = useHistory();
  const [text, setText] = useRecoilState(searchTextState);
  const [characters, setCharacters] = useRecoilState(displayedCharacters);
  const [paginationInfo, setPagination] = useRecoilState(pagination);

  //TODO check how we can use useReducer instead of useState

  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsloaing] = useState(false);

  const onChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setIsloaing(true);
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(text);
      getCharactersSearchSuggestions(text).then((response) => {
        const heroesNames = response.map((heroe) => {
          return {
            name: heroe.name,
            heroId: heroe.id,
          };
        });
        setSuggestions(heroesNames);
        setIsloaing(false);
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text, 500]);

  return (
    <div className="SearchBar-jopi">
      <div className="SearchBar-suggestions__container">
        <input
          type="text"
          className="suggestions__input"
          value={text}
          onChange={onChange}
        ></input>
      </div>
      {text && text.length > 0 ? (
        <ul className="SearchBar-characters-suggestions__list">
          {suggestions.map((e) => {
            return (
              <li
                className="suggestions__list--element"
                onClick={() => {
                  setText("");
                  history.push(`/characters/${e.heroId}`);
                }}
              >
                {e.name}
              </li>
            );
          })}
          {isLoading ? (
            <li className="suggestions__list--final-element">isLoading</li>
          ) : null}
          {isLoading === false && text.length > 0 ? (
            <li
              className="suggestions__list--final-element"
              onClick={() => {
                setCharactersByQuery(
                  setPagination,
                  setCharacters,
                  text + "&limit=20&offset=20"
                );
              }}
            >
              All search results
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
};

export default CharactersSearchBar;
