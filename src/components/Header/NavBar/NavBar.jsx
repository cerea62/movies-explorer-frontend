import React, { useRef } from 'react'
import './NavBar.css'
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    const menuRef = useRef();
    const location = useLocation();
    const path = location.pathname;
    // const [state] = useStore();
    // const { loggedIn } = state;
    const IsLogged = true; //временная заглушка для тестирования верстки

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
            {IsLogged ? (
                <nav className="navbar__navigate navbar__navigate-movies">
                    <div className="navbar__movies" ref={menuRef}>
                        <button
                            className="navbar__burger-close"
                            onClick={handleCloseMenu}
                        ></button>
                        <ul className='navbar__list'>
                        <li
                            className={`navbar__movies-item ${path === "/" && "navbar__movies-item_selected"}`}
                        >
                            <Link to="/" className="navbar__link link" onClick={handleCloseMenu}>
                                Главная
                            </Link>
                        </li>
                        <li
                            className={`navbar__movies-item ${path === "/movies" && "navbar__movies-item_selected"}`}
                        >
                            <Link to="/movies"
                                className={`navbar__link ${path === "/" && "navbar__link_theme_color"} link`}
                                onClick={handleCloseMenu}>
                                Фильмы
                            </Link>
                        </li>
                        <li
                            className={`navbar__movies-item ${path === "/saved-movies" && "navbar__movies-item_selected"}`}
                        >
                            <Link
                                to="/saved-movies"
                                className={`navbar__link ${path === "/" && "navbar__link_theme_color"} link`}
                                onClick={handleCloseMenu}
                            >
                                Сохранённые фильмы
                            </Link>
                        </li>
                        <li className="navbar__movies-item">
                            <Link
                                to="/profile"
                                className={`navbar__link navbar__link-profile 
                                ${path === "/" && "navbar__link_theme_color"} link`}
                                onClick={handleCloseMenu}
                            >
                                Аккаунт
                                <div className={`navbar__icon ${path === "/" && "navbar__icon_theme_color"}`}></div>
                            </Link>
                        </li>
                        </ul>
                    </div>
                    <button className='navbar__burger' onClick={handleOpenMenu}></button>
                </nav>
            ) : (
                <nav className="navbar__navigate">
                    <ul className="navbar__auth">
                        <li className="navbar__auth-item ">
                            <Link to="/signup" className="navbar__link navbar__link_status_register link">
                                Регистрация
                            </Link>
                        </li>
                        <li className="navbar__auth-item">
                            <Link to="/signin" className="navbar__link navbar__link_status_login link">
                                Войти
                            </Link>
                        </li>
                    </ul>
                </nav>
            )
            }
        </>
    )
}