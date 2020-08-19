import React from 'react';
import MarvelButton from '../button/MarvelButton';
import SearchBar from '../search-bar/SearchBar';
import Dashboard from '../dashboard/Dashboard';
import './App.css';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <MarvelButton text="testing"></MarvelButton>
        <SearchBar></SearchBar>
      </header>
      <body>
        <Dashboard></Dashboard>
      </body>
      <footer>

      </footer>
    </div>
  );
}

export default App;
