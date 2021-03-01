import React, { useRef } from 'react';
import Modal from '../Modal';
import classes from '../ModalAuth/ModalAuth.module.scss';
import { backendURL } from '../../../config';

export default function ModalRegister(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const registerStatusRef = useRef(null);

    function submitRegister(event) {
        event.preventDefault();
        fetch(`${backendURL}/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }),
        }).then((res) => {
            if (res.ok) {
                registerStatusRef.current.innerHTML = `You have successfully registered`;
                registerStatusRef.current.classList.add(classes.Success);
                registerStatusRef.current.classList.remove(classes.Failed);
            } else {
                registerStatusRef.current.innerHTML = 'User already exists';
                registerStatusRef.current.classList.add(classes.Failed);
                registerStatusRef.current.classList.remove(classes.Success);
            }
        });
    }

    return (
        <Modal isShow={props.isRegisterOpen} closeAllModal={props.closeAllModal}>
            <div className={classes.ModalAuth}>
                <h1>Register</h1>
                <form onSubmit={submitRegister}>
                    <label htmlFor="register_email">Email:</label>
                    <input id="register_email" ref={emailRef} type="email" required></input>

                    <label htmlFor="register_password">Password:</label>
                    <input id="register_password" ref={passwordRef} type="password" minLength="4" required></input>
                    <div ref={registerStatusRef} className={classes.Status}></div>

                    <button>Register</button>
                </form>
            </div>
        </Modal>
    );
}
