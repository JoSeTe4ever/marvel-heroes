import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getCharactersByComicId,
    getComicDetails,
    getEventsByComicId, getStoriesByComicId
} from '../../utils/api';
import { Loading } from '../loading/Loading';

import './ComicsDetails.css';

interface ComicsDetailsProps {
    match?: {
        params?: {
            id?: string;
        };
    };
}

export const ComicsDetails = (props: ComicsDetailsProps) => {
    const [activeTab, setActiveTab] = useState('characters');
    const [isLoading, setIsLoading] = useState(true);
    interface ComicDetails {
        thumbnail: {
            path: string;
            extension: string;
        };
        title: string;
        description: string;
    }

    const [comicDetails, setComicDetails] = useState<ComicDetails | undefined>(undefined);
    const [charactersByComic, setCharactersByComic] = useState([]);
    const [eventsByComic, setEventsByComic] = useState([]);
    const [seriesByComic, setSeriesByComic] = useState([]);
    const [storiesByComic, setStoriesByComic] = useState([]);

    // Use useParams to get the id from the URL if it's defined in the route
    const { id: paramId } = useParams<{ id: string }>();

    // Check if the id is defined in props.match.params or extract it from the URL
    const id = props.match?.params?.id || paramId || window.location.pathname.split('/').pop();

    const handleTabClick = (tabIdString: string) => {
        setActiveTab(tabIdString);
    };

    useEffect(() => {
        getComicDetails(id).then((details) => {
            if (details && details.data && Array.isArray(details.data.results) && details.data.results.length > 0) {
                setComicDetails(details.data.results[0]);
                setIsLoading(false);
            }
        });

        getCharactersByComicId(id).then((characterDetails) => {
            if (characterDetails && characterDetails.length > 0) {
                setCharactersByComic(characterDetails);
            }
        });

        getEventsByComicId(id).then((eventDetails) => {
            if (eventDetails && eventDetails.length > 0) {
                setEventsByComic(eventDetails);
            }
        });

        getStoriesByComicId(id).then((storiesDetails) => {
            if (storiesDetails && storiesDetails.length > 0) {
                setStoriesByComic(storiesDetails);
            }
        });
    }, [id]);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="comicDetailsContainer">
                    <div className="comicDetails__left">
                        <img
                            src={`${comicDetails?.thumbnail?.path}.${comicDetails?.thumbnail?.extension}`}
                            alt={comicDetails?.title}
                            className="comicDetails__image"
                        />
                    </div>
                    <div className="comicDetails__right">
                        <span className="comicDetails__title">{comicDetails?.title}</span>
                        <span className="comicDetails__description">{comicDetails?.description}</span>
                        <ul className="comicDetails__navigation">
                            <li onClick={() => handleTabClick('characters')}>Characters</li>
                            <li onClick={() => handleTabClick('events')}>Events</li>
                            <li onClick={() => handleTabClick('series')}>Series</li>
                            <li onClick={() => handleTabClick('stories')}>Stories</li>
                        </ul>

                    </div>
                </div>
            )}
        </div>
    );
};
