import React from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { displayedCharacters, searchTextState } from "../../state";
import MarvelButton from '../button/MarvelButton';
import Dashboard from '../dashboard/Dashboard';
import SearchBar from '../search-bar/SearchBar';
import { useHistory } from "react-router-dom";
import './App.css';


const App = () => {

  const history = useHistory();
  const text = useRecoilValue(searchTextState);
  const [heroes, setDisplayedCharacters] = useRecoilState(displayedCharacters);

  const _navigateHome = () => {
    history.push(`/`);
  }

  return (
    <div className="App">
      <header className="App-header">
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
