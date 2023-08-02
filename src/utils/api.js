const urlDevelopment = `http://localhost:3004/characters`;
const urlProduction = `http://gateway.marvel.com/v1/public`;

export const url = urlProduction;
export const apiKey = `${process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}`;

export const getCharacters = async (options) => {
  let buildableUrl = `${url}/characters?apikey=${apiKey}`;
  // append url parameters to url if they exist in options object
  if (options) {
    const { nameStartsWith, orderBy, limit, offset } = options;
    if (nameStartsWith) {
      buildableUrl += `&nameStartsWith=${nameStartsWith}`;
    }
    if (orderBy) {
      buildableUrl += `&orderBy=${orderBy}`;
    }
    if (limit) {
      buildableUrl += `&limit=${limit}`;
    }
    if (offset) {
      buildableUrl += `&offset=${offset}`;
    }
  }

  const apiCall = await fetch(`${buildableUrl}`);
  return await apiCall.json();
};

export const getStories = async (options) => {
  const apiCall = await fetch(`${url}/stories?apikey=${apiKey}`);
  return await apiCall.json();
};

//getStoriesByEventId
export const getStoriesByEventId = async (eventId) => {
  const apiCall = await fetch(
    `${url}/events/${eventId}/stories?apikey=${apiKey}`
  );
  return await apiCall.json();
};

export const getCreators = (options) => {
  const apiCall = fetch(`${url}/creators?apikey=${apiKey}`);
  return apiCall.json();
};

export const getCreatorDetails = async (creatorId) => {
  const apiCall = await fetch(`${url}/creators/${creatorId}?apikey=${apiKey}`);
  return await apiCall.json();
};

export const getStoriesByCreatorId = async (creatorId) => {
  const apiCall = await fetch(
    `${url}/creators/${creatorId}/stories?apikey=${apiKey}`
  );
  return await apiCall.json();
};

export const getSeriesbycreatorId = async (creatorId) => {
  const apiCall = await fetch(
    `${url}/creators/${creatorId}/series?apikey=${apiKey}`
  );
  return await apiCall.json();
};

export const getEventsByCreatorId = async (creatorId) => {
  const apiCall = await fetch(
    `${url}/creators/${creatorId}/events?apikey=${apiKey}`
  );
  return await apiCall.json();
};

export const getComicsByCreatorId = async (creatorId) => {
  const apiCall = await fetch(
    `${url}/creators/${creatorId}/comics?apikey=${apiKey}`
  );
  return await apiCall.json();
};

export const getSeries = async (options) => {
  const apiCall = await fetch(`${url}/series?apikey=${apiKey}`);
  return await apiCall.json();
};

export const getComics = async (options) => {
  // append url parameters to url if they exist in options object
  let buildableUrl = `${url}/comics?apikey=${apiKey}`;

  if (options) {
    const { titleStartsWith, orderBy, limit, offset } = options;
    if (titleStartsWith) {
      buildableUrl += `&titleStartsWith=${titleStartsWith}`;
    }
    if (orderBy) {
      buildableUrl += `&orderBy=${orderBy}`;
    }
    if (limit) {
      buildableUrl += `&limit=${limit}`;
    }
    if (offset) {
      buildableUrl += `&offset=${offset}`;
    }
  }

  const apiCall = await fetch(`${buildableUrl}`);
  return await apiCall.json();
};

export const getComicDetails = async (comicId) => {
  const apiCall = await fetch(`${url}/comics/${comicId}?apikey=${apiKey}`);
  return await apiCall.json();
};

export const getCharactersByComicId = async (comicId) => {
  const apiCall = await fetch(
    `${url}/comics/${comicId}/characters?apikey=${apiKey}`
  );
  return await apiCall.json();
};

export const getCreatorsByComicId = async (comicId) => {
  const apiCall = await fetch(
    `${url}/comics/${comicId}/creators?apikey=${apiKey}`
  );
  return await apiCall.json();
};

export const getEventsByComicId = async (comicId) => {
  const apiCall = await fetch(
    `${url}/comics/${comicId}/events?apikey=${apiKey}`
  );
  return await apiCall.json();
};

export const getStoriesByComicId = async (comicId) => {
  const apiCall = await fetch(
    `${url}/comics/${comicId}/stories?apikey=${apiKey}`
  );
  return await apiCall.json();
};

export const getEvents = (options) => {
  const apiCall = fetch(`${url}/events?apikey=${apiKey}`);
  return apiCall.json();
};

export const setCharactersByQuery = async (
  setPagination,
  setCharacters,
  query
) => {
  const apiCall = await fetch(
    `${url}/characters?apikey=${apiKey}&nameStartsWith=${query}`
  );
  const result = await apiCall.json();
  debugger; // TODO aqui hay que meter la info de la oaginacion.
  if (result.data) {
    const { offset, limit, total, count } = result.data;
    if (setPagination) {
      setPagination({
        offset,
        limit,
        total,
        count,
      });
    }
    setCharacters(result.data.results);
  } else {
    setCharacters([]);
  }
};

export const getCharacterDetails = async (characterId) => {
  const apiCall = await fetch(
    `${url}/characters/${characterId}?apikey=${apiKey}`
  );
  const result = await apiCall.json();
  return result.data.results;
};

// Fetches lists of characters filtered by a story id.
export const getCharactersByStoryId = async (storyId) => {
  const apiCall = await fetch(`${url}/characters/${storyId}?apikey=${apiKey}`);
  const result = await apiCall.json();
  return result.data.results;
};

export const getComicsByCharacterId = async (characterId) => {
  const apiCall = await fetch(
    `${url}/characters/${characterId}/comics?apikey=${apiKey}`
  );
  const result = await apiCall.json();
  return result.data.results;
};

export const getEventsByCharacterId = async (characterId) => {
  const apiCall = await fetch(
    `${url}/characters/${characterId}/events?apikey=${apiKey}`
  );
  const result = await apiCall.json();
  return result.data.results;
};

export const getSeriesByCharacterId = async (characterId) => {
  const apiCall = await fetch(
    `${url}/characters/${characterId}/series?apikey=${apiKey}`
  );
  const result = await apiCall.json();
  return result.data.results;
};

export const getStoriesByCharacterId = async (characterId) => {
  const apiCall = await fetch(
    `${url}/characters/${characterId}/stories?apikey=${apiKey}`
  );
  const result = await apiCall.json();
  return result.data.results;
};

export const getCharactersSearchSuggestions = async (searchCriteria) => {
  if (searchCriteria) {
    const apiCall = await fetch(
      `${url}/characters?apikey=${apiKey}&nameStartsWith=${searchCriteria}&limit=8`
    );
    const result = await apiCall.json();
    return result.data.results;
  }
  return [];
};

export const getComicsSearchSuggestions = async (searchCriteria) => {
  if (searchCriteria) {
    const apiCall = await fetch(
      `${url}/comics?apikey=${apiKey}&titleStartsWith=${searchCriteria}&limit=8`
    );
    const result = await apiCall.json();
    return result.data.results;
  }
  return [];
};
