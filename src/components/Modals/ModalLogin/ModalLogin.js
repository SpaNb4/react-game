import React, { useRef } from 'react';
import classes from '../ModalAuth/ModalAuth.module.scss';
import Modal from '../Modal';
import { backendURL } from '../../../config';

export default function ModalLogin(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const loginStatusRef = useRef(null);

    function submitLogin(event) {
        event.preventDefault();
        fetch(`${backendURL}/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.errors) {
                    loginStatusRef.current.innerHTML = 'Invalid email or password';
                    loginStatusRef.current.classList.add(classes.Failed);
                    loginStatusRef.current.classList.remove(classes.Success);
                } else if (res.success) {
                    loginStatusRef.current.innerHTML = `You're logged in`;
                    loginStatusRef.current.classList.add(classes.Success);
                    loginStatusRef.current.classList.remove(classes.Failed);
                    props.setAuth(true);
                    localStorage.setItem('username', res.success);

                    return fetch(`${backendURL}/getsave`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: res.success,
                        }),
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res.errors) {
                                return {};
                            } else if (res.success.stats) {
                                props.setStatsFromBD(res.success.stats);
                                return res.success.stats;
                            } else {
                                return {};
                            }
                        });
                }
            });
    }

    return (
        <Modal isShow={props.isLoginOpen} closeAllModal={props.closeAllModal}>
            <div className={classes.ModalAuth}>
                <h1>Login</h1>
                <form onSubmit={submitLogin}>
                    <label htmlFor="login_email">Email:</label>
                    <input id="login_email" ref={emailRef} type="email" required></input>
                    <label htmlFor="login_password">Password:</label>
                    <input id="login_password" ref={passwordRef} type="password" minLength="4" required></input>
                    <div ref={loginStatusRef} className={classes.Status}></div>
                    <button>Login</button>
                </form>
            </div>
        </Modal>
    );
}
