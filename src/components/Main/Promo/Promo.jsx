import React from "react";
import './Promo.css';
import landingLogo from '../../../image/landing-logo.svg';



export default function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <div className="promo__left">
                    <div className="promo__title">
                        <h1 className="promo__text text">Учебный проект студента факультета Веб-разработки.</h1>
                        <p className="promo__caption text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    </div>
                    <a className="promo__nav link text" href='#about-project'>Узнать больше</a>
                </div>
                <img className="promo__logo" src={landingLogo} alt="Логотип страницы в виде земного шара" />
            </div>
        </section>

    )
}