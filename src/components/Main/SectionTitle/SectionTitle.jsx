import React from "react";
import './SectionTitle.css'

export default function SectionTitle({ title }) {
    return (
        <>
            <h2 className="title__text">{title}</h2>
            <hr className="title__line"></hr>
        </>
    )
}