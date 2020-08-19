import { default as React, useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { searchTextState } from "../../state";
import { initCharacters } from '../../utils/api';
import HeroCard from '../hero-card/HeroCard';

export const Home = () => {
    //the callback for the useState is the initialState
    //TODO remove any and type it with Hero.
    const [characters, setCharacters] = useState<any[]>([]);
    const observerdText = useRecoilValue(searchTextState);

    useEffect(() => {
        initCharacters(setCharacters);
    }, [observerdText]); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount 


    return (
        <div>
            {characters.map(e => {
                return <HeroCard
                    heroDescription={e.description}
                    key={e.id.toString()}
                    heroName={e.name}
                    imgUrl={`${e.thumbnail.path}.${e.thumbnail.extension}`}></HeroCard>
            })}
        </div>
    )
}