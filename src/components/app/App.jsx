import React, { useEffect, useState } from 'react';
import { initCharacters } from '../../utils/api';
import MarvelButton from '../button/MarvelButton';
import HeroCard from '../hero-card/HeroCard';
import SearchBar from '../search-bar/SearchBar';
import { useRecoilValue } from "recoil";
import { searchTextState } from "../../state";
import './App.css';


const App = () => {

  //the callback for the useState is the initialState
  const [characters, setCharacters] = useState([]);
  const observerdText = useRecoilValue(searchTextState);

  useEffect(() => {
    initCharacters(setCharacters);
  }, [observerdText]); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount 

  return (
    <div className="App">
      <header className="App-header">
        <MarvelButton text="testing"></MarvelButton>
        <SearchBar></SearchBar>
        {characters.map(e => {
          return <HeroCard
            heroDescription={e.description}
            key={e.id.toString()}
            heroName={e.name}
            imgUrl={`${e.thumbnail.path}.${e.thumbnail.extension}`}></HeroCard>
        })}
      </header>
    </div>
  );
}

export default App;
