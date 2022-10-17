import React from 'react';
import PropTypes from 'prop-types';

class SearchMessage extends React.Component {
  render() {
    const { searchEndBox, searchResult, hasSearched } = this.props;
    if (hasSearched) {
      if (searchResult.length > 0) {
        return <h2>{`Resultado de álbuns de: ${searchEndBox}`}</h2>;
      }
      return <h2>Nenhum álbum foi encontrado</h2>;
    }
    return '';
  }
}

SearchMessage.propTypes = {
  searchEndBox: PropTypes.string.isRequired,
  searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasSearched: PropTypes.bool.isRequired,
};

export default SearchMessage;
