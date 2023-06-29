import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, clicked }) => {
  return (
    <li onClick={clicked} className={css.galleryItem}>
      <img className={css.image} src={url} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
};
