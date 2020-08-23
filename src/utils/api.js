const apiKey = `apikey=${process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}`;
const urlDevelopment = `http://localhost:3004/characters`;
const urlProduction = `http://gateway.marvel.com/v1/public/characters?${apiKey}`;
const url = urlProduction;
//export const getCharacters = (options) => {
//  return fetch(`http://gateway.marvel.com/v1/public/characters?${apiKey}`)
//    .then(res => {
//      const characters = res.results;
//      return characters;
//    });
//};

export const initCharacters = async (setCharacters) => {
  const apiCall = await fetch(`${url}`);
  const result = await apiCall.json();
  setCharacters(result.data.results);
};

export const setCharactersByQuery = async (setCharacters, query) => {
  const apiCall = await fetch(`${url}&name=${query}`);
  const result = await apiCall.json();
  setCharacters(result.data.results);
};



export const getCharacterDetails = async (characterId) => {
  const apiCall = await fetch(`${url}`);
  const result = await apiCall.json();
  return result;
};


export const getComics = (options) => {};
export const getCreator = (options) => {};
export const getSeries = (options) => {};
export const getStories = (options) => {};
export const getEvents = (options) => {};