import logo from '../../logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from '../Login/Login'
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage'


function App() {
  return (
    <div className="page">
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
