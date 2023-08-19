import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { copyrightInfo, pagination } from "../../state";
import { getCharacters } from "../../utils/api";
import { HeroCard } from "../hero-card/HeroCard";
import { Loading } from "../loading/Loading";

import "./Characters.css";

function Characters() {
  const [offset, setOffset] = useState(0);
  const limit = 20; // Number of items to fetch per API call

  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [copyright, setCopyright] = useState(copyrightInfo);
  const paginationInfo = useRecoilValue(pagination);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getCharacters({ offset, limit });
      const charactersArray = response.data.results;
      setCharacters([...characters, ...charactersArray]);
      setIsLoading(false);
      setCopyright({
        copyright: response.copyright,
        attributionText: response.attributionText,
        attributionHTML: response.attributionHTML,
      });
    }
    fetchData();
  }, [offset]); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount

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
      <div className="characters__container">
        {isLoading ? <Loading></Loading> : null}

        {!isLoading && characters.length === 0 ? (
          <div className="notFound">
            <span className="verticalCenter">Not found</span>
          </div>
        ) : null}

        {characters.map((e) => {
          return (
            <HeroCard
              heroDescription={e.description}
              key={e.id.toString()}
              heroName={e.name}
              heroId={e.id.toString()}
              imgUrl={`${e.thumbnail.path}.${e.thumbnail.extension}`}
            ></HeroCard>
          );
        })}
      </div>
    </>
  );
}

export default Characters;
