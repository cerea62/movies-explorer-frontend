import React from 'react'
import './Profile.css'
import { Link} from 'react-router-dom'

export default function Profile() {
    return (
        <>
            <section className='profile'>
                <h1 className='profile__title'>Привет, Виталий!</h1>
                <form className='profile__form'>
                    <div>
                        <div className='profile__form-item'>
                            <label className='profile__input-label' htmlFor="name">Имя</label>
                            <input className='profile__input'
                                name="name"
                                id='name'
                                type="text"
                                // placeholder="Email"
                                // value="Виталий"
                            // onChange={handleEmailChange}
                            >
                            </input>
                        </div>

                        <div className='profile__form-item'>
                            <label className='profile__input-label' htmlFor="email">E-mail</label>
                            <input className='profile__input'
                                name="email"
                                id='email'
                                type='email'
                                // value="pochta@yandex.ru"
                                >
                            </input>
                        </div>
                    </div>
                    <div className='profile__submit'>
                        <button className='profile__submit-button button'>Редактировать</button>
                        <Link className='profile__signout link'>Выйти из аккаунта</Link>
                    </div>
                </form>
            </section >
        </>


    )
}

