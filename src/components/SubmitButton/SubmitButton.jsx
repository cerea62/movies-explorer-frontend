import React from "react";
import './SubmitButton';
import { Link } from "react-router-dom";

export default function SubmitButton({authClassName, buttonText, loginStatus, authLink, linkText, isDisabled}) {
    const submitClassName = "button submit__button submit__button_type_" + authClassName;
    return (
        <>
            <div className='submit'>
                <span className='submit__error text submit__error_visible'>Здесь будет сообщение об ошибке</span>
               
                <button type="submit" className={submitClassName} disabled={isDisabled}>{buttonText}</button>
                <p className='submit__text'>{loginStatus}{' '}
                    <Link className='link submit__link' to={authLink}>{linkText}</Link>
                </p>
            </div>
        </>
    )
}