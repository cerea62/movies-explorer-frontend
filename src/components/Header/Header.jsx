import React from 'react';
import './Header.css';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Logo from '../Logo/Logo'

export default function Header({isLogin}) {
    const location = useLocation();
    const path = location.pathname;
    return (
        <>
            <header className={`header ${path !== '/' ? '' : 'header_theme_color'}`}>
                <div className='header__container'>
                    <Logo />
                    <NavBar
                    isLogin={isLogin} />
                </div>
            </header>
        </>
    )
}