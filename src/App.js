import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import { fetchImages } from './services/pixabayApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
    });
  };

  getImages = () => {
    const { currentPage, searchQuery } = this.state;

    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then(({ hits, total }) => {
        console.log({ total, hits });
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          total,
          currentPage: prevState.currentPage + 1,
        }));
        this.ScrollTo();
      })
      .catch(error => toast.error('Oops, something wrong. Please, try again'))
      .finally(() => this.setState({ isLoading: false }));
  };

  ScrollTo() {
    if (this.state.currentPage !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  showImageModal = url => {
    // console.log(url);
    this.setState({ largeImage: url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, isLoading, showModal, largeImage, total } = this.state;

    const shouldLoadMoreBtn =
      images.length > 0 && images.length < total && !isLoading;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery images={images} onClick={this.showImageModal} />

        {isLoading && <Loader />}

        {shouldLoadMoreBtn && <Button onClick={this.getImages} />}

        <ToastContainer autoClose={2000} />

        {showModal && <Modal onClose={this.toggleModal} url={largeImage} />}
      </div>
    );
  }
}

export default App;
