import { default as React, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { displayedCharacters, copyrightInfo, pagination } from '../../state';
import { HeroCard } from '../hero-card/HeroCard';
import Paginator from "../paginator/Paginator"
import './Home.css';
import { initInfo } from '../../utils/api';

export const Home = () => {

    const [characters, setCharacters] = useRecoilState(displayedCharacters);
    const [copyright, setCopyright] = useRecoilState(copyrightInfo);
    const paginationInfo = useRecoilValue(pagination);

    useEffect(() => {
        initInfo(setCharacters, setCopyright);
    }, []); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount 

    if (characters && characters.length > 0) {
        return (
            <div>
                <Paginator data={characters} paginationInfo={paginationInfo}></Paginator>
                <div className="home">
                    {characters.map((e: any) => {
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