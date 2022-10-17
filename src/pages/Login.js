import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    loadingPage: false,
    isButtonDisabled: true,
    loggedIn: false,
  }

  validatedName = () => {
    const { name } = this.state;
    const maxLength = 3;
    if (name.length >= maxLength) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, this.validatedName);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loadingPage: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        loggedIn: true,
      });
    });
  }

  render() {
    const { isButtonDisabled, loadingPage, loggedIn } = this.state;
    if (loggedIn) return <Redirect to="/search" />;
    if (loadingPage) return <Loading />;
    return (
      <div>
        <form data-testid="page-login">
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChange }
            name="name"
          />
          <button
            disabled={ isButtonDisabled }
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
