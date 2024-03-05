import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import SubmitButton from '../SubmitButton/SubmitButton'
import useFormValidation from '../../utils/useFormValidation'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import mainApi from '../../utils/MainApi'

export default function Profile({ onSignOut }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [editButtonEnable, setEditButtonEnable] = useState(true);
    // const [saveButtonState, setSaveButtonState] = useState(true);
    const [inputState, setInputState] = useState(true);
    const { values, errors, isValid, handleChange } = useFormValidation();
    console.log(inputState)

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser.name, currentUser.email]);

    function handleEditClick(e) {
        setEditButtonEnable(false);
        setInputState(false);

    }

    function handleUpdateUser(data) {
        mainApi.editUserInfo(data)
            .then((profileData) => {
                setName(profileData.name);
                setEmail(profileData.email);

            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        handleUpdateUser({ name, email })
        setEditButtonEnable(true);
    }
    function handleEmailChange(e) {
        handleChange(e);
        // setSaveButtonState(false);
         setEmail(e.target.value);
    }
    function handleNameChange(e) {
        handleChange(e);
        setName(e.target.value);
        // setSaveButtonState(!isValid);
    }
    return (
        <>
            <section className='profile'>
                <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
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
                                    value={name}
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
                                    value={email}
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
                            <Link className='profile__signout link' to={'/signin'} onClick={onSignOut}>Выйти из аккаунта</Link>
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

