import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import SubmitButton from '../SubmitButton/SubmitButton'
import useFormValidation from '../../utils/useFormValidation'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Modal from '../Modal/Modal'
import mainApi from '../../utils/MainApi';
import { errorsList } from '../../utils/errors'

export default function Profile({ onSignOut, setCurrentUser }) {

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [errorNameText, setErrorNameText] = useState('');
    const [errorEmailText, setErrorEmailText] = useState('');
    const [editButtonEnable, setEditButtonEnable] = useState(true);
    const [inputState, setInputState] = useState(true);
    const [openModal, setOpenModal] = useState('');
    const [errorText, setErrorText] = useState('');
    const [statusInfo, setStatusInfo] = useState('');
    const { errors, isValid, handleChange } = useFormValidation();
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        setButtonDisabled(currentUser.name === name && currentUser.email === email);
    }, [name, email, currentUser.name, currentUser.email]);

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser.name, currentUser.email]);


    function handlecloseModal() {
        setOpenModal(false);

    }

    function handleEditClick(e) {
        setEditButtonEnable(false);
        setInputState(false);
    }

    // Редактирование данных профиля
    const handleUpdateUser = async (data) => {
        // Блокируем инпуты и кнопку сохрнаить на время запроса
        setButtonDisabled(true);
        setInputState(true);
        try {
            const profileData = await mainApi.editUserInfo(data);
            if ((profileData) && (profileData.name !== currentUser.name || profileData.email !== currentUser.email)) {
                await setCurrentUser({
                    name: profileData.name,
                    email: profileData.email
                })
                setEditButtonEnable(true);
                setErrorText('Данные успешно изменены!');
                setStatusInfo(true);
                setOpenModal(true);

                setButtonDisabled(false);
                setInputState(false);
                return true;
            }
        } catch (err) {
            const error = errorsList(err);
            setErrorText(error);
            setStatusInfo(false);
            setOpenModal(true);
            return false;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateUser({ name, email });
    }

    function handleEmailChange(e) {
        handleChange(e);
        setEmail(e.target.value)
        if (e.target.value === currentUser.email) {
            setErrorEmailText('E-mail совпадает с текущим');
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
            setErrorEmailText('');
        }
    }

    function handleNameChange(e) {
        handleChange(e);
        setName(e.target.value);
        if (e.target.value === currentUser.name) {
            setErrorNameText('Имя пользователя не отличается от текущего');
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
            setErrorNameText('');
        }
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
                                    pattern='^[A-Za-zА-Яа-яЁё\s]+$'
                                    onChange={handleNameChange}
                                    disabled={inputState}
                                />
                            </div>
                            <span id='name-error' className='profile__input-error'>
                                {!isValid ? errors.name : ''}
                            </span>
                            <span className='profile__input-error'>{errorNameText}</span>
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
                            <span className='profile__input-error'>{errorEmailText}</span>
                        </fieldset>
                    </div>
                    {editButtonEnable ? (
                        <div className='profile__submit'>
                            <button className='profile__submit-button button' onClick={handleEditClick}>Редактировать</button>
                            <Link className='profile__signout link' to={'/'} onClick={onSignOut}>Выйти из аккаунта</Link>
                        </div>
                    ) :
                        (
                            <SubmitButton
                                buttonText={'Сохранить'}
                                loginStatus={''}
                                linkText={''}
                                authClassName={'profile'}
                                authLink={'/signin'}
                                isDisabled={buttonDisabled}
                            />
                        )}
                </form>
                <Modal
                    isOpen={openModal}
                    onClose={handlecloseModal}
                    statusInfo={statusInfo}
                    title={errorText} />
            </section >
        </>
    )
}

