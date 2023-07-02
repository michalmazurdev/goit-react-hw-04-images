import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { getPictures } from './services/api.js';
import css from './App.module.css';

export const App = () => {
  // state = {
  //   pictures: [],
  //   searchedPhrase: '',
  //   isLoading: false,
  //   isModalOpen: false,
  // };
  const [pictures, setPictures] = useState([]);
  const [searchedPhrase, setSearchedPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pathForModal, setPathForModal] = useState('');

  useEffect(() => {
    try {
      // this.setState({ isLoading: true });
      setIsLoading(true);
      // const newPictures = await getPictures(searchedPhrase,page);

      // this.setState(prevState => ({
      //   pictures: [...prevState.pictures, ...newPictures],
      // }));
      if (searchedPhrase === '') {
        return;
      }
      getPictures(searchedPhrase, page).then(newPictures =>
        setPictures(pictures => [...pictures, ...newPictures])
      );
    } catch (error) {
      // this.setState({ error });
      alert(`An error occured. See details ${error}`);
    } finally {
      // this.setState({ isLoading: false });
      setIsLoading(false);
    }
  }, [searchedPhrase, page]);

  // async componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.searchedPhrase !== this.state.searchedPhrase ||
  //     prevState.page !== this.state.page
  //   ) {
  //     try {
  //       this.setState({ isLoading: true });

  //       const pictures = await getPictures(
  //         this.state.searchedPhrase,
  //         this.state.page
  //       );

  //       this.setState(prevState => ({
  //         pictures: [...prevState.pictures, ...pictures],
  //       }));
  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  const handleSearch = event => {
    event.preventDefault();
    // this.setState({
    //   pictures: [],
    //   page: 1,
    //   searchedPhrase: event.target[1].value,
    // });

    setPictures([]);
    setPage(1);
    setSearchedPhrase(event.target[1].value);
  };

  const loadMore = () => {
    // this.setState({ page: this.state.page + 1 });
    setPage(page + 1);
  };

  const openModal = event => {
    const clickedPicture = pictures.find(
      picture => picture.webformatURL === event.target.src
    );
    // this.setState({
    //   isModalOpen: true,
    //   pathForModal: clickedPicture.largeImageURL,
    // });
    setIsModalOpen(true);
    setPathForModal(clickedPicture.largeImageURL);
  };

  const closeModal = () => {
    // this.setState({ isModalOpen: false });
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

      {isLoading && <Loader />}

      {isModalOpen && <Modal src={pathForModal} onClose={closeModal} />}
    </div>
  );
};

// export default App;

// class App extends Component {
//   state = {
//     pictures: [],
//     searchedPhrase: '',
//     isLoading: false,
//     isModalOpen: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.searchedPhrase !== this.state.searchedPhrase ||
//       prevState.page !== this.state.page
//     ) {
//       try {
//         this.setState({ isLoading: true });

//         const pictures = await getPictures(
//           this.state.searchedPhrase,
//           this.state.page
//         );

//         this.setState(prevState => ({
//           pictures: [...prevState.pictures, ...pictures],
//         }));
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   handleSearch = event => {
//     event.preventDefault();
//     this.setState({
//       pictures: [],
//       page: 1,
//       searchedPhrase: event.target[1].value,
//     });
//   };

//   loadMore = () => {
//     this.setState({ page: this.state.page + 1 });
//   };

//   openModal = event => {
//     const clickedPicture = this.state.pictures.find(
//       picture => picture.webformatURL === event.target.src
//     );
//     this.setState({
//       isModalOpen: true,
//       pathForModal: clickedPicture.largeImageURL,
//     });
//   };

//   closeModal = () => {
//     this.setState({ isModalOpen: false });
//   };
//   render() {
//     return (
//       <div className={css.app}>
//         <Searchbar onSubmit={this.handleSearch} />
//         <ImageGallery>
//           {this.state.pictures.map(picture => (
//             <ImageGalleryItem
//               key={picture.id}
//               url={picture.webformatURL}
//               clicked={this.openModal}
//             />
//           ))}
//         </ImageGallery>

//         {this.state.pictures.length !== 0 && <Button clicked={this.loadMore} />}

//         {this.state.isLoading && <Loader />}

//         {this.state.isModalOpen && (
//           <Modal src={this.state.pathForModal} onClose={this.closeModal} />
//         )}
//       </div>
//     );
//   }
// }
