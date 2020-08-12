import React, { useState, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';
import MarvelButton from '../button/MarvelButton'
import SearchBar from '../search-bar/SearchBar'
import HeroCard from '../hero-card/HeroCard'
import {getCharacters} from '../../utils/api'

function App() {

  useEffect(() => {
   const characters = getCharacters();
  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}

        <MarvelButton text="testing"></MarvelButton>
        <SearchBar></SearchBar>
        <HeroCard></HeroCard>
      </header>
    </div>
  );
}

export default App;
