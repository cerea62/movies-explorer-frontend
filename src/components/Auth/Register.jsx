import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth'
import Input from './Input/Input'
import SubmitButton from '../SubmitButton/SubmitButton';
import useFormValidation from '../../utils/useFormValidation'

export default function Register({ onRegister, onLogin, isLogin, errorText }) {
    const { values, errors, isValid, handleChange } = useFormValidation();
    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isRegistred, setIsRegistered] = useState(false)
    const navigate = useNavigate();

    function onNameChange(e) {
        handleChange(e);
        setName(e.target.value)
    }
    function onEmailChange(e) {
        handleChange(e);
        setEmail(e.target.value)
    }
    function onPasswordChange(e) {
        handleChange(e);
        setPassword(e.target.value)
    }
    // function onLogin(isRegistred);
    function handleSubmit(e) {
        e.preventDefault();
        onRegister(name, email, password);
        // setIsRegistered(isRegistred);
          
    }
    // useEffect(() => {
    //   if (isLogin) {
    //     navigate('/');
    //   }
    // }, [isLogin, navigate]);
    return (
        <>
            <Auth
                title={'Добро пожаловать!'}
                onSubmit={handleSubmit}
            >
                <div className='input-container'>
                    <Input
                        inputName={"name"}
                        inputType={"name"}
                        inputLabel={'Имя'}
                        inputPlaceholder={'Имя'}
                        minLength={'2'}
                        maxLength={'30'}
                        inputValue={values.name || ''}
                        onChange={onNameChange}
                        error={errors.name}
                        errorMesage={'Некорректное имя пользователя'}
                        isValid={isValid}
                    />
                    <Input
                        inputName={"email"}
                        inputType={"email"}
                        inputLabel={'E-mail'}
                        inputPlaceholder={'E-mail'}
                        inputValue={values.email || ''}
                        onChange={onEmailChange}
                        error={errors.email}
                        errorMesage={'Некорректный e-mail'}
                        isValid={isValid}

                    />
                    <Input
                        inputName={"password"}
                        inputType={"password"}
                        inputLabel={'Пароль'}
                        inputPlaceholder={'Пароль'}
                        minLength={6}
                        inputValue={values.password || ''}
                        onChange={onPasswordChange}
                        error={errors.password}
                        errorMesage={'Пароль должен быть длиннее 6 символов'}
                        isValid={isValid}
                    />
                </div>
                <SubmitButton
                    buttonText={'Зарегистрироваться'}
                    loginStatus={'Уже зарегистрированы?'}
                    linkText={'Войти'}
                    authClassName={'register'}
                    authLink={'/signin'}
                    isDisabled={!isValid}
                    errorText={errorText}
                />
            </Auth>
        </>
    )
}