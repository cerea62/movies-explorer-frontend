import React from 'react'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import Auth from './Auth'
import Input from './Input/Input'
import { validate } from 'react-email-validator';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function Register() {
// const navigate = useNavigate();
    const [error, setError] = useState({ name: "", email: "", password: "" });
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: e.target.validationMessage });
    };

    const validateValue = (formData) => {
        let error = {};
        if (formData.name.length < 2 || formData.name.length >30) {
            error.name = "Имя пользователя должно быть от 2 до 30 символов";
        }
        if (!validate(formData.email)) {
            error.email = "Некорректный e-mail";
        }
        if (formData.password.length < 5) {
            error.password = "Пароль должен быть не короче 6 символов";
        }
        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validateValue(formData));
        // navigate('/signin');
    };

    return (
        <>
            <Auth
                title={'Добро пожаловать!'}

            onSubmit={handleSubmit}
            >
                <div className='input__container'>
                    <Input
                        inputName={"name"}
                        inputType={"name"}
                        inputLabel={'Имя'}
                        inputPlaceholder={'Имя'}
                        value={formData.name}
                        onChange={handleChange}
                        error={error.name}
                                        />
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
                        inputPlaceholder={'Пароль'}
                        value={formData.password}
                        onChange={handleChange}
                        error={error.password}
                    />
                </div>
                <SubmitButton
                buttonText={'Зарегистрироваться'}
                loginStatus={'Уже зарегистрированы?'}
                linkText={'Войти'}
                authClassName={'register'}
                authLink={'/signin'}
                    />
            </Auth>
        </>
    )
}