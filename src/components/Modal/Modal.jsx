import React from "react";
import './Modal.css'
import successIcon from '../../image/success-icon.svg'
import failIcon from '../../image/fail-icon.svg'

export default function Modal({ isOpen, onClose, title, statusInfo }) {
    const modalOpenModificatorClass = `${isOpen ? 'modal_opened' : ' '}`;
    return (
        <div className={`modal ${modalOpenModificatorClass}`}>
            <div className="modal__container">
                <button type="button"
                    className="modal__close"
                    onClick={onClose}></button>
                <div className="modal__tooltip">
                    {statusInfo ?
                        (<img className="modal__tooltip-img" src={successIcon} alt="Успех!" />)
                        :
                        (<img className="modal__tooltip-img" src={failIcon} alt="Ошибка!" />)
                    }
                    <h2 className="modal__title">{`${title}`}</h2>
                </div>

            </div>
        </div>
    )
}
