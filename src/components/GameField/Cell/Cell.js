import React, { useState } from 'react';
import classes from './Cell.module.scss';

export default function Cell() {
    const [value, setValue] = useState(null);

    function cellClickHandler() {
        setValue('X');
    }

    return (
        <div className={classes.Cell} onClick={cellClickHandler}>
            <span>{value}</span>
        </div>
    );
}
