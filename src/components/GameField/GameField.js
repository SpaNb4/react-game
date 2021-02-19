import React, { useState } from 'react';
import Cell from './Cell/Cell';
import classes from './GameField.module.scss';

export default function GameField() {
    const [cells, setCells] = useState(Array(9).fill(null));

    function cellClickHandler(index) {
        const cellsCopy = cells.slice();
        cellsCopy[index] = 'X';
        setCells(cellsCopy);
    }

    return (
        <div className={classes.GameField}>
            <div className={classes.CellsItems}>
                {cells.map((cell, index) => {
                    return <Cell key={index} value={cells[index]} cellClickHandler={() => cellClickHandler(index)} />;
                })}
            </div>
        </div>
    );
}
