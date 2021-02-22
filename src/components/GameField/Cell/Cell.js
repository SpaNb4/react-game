import React from 'react';
import classes from './Cell.module.scss';

export default function Cell(props) {
    const cls = [classes.Cell];
    const cellCls = [classes.Marker];

    if (props.win) {
        cls.push(classes.Win);
    }

    if (props.isOrange) {
        cls.push(classes.OrangeTheme);
        cellCls.push(classes.OrangeTheme);
    }

    return (
        <div className={cls.join(' ')} onClick={props.cellClickHandler}>
            {props.value ? <span className={cellCls.join(' ')}>{props.value}</span> : null}
        </div>
    );
}
