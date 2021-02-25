import React from 'react';
import classes from './ModalStats.module.scss';

export default function ModalStats(props) {
    const modalCls = [classes.ModalStats];

    if (props.isStatsOpen) {
        modalCls.push(classes.Active);
    }

    if (props.isStatsOpen) {
        return (
            <div className={modalCls.join(' ')}>
                <table>
                    <tbody>
                        <tr>
                            <td>Winner</td>
                            <td>Time</td>
                        </tr>
                        {props.stats.map((elem, index) => {
                            return (
                                <tr key={index}>
                                    <td>{elem.winner.winner}</td>
                                    <td>{elem.time}</td>
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
