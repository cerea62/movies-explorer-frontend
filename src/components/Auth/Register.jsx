import React from 'react'
import Auth from './Auth'
import Input from './Input/Input'

export default function Register() {
    return (
        <>
            <Auth
                title={'Добро пожаловать!'}
                buttonText={'Зарегистрироваться'}
                loginStatus={'Уже зарегистрированы?'}
                linkText={'Войти'}
                authClassName={'register'}
                authLink={'/signin'}
            // onSubmit={onChange}
            >
                <div className='input__container'>
                    <Input
                        inputName={"name"}
                        inputType={"name"}
                        inputLabel={'Имя'}
                    />
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