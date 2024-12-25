import React from "react";
import "./image-carousel.css";
import {
  getMarvelObjectType,
  MarvelObjectType,
} from "../../models/marvelObjectType";
import { useHistory } from "react-router-dom";

interface ImageCarouselProps {
  marvelObjects: any[];
  type?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  marvelObjects,
  type = "",
}) => {
  const history = useHistory();
  let marvelType = getMarvelObjectType(type);
  let images = marvelObjects.map((marvelObject: any) => {
    return {
      src: `${marvelObject.thumbnail.path}.${marvelObject.thumbnail.extension}`,
    };
  });

  const _navigateAction = (index: number) => {
    if (marvelType === "infinity-stone-space") {
      history.push(`/characters/${marvelObjects[index].id}`);
    }
  };

  return (
    <div className="slider">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={`Slide ${index}`}
          onClick={() => _navigateAction(index)}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
