import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './ModalStats.module.scss';

export default function ModalStats(props) {
    const modalCls = [classes.ModalStats];

    if (props.isStatsOpen) {
        modalCls.push(classes.Active);
    }

    const copyStats = [...props.stats];
    copyStats.reverse();
    copyStats.length = 10;

    if (props.isStatsOpen) {
        return (
            <div className={modalCls.join(' ')}>
                <div className={classes.CloseBtn}>
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => props.openStats(false)} />
                </div>
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
        );
    }
    return null;
}
