import React from 'react';
import Modal from '../Modal';
import classes from './ModalStats.module.scss';

export default function ModalStats(props) {
    const copyStats = [...props.stats];
    copyStats.reverse();
    copyStats.length = 10;

    return (
        <Modal isShow={props.isStatsOpen} closeAllModal={props.closeAllModal}>
            <div className={classes.ModalStats}>
                <table>
                    <tbody>
                        <tr>
                            <td>Winner</td>
                            <td>Time</td>
                            <td>Win Lines</td>
                        </tr>
                        {copyStats.map((elem, index) => {
                            return (
                                <tr key={index}>
                                    <td>{elem.winner.winner}</td>
                                    <td>{elem.time}</td>
                                    <td>{elem.winner.lines}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}
