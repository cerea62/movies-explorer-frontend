import React from "react";
import './SubmitButton';
import { Link } from "react-router-dom";

export default function SubmitButton({ authClassName, buttonText, loginStatus, authLink, linkText, isDisabled, errorText }) {
    const submitClassName = "submit submit_type_" + authClassName;
    return (
        <>
        <div className={submitClassName}>
            <fieldset className='submit__fieldset'>
                {errorText ? (
                    <p className='submit__error'>{errorText}</p>
                ) : null
                }
                <button type="submit" className="button submit__button" disabled={isDisabled}>{buttonText}</button>
            </fieldset>
            <div className='submit__redirect'>
                <p className='submit__text'>{loginStatus}{' '}
                    <Link className='link submit__link' to={authLink}>{linkText}</Link>
                </p>
            </div>
            </div>

        </>
    )
}