import React from "react";
import './NavAuth.css'
import { Link } from "react-router-dom";
import mainIcon from '../../../image/main-icon.jpg'

export default function NavAuth({ loggedIn }) {
    return (
        <div className="nav-auth">
            {loggedIn && (
                <>
                    <Link className='nav-auth__link' to={'/profile'}>
                        Аккаунт
                        <img className="nav-auth__icon" src={mainIcon} alt="Иконка входа в аккаунт" />
                    </Link>
                </>
            )
            }
        </div>
    )
}