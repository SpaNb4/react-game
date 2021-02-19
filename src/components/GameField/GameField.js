import React, { useState } from 'react';
import Cell from './Cell/Cell';
import classes from './GameField.module.scss';

function calculateWinner(cells) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return null;
}

export default function GameField() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);

    function cellClickHandler(index) {
        const cellsCopy = cells.slice();
        if (calculateWinner(cells) || cells[index]) {
            return;
        }
        cellsCopy[index] = xIsNext ? 'X' : 'O';
        setCells(cellsCopy);
        setXisNext(!xIsNext);
    }

    let status;
    const winner = calculateWinner(cells);
    winner ? (status = winner + ' win!') : (status = `It's player ` + (xIsNext ? 'X' : 'O') + ' turn');

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
