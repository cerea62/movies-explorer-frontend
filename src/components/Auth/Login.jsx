import React from 'react'
import { useState } from 'react';
import Auth from './Auth'
import Input from './Input/Input'
import SubmitButton from '../SubmitButton/SubmitButton';
import useFormValidation from '../../utils/useFormValidation';

export default function Login({ onLogin, errorText }) {
    
    const { values, errors, isValid, handleChange } = useFormValidation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onEmailChange(e) {
        handleChange(e);
        setEmail(e.target.value)
    }

    function onPasswordChange(e) {
        handleChange(e);
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
    }

    return (
        <>
            <Auth
                title={'Рады видеть!'}
                onSubmit={handleSubmit}
                errorText={errorText}
            >
                <div className='input-container'>
                    <Input
                        inputName={"email"}
                        inputType={"email"}
                        inputLabel={'E-mail'}
                        inputPlaceholder={'E-mail'}
                        inputValue={values.email || ''}
                        onChange={onEmailChange}
                        error={errors.email}
                        errorMesage={errors.email || ''}
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
                        errorMesage={'Некорректный пароль'}
                        isValid={isValid}
                    />
                </div>
                <SubmitButton
                    buttonText={'Войти'}
                    loginStatus={'Еще не зарегистрированы?'}
                    linkText={'Регистрация'}
                    authClassName={'login'}
                    authLink={'/signup'}
                    isDisabled={!isValid}
                    errorText={errorText}
                />
            </Auth>
        </>
    )
}

