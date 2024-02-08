import React from 'react'
import './Login.css'
import Auth from '../Auth/Auth'
import Input from '../Input/Input'

export default function Login() {
    return (
        <>
            <Auth
                title={'Рады видеть!'}
                buttonText={'Войти'}
                loginStatus={'Еще не зарегистрированы?'}
                linkText={'Регистрация'}
                authClassName={'login'}
            // onSubmit={onChange}
            >
                <div className='input__container'>
                    <Input
                        inputName={"email"}
                        inputType={"email"}
                        inputLabel={'E-mail'}
                    />
                    <Input
                        inputName={"password"}
                        inputType={"password"}
                        inputLabel={'Пароль'}
                    />
                </div>
            </Auth>
        </>
    )
}

