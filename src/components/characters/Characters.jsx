import React, { useEffect, useState } from "react";
import { getCharacters } from "../../utils/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { copyrightInfo, displayedCharacters, pagination } from "../../state";
import Paginator from "../paginator/Paginator";
import { HeroCard } from "../hero-card/HeroCard";
import { Loading } from "../loading/Loading";

import "./Characters.css";

function Characters() {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useRecoilState(displayedCharacters);
  const [copyright, setCopyright] = useRecoilState(copyrightInfo);
  const paginationInfo = useRecoilValue(pagination);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getCharacters();
      const charactersArray = response.data.results;
      setCharacters(charactersArray);
      setIsLoading(false);
      setCopyright({
        copyright: response.copyright,
        attributionText: response.attributionText,
        attributionHTML: response.attributionHTML,
      });
    }
    fetchData();
  }, []); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount

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
      <Paginator data={characters} paginationInfo={paginationInfo}></Paginator>
    </>
  );
}

export default Characters;
