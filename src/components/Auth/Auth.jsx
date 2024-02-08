import React from 'react';
import './Auth.css';
import authLogo from '../../image/logo.jpg';
import { Link } from 'react-router-dom';

export default function Auth({ title, buttonText, onSubmit, loginStatus, linkText, children }) {
    return (
        <>
            <div className="auth__container">
                <img className='auth__logo' src={authLogo} alt="Логотип Место" />
                <h2 className="auth__title">{title}</h2>
                <form className="auth__form" onSubmit={onSubmit}>
                    {children}
                    <div>
                        <button type="submit" className="auth__submit">{buttonText}</button>
                        <p className='auth__text'>{loginStatus}{' '}
                            <Link className='auth__link' to='/sign-in'>{linkText}
                            </Link>
                        </p>
                    </div>
                </form>

            </div>
        </>
    )
}
