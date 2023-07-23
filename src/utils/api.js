const urlDevelopment = `http://localhost:3004/characters`;
const urlProduction = `http://gateway.marvel.com/v1/public`;

export const url = urlProduction;
export const apiKey = `${process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}`;


export const initInfo = async (setCharacters, setCopyright) => {
  const apiCall = await fetch(`${url}/characters?apikey=${apiKey}`);
  const result = await apiCall.json();
  setCharacters(result.data.results);
  setCopyright({
    copyright: result.copyright,
    attributionText: result.attributionText,
    attributionHTML: result.attributionHTML
  });
};

export const setCharactersByQuery = async (setPagination, setCharacters, query) => {
  const apiCall = await fetch(`${url}/characters?apikey=${apiKey}&nameStartsWith=${query}`);
  const result = await apiCall.json();
  debugger; // TODO aqui hay que meter la info de la oaginacion.
  if (result.data) {
    const {
      offset,
      limit,
      total,
      count
    } = result.data;
    if (setPagination) {
      setPagination({
        offset,
        limit,
        total,
        count
      });
    }
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


export const getSearchSuggestions = async (searchCriteria) => {
  if (searchCriteria) {
    const apiCall = await fetch(`${url}/characters?apikey=${apiKey}&nameStartsWith=${searchCriteria}`);
    const result = await apiCall.json();
    return result.data.results;
  }
  return [];

};

export const getComics = (options) => {};
export const getCreator = (options) => {};
export const getSeries = (options) => {};
export const getStories = (options) => {};
export const getEvents = (options) => {};