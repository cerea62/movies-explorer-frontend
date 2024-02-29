import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import Login from '../Auth/Login'
import Register from '../Auth/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer';


function App() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="page">
      {path === '/' || path === '/movies' || path === '/saved-movies' || path === '/profile' ?
        <Header /> : ''
      }
      <Routes>
        <Route path='/signin' element={<Login />}
        />
        <Route path='/signup' element={<Register />}
        />
        <Route exact path="/" element={<Main />}
        />
        <Route path="/movies" element={<Movies />}
        />
        <Route path="/saved-movies" element={<SavedMovies />}
        />

        <Route path="/profile" element={<Profile />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {path === '/' || path === '/movies' || path === '/saved-movies' ?
        <Footer
        id='footer' /> : ''
      }
    </div >
  );
}

export default App;
