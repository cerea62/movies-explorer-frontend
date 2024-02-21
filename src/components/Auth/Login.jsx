import React from 'react'
import { useState } from 'react';
import Auth from './Auth'
import Input from './Input/Input'
import { validate } from 'react-email-validator';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function Login() {
    const [error, setError] = useState({ email: "", password: "" });
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(validateValue(formData));
        // setError({ ...error, [e.target.name]: e.target.validationMessage });
    };
    const validateValue = (formData) => {
        let error = {};
        if (!validate(formData.email)) {
            error.email = "Некорректный e-mail";
        }
        if (formData.password.length <= 5) {
            error.password = "Пароль должен быть не короче 5 символов";
        }
        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validateValue(formData));
    };

    return (
        <>
            <Auth
                title={'Рады видеть!'}
                onSubmit={handleSubmit}
            >
                <div className='input__container'>
                    <Input
                        inputName={"email"}
                        inputType={"email"}
                        inputLabel={'E-mail'}
                        inputPlaceholder={'E-mail'}
                        value={formData.email}
                        onChange={handleChange}
                        error={error.email}
                    />
                    <Input
                        inputName={"password"}
                        inputType={"password"}
                        inputLabel={'Пароль'}
                        inputPlaceholder={'password'}
                        value={formData.password}
                        onChange={handleChange}
                        error={error.password}
                    />
                </div>
                <SubmitButton
                    buttonText={'Войти'}
                    loginStatus={'Еще не зарегистрированы?'}
                    linkText={'Регистрация'}
                    authClassName={'login'}
                    authLink={'/signup'} />
            </Auth>
        </>
    )
}

