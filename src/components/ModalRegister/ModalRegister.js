import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './ModalRegister.module.scss';

export default function ModalRegister(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const modalCls = [classes.ModalRegister];

    if (props.isRegisterOpen) {
        modalCls.push(classes.Active);
    }

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

    if (props.isRegisterOpen) {
        return (
            <div className={modalCls.join(' ')}>
                <div className={classes.CloseBtn}>
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => props.setIsHotKeysOpen(false)} />
                </div>
                <h1>Register</h1>
                <form>
                    <label htmlFor="email">Email:</label>
                    <input id="email" ref={emailRef}></input>

                    <label htmlFor="password">Password:</label>
                    <input id="password" ref={passwordRef}></input>

                    <button onClick={submitRegister}>Register</button>
                </form>
            </div>
        );
    }
    return null;
}
