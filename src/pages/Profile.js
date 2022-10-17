import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    userName: '',
    userMail: '',
    userImage: '',
    userDescription: '',
    loadingInfo: true,
  }

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    const getUserInfo = await getUser();
    this.setState({
      loadingInfo: false,
      userName: getUserInfo.name,
      userMail: getUserInfo.email,
      userImage: getUserInfo.image,
      userDescription: getUserInfo.description,
    });
  }

  render() {
    const { userName, userMail, userImage, userDescription, loadingInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loadingInfo ? <Loading />
          : (
            <div>
              <img data-testid="profile-image" src={ userImage } alt="Profile" />
              <Link to="/profile/edit">Editar perfil</Link>
              <p>{ userName }</p>
              <p>{ userMail }</p>
              <p>{ userDescription }</p>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
