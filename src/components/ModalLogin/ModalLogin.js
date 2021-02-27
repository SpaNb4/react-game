import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './ModalLogin.module.scss';

export default function ModalLogin(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const modalCls = [classes.ModalLogin];

    if (props.isLoginOpen) {
        modalCls.push(classes.Active);
    }

    function submitLogin(event) {
        event.preventDefault();
        fetch(`http://localhost:8000/login`, {
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
                    console.log('Invalid email or password');
                } else if (res.success) {
                    console.log("You're logged in");
                    props.setAuth();

                    return fetch(`http://localhost:8000/getsave`, {
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

    if (props.isLoginOpen) {
        return (
            <div className={modalCls.join(' ')}>
                <div className={classes.CloseBtn}>
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => props.setIsHotKeysOpen(false)} />
                </div>
                <h1>Login</h1>
                <form>
                    <label htmlFor="email">Email:</label>
                    <input id="email" ref={emailRef} type="text"></input>
                    <label htmlFor="password">Password:</label>
                    <input id="password" ref={passwordRef} type="password"></input>
                    <button onClick={submitLogin}>Login</button>
                </form>
            </div>
        );
    }
    return null;
}
