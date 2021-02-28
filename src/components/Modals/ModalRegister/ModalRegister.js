import React, { useRef } from 'react';
import Modal from '../Modal';
import classes from './ModalRegister.module.scss';

export default function ModalRegister(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function submitRegister(event) {
        event.preventDefault();
        fetch(`http://localhost:8000/register`, {
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
                console.log('OK');
            } else {
                console.log('User already exists');
            }
        });
    }

    return (
        <Modal isShow={props.isRegisterOpen} closeAllModal={props.closeAllModal}>
            <div className={classes.ModalRegister}>
                <h1>Register</h1>
                <form>
                    <label htmlFor="register_email">Email:</label>
                    <input id="register_email" ref={emailRef}></input>

                    <label htmlFor="register_password">Password:</label>
                    <input id="register_password" ref={passwordRef}></input>

                    <button onClick={submitRegister}>Register</button>
                </form>
            </div>
        </Modal>
    );
}
