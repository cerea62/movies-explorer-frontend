import React from "react";
import './Portfolio.css'


export default function Portfolio() {
    return (
        <>
            <section className="portfolio">
                <div className="portfolio__container">
                    <ul className="portfolio__nav text">Портфолио
                        <li className="portfolio__nav-item">
                            <a className="portfolio__link link" href="https://github.com/cerea62/how-to-learn">Статичный сайт</a>
                        </li>
                        <li className="portfolio__nav-item">
                            <a className="portfolio__link link" href="https://github.com/cerea62/russian-travel">Адаптивный сайт</a>
                        </li>
                        <li className="portfolio__nav-item">
                            <a className="portfolio__link link" href="https://github.com/cerea62/react-mesto-api-full-gha">Одностраничное приложение</a>
                        </li>
                    </ul>
                </div>
            </section>

        </>
    )
}