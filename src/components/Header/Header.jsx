import React from 'react';
import './Header.css';
import logo from '../../image/logo.jpg';
import { Link } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

export default function Header() {
    return (
        <>
            <header className='header'>
                <Link to='/'>
                    <img className='header__logo' src={logo} alt='Логотип страницы' />
                </Link>
                <NavBar />
            </header>
        </>
    )
}