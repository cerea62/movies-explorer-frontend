import React from "react";
import './Portfolio.css'


export default function Portfolio() {
    return (
        <>
            <section className="portfolio">
                <div className="portfolio__container">
                    <h3 className="portfolio__title">Портфолио</h3>
                    <ul className="portfolio__nav text">
                        <li className="portfolio__nav-item">
                            <a className="portfolio__link link" href="https://github.com/cerea62/how-to-learn"
                                target="_blank" rel="noopener noreferrer">Статичный сайт</a>
                        </li>
                        <li className="portfolio__nav-item">
                            <a className="portfolio__link link" href="https://github.com/cerea62/russian-travel"
                                target="_blank" rel="noopener noreferrer">Адаптивный сайт</a>
                        </li>
                        <li className="portfolio__nav-item">
                            <a className="portfolio__link link" href="https://github.com/cerea62/react-mesto-api-full-gha"
                                target="_blank" rel="noopener noreferrer">Одностраничное приложение</a>
                        </li>
                    </ul>
                </div>
            </section>

        </>
    )
}
