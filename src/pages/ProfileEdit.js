import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loadingInfo: true,
  }

  componentDidMount() {
    this.handleName();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  buttonValidation = () => {
    const { name, email, image, description } = this.state;
    if (name.length > 0
      && email.length > 0
      && image.length > 0
      && description.length > 0) {
      return false;
    }
    return true;
  }

  handleName = async () => {
    const getUserInfo = await getUser();
    this.setState({
      loadingInfo: false,
      name: getUserInfo.name,
      email: getUserInfo.email,
      image: getUserInfo.image,
      description: getUserInfo.description,
    });
  }

  handleHistory = () => {
    const { history } = this.props;
    history.push('/profile');
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, image, description } = this.state;
    this.setState({
      loadingInfo: true,
    }, async () => {
      await updateUser({
        name,
        email,
        image,
        description,
      });
      this.setState({
        loadingInfo: false,
      });
      this.handleHistory();
    });
  }

  render() {
    const {
      name,
      email,
      image,
      description,
      loadingInfo } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loadingInfo ? <Loading />
          : (
            <form>
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                value={ image }
                onChange={ this.handleChange }
              />
              <h3>Nome</h3>
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
              <h3>E-mail</h3>
              <input
                data-testid="edit-input-email"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
              <h3>Descrição</h3>
              <input
                data-testid="edit-input-description"
                type="text"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
              <button
                data-testid="edit-button-save"
                type="submit"
                disabled={ this.buttonValidation() }
                onClick={ this.handleSubmit }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
