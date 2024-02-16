import React from "react";
import './AboutProject.css'
import SectionTitle from "../SectionTitle/SectionTitle";

export default function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <div className="about-project__container">
                <SectionTitle
                    title='О проекте'
                />
                <div className="about-project__content">
                    <div>
                        <p className="about-project__subtitle">Дипломный проект включал 5 этапов</p>
                        <p className="about-project__text">Составление плана, работу над бэкендом,
                            вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div>
                        <p className="about-project__subtitle">На выполнение диплома ушло 5 недель</p>
                        <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн,
                            которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="about-project__time-frame">
                    <div className="about-project__duration about-project__duration-back">
                    <p className="about-project__period about-project__period_theme_color">1 неделя</p>
                    <p className="about-project__type">Back-end</p>
                    </div>
                    <div className="about-project__duration about-project__duration-front">
                    <p className="about-project__period">4 недели</p>
                    <p className="about-project__type">Front-end</p>
                    </div>

                </div>
            </div>
        </section>
    )
}