import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  getCreatorDetails, 
  getComicsByCreatorId, 
  getVolumesByCreatorId, 
  getStoryArcsByCreatorId 
} from '../../utils/api';
import './CreatorDetail.css';

function TabCard({ item, type }) {
  const imageUrl = item.thumbnail?.url || item.image?.medium_url || '/img/1920px-MarvelLogo.svg.jpg';
  const title = item.name || item.volume?.name || 'Unknown';
  
  return (
    <article className="detail-tab-card">
      <div className="detail-tab-card__img-wrapper">
        <img 
          className="detail-tab-card__img" 
          src={imageUrl} 
          alt={title}
          loading="lazy"
        />
      </div>
      <h3 className="detail-tab-card__title">{title}</h3>
    </article>
  );
}

// Helper to safely extract date string from API response
function formatDate(dateValue) {
  if (!dateValue) return null;
  if (typeof dateValue === 'string') return dateValue;
  if (typeof dateValue === 'object' && dateValue.date) return dateValue.date;
  return null;
}

function CreatorDetail() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [comics, setComics] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [storyArcs, setStoryArcs] = useState([]);
  const [activeTab, setActiveTab] = useState('comics');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const detailsRes = await getCreatorDetails(id);
        const creatorData = detailsRes.data.results[0];
        setCreator(creatorData);

        // Fetch related content
        const [comicsRes, volumesRes, arcsRes] = await Promise.all([
          getComicsByCreatorId(id),
          getVolumesByCreatorId(id),
          getStoryArcsByCreatorId(id),
        ]);

        setComics(comicsRes.data.results || []);
        setVolumes(volumesRes.data.results || []);
        setStoryArcs(arcsRes.data.results || []);
      } catch (error) {
        console.error('Error fetching creator details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="creator-detail-loading">
        <div className="creator-detail-loading__spinner" />
        <p className="creator-detail-loading__text">LOADING CREATOR...</p>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="creator-detail-error">
        <p>Creator not found</p>
      </div>
    );
  }

  const bgImage = creator.image?.medium_url || '/img/1920px-MarvelLogo.svg.jpg';
  const portrait = creator.image?.small_url || bgImage;

  const birthDate = formatDate(creator.birth);
  const deathDate = formatDate(creator.death);

  const renderTabContent = () => {
    if (activeTab === 'comics') {
      return comics.length > 0 ? (
        <div className="detail-tab-grid">
          {comics.map(c => <TabCard key={c.id} item={c} type="comic" />)}
        </div>
      ) : <p className="detail-tab-empty">No comics found.</p>;
    }
    
    if (activeTab === 'volumes') {
      return volumes.length > 0 ? (
        <div className="detail-tab-grid">
          {volumes.map(v => <TabCard key={v.id} item={v} type="volume" />)}
        </div>
      ) : <p className="detail-tab-empty">No volumes found.</p>;
    }
    
    if (activeTab === 'arcs') {
      return storyArcs.length > 0 ? (
        <div className="detail-tab-grid">
          {storyArcs.map(a => <TabCard key={a.id} item={a} type="arc" />)}
        </div>
      ) : <p className="detail-tab-empty">No story arcs found.</p>;
    }
  };

  return (
    <div className="creator-detail">
      {/* Hero banner */}
      <section className="creator-detail-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="creator-detail-hero__overlay" />
        <div className="creator-detail-hero__content">
          <div className="creator-detail-hero__portrait-wrapper">
            <img 
              className="creator-detail-hero__portrait" 
              src={portrait} 
              alt={creator.name}
            />
          </div>
          <div className="creator-detail-hero__info">
            <h1 className="creator-detail-hero__name">{creator.name}</h1>
            {creator.deck && (
              <p className="creator-detail-hero__desc">{creator.deck}</p>
            )}
            {/* Metadata row */}
            <div className="creator-detail-hero__meta">
              {birthDate && <span><strong>Born:</strong> {birthDate}</span>}
              {deathDate && <span><strong>Died:</strong> {deathDate}</span>}
              {creator.hometown && <span><strong>Hometown:</strong> {creator.hometown}</span>}
              {creator.country && <span><strong>Country:</strong> {creator.country}</span>}
              {creator.gender && <span><strong>Gender:</strong> {creator.gender === 1 ? 'Male' : creator.gender === 2 ? 'Female' : 'Other'}</span>}
              {creator.count_of_issue_appearances > 0 && (
                <span><strong>Issues:</strong> {creator.count_of_issue_appearances}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky tabs */}
      <nav className="creator-detail-tabs">
        <button
          className={`creator-detail-tabs__btn ${activeTab === 'comics' ? 'creator-detail-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('comics')}
        >
          Comics {comics.length > 0 && `(${comics.length})`}
        </button>
        <button
          className={`creator-detail-tabs__btn ${activeTab === 'volumes' ? 'creator-detail-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('volumes')}
        >
          Volumes {volumes.length > 0 && `(${volumes.length})`}
        </button>
        <button
          className={`creator-detail-tabs__btn ${activeTab === 'arcs' ? 'creator-detail-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('arcs')}
        >
          Story Arcs {storyArcs.length > 0 && `(${storyArcs.length})`}
        </button>
      </nav>

      {/* Tab content */}
      <section className="creator-detail-content">
        {renderTabContent()}
      </section>
    </div>
  );
}

export default CreatorDetail;
