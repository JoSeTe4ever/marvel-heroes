import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { HeroCard } from '../hero-card/HeroCard';
import { getCharacterDetails } from "../../utils/api"
import { favouritesCharacters } from "../../state";
import './FavouritesCharacters.css';

export const FavouritesCharacters = () => {

    const favourites = useRecoilValue(favouritesCharacters);
    const [loaded, setLoaded] = useState(false);
    const [fullCharArray, setFullCharArray] = useState([]);

    useEffect(() => {
        const promisesArray = favourites.map(charId => getCharacterDetails(charId));
        Promise.all(promisesArray).then((values) => {
            setFullCharArray(values.map(e => e[0]).filter(Boolean));
            setLoaded(true);
        })
    }, [favourites]); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount 

    if (loaded && fullCharArray && fullCharArray.length > 0) {
        return (
            <div>
                <div className="favouritesContainer">
                    {fullCharArray.map((e) => {
                        return <HeroCard
                            heroDescription={e.description}
                            key={e.id.toString()}
                            heroName={e.name}
                            heroId={e.id.toString()}
                            imgUrl={e.thumbnail.url || `${e.thumbnail.path}.${e.thumbnail.extension}`}></HeroCard>
                    })}
                </div>
            </div>
        )
    } else {
        if (fullCharArray && fullCharArray && fullCharArray.length === 0)
            return <div className="notFound"><span className="verticalCenter">Not favourites yet</span></div>
        return <div className="notFound"><span className="verticalCenter">Loading ... {loaded.toString()}</span></div>
    }
}
