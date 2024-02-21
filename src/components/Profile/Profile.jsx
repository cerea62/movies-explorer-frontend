import React, { useState } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import SubmitButton from '../SubmitButton/SubmitButton'

export default function Profile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editButtonEnable, setEditButtonEnable] = useState(true);
    const [saveButtonState, setSaveButtonState] = useState(true);
    const [inputState, setInputState] = useState(true);

    function handleEditClick(e) {
        setEditButtonEnable(false);
        setInputState(false);

    }
    function handleSubmit(e) {
        console.log(e);
        e.preventDefault();

    }
    function handleEmailChange(e) {
        setSaveButtonState(false);
        // const value = e.target.value;
        // setEmail(value);
    }
    function handleNameChange(e) {
        setSaveButtonState(false);
        // const value = e.target.value;
        // setName(value);
    }
    return (
        <>
            <section className='profile'>
                <h1 className='profile__title'>Привет,!</h1>
                <form className='profile__form' onSubmit={handleSubmit} noValidate>
                    <div>
                        <div className='profile__form-item'>
                            <label className='profile__input-label' htmlFor="name">Имя</label>
                            <input className='profile__input'
                                name="name"
                                id='name'
                                type="text"
                                placeholder="Имя"
                                // value={name}
                                onChange={handleNameChange}
                                disabled={inputState}
                            />
                            <span className='profile__input-error'> Ошибка!</span>
                        </div>
                        <div className='profile__form-item'>
                            <label className='profile__input-label' htmlFor="email">E-mail</label>
                            <input className='profile__input'
                                name="email"
                                id='email'
                                type='email'
                                placeholder='E-mail'
                                // value={email}
                                onChange={handleEmailChange}
                                disabled={inputState}
                            />
                            <span className='profile__input-error'> Ошибка!</span>
                        </div>
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
                                isDisabled={saveButtonState}
                            />

                        )}

                </form>
            </section >
        </>
    )
}

