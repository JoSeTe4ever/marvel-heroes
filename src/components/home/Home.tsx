import { default as React, useEffect, useState } from 'react';
import { initCharacters } from '../../utils/api';
import HeroCard from '../hero-card/HeroCard';
import './Home.css';

export const Home = () => {
    //the callback for the useState is the initialState
    //TODO remove any and type it with Hero.
    const [characters, setCharacters] = useState<any[]>([]);
    
    useEffect(() => {
        initCharacters(setCharacters);
    }, []); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount 


    return (
        <div className="home">
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