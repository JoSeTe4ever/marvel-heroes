import Axios from "axios";

const apiKey = `apikey=${process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}`;

export const getCharacters = (options) => {
  return fetch(`http://gateway.marvel.com/v1/public/characters?${apiKey}`)
    .then(res => {
      const characters = res.results;
      return characters;
    });
};
export const getComics = (options) => {};
export const getCreator = (options) => {};
export const getSeries = (options) => {};
export const getStories = (options) => {};
export const getEvents = (options) => {};