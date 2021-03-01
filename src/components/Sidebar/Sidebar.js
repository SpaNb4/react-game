import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowDown,
    faArrowUp,
    faBars,
    faBell,
    faBellSlash,
    faVolumeMute,
    faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import soundBackground from '../GameField/audio/back_music.mp3';
import classes from './Sidebar.module.scss';
import ModalStats from '../Modals/ModalStats/ModalStats';
import ModalHotKeys from '../Modals/ModalHotKeys/ModalHotKeys';
import ModalLogin from '../Modals/ModalLogin/ModalLogin';
import ModalRegister from '../Modals/ModalRegister/ModalRegister';

const music = new Audio(soundBackground);
music.loop = true;

function Menu(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropDownMenu, setDropDownMenu] = useState(false);
    const [isHotKeysOpen, setIsHotKeysOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const menuCls = [classes.MenuPopup];
    const btnCls = [classes.Icon];
    const soundIconCls = [classes.SoundIcon, 'fa-fw'];
    const blackoutCls = [classes.Blackout];

    function menuClickHandler() {
        setIsMenuOpen(!isMenuOpen);
    }

    function blackoutClickHandler(event) {
        setIsMenuOpen(!isMenuOpen);
        closeAllModal();
    }

    useHotkeys('esc', () => {
        closeAllModal();
    });
    useHotkeys('m', () => setIsMenuOpen(!isMenuOpen));

    function musicClick() {
        props.setMusic();
        props.isMusic ? music.pause() : music.play();
    }

    function changeSoundVolume(event) {
        props.setSoundVolume(event.target.value / 100);
    }

    function changeMusicVolume(event) {
        props.setMusicVolume(event.target.value / 100);
        music.volume = props.musicVolume;
    }

    if (isMenuOpen) {
        menuCls.push(classes.Active);
        btnCls.push(classes.Rotate);
        blackoutCls.push(classes.BlackoutActive);
    }

    function closeAllModal() {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
        setIsStatsOpen(false);
        setIsHotKeysOpen(false);
    }

    function statsClickHandler() {
        closeAllModal();
        setIsStatsOpen(!isStatsOpen);
    }

    function hotKeysClickHandler() {
        closeAllModal();
        setIsHotKeysOpen(!isHotKeysOpen);
    }

    function loginClickHandler() {
        closeAllModal();
        setIsLoginOpen(!isLoginOpen);
    }

    function registerClickHandler() {
        closeAllModal();
        setIsRegisterOpen(!isRegisterOpen);
    }

    function logoutClickHandler() {
        fetch(`http://localhost:8000/logout`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    props.setAuth(false);
                }
            });
    }

    if (props.isOrangeTheme) {
        menuCls.push(classes.OrangeTheme);
    }

    return (
        <div>
            <FontAwesomeIcon className={btnCls.join(' ')} icon={faBars} onClick={menuClickHandler} />
            <div className={menuCls.join(' ')}>
                <ul className={classes.MenuUl}>
                    {props.isAuthenticated ? (
                        <li onClick={logoutClickHandler}>Logout</li>
                    ) : (
                        <div>
                            <li onClick={loginClickHandler}>Login</li> <li onClick={registerClickHandler}>Register</li>
                        </div>
                    )}
                    <li onClick={statsClickHandler}>Stats</li>
                    <li onClick={() => setDropDownMenu(!isDropDownMenu)}>
                        Volume Settings{' '}
                        {isDropDownMenu ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                    </li>
                    <ul>
                        {isDropDownMenu ? (
                            <div className={classes.SoundMenu}>
                                {props.isSound ? (
                                    <div className={classes.VolumeControl}>
                                        <FontAwesomeIcon
                                            className={soundIconCls.join(' ')}
                                            icon={faBell}
                                            onClick={() => props.setSound()}
                                        />
                                        <input
                                            type="range"
                                            value={props.soundVolume * 100}
                                            onChange={changeSoundVolume}
                                        ></input>
                                    </div>
                                ) : (
                                    <FontAwesomeIcon
                                        className={soundIconCls.join(' ')}
                                        icon={faBellSlash}
                                        onClick={() => props.setSound()}
                                    />
                                )}

                                {props.isMusic ? (
                                    <div className={classes.VolumeControl}>
                                        <FontAwesomeIcon
                                            className={soundIconCls.join(' ')}
                                            icon={faVolumeUp}
                                            onClick={musicClick}
                                        />
                                        <input
                                            type="range"
                                            value={props.musicVolume * 100}
                                            onChange={changeMusicVolume}
                                        ></input>
                                    </div>
                                ) : (
                                    <div className={classes.VolumeControl}>
                                        <FontAwesomeIcon
                                            className={soundIconCls.join(' ')}
                                            icon={faVolumeMute}
                                            onClick={musicClick}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </ul>
                    {props.isWithDiagonals ? (
                        <li onClick={() => props.setDiagonals(!props.isWithDiagonals)}>With Diagonals</li>
                    ) : (
                        <li onClick={() => props.setDiagonals(!props.isWithDiagonals)}>Without Diagonals</li>
                    )}
                    <li onClick={props.changeTheme}>Change Theme</li>
                    <li onClick={hotKeysClickHandler}>Hot keys</li>
                </ul>
            </div>
            <div className={blackoutCls.join(' ')} onClick={blackoutClickHandler}></div>
            <ModalStats isStatsOpen={isStatsOpen} stats={props.stats} closeAllModal={closeAllModal} />
            <ModalHotKeys isHotKeysOpen={isHotKeysOpen} closeAllModal={closeAllModal} />
            <ModalLogin
                isLoginOpen={isLoginOpen}
                setAuth={props.setAuth}
                setStatsFromBD={props.setStatsFromBD}
                closeAllModal={closeAllModal}
            />
            <ModalRegister isRegisterOpen={isRegisterOpen} closeAllModal={closeAllModal} />
        </div>
    );
}

export default Menu;
