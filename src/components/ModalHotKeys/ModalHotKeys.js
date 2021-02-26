import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowCircleDown,
    faArrowCircleLeft,
    faArrowCircleRight,
    faArrowCircleUp,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import classes from './ModalHotKeys.module.scss';

export default function ModalHotKeys(props) {
    const modalCls = [classes.ModalHotKeys];

    if (props.isHotKeysOpen) {
        modalCls.push(classes.Active);
    }

    useHotkeys('esc', () => {
        props.setIsHotKeysOpen(false);
    });

    if (props.isHotKeysOpen) {
        return (
            <div className={modalCls.join(' ')}>
                <div className={classes.CloseBtn}>
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => props.setIsHotKeysOpen(false)} />
                </div>
                <h1>Hot Keys</h1>
                <div>ESC - close modal window</div>
                <div>Q - start new game</div>
                <div>M - open sidebar menu</div>
                <hr></hr>
                <div>
                    <FontAwesomeIcon icon={faArrowCircleUp} />
                    <FontAwesomeIcon icon={faArrowCircleDown} />
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                    <FontAwesomeIcon icon={faArrowCircleRight} /> - move active cell
                </div>
                <div>ENTER - set cross or zero</div>
            </div>
        );
    }
    return null;
}
