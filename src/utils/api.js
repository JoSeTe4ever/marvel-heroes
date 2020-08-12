import Axios from "axios";

const marvelURL = 'proxy/v1/public',
    apiKey = `apikey=${process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}`;

export const getCharacters = (options) => {
    return Axios.get(`${marvelURL}/characters/?${apiKey}`)
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