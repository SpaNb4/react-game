import React, { useState } from 'react';
import Cell from './Cell/Cell';
import classes from './GameField.module.scss';

export default function GameField() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);

    function cellClickHandler(index) {
        const cellsCopy = cells.slice();
        cellsCopy[index] = xIsNext ? 'X' : 'O';
        setCells(cellsCopy);
        setXisNext(!xIsNext);
    }

    const status = `It's player ` + (xIsNext ? 'X' : 'O') + ' turn';

    return (
        <div className={classes.GameField}>
            <div className={classes.Moves}>{status}</div>
            <div className={classes.CellsItems}>
                {cells.map((cell, index) => {
                    return <Cell key={index} value={cells[index]} cellClickHandler={() => cellClickHandler(index)} />;
                })}
            </div>
        </div>
    );
}
