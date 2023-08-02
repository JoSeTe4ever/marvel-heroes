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
  const [offset, setOffset] = useState(0);
  const limit = 20; // Number of items to fetch per API call
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getComics({ offset, limit });
      const comicsArray = response.data.results;
      setComics([...comics, ...comicsArray]);
      setIsLoading(false);
    }
    fetchData();
  }, [offset]); // Or [] if effect doesn't need props or state

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // Check if the user has reached the bottom of the page
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

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
