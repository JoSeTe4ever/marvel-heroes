import React from 'react'
import './ComicPage.css'

export const ComicPage = () => {
    return (
        <div className="comic__container">
            <div className="row">
                <div className="row__strip30">
                    <div className="strip__mask">
                        <img src="img/spiderman.jpeg" alt="characters" className="strip__img" />
                    </div>
                    <div class="strip__info strip__info-character-position-new">
                        characters
                    </div>
                </div>
                <div className="row__strip70">
                    <div className="strip__mask">
                        <img src="img/avengers.jpg" alt="stories" className="strip__img"></img>
                    </div>
                    <div class="strip__info strip__info-character-position">
                        stories
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="row__strip70">
                    <div className="strip__mask">
                        <img src="img/avengers-infinity-war-how-this-story-ended-in-the-infinity-gauntlet-comics-story.webp" alt="events" className="strip__img" />
                    </div>
                    <div class="strip__info strip__info-character-position">
                        series
                    </div>
                </div>
                <div className="row__strip30">
                    <div className="strip__mask">
                    <img src="img/marvelCreator.avif" alt="characters" className="strip__img" />
                    </div>
                    <div class="strip__info strip__info-character-position">
                        creators
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="row__strip30">
                <div className="strip__mask">
                    <img src="img/marvelEvents.avif" alt="characters" className="strip__img" />
                    </div>
                    <div class="strip__info strip__info-character-position">
                        events
                    </div>
                </div>
                <div className="row__strip70">
                <div className="strip__mask">
                    <img src="img/marvelComics.jpg" alt="characters" className="strip__img" />
                    </div>
                    <div class="strip__info strip__info-character-position">
                        comics
                    </div>
                </div>
            </div>
        </div>
    )
}
