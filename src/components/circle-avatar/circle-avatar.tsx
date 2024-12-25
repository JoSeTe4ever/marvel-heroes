import React from 'react';
import { MarvelObjectType } from '../../models/marvelObjectType';
import './circle-avatar.css';


interface CircleAvatarProps {
    marvelResponseObject: {
        thumbnail: {
            path: string;
            extension: string;
        };
    };
    type: MarvelObjectType;
}

const CircleAvatar: React.FC<CircleAvatarProps> = ({ marvelResponseObject, type }) => {
    const borderColor = {
        [MarvelObjectType.Character]: 'infinity-stone-space',
        [MarvelObjectType.Story]: 'infinity-stone-time',
        [MarvelObjectType.Creator]: 'infinity-stone-reality',
        [MarvelObjectType.Event]: 'infinity-stone-mind',
        [MarvelObjectType.Comic]: 'infinity-stone-soul',
        [MarvelObjectType.Serie]: 'infinity-stone-power',
    }[type];

    return (
        <div
            className="circle-avatar"
            style={{
                borderColor: `var(--${borderColor})`,
                borderStyle: 'solid',
                borderWidth: '5px',
                borderRadius: '50%',
                overflow: 'hidden',
                width: '150px',
                height: '150px',
                position: 'fixed',
            }}
        >
            <img
                src={`${marvelResponseObject.thumbnail.path}.${marvelResponseObject.thumbnail.extension}`}
                alt="Marvel Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
};

export default CircleAvatar;