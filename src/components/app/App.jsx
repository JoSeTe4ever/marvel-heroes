import React from 'react';
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { copyrightInfo, displayedCharacters, searchTextState } from "../../state";
import MarvelButton from '../button/MarvelButton';
import Dashboard from '../dashboard/Dashboard';
import SearchBar from '../search-bar/SearchBar';
import './App.css';


const App = () => {

  const history = useHistory();
  const [text, setText] = useRecoilState(searchTextState);
  const copyright = useRecoilValue(copyrightInfo);
  const [heroes, setDisplayedCharacters] = useRecoilState(displayedCharacters);

  const _navigateHome = () => {
    setDisplayedCharacters(heroes);
    setText("");
    history.push(`/`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <span dangerouslySetInnerHTML={{__html: copyright.attributionHTML}}></span>
        <span>{copyright.copyright}</span>
        <img className="logo" src="/1920px-MarvelLogo.svg.png" onClick={_navigateHome}></img>
        <MarvelButton text="search" searchText={text} onClickedAction={setDisplayedCharacters}></MarvelButton>
        <SearchBar text={text}></SearchBar>
      </header>
      <Dashboard></Dashboard>
      <footer>
      </footer>
    </div>
  );
}

export default App;
