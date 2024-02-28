import React from 'react'
import Auth from './Auth'
import Input from './Input/Input'
import SubmitButton from '../SubmitButton/SubmitButton';
import useFormValidation from '../../utils/useFormValidation'

export default function Register() {
    const { values, errors, isValid, handleChange } = useFormValidation();

    function onChange(e) {
        handleChange(e);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

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
                        onChange={onChange}
                        error={errors.name}
                        errorMesage = {'Некорректное имя пользователя'}
                        isValid={isValid}
                                            />
                    <Input
                        inputName={"email"}
                        inputType={"email"}
                        inputLabel={'E-mail'}
                        inputPlaceholder={'E-mail'}
                        inputValue={values.email || ''}
                        onChange={onChange}
                        error={errors.email}
                        errorMesage = {'Некорректный e-mail'}
                        isValid={isValid}

                    />
                    <Input
                        inputName={"password"}
                        inputType={"password"}
                        inputLabel={'Пароль'}
                        inputPlaceholder={'Пароль'}
                        minLength={6}
                        inputValue={values.password || ''}
                        onChange={onChange}
                        error={errors.password}
                        errorMesage = {'Пароль должен быть длиннее 6 символов'}
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
                />
            </Auth>
        </>
    )
}