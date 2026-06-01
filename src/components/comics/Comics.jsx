import React, { useEffect, useState } from "react";
import { getComics } from "../../utils/api";
import { Loading } from "../loading/Loading";
import { useHistory } from "react-router-dom";

import "./Comics.css";

function ComicCard(props) {

  const history = useHistory();

  return (
    <article className="comic-card" tabIndex="0" onClick={
      () => {
        history.push(`/comics/${props.comicId}`);
      }
    } onKeyDown={(event) => {
      if (event.key === "Enter") {
        history.push(`/comics/${props.comicId}`);
      }
    }}>
      <span className="comic-card__burst">BAM!</span>
      <div className="comic-card__image-wrap">
        <img className="comic-card__image" src={props.imgUrl} alt={props.comicName}></img>
        <div className="comic-card__halftone"></div>
      </div>
      <div className="comic-card__body">
        <span className="comic-card__label">Issue file</span>
        <h2 className="comic-card__title">{props.comicName}</h2>
      </div>
    </article>
  );
}

function Comics() {
  //component state comics
  const limit = 20; // Number of items to fetch per API call
  const [offset, setOffset] = useState(0);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await getComics({ offset, limit });
        const comicsArray = response.data.results;
        setComics([...comics, ...comicsArray]);
      } catch (error) {
        setComics([]);
      } finally {
        setIsLoading(false);
      }
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
    <main className="comics-page">
      <section className="comics-hero">
        <div className="comics-hero__dots"></div>
        <div className="comics-hero__blast"></div>
        <p className="comics-hero__kicker">Comic Vine Archives</p>
        <h1 className="comics-hero__title">
          <span>Marvel</span>
          <strong>Comics</strong>
        </h1>
        <p className="comics-hero__subtitle">Portadas, tinta, grapas y caos superheroico</p>
      </section>

      <section className="comics-rack" aria-label="Comics list">
        {comics.map((e, index) => {
          return (
            <ComicCard
              comicId={e.id}
              comicName={e.title}
              key={`${e.id}-${index}`}
              imgUrl={e.thumbnail.url || `${e.thumbnail.path}.${e.thumbnail.extension}`}
            ></ComicCard>
          );
        })}

        {isLoading ? (
          <div className="comics-loader">
            <Loading></Loading>
            <span>Loading panels...</span>
          </div>
        ) : null}

        {!isLoading && comics.length === 0 ? (
          <div className="comics-empty">No comics found in this multiverse.</div>
        ) : null}
      </section>
    </main>
  );
}

export default Comics;
