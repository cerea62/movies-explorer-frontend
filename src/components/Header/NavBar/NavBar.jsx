import React, {useRef} from 'react'
import './NavBar.css'
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    const menuRef = useRef();
    const location = useLocation();
    const path = location.pathname;
    // const [state] = useStore();
    // const { loggedIn } = state;
  
    const handleOpenMenu = () => {
      const menu = menuRef.current;
      menu.style.display = "flex";
    };
  
    const handleCloseMenu = () => {
      const menu = menuRef.current;
      menu.style.display = "";
    };
    return (
        <>
            <nav className="navbar__navigate navbar__navigate-movies">
                <ul className="navbar__movies text" ref={menuRef}>
                    
                    <button
                        className="navbar__burger-close"
                        onClick={handleCloseMenu}
                    ></button>
                    
                    <li
                        className={`navbar__movies-item ${path === "/" && "navbar__movies-item_selected"
                            }`}
                    >
                        <Link to="/" className="navbar__link" onClick={handleCloseMenu}>
                            Главная
                        </Link>
                    </li>
                    <li
                        className={`navbar__movies-item ${path === "/movies" && "navbar__movies-item_selected"
                            }`}
                    >
                        <Link to="/movies" className="navbar__link" onClick={handleCloseMenu}>
                            Фильмы
                        </Link>
                    </li>
                    <li
                        className={`navbar__movies-item ${path === "/saved-movies" && "navbar__movies-item_selected"
                            }`}
                    >
                        <Link
                            to="/saved-movies"
                            className="navbar__link"
                            onClick={handleCloseMenu}
                        >
                            Сохранённые фильмы
                        </Link>
                    </li>
                    <li className="navbar__movies-item">
                        <Link
                            to="/profile"
                            className="navbar__link navbar__link-profile color_secondary"
                            onClick={handleCloseMenu}
                        >
                            Аккаунт
                            <div className="navbar__icon"></div>
                        </Link>
                    </li>
                </ul>
                <button className='navbar__burger' onClick={handleOpenMenu}></button>
            </nav>



        </>
    )
}