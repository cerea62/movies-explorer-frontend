import React from "react";
import './Footer.css'

export default function Footer({ id }) {
    return (
        <>
            <footer className="footer" id={id}>
                <div className="footer__container">
                    <h3 className="footer__title text">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                    <hr className="footer__line" />
                    <div className="footer__caption">
                        <p className="footer__copyright text">&copy; 2024</p>
                        <div className="footer__links">
                            <a className="footer__link link text" href="https://practicum.yandex.ru/"
                                target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
                            <a className="footer__link link text" href="https://github.com/"
                                target="_blank" rel="noopener noreferrer">Github</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}