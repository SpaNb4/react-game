import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowCircleDown,
    faArrowCircleLeft,
    faArrowCircleRight,
    faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import classes from './ModalHotKeys.module.scss';
import Modal from '../Modal';

export default function ModalHotKeys(props) {
    return (
        <Modal isShow={props.isHotKeysOpen} closeAllModal={props.closeAllModal}>
            <div className={classes.ModalHotKeys}>
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
        </Modal>
    );
}
