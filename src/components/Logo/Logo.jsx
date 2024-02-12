import React from 'react';
import './Logo.css';
import logo from '../../image/logo.svg';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Link className='link' to='/'>
            <img className='logo' src={logo} alt='Логотип страницы' />
        </Link>
    )
}
