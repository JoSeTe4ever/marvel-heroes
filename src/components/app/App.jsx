import React, { useEffect, useState } from 'react';
import { getCharacters } from '../../utils/api';
import MarvelButton from '../button/MarvelButton';
import HeroCard from '../hero-card/HeroCard';
import SearchBar from '../search-bar/SearchBar';
import './App.css';

function App() {

  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const characters = getCharacters().then(characters => {
      debugger;
      setCharacters(characters);
    });
   });

  return (
    <div className="App">
      <header className="App-header">
        <MarvelButton text="testing"></MarvelButton>
        <SearchBar></SearchBar>

        { characters.map(e =>{
          return <HeroCard imgUrl="" heroName=""></HeroCard>
        })}

      </header>
    </div>
  );
}

export default App;
