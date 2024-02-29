import React from 'react'
import Auth from './Auth'
import Input from './Input/Input'
import SubmitButton from '../SubmitButton/SubmitButton';
import useFormValidation from '../../utils/useFormValidation';

export default function Login() {
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
                title={'Рады видеть!'}
                onSubmit={handleSubmit}
            >
                <div className='input-container'>
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
                        errorMesage = {'Некорректный пароль'}
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
                />
            </Auth>
        </>
    )
}

