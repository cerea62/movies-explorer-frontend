import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
    const navigate = useNavigate();
    function handleClick() {
        navigate(-1);
    }
    return (
        <>
                <div className='error'>
                    <div>
                    <h1 className='error__title'>404</h1>
                    <p className='error__caption'>Страница не найдена</p>
                    </div>
                    <button className='error__back button' onClick={handleClick}>Назад</button>
                </div>
        </>
    )
}

