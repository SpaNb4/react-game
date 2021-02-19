import React from 'react';
import classes from './Cell.module.scss';

export default function Cell(props) {
    const cls = [classes.Cell];

    if (props.win) {
        cls.push(classes.Win);
    }

    return (
        <div className={cls.join(' ')} onClick={props.cellClickHandler}>
            {props.value ? <span className={classes.Marker}>{props.value}</span> : null}
        </div>
    );
}
