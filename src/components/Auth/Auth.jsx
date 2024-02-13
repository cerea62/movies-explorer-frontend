import React from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo'


export default function Auth({ title, buttonText, onSubmit, loginStatus, linkText, children, authClassName, authLink }) {
    const submitClassName = "button auth__submit auth__submit_type_" + authClassName;
    return (
        <>
            <section className='auth'>
                    <Logo />
                    <h2 className="auth__title">{title}</h2>
                    <form className="auth__form" onSubmit={onSubmit}>
                        {children}
                        <div>
                            <button type="submit" className={submitClassName}>{buttonText}</button>
                            <p className='auth__text'>{loginStatus}{' '}
                                <Link className='auth__link link' to={authLink}>{linkText}
                                </Link>
                            </p>
                        </div>
                    </form>
            </section>
        </>
    )
}
