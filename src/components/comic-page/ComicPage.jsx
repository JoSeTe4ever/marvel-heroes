import React from 'react'
import './ComicPage.css'

export const ComicPage = () => {
    return (
        <div className="comic__container">
            <div className="row">
                <div className="row__strip30">
                    <div className="strip__mask">
                        <img src="img/spiderman.jpeg" alt="comic" className="strip__img"/>
                    </div>
                    <div class="strip__info">
                       characters
                    </div>
                </div>
                <div className="row__strip70">
                </div>
            </div>
            <div className="row">
                <div className="row__strip70">
                </div>
                <div className="row__strip30">
                </div>
            </div>
            <div className="row">
                <div className="row__strip30">
                </div>
                <div className="row__strip70">
                </div>
            </div>
        </div>
    )
}
