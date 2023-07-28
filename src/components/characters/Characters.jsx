import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { copyrightInfo, displayedCharacters, pagination } from '../../state';
import Paginator from "../paginator/Paginator";
import { HeroCard } from "../hero-card/HeroCard";

import './Characters.css';

function Characters() {

    const [characters, setCharacters] = useRecoilState(displayedCharacters);
    const [copyright, setCopyright] = useRecoilState(copyrightInfo);
    const paginationInfo = useRecoilValue(pagination);

    return (
        <>
            <Paginator data={characters} paginationInfo={paginationInfo}></Paginator>
            <div>
                {characters.map((e) => {
                    return <HeroCard
                        heroDescription={e.description}
                        key={e.id.toString()}
                        heroName={e.name}
                        heroId={e.id.toString()}
                        imgUrl={`${e.thumbnail.path}.${e.thumbnail.extension}`}></HeroCard>
                })}
            </div>
        </>
    )
}

export default Characters