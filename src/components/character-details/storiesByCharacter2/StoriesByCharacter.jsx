import React from 'react'
import './StoriesByCharacter.css';

export const StoriesByCharacter = ({ stories }) => {
  return (
    <div className="stories-container">
      {stories && stories.length > 0 ? (
        <ul className="stories-list">
          {stories.map((story, index) => (
            <li key={index} className="story-item">
              <h3 className="story-name">{story.title}</h3>
              <p className="story-type">
                <strong>Type:</strong> {story.type || "Unknown"}
              </p>
              <p className="story-type">
                {story.description || "Unknown"}
              </p>
              <a
                href={story.resourceURI}
                target="_blank"
                rel="noopener noreferrer"
                className="story-link"
              >
                View Details
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-stories">No stories available.</p>
      )}
    </div>
  );
}