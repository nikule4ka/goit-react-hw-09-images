import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import { fetchImages } from './services/pixabayApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';

export default function App() {
  const [images, setimages] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [searchQuery, setsearchQuery] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [largeImage, setlargeImage] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;
    setisLoading(true);

    fetchImages({ searchQuery, currentPage })
      .then(({ hits, total }) => {
        setimages(prevImages => [...prevImages, ...hits]);
        // setTotal(total);

        if (currentPage !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => toast.error('Oops, something wrong. Please, try again'))
      .finally(() => setisLoading(false));
  }, [searchQuery, currentPage, total]);

  const onChangeQuery = query => {
    setsearchQuery(query);
    setcurrentPage(1);
    setimages([]);
  };

  const increasePage = () => {
    setcurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const showImageModal = url => {
    setlargeImage(url);
    toggleModal();
  };

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  const shouldLoadMoreBtn =
    images.length > 0 && images.length < total && !isLoading;

  return (
    <div className="App">
      <Searchbar onSubmit={onChangeQuery} />

      <ImageGallery images={images} onClick={showImageModal} />

      {isLoading && <Loader />}

      {shouldLoadMoreBtn && <Button onClick={increasePage} />}

      <ToastContainer autoClose={2000} />

      {showModal && <Modal onClose={toggleModal} url={largeImage} />}
    </div>
  );
}
