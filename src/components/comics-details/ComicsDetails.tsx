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
        id?: number;
        thumbnail: {
            path: string;
            extension: string;
            url?: string;
        };
        title: string;
        name?: string;
        description: string;
        characters?: { available?: number };
        stories?: { available?: number };
        events?: { available?: number };
        siteDetailUrl?: string;
        resourceURI?: string;
    }

    const [comicDetails, setComicDetails] = useState<ComicDetails | undefined>(undefined);
    const [charactersByComic, setCharactersByComic] = useState<any[]>([]);
    const [eventsByComic, setEventsByComic] = useState<any[]>([]);
    const [seriesByComic] = useState<any[]>([]);
    const [storiesByComic, setStoriesByComic] = useState<any[]>([]);

    // Use useParams to get the id from the URL if it's defined in the route
    const { id: paramId } = useParams<{ id: string }>();

    // Check if the id is defined in props.match.params or extract it from the URL
    const id = props.match?.params?.id || paramId || window.location.pathname.split('/').pop();

    const handleTabClick = (tabIdString: string) => {
        setActiveTab(tabIdString);
    };

    const getImageUrl = (item: any) => {
        return item?.thumbnail?.url || `${item?.thumbnail?.path}.${item?.thumbnail?.extension}`;
    };

    const relatedPanels: { [key: string]: any[] } = {
        characters: charactersByComic,
        events: eventsByComic,
        series: seriesByComic,
        stories: storiesByComic,
    };

    const tabs = [
        { id: 'characters', label: 'Characters', items: charactersByComic },
        { id: 'events', label: 'Events', items: eventsByComic },
        { id: 'series', label: 'Series', items: seriesByComic },
        { id: 'stories', label: 'Stories', items: storiesByComic },
    ];

    const activeItems = relatedPanels[activeTab] || [];
    const comicImageUrl = getImageUrl(comicDetails);

    useEffect(() => {

        getComicDetails(id)
            .then((details) => {
                if (details && details.data && Array.isArray(details.data.results) && details.data.results.length > 0) {
                    setComicDetails(details.data.results[0]);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });

        getCharactersByComicId(id).then((characterDetails) => {
            if (characterDetails && characterDetails.data && Array.isArray(characterDetails.data.results) && characterDetails.data.results.length > 0) {
                setCharactersByComic(characterDetails.data.results);
            }
        });

        getEventsByComicId(id).then((eventDetails) => {
            if (eventDetails && eventDetails.data && Array.isArray(eventDetails.data.results) && eventDetails.data.results.length > 0) {
                setEventsByComic(eventDetails.data.results);
            }
        });

        getStoriesByComicId(id).then((storiesDetails) => {
            if (storiesDetails && storiesDetails.data && Array.isArray(storiesDetails.data.results) && storiesDetails.data.results.length > 0) {
                setStoriesByComic(storiesDetails.data.results);
            }

            
        });
    }, [id]);

    return (
        <main className="comic-detail-page">
            {isLoading ? (
                <div className="comic-detail-loader">
                    <Loading />
                    <span>Loading secret issue...</span>
                </div>
            ) : !comicDetails ? (
                <div className="comic-detail-notfound"><span>Comic not found</span></div>
            ) : (
                <div className="comicDetailsContainer">
                    <div className="comicDetails__left" style={{ backgroundImage: `url(${comicImageUrl})` }}>
                        <span className="comicDetails__stamp">Collector File</span>
                        <img
                            src={comicImageUrl}
                            alt={comicDetails?.title}
                            className="comicDetails__image"
                        />
                    </div>
                    <div className="comicDetails__right">
                        <p className="comicDetails__eyebrow">Issue dossier</p>
                        <h1 className="comicDetails__title">{comicDetails?.title}</h1>
                        <p className="comicDetails__description">{comicDetails?.description || 'No classified notes available for this comic.'}</p>

                        <div className="comicDetails__stats" aria-label="Comic related content summary">
                            <span><strong>{charactersByComic.length}</strong> Characters</span>
                            <span><strong>{storiesByComic.length}</strong> Story arcs</span>
                            <span><strong>{eventsByComic.length}</strong> Events</span>
                        </div>

                        <div className="comicDetails__navigation" role="tablist" aria-label="Comic details sections">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`comicDetails__tab ${activeTab === tab.id ? 'comicDetails__tab--active' : ''}`}
                                    onClick={() => handleTabClick(tab.id)}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === tab.id}
                                >
                                    {tab.label}
                                    <span>{tab.items.length}</span>
                                </button>
                            ))}
                        </div>

                        <section className="comicDetails__content" aria-live="polite">
                            {activeItems.length > 0 ? (
                                <div className="comicDetails__grid">
                                    {activeItems.map((item, index) => (
                                        <article className="comicDetails__panel" key={`${activeTab}-${item.id || index}`}>
                                            {item.thumbnail ? (
                                                <img src={getImageUrl(item)} alt={item.name || item.title} />
                                            ) : null}
                                            <div>
                                                <span>{activeTab}</span>
                                                <h2>{item.name || item.title || 'Untitled file'}</h2>
                                                {item.description ? <p>{item.description}</p> : null}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="comicDetails__empty">No {activeTab} registered for this issue.</div>
                            )}
                        </section>

                    </div>
                </div>
            )}
        </main>
    );
};
