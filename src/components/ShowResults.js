import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShowResults extends React.Component {
  render() {
    const { searchResult } = this.props;
    return (
      searchResult.length > 1
        && searchResult.map((card) => (
          <div key={ card.collectionId }>
            <img src={ card.artworkUrl100 } alt={ card.collectionName } />
            <Link
              to={ `/album/${card.collectionId}` }
              data-testid={ `link-to-album-${card.collectionId}` }
            >
              { card.collectionName }
            </Link>
            {`R$: ${card.collectionPrice}`}
          </div>
        ))
    );
  }
}

ShowResults.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShowResults;
