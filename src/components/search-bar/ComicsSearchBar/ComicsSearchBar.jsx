import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchTextState } from "../../../state";
import {
    getComicsSearchSuggestions
} from "../../../utils/api";

import "./ComicsSearchBar.css";

const ComicsSearchBar = (props) => {
  const history = useHistory();
  const [text, setText] = useRecoilState(searchTextState);
  const [comics, setComics] = useState([]);

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
      getComicsSearchSuggestions(text).then((response) => {
        const comicNames = response.map((comic) => {
          return {
            name: comic.title,
            comicId: comic.id,
          };
        });
        setSuggestions(comicNames);
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
        placeholder="comic name"
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
                  history.push(`/comics/${e.comicId}`);
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
            >
              All search results
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
};

export default ComicsSearchBar;
