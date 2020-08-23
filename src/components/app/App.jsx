import React from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { displayedCharacters, searchTextState } from "../../state";
import MarvelButton from '../button/MarvelButton';
import Dashboard from '../dashboard/Dashboard';
import SearchBar from '../search-bar/SearchBar';
import './App.css';


const App = () => {

  const text = useRecoilValue(searchTextState);
  const [heroes, setDisplayedCharacters] = useRecoilState(displayedCharacters);

  return (
    <div className="App">
      <header className="App-header">
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
