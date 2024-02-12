import React from 'react';
import './Auth.css';
import logo from '../../image/logo.jpg';
import { Link } from 'react-router-dom';



export default function Auth({ title, buttonText, onSubmit, loginStatus, linkText, children, authClassName, authLink }) {
    const submitClassName = "auth__submit auth__submit_type_" + authClassName;
    return (
        <>
            <section className='auth'>
                <div className="auth__container">
                    <Link to='/'>
                    <img className='auth__logo' src={logo} alt="Логотип страницы" />
                    </Link> 
                    <h2 className="auth__title">{title}</h2>
                    <form className="auth__form" onSubmit={onSubmit}>
                        {children}
                        <div>
                            <button type="submit" className={submitClassName}>{buttonText}</button>
                            <p className='auth__text'>{loginStatus}{' '}
                                <Link className='auth__link' to={authLink}>{linkText}
                                </Link>
                            </p>
                        </div>
                    </form>

                </div>
            </section>
        </>
    )
}
