import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from '../Header/Header';
import Login from '../Auth/Login'
import Register from '../Auth/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage'


function App() {
  return (
    <div className="page">
      {}
      <Header />
      <Routes>
        <Route path='/signin' element={<Login />}
        />
        <Route path='/signup' element={<Register />}
        />
        <Route exact path="/" element={<Main />}
        />
        <Route path="/movies" element={<Movies />        }
        />
        <Route path="/saved-movies" element={<SavedMovies />        }
        />

        <Route path="/profile" element={ <Profile />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div >
  );
}

export default App;
