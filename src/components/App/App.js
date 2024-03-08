import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from '../../utils/MainApi';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Login from '../Auth/Login'
import Register from '../Auth/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer';
import { errors } from '../../utils/errors';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [statusInfo, setStatusInfo] = useState('');
  const [errorText, setErrorText] = useState('');
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.checkToken(jwt).then((res) => {
        if (res) {

          getUserInfo();
          navigateRoute();
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [path]);

  function navigateRoute() {
    const isLoggedIn = localStorage.getItem("isLogin")
    if (isLoggedIn) {
      if (path === '/signup' || path === '/signin') {
        navigate('/movies')
      }
    }
  }

  //Получение данных пользователя
  function getUserInfo() {
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        localStorage.setItem("isLogin", true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //Регистрация пользователя
  function handleRegister(name, email, password) {
    mainApi.signup({ name, email, password })
      .then((res) => {
        handleLogin(email, password);
        navigate("/movies")
        return true;
      })
      .catch(err => {
        const error = errors(err);
        setErrorText(error);
        return false;
      })
  }

  //Авторизация пользователя
  function handleLogin(email, password) {
    mainApi.signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        getUserInfo();
        navigate('/movies');
        return true;
      }).catch((err) => {
        const error = errors(err);
        setErrorText(error);
      });
  }

  // Выход из аккаунта
  function onSignOut() {
    localStorage.clear();
    navigate('/');
  }
  // Редактирование данных профиля
  function handleUpdateUser(data) {
    mainApi.editUserInfo(data)
      .then((profileData) => {
        if (profileData.name !== currentUser.name || profileData.email !== currentUser.email) {
          setCurrentUser({
            name: profileData.name,
            email: profileData.email
          })
          setStatusInfo(true);
          setErrorText('Данные успешно изменены!');
        }
      })
      .catch((err) => {
        const error = errors(err);
        setErrorText(error);
        return false;
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {path === '/' || path === '/movies' || path === '/saved-movies' || path === '/profile' ?
          <Header /> : ''}
        <Routes>

          <Route path='/signin'
            element={<Login
              onLogin={handleLogin}
              errorText={errorText} />}
          />

          <Route path='/signup'
            element={<Register
              onRegister={handleRegister}
              errorText={errorText} />}
          />

          <Route exact path="/"
            element={<Main />}
          />

          <Route exact path="/movies"
            element={
              <ProtectedRouteElement>
                <Movies />
              </ProtectedRouteElement>
            }
          />

          <Route exact path="/saved-movies"
            element={
              <ProtectedRouteElement>
                <Movies />
              </ProtectedRouteElement>
            }
          />

          <Route exact path="/profile"
            element={
              <ProtectedRouteElement>
                <Profile
                  onUpdateUser={handleUpdateUser}
                  onSignOut={onSignOut}
                  errorText={errorText}
                  statusInfo={statusInfo}
                />
              </ProtectedRouteElement>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {path === '/' || path === '/movies' || path === '/saved-movies' ?
          <Footer
            id='footer' /> : ''
        }
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
