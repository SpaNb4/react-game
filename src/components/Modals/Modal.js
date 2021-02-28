import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './Modal.module.scss';

export default function Modal(props) {
    const modalCls = [classes.Modal];

    if (props.isShow) {
        modalCls.push(classes.Active);
    }

    return (
        <div className={modalCls.join(' ')}>
            <div className={classes.CloseBtn}>
                <FontAwesomeIcon icon={faTimesCircle} onClick={props.closeAllModal} />
            </div>
            {props.children}
        </div>
    );
}
