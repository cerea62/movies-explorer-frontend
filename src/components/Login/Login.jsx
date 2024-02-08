import React from 'react'
import './Login.css'
import Auth from '../Auth/Auth'

export default function Login() {
    return (
        <>
            <Auth
                title={'Рады видеть!'}
                buttonText={'Войти'}
                loginStatus={'Еще не зарегистрированы?'}
                linkText={'Регистрация'}
            // onSubmit={onChange}
            >
                <label className='input__label' for="Email">E-mail</label>
                <input
                    className="input"
                    name="Email" type="email"
                    // placeholder="Email"
                    //   value={email}
                    //   onChange={handleEmailChange}
                    required
                />
                <label className='input__label' for="Password">Пароль</label>
                <input className="input"
                    name="Password"
                    type="password"
                    // placeholder="Пароль"
                    //   value={password}
                    //   onChange={handlePasswordChange}
                    autoComplete="on"
                    required
                />
            </Auth>
        </>
    )
}

