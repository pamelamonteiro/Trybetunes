import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    const { favoriteSongsList } = props;
    const loadingList = favoriteSongsList.map((song) => String(song));
    this.state = {
      isLoading: false,
      favoritedSongs: loadingList,
    };
  }

  isChecked = (trackId) => {
    const { favoritedSongs } = this.state;
    console.log(favoritedSongs);
    const teste = favoritedSongs.find((song) => String(song) === String(trackId));
    return teste;
  }

  handleInputChange = ({ target }) => {
    const { albumData } = this.props;
    const clickedSong = albumData
      .find((song) => String(song.trackId) === target.value);
    if (target.checked === false) {
      return this.handleRemoveSong(clickedSong);
    }
    return this.handleAddSong(clickedSong);
  }

  handleAddSong = (clickedSong) => {
    this.setState({
      isLoading: true,
    }, async () => {
      await addSong(clickedSong);
      this.setState((prevState) => ({
        isLoading: false,
        favoritedSongs: [clickedSong.trackId, ...prevState.favoritedSongs],
      }));
    });
  }

  handleRemoveSong = (clickedSong) => {
    this.setState({
      isLoading: true,
    }, async () => {
      await removeSong(clickedSong);
      this.setState((prevState) => ({
        isLoading: false,
        favoritedSongs: [prevState.favoritedSongs
          .filter((song) => song !== clickedSong.trackId)],
      }));
    });
  }

  render() {
    const { trackId, trackName } = this.props;
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src="{previewUrl}" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            label="Favorita"
            value={ trackId }
            checked={ this.isChecked(trackId) }
            onChange={ this.handleInputChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumData: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteSongsList: PropTypes.arrayOf(PropTypes.number).isRequired,
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
