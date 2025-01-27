import React, { useEffect, useState } from "react";
import { getStories } from "../../utils/api";
import { Loading } from "../loading/Loading";
import { StoriesByCharacter } from "../character-details/storiesByCharacter2/StoriesByCharacter";
import "./Stories.css";

function StorieCard(props) {
  return (
    <div>
      <div className="storie__container">
        <div className="storie__image">
          <img src={props.imgUrl} alt={props.storieName}></img>
        </div>
        <div className="storie__name">{props.storieName}</div>
      </div>
    </div>
  );
}

function Stories() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getStories();
      const storiesArray = response.data.results;
      setIsLoading(false);
      setStories(storiesArray);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <div className="stories__container full-screen">
      {isLoading ? <Loading></Loading> :
        <StoriesByCharacter
          stories={stories}
        ></StoriesByCharacter>}

    </div>
  );
}

export default Stories;
