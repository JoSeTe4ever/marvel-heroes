
const apiKey = `apikey=${process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}`;
const urlDevelopment = `http://localhost:3004/characters`;
const urlProduction = `http://gateway.marvel.com/v1/public/characters?${apiKey}`;
//export const getCharacters = (options) => {
//  return fetch(`http://gateway.marvel.com/v1/public/characters?${apiKey}`)
//    .then(res => {
//      const characters = res.results;
//      return characters;
//    });
//};

export const initCharacters = async (setCharacters) => {
  const apiCall = await fetch(`${urlDevelopment}`);
  const result = await apiCall.json();
  setCharacters(result);
};


export const getComics = (options) => {};
export const getCreator = (options) => {};
export const getSeries = (options) => {};
export const getStories = (options) => {};
export const getEvents = (options) => {};