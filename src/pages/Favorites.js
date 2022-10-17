import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
// import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    isLoading: true,
    favorites: [],
  }

  componentDidMount = async () => {
    getFavoriteSongs()
      .then((favoriteTracks) => {
        this.setState({
          favorites: favoriteTracks,
          isLoading: false,
        });
      });
  }

  handleRemoveSong = ({ target }) => {
    this.setState({
      isLoading: true,
    }, async () => {
      await removeSong(target);
      this.setState((prevState) => ({
        isLoading: false,
        favoritedSongs: [prevState.favoritedSongs
          .filter((song) => song !== target.trackId)],
      }));
    });
  }

  render() {
    const { isLoading, favorites } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        {console.log(favorites)}
        {/* <MusicCard /> */}
      </div>
    );
  }
}

// Favorites.propTypes = {
//   favoriteSongsList: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default Favorites;
