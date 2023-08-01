// factory pattern that returns a search bar component JSX depending on a string passed in as an argument
// this is used to dynamically render the search bar component depending on the page the user is on
import React from "react";
import CharactersSearchBar from "./CharactersSearchBar/CharactersSearchBar";

const searchBarFactory = (type) => {
  switch (type) {
    case "characters":
      return <CharactersSearchBar />;
    case "comics":
      return <ComicsSearchBar />;
    case "events":
      return <CreatorsSearchBar />;
    case "creators":
      return <EventsSearchBar />;
    case "series":
      return <SeriesSearchBar />;
    case "stories":
      return <StoriesSearchBar />;
    default:
      return null; // implement generalist search bar component
  }
};
