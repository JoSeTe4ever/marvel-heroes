import React, { useEffect } from 'react';
import { initInfo } from '../../utils/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { copyrightInfo, displayedCharacters, pagination } from '../../state';
import Paginator from "../paginator/Paginator";
import { HeroCard } from "../hero-card/HeroCard";

import './Characters.css';

function Characters() {

    const [characters, setCharacters] = useRecoilState(displayedCharacters);
    const [copyright, setCopyright] = useRecoilState(copyrightInfo);
    const paginationInfo = useRecoilValue(pagination);

    useEffect(() => {
        initInfo(setCharacters, setCopyright);
    }, []); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount 

    if (characters && characters.length > 0) {
        return (
            <div className='characters__container'>
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
            </div>
        )
    } else {
        return <div className="notFound"><span className="verticalCenter">Not found</span></div>
    }

}

export default Characters