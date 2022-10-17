import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albumData: [],
    favoriteSongsList: [],
  }

  componentDidMount = async () => {
    const { location: { pathname } } = this.props;
    const getId = pathname.split('/')[2];
    const albumData = await getMusics(getId);
    const favoriteSongsList = await getFavoriteSongs();
    this.setState({
      albumData,
      favoriteSongsList: favoriteSongsList.map((song) => song.trackId),
    });
  }

  render() {
    const { albumData, favoriteSongsList } = this.state;
    console.log(albumData);
    return (
      <div data-testid="page-album">
        <Header />
        { albumData.length > 0
        && (
          <div>
            <img
              src={ albumData[0].artworkUrl100 }
              alt={ albumData[0].collectionName }
              data-testid="artist-image"
            />
            <h2 data-testid="album-name">{ albumData[0].collectionName }</h2>
            <h3 data-testid="artist-name">{ albumData[0].artistName }</h3>
            { albumData
              .filter((music, index) => index !== 0)
              .map(({ trackId, trackName }, music) => (
                <MusicCard
                  key={ String(music) }
                  albumData={ albumData }
                  favoriteSongsList={ favoriteSongsList }
                  trackId={ String(trackId) }
                  trackName={ String(trackName) }
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;

export default Album;
