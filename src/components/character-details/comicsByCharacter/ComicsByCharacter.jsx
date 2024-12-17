import React from 'react';
import { useHistory } from "react-router-dom";
import "./ComicsByCharacter.css";

/***
 * Comics by character.
 */
export const ComicsByCharacter = ({ comics }) => {
    const history = useHistory();
    return (
        <>
            <div className='comics__img-container'>
                {comics?.map((comic) => {
                    return (
                        <div className='comics__img-child-container' onClick={
                            () => {
                                history.push(`/comics/${comic.id}`);
                            }
                        }>
                            <img className='comic__img' src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                            <div>{comic.title}</div>
                        </div>
                    );
                })}
            </div>
        </>

    )
}