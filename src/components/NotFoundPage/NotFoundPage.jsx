import React from 'react'
import './NotFoundPage.css'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <>
                <div className='error__container'>
                    <h1 className='error__title'>404</h1>
                    <p className='error__caption'>Страница не найдена</p>
                    {/* <Link className='error__link' to={''}>Назад</Link> */}
                </div>
               <div className='error__link-container'>
                <Link className='error__link' to={''}>Назад</Link>
                </div> 
        </>
    )
}

