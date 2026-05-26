const comicVineBaseUrl = "https://comicvine.gamespot.com/api";
const comicVineSiteUrl = "https://comicvine.gamespot.com";

export const url = comicVineBaseUrl;
export const apiKey = `${process.env.REACT_APP_COMICVINE_API_KEY || ""}`;

const attribution = {
  copyright: "Data provided by Comic Vine.",
  attributionText: "Data provided by Comic Vine.",
  attributionHTML: `<a href="${comicVineSiteUrl}" target="_blank" rel="noopener noreferrer">Data provided by Comic Vine</a>`,
};

const emptyResponse = (limit = 20, offset = 0) => ({
  ...attribution,
  data: {
    offset,
    limit,
    total: 0,
    count: 0,
    results: [],
  },
});

const stripHtml = (value) => {
  if (!value) {
    return "";
  }

  const element = document.createElement("div");
  element.innerHTML = value;
  return (element.textContent || element.innerText || "").trim();
};

const createImage = (image) => {
  const imageUrl =
    image?.super_url ||
    image?.screen_large_url ||
    image?.screen_url ||
    image?.medium_url ||
    image?.small_url ||
    image?.thumb_url ||
    image?.icon_url ||
    "/img/1920px-MarvelLogo.svg.jpg";

  return {
    path: imageUrl.replace(/\.[^/.]+$/, ""),
    extension: imageUrl.split(".").pop() || "jpg",
    url: imageUrl,
  };
};

const toMarvelList = (items = []) => ({
  available: items.length,
  items: items.map((item) => ({
    id: item.id,
    name: item.name || item.title || "Untitled",
    resourceURI: item.site_detail_url || item.api_detail_url || comicVineSiteUrl,
  })),
});

const normalizeCharacter = (character) => ({
  id: character.id,
  name: character.name || "Unknown character",
  description:
    stripHtml(character.deck || character.description) || "No description available.",
  thumbnail: createImage(character.image),
  comics: {
    available:
      character.count_of_issue_appearances || character.issue_credits?.length || 0,
    items: toMarvelList(character.issue_credits).items,
  },
  series: toMarvelList(character.volume_credits),
  stories: toMarvelList(character.story_arc_credits),
  events: toMarvelList(character.team_friends),
  urls: [
    {
      type: "detail",
      url: character.site_detail_url || comicVineSiteUrl,
    },
  ],
  siteDetailUrl: character.site_detail_url || comicVineSiteUrl,
});

const normalizeIssue = (issue) => ({
  id: issue.id,
  title: issue.name || `Issue #${issue.issue_number || issue.id}`,
  name: issue.name || `Issue #${issue.issue_number || issue.id}`,
  description: stripHtml(issue.deck || issue.description) || "No description available.",
  thumbnail: createImage(issue.image),
  characters: toMarvelList(issue.character_credits),
  creators: toMarvelList(issue.person_credits),
  stories: toMarvelList(issue.story_arc_credits),
  events: toMarvelList(issue.team_credits),
  resourceURI: issue.site_detail_url || comicVineSiteUrl,
  siteDetailUrl: issue.site_detail_url || comicVineSiteUrl,
});

const normalizeStoryArc = (storyArc) => ({
  id: storyArc.id,
  title: storyArc.name || "Untitled story arc",
  name: storyArc.name || "Untitled story arc",
  description:
    stripHtml(storyArc.deck || storyArc.description) || "No description available.",
  type: "Story arc",
  resourceURI: storyArc.site_detail_url || comicVineSiteUrl,
  thumbnail: createImage(storyArc.image),
});

const normalizeEvent = (event) => ({
  id: event.id,
  name: event.name || "Untitled Event",
  description: stripHtml(event.deck || event.description) || "No description available.",
  thumbnail: createImage(event.image),
  issueCount: event.count_of_issue_appearances || 0,
  publisher: event.publisher?.name || null,
  siteDetailUrl: event.site_detail_url || comicVineSiteUrl,
});

const toMarvelResponse = (response, results, limit = 20, offset = 0) => ({
  ...attribution,
  data: {
    offset: response.offset || offset,
    limit: response.limit || limit,
    total: response.number_of_total_results || results.length,
    count: response.number_of_page_results || results.length,
    results,
  },
});

const comicVineJsonp = (resource, params = {}) => {
  if (!apiKey) {
    return Promise.resolve(emptyResponse(params.limit, params.offset));
  }

  return new Promise((resolve, reject) => {
    const callbackName = `comicVineCallback_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}`;
    const searchParams = new URLSearchParams({
      api_key: apiKey,
      format: "jsonp",
      json_callback: callbackName,
      ...params,
    });
    const script = document.createElement("script");
    const cleanUp = () => {
      script.remove();
      delete window[callbackName];
    };

    window[callbackName] = (response) => {
      cleanUp();
      if (response.status_code && response.status_code !== 1) {
        reject(new Error(response.error || "Comic Vine API error"));
        return;
      }
      resolve(response);
    };

    script.onerror = () => {
      cleanUp();
      reject(new Error("Comic Vine API request failed"));
    };

    script.src = `${comicVineBaseUrl}/${resource}/?${searchParams.toString()}`;
    document.body.appendChild(script);
  });
};

const getComicVineList = async (resource, params, normalize) => {
  const response = await comicVineJsonp(resource, params);
  const rawResults = Array.isArray(response.results) ? response.results : [];
  return toMarvelResponse(
    response,
    rawResults.map(normalize),
    params.limit,
    params.offset
  );
};

const getComicVineDetail = async (resource, id, params, normalize) => {
  const response = await comicVineJsonp(`${resource}/${id}`, params);
  const result = response.results ? [normalize(response.results)] : [];
  return toMarvelResponse(response, result, 1, 0);
};

export const getCharacters = async (options = {}) => {
  const { nameStartsWith, orderBy, limit = 20, offset = 0 } = options;
  const params = {
    limit,
    offset,
    field_list:
      "id,name,description,deck,image,count_of_issue_appearances,site_detail_url,publisher",
  };

  params.filter = `name:${nameStartsWith || "Spider"}`;

  if (orderBy) {
    params.sort = orderBy.replace("name", "name");
  }

  const response = await comicVineJsonp("characters", params);
  const rawResults = Array.isArray(response.results) ? response.results : [];
  const marvelResults = rawResults.filter(
    (character) => !character.publisher || character.publisher.id === 31
  );
  return toMarvelResponse(
    response,
    marvelResults.map(normalizeCharacter),
    params.limit,
    params.offset
  );
};

export const getStories = async (options = {}) => {
  const { nameStartsWith, limit = 20, offset = 0 } = options;
  return getComicVineList(
    "story_arcs",
    {
      limit,
      offset,
      filter: `name:${nameStartsWith || "Avengers"}`,
      field_list: "id,name,description,deck,image,site_detail_url",
    },
    normalizeStoryArc
  );
};

export const getStoriesByEventId = async () => emptyResponse();

export const getCreators = async () => emptyResponse();

export const getCreatorDetails = async () => emptyResponse(1, 0);

export const getStoriesByCreatorId = async () => [];

export const getSeriesbycreatorId = async () => [];

export const getEventsByCreatorId = async () => [];

export const getComicsByCreatorId = async () => [];

const normalizeSeries = (series) => ({
  id: series.id,
  name: series.name || "Untitled Series",
  description: stripHtml(series.deck || series.description) || "No description available.",
  thumbnail: createImage(series.image),
  startYear: series.start_year || null,
  episodeCount: series.count_of_episodes || 0,
  publisher: series.publisher?.name || null,
  siteDetailUrl: series.site_detail_url || comicVineSiteUrl,
});

export const getSeries = async (options = {}) => {
  const { nameStartsWith, limit = 20, offset = 0 } = options;
  const params = {
    limit,
    offset,
    field_list: "id,name,deck,image,start_year,count_of_episodes,publisher,site_detail_url",
  };

  if (nameStartsWith) {
    params.filter = `name:${nameStartsWith}`;
  }

  return getComicVineList(
    "series_list",
    params,
    normalizeSeries
  );
};

export const getComics = async (options = {}) => {
  const { titleStartsWith, orderBy, limit = 20, offset = 0 } = options;
  const params = {
    limit,
    offset,
    field_list:
      "id,name,description,deck,image,issue_number,site_detail_url,character_credits,person_credits,story_arc_credits,team_credits",
  };

  params.filter = `name:${titleStartsWith || "Spider-Man"}`;

  if (orderBy) {
    params.sort = orderBy.replace("title", "name");
  }

  return getComicVineList("issues", params, normalizeIssue);
};

export const getComicDetails = async (comicId) =>
  getComicVineDetail(
    "issue",
    `4000-${comicId}`,
    {
      field_list:
        "id,name,description,deck,image,issue_number,site_detail_url,character_credits,person_credits,story_arc_credits,team_credits",
    },
    normalizeIssue
  );

export const getCharactersByComicId = async (comicId) => {
  const details = await getComicDetails(comicId);
  return toMarvelResponse(
    {},
    details.data.results[0]?.characters?.items?.map((character) => ({
      id: character.id,
      name: character.name,
      description: "Comic Vine character credit.",
      thumbnail: createImage(),
    })) || []
  );
};

export const getCreatorsByComicId = async (comicId) => emptyResponse();

export const getEventsByComicId = async (comicId) => emptyResponse();

export const getStoriesByComicId = async (comicId) => {
  const details = await getComicDetails(comicId);
  return toMarvelResponse(
    {},
    details.data.results[0]?.stories?.items?.map((story) => ({
      id: story.id,
      title: story.name,
      description: "Comic Vine story arc credit.",
      type: "Story arc",
      resourceURI: story.resourceURI,
    })) || []
  );
};

export const getEvents = async (options = {}) => {
  const { nameStartsWith, limit = 20, offset = 0 } = options;
  const params = {
    limit,
    offset,
    field_list: "id,name,deck,image,count_of_issue_appearances,publisher,site_detail_url",
  };
  if (nameStartsWith) {
    params.filter = `name:${nameStartsWith}`;
  }
  return getComicVineList("story_arcs", params, normalizeEvent);
};

export const setCharactersByQuery = async (
  setPagination,
  setCharacters,
  query
) => {
  const result = await getCharacters({ nameStartsWith: query, limit: 20, offset: 0 });
  const { offset, limit, total, count, results } = result.data;
  if (setPagination) {
    setPagination({ offset, limit, total, count });
  }
  setCharacters(results);
};

export const getCharacterDetails = async (characterId) => {
  const result = await getComicVineDetail(
    "character",
    `4005-${characterId}`,
    {
      field_list:
        "id,name,description,deck,image,count_of_issue_appearances,issue_credits,volume_credits,story_arc_credits,site_detail_url",
    },
    normalizeCharacter
  );
  return result.data.results;
};

export const getCharactersByStoryId = async (storyId) => [];

export const getComicsByCharacterId = async (characterId) => {
  const details = await getCharacterDetails(characterId);
  return (
    details[0]?.comics?.items?.map((comic) => ({
      id: comic.id,
      title: comic.name,
      description: "Comic Vine issue credit.",
      thumbnail: createImage(),
      resourceURI: comic.resourceURI,
    })) || []
  );
};

export const getEventsByCharacterId = async (characterId) => [];

export const getSeriesByCharacterId = async (characterId) => {
  const details = await getCharacterDetails(characterId);
  return (
    details[0]?.series?.items?.map((series) => ({
      id: series.id,
      title: series.name,
      description: "Comic Vine volume credit.",
      thumbnail: createImage(),
      resourceURI: series.resourceURI,
    })) || []
  );
};

export const getStoriesByCharacterId = async (characterId) => {
  const details = await getCharacterDetails(characterId);
  return (
    details[0]?.stories?.items?.map((story) => ({
      id: story.id,
      title: story.name,
      description: "Comic Vine story arc credit.",
      type: "Story arc",
      resourceURI: story.resourceURI,
    })) || []
  );
};

export const getCharactersSearchSuggestions = async (searchCriteria) => {
  if (searchCriteria) {
    const result = await getCharacters({ nameStartsWith: searchCriteria, limit: 8 });
    return result.data.results;
  }
  return [];
};

export const getComicsSearchSuggestions = async (searchCriteria) => {
  if (searchCriteria) {
    const result = await getComics({ titleStartsWith: searchCriteria, limit: 8 });
    return result.data.results;
  }
  return [];
};

export const getSeriesSearchSuggestions = async (searchCriteria) => {
  if (searchCriteria) {
    const result = await getSeries({ nameStartsWith: searchCriteria, limit: 8 });
    return result.data.results;
  }
  return [];
};

export const getEventsSearchSuggestions = async (searchCriteria) => {
  if (searchCriteria) {
    const result = await getEvents({ nameStartsWith: searchCriteria, limit: 8 });
    return result.data.results;
  }
  return [];
};
