import React from 'react';
import MarvelButton from '../button/MarvelButton';
import SearchBar from '../search-bar/SearchBar';
import Dashboard from '../dashboard/Dashboard';
import { useRecoilState } from "recoil";
import { searchTextState } from "../../state";
import './App.css';


const App = () => {

  const [text, setText] = useRecoilState(searchTextState);

  return (
    <div className="App">
      <header className="App-header">
        <MarvelButton text="search" clicked={setText}></MarvelButton>
        <SearchBar text={text}></SearchBar>
      </header>
        <Dashboard></Dashboard>
      <footer>

      </footer>
    </div>
  );
}

export default App;
