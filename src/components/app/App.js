import React from 'react';
import logo from './logo.svg';
import './App.css';
import MarvelButton from '../button/MarvelButton'

function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        chivato {API_KEY}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <MarvelButton></MarvelButton>
      </header>
    </div>
  );
}

export default App;
