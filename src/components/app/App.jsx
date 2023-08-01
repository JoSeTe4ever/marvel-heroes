import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  copyrightInfo,
  displayedCharacters,
  searchTextState,
  favouritesCharacters,
  pagination,
} from "../../state";
import MarvelButton from "../button/MarvelButton";
import Dashboard from "../dashboard/Dashboard";
import searchBarFactory from "../search-bar/searchBarFactory";

import "./App.css";

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const [text, setText] = useRecoilState(searchTextState);
  const copyright = useRecoilValue(copyrightInfo);
  const favs = useRecoilValue(favouritesCharacters);

  const [heroes, setDisplayedCharacters] = useRecoilState(displayedCharacters);
  const [paginationInfo, setPaginationInfo] = useRecoilState(pagination);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname.slice(1));
  }, [location]);

  const _navigateHome = () => {
    setDisplayedCharacters(heroes);
    setText("");
    history.push(`/`);
  };

  const _navigateFavourites = () => {
    setText("");
    history.push(`/favourites`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          className="logo"
          src="./img/1920px-MarvelLogo.svg.png"
          onClick={_navigateHome}
        ></img>

        {searchBarFactory(currentPath)}

        <MarvelButton
          text="search"
          searchText={text}
          onClickedAction={setDisplayedCharacters}
          pagination={setPaginationInfo}
        ></MarvelButton>

        {favs && favs.length ? (
          <span className="favourites" onClick={_navigateFavourites}>
            ❤️
          </span>
        ) : (
          ""
        )}
      </header>
      <Dashboard></Dashboard>
      <footer className="App-footer">
        <span
          dangerouslySetInnerHTML={{ __html: copyright.attributionHTML }}
        ></span>
        <span>{copyright.copyright}</span>
      </footer>
    </div>
  );
};

export default App;
