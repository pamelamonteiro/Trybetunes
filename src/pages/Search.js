import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import SearchMessage from '../components/SearchMessage';
import ShowResults from '../components/ShowResults';

class Search extends React.Component {
  state = {
    isSearchBtnDisable: true,
    loadingSearch: false,
    searchNewBox: '',
    searchEndBox: '',
    searchResult: [],
    hasSearched: false,
  }

  handleChange = (event) => {
    this.setState({
      searchNewBox: event.target.value,
    }, this.validateSearch);
  }

  validateSearch = () => {
    const { searchNewBox } = this.state;
    const minLenght = 2;
    if (searchNewBox.length >= minLenght) {
      this.setState({
        isSearchBtnDisable: false,
      });
    } else {
      this.setState({
        isSearchBtnDisable: true,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchNewBox } = this.state;
    this.setState({
      loadingSearch: true,
      hasSearched: true,
    }, async () => {
      const fetchResult = await searchAlbumsAPI(searchNewBox);
      this.setState({
        searchResult: fetchResult,
        loadingSearch: false,
        searchEndBox: searchNewBox,
        searchNewBox: '',
      });
    });
  }

  render() {
    const {
      isSearchBtnDisable,
      loadingSearch,
      searchResult,
      searchEndBox,
      hasSearched,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loadingSearch ? <Loading />
            : (
              <div>
                <form>
                  <input
                    type="text"
                    data-testid="search-artist-input"
                    onChange={ this.handleChange }
                  />
                  <button
                    disabled={ isSearchBtnDisable }
                    type="submit"
                    data-testid="search-artist-button"
                    onClick={ this.handleSubmit }
                  >
                    Pesquisar
                  </button>
                </form>
                <SearchMessage
                  searchEndBox={ searchEndBox }
                  searchResult={ searchResult }
                  hasSearched={ hasSearched }
                />
                <ShowResults searchResult={ searchResult } />
              </div>
            )
        }
      </div>
    );
  }
}

export default Search;
