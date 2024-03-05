import React from "react";
import './SubmitButton';
import { Link } from "react-router-dom";

export default function SubmitButton({authClassName, buttonText, loginStatus, authLink, linkText, isDisabled, errorText}) {
    const submitClassName = "submit submit_type_" + authClassName;
    return (
        <>
            <fieldset  className={submitClassName}>
                {errorText ? (
                <p className='submit__error'>{errorText}</p>
                ) : null
                }
                <button type="submit" className="button submit__button" disabled={isDisabled}>{buttonText}</button>
                <p className='submit__text'>{loginStatus}{' '}
                    <Link className='link submit__link' to={authLink}>{linkText}</Link>
                </p>
            </fieldset>
        </>
    )
}