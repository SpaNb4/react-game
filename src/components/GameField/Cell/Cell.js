import React, { useState } from 'react';
import classes from './Cell.module.scss';

export default function Cell(props) {
    return (
        <div className={classes.Cell} onClick={props.cellClickHandler}>
            <span>{props.value}</span>
        </div>
    );
}
