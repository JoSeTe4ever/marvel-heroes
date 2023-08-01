import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { searchTextState } from "../../../state";
import {
  getCharactersSearchSuggestions,
  setCharactersByQuery,
} from "../../../utils/api";
import { useHistory, useLocation } from "react-router-dom";
import { displayedCharacters, pagination } from "../../../state";

import "./CharactersSearchBar.css";

const CharactersSearchBar = (props) => {
  const history = useHistory();
  const location = useLocation();
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
    // Obtiene la ruta actual
    const currentPath = location.pathname;
    console.log("" + currentPath);
  }, [location]);

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
    <div className="SearchBar-suggestions__container">
      <input
        type="text"
        className="suggestions__input"
        value={text}
        onChange={onChange}
      ></input>

      {text && text.length > 0 ? (
        <ul className="SearchBar-suggestions__list">
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
