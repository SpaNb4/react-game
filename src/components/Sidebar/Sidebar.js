import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classes from './Sidebar.module.scss';

function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuCls = [classes.MenuPopup];
    const btnCls = [classes.Icon];
    const blackoutCls = [classes.Blackout];

    function menuClickHandler() {
        setIsMenuOpen(!isMenuOpen);
    }

    function blackoutClickHandler(event) {
        setIsMenuOpen(!isMenuOpen);
    }

    if (isMenuOpen) {
        menuCls.push(classes.Active);
        btnCls.push(classes.Rotate);
        blackoutCls.push(classes.BlackoutActive);
    }

    return (
        <div>
            <FontAwesomeIcon className={btnCls.join(' ')} icon={faBars} onClick={menuClickHandler} />
            <div className={menuCls.join(' ')}>
                <ul className={classes.MenuUl}>
                    <li>Auth</li>
                    <li>Stats</li>
                    <li>Volume Settings</li>
                </ul>
            </div>
            <div className={blackoutCls.join(' ')} onClick={blackoutClickHandler}></div>
        </div>
    );
}

export default Menu;
