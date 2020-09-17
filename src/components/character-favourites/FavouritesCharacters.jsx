import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { HeroCard } from '../hero-card/HeroCard';
import { url, apiKey } from "../../utils/api"
import { favouritesCharacters } from "../../state";

export const FavouritesCharacters = () => {

    const favourites = useRecoilValue(favouritesCharacters);
    const [loaded, setLoaded] = useState(false);
    const [fullCharArray, setFullCharArray] = useState([]);
    const promisesArray = [];

    useEffect(() => {
        debugger;
        favourites.map(charId => {
            
            promisesArray.push(fetch(`${url}/characters/${charId}?apikey=${apiKey}`).then(result => {
                const obtained = result.json();
                return obtained;
            }));
        });
        Promise.all(promisesArray).then((values) => {
            setFullCharArray(values.map(e => e.data.results[0]));
            setLoaded(true);
        })
    }, []); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount 

    if (loaded && fullCharArray && fullCharArray.length > 0) {
        return (
            <div>
                <div className="home">
                    {fullCharArray.map((e) => {
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
        if (fullCharArray && fullCharArray && fullCharArray.length === 0)
            return <div className="notFound"><span className="verticalCenter">Not favourites yet</span></div>
        return <div className="notFound"><span className="verticalCenter">Loading ... {loaded.toString()}</span></div>
    }
}