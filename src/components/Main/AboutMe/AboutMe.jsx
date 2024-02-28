import React from "react";
import './AboutMe.css'
import SectionTitle from "../SectionTitle/SectionTitle";
import avatar from "../../../image/avatar.jpeg"

export default function AboutMe() {
    return (

        <>
            <section className="about-me">
                <div className="about-me__container">
                    <SectionTitle
                        title='Студент' />
                    <div className="about-me__content">
                        <div className="about-me__left">
                            <div>
                                <h3 className="about-me__name text">Наталья</h3>
                                <p className="about-me__job text">Фрилансер</p>
                                <p className="about-me__resume text">Я живу в Рязани. Закончила РГРТУ по направлению "Метрология".
                                    После длительного декрета решила сменить профессию. Сейчас учусь в Яндекс.Практикуме на курсе веб-разработки.</p>
                            </div>
                            <a className="about-me__link link" href="https://github.com/cerea62"
                                target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                        <img className="about-me__avatar" src={avatar} alt="Аватар студента" />
                    </div>

                </div>
            </section>


        </>
    )
}