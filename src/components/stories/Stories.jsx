import React, { useEffect, useState } from "react";
import { getStories } from "../../utils/api";

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
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getStories();
      const storiesArray = response.data.results;
      setStories(storiesArray);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <div className="stories__container">
      {stories.map((e) => {
        return (
          <StorieCard
            storieName={e.title}
            key={e.id.toString()}
            imgUrl={`${e.thumbnail?.path}.${e.thumbnail?.extension}`}
          ></StorieCard>
        );
      })}
    </div>
  );
}

export default Stories;
