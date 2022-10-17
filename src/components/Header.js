import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    userName: '',
    loadingName: true,
  }

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    const getUserName = await getUser();
    this.setState({
      loadingName: false,
      userName: getUserName.name,
    });
  }

  render() {
    const { userName, loadingName } = this.state;
    return (
      <header data-testid="header-component">
        { loadingName ? <Loading /> : (
          <h2 data-testid="header-user-name">{userName}</h2>
        )}
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
