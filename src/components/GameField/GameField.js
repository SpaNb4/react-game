import React from 'react';
import Cell from './Cell/Cell';
import classes from './GameField.module.scss';

export default function GameField() {
    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className={classes.GameField}>
            <div className={classes.CellsItems}>
                {cells.map((cell, index) => {
                    return <Cell key={index} />;
                })}
            </div>
        </div>
    );
}
