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
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import { errors } from '../../utils/errors';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  // const [openModal, setOpenModal] = useState('');
  // const [statusInfo, setStatusInfo] = useState('');
  // const [infoTitle, setInfoTitle] = useState('');
  const [errorText, setErrorText] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.checkToken(jwt).then((res) => {
        if (res) {
          setIsLogin(true);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, []);

  // useEffect(() => {
  //   getUserInfo()
  // }, [])

  function getUserInfo() {
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegister(name, email, password) {
    mainApi.signup({ name, email, password })
      .then((res) => {
        handleLogin(email, password);
        console.log(res);
        // setName(res.data.name);
        // setEmail(res.data.email);
        // setOpenModal(true);
        // setStatusInfo(true);
        // setInfoTitle("Вы успешно зарегистрировались!");
        navigate("/movies")
        return true;
      })
      .catch(err => {
        const error = errors(err);
        setErrorText(error);
        // setOpenModal(false);
        // setInfoTitle("Что-то пошло не так! Попробуйте еще раз.")
        return false;
      })
  }
  function handleLogin(email, password) {
    mainApi.signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLogin(true);
        // setStatusInfo(true);
        // setOpenModal(true);
        // setInfoTitle('Вы успешно вошли в аккаунт');
        getUserInfo();
        navigate("/movies");
        return true;
      }).catch((err) => {
        const error = errors(err);
        setErrorText(error);
        // setOpenModal(true);
        // setInfoTitle("Что-то пошло не так! Попробуйте ещё раз.")
        // handlecloseModal();
      });
  }



  function onSignOut() {
    localStorage.removeItem('jwt');
    setEmail(null)
    setIsLogin(false);
  }
  //   function handleCardLike(card) {
  //     const isLiked = card.likes.some(i => i === currentUser._id);
  //     mainApi.changeLike(card._id, isLiked)
  //         .then((newCard) => {
  //             setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         });
  // }
  // function handlecloseModal() {
  //   setOpenModal(false);
  // }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        {path === '/' || path === '/movies' || path === '/saved-movies' || path === '/profile' ?
          <Header
            isLogin={isLogin} /> : ''
        }
        <Routes>
          <Route path='/signin'
            element={<Login
              onLogin={handleLogin}
              isLogin={isLogin}
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
              <ProtectedRouteElement
                isLogin={isLogin}>
                <Movies
                  isLogin={isLogin}
                  movies={movies}
                  // isOpen={openModal}
                  // onClose={handlecloseModal}
                />
              </ProtectedRouteElement>
            }
          />
          <Route exact path="/saved-movies"
            element={
              <ProtectedRouteElement
                isLogin={isLogin}>
                <SavedMovies
                  isLogin={isLogin}
                  movies={movies} />
              </ProtectedRouteElement>
            }
          />
          <Route exact path="/profile"
            element={
              <ProtectedRouteElement
                isLogin={isLogin}>
                <Profile
                  onSignOut={onSignOut} />
              </ProtectedRouteElement>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {path === '/' || path === '/movies' || path === '/saved-movies' ?
          <Footer
            id='footer' /> : ''
        }
        {/* <Modal
          isOpen={openModal}
          onClose={handlecloseModal}
          isSucess={statusInfo}
          title={infoTitle}
        /> */}

      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
