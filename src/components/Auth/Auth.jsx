import React from 'react';
import './Auth.css';
import Logo from '../Logo/Logo'

export default function Auth({ title, buttonText, onSubmit, loginStatus, linkText, children, authClassName, authLink }) {
    return (
        <>
            <section className='auth'>
                <Logo />
                <h2 className="auth__title">{title}</h2>
                <form className="auth__form" onSubmit={onSubmit} noValidate>
                    {children}
                </form>
            </section>
        </>
    )
}
