const apiKey = `${process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}`;
const urlDevelopment = `http://localhost:3004/characters`;
const urlProduction = `http://gateway.marvel.com/v1/public`;
const url = urlProduction;


export const initCharacters = async (setCharacters) => {
  const apiCall = await fetch(`${url}/characters?apikey=${apiKey}`);
  const result = await apiCall.json();
  setCharacters(result.data.results);
};

export const setCharactersByQuery = async (setCharacters, query) => {
  const apiCall = await fetch(`${url}/characters?apikey=${apiKey}&name=${query}`);
  const result = await apiCall.json();
  if (result.data) {
    setCharacters(result.data.results);
  } else {
    setCharacters([]);
  }
};

export const getCharacterDetails = async (characterId) => {
  const apiCall = await fetch(`${url}/characters/${characterId}?apikey=${apiKey}`);
  const result = await apiCall.json();
  return result.data.results;
};


export const getComics = (options) => {};
export const getCreator = (options) => {};
export const getSeries = (options) => {};
export const getStories = (options) => {};
export const getEvents = (options) => {};