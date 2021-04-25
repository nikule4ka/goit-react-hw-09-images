import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ images, onClick }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
