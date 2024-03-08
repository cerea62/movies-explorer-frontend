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
import { errorsList } from '../../utils/errors';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [errorText, setErrorText] = useState('');
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  useEffect( () => {
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

  const navigateRoute = () => {
    const isLoggedIn = localStorage.getItem("isLogin")
    if (isLoggedIn) {
      if (path === '/signup' || path === '/signin') {
        navigate('/movies')
      }
    }
  }

  const getUserInfo = async () => {
    try {
      const userData = await mainApi.getUserInfo();
      if (userData) {
        await setCurrentUser(userData);
        localStorage.setItem("isLogin", true);
      }
    }
    catch (err) {
      console.log("Ошибка получения пользователя", err);
    }
  }

  //Регистрация пользователя
  const handleRegister = async (name, email, password) => {
    try {
      const res = await mainApi.signup({ name, email, password });
      if (res) {
        handleLogin(email, password);
        return true;
      }
    }
    catch (err) {
      const error = errorsList(err);
      setErrorText(error);
      return false;
    }
  }

  //Авторизация пользователя
  const handleLogin = async (email, password) => {
    try {
      const res = await mainApi.signin({ email, password });
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        await getUserInfo();
        navigate('/movies', { replace: true });
        return true;
      }
    }
    catch (err) {
      const error = errorsList(err);
      setErrorText(error);
    }
  }

  // Выход из аккаунта
  const onSignOut = () => {
    localStorage.clear();
    setCurrentUser({});
    navigate('/', { replace: true });
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
                  setCurrentUser={setCurrentUser}
                  onSignOut={onSignOut}
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
