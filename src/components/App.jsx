import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState, useEffect } from 'react';
import { getPictures } from './services/api.js';
import css from './App.module.css';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [searchedPhrase, setSearchedPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pathForModal, setPathForModal] = useState('');

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        if (searchedPhrase === '') {
          return;
        }
        setIsLoading(true);
        const newPictures = await getPictures(searchedPhrase, page);
        setPictures(pictures => [...pictures, ...newPictures]);
      } catch (error) {
        alert(`An error occured. See details ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    asyncFunction();
  }, [searchedPhrase, page]);

  const handleSearch = event => {
    event.preventDefault();
    setPictures([]);
    setPage(1);
    setSearchedPhrase(event.target[1].value);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = event => {
    const clickedPicture = pictures.find(
      picture => picture.webformatURL === event.target.src
    );
    setIsModalOpen(true);
    setPathForModal(clickedPicture.largeImageURL);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery>
        {pictures.map(picture => (
          <ImageGalleryItem
            key={picture.id}
            url={picture.webformatURL}
            clicked={openModal}
          />
        ))}
      </ImageGallery>

      {pictures.length !== 0 && <Button clicked={loadMore} />}

      {isLoading === true && <Loader />}

      {isModalOpen && <Modal src={pathForModal} onClose={closeModal} />}
    </div>
  );
};
