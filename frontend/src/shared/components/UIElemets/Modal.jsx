import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop'
import './Modal.css'

function ModalOverlay(props) {
    const { className, style, headerClass, header, onSubmit, contentClass, children, footerClass, footer } = props;

    const content = (
        <div
            className={`modal ${className}`}
            style={style}
        >
            {header && <header className={`modal__header ${headerClass}`}>
                <h2>{header}</h2>
            </header>}
            <form onSubmit={onSubmit ? onSubmit : e => e.preventDefault()}>
                <div className={`modal__content ${contentClass}`}>
                    {children}
                </div>
                <footer className={`modal__footer ${footerClass}`}>
                    {footer}
                </footer>
            </form>
        </div>
    )

    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

function Modal(props) {
    const { onCancel, show } = props;

    if (show) return (
        <>
            <Backdrop onClick={onCancel} />
            <ModalOverlay {...props} />
        </>
    )
}

export default Modal