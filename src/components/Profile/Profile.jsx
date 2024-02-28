import React, { useState } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import SubmitButton from '../SubmitButton/SubmitButton'
import useFormValidation from '../../utils/useFormValidation'



export default function Profile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editButtonEnable, setEditButtonEnable] = useState(true);
    const [saveButtonState, setSaveButtonState] = useState(true);
    const [inputState, setInputState] = useState(true);
    const { values, errors, isValid, handleChange } = useFormValidation();

    function handleEditClick(e) {
        setEditButtonEnable(false);
        setInputState(false);

    }
    function handleSubmit(e) {
        console.log(e);
        e.preventDefault();
        setEditButtonEnable(true);
    }
    function handleEmailChange(e) {
        handleChange(e);
        // setSaveButtonState(false);
        // const value = e.target.value;
        // setEmail(value);
    }
    function handleNameChange(e) {
        handleChange(e);
        // setSaveButtonState(!isValid);
        // const value = e.target.value;
        // setName(value);
    }
    return (
        <>
            <section className='profile'>
                <h1 className='profile__title'>Привет, Виталий!</h1>
                <form className='profile__form form' onSubmit={handleSubmit} noValidate>
                    <div className='profile__form-container'>
                        <fieldset className='profile__form-field'>
                            <div className='profile__input-item'>
                                <label className='profile__input-label' htmlFor="name">Имя</label>
                                <input className='profile__input'
                                    name="name"
                                    id='name'
                                    type="text"
                                    placeholder="Имя"
                                    value={values.name || ''}
                                    minLength='2'
                                    maxLength='30'
                                    required
                                    title='Разрешено использовать латиницу, кириллицу, пробел или дефис'
                                    pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
                                    onChange={handleNameChange}
                                    disabled={inputState}
                                />
                            </div>
                            <span id='name-error' className='profile__input-error'>
                                {!isValid ? errors.name : ''}
                            </span>
                        </fieldset>
                        <fieldset className='profile__form-field'>
                            <div className='profile__input-item'>
                                <label className='profile__input-label' htmlFor="email">E-mail</label>
                                <input className='profile__input'
                                    name="email"
                                    id='email'
                                    type='email'
                                    minLength='2'
                                    maxLength='30'
                                    required
                                    placeholder='E-mail'
                                    value={values.email || ''}
                                    onChange={handleEmailChange}
                                    disabled={inputState}
                                />
                            </div>
                            <span className='profile__input-error'>{!isValid ? errors.email : ''}</span>
                        </fieldset>
                    </div>
                    {editButtonEnable ? (
                        <div className='profile__submit'>
                            <button className='profile__submit-button button' onClick={handleEditClick}>Редактировать</button>
                            <Link className='profile__signout link' to={'/signin'}>Выйти из аккаунта</Link>
                        </div>
                    ) :
                        (
                            <SubmitButton
                                buttonText={'Сохранить'}
                                loginStatus={''}
                                linkText={''}
                                authClassName={'profile'}
                                authLink={'/signin'}
                                isDisabled={!isValid}
                            />

                        )}

                </form>
            </section >
        </>
    )
}

