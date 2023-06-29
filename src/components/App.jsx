import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Component } from 'react';
import { getPictures } from './services/api.js';
import css from './App.module.css';

class App extends Component {
  state = {
    pictures: [],
    searchedPhrase: '',
    isLoading: false,
    isModalOpen: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchedPhrase !== this.state.searchedPhrase ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });

        const pictures = await getPictures(
          this.state.searchedPhrase,
          this.state.page
        );

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = event => {
    event.preventDefault();
    this.setState({
      pictures: [],
      page: 1,
      searchedPhrase: event.target[1].value,
    });
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  openModal = event => {
    const clickedPicture = this.state.pictures.find(
      picture => picture.webformatURL === event.target.src
    );
    this.setState({
      isModalOpen: true,
      pathForModal: clickedPicture.largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery>
          {this.state.pictures.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              url={picture.webformatURL}
              clicked={this.openModal}
            />
          ))}
        </ImageGallery>

        {this.state.pictures.length !== 0 && <Button clicked={this.loadMore} />}

        {this.state.isLoading && <Loader />}

        {this.state.isModalOpen && (
          <Modal src={this.state.pathForModal} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
