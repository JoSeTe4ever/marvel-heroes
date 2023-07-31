import React, { useEffect, useState } from "react";
import { getComics } from "../../utils/api";
import { Loading } from "../loading/Loading";

import "./Comics.css";

function ComicCard(props) {
  return (
    <div className="comic__item">
      <div className="comic__image">
        <img src={props.imgUrl} alt={props.comicName}></img>
      </div>
      <div className="comic__name">{props.comicName}</div>
    </div>
  );
}

function Comics() {
  //component state comics
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getComics();
      const comicsArray = response.data.results;
      setComics(comicsArray);
      setIsLoading(false);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <>
      <div className="comics__container">
        {isLoading ? <Loading></Loading> : null}
        {comics.map((e) => {
          return (
            <ComicCard
              comicName={e.title}
              key={e.id.toString()}
              imgUrl={`${e.thumbnail.path}.${e.thumbnail.extension}`}
            ></ComicCard>
          );
        })}
      </div>
    </>
  );
}

export default Comics;
