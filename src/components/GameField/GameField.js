import React, { useEffect } from 'react';
import Cell from './Cell/Cell';
import classes from './GameField.module.scss';
import soundX from './audio/X_click.wav';
import soundO from './audio/O_click.wav';
import soundWin from './audio/win.wav';
import soundNoWinner from './audio/no_winner.wav';
import { Timer } from './Timer/Timer';

export default function GameField(props) {
    function cellClickHandler(index) {
        if (!props.isEnd) {
            props.startGame();

            const cellsCopy = props.cells.slice();

            if (calculateWinner(props.cells) || props.cells[index]) {
                return;
            }

            cellsCopy[index] = props.xIsNext ? 'X' : 'O';
            props.setCells(cellsCopy);
            props.setXisNext();

            if (props.isSound) {
                const audio = new Audio(props.xIsNext ? soundX : soundO);
                audio.volume = props.soundVolume;
                audio.play();
            }
        }
    }

    function calculateWinner(cells) {
        let lines;
        if (props.isWithDiagonals) {
            lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
        } else {
            lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ];
        }

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return {
                    winner: cells[a],
                    lines: lines[i],
                };
            }
        }

        return null;
    }

    let status;
    const winner = calculateWinner(props.cells);

    useEffect(() => {
        if (!props.cells.includes(null) && !winner && !props.isEnd) {
            if (props.isSound) {
                const audioNoWinner = new Audio(soundNoWinner);
                audioNoWinner.volume = props.soundVolume;
                audioNoWinner.play();
            }

            props.endGame();
        } else if (winner && !props.isEnd) {
            if (props.isSound) {
                const audioWin = new Audio(soundWin);
                audioWin.volume = props.soundVolume;
                audioWin.play();
            }

            props.endGame();
        }
    });

    if (winner) {
        status = winner.winner + ' win!';
    } else {
        if (props.isEnd) {
            status = 'Nobody wins! Try again';
        } else {
            status = `It's player ` + (props.xIsNext ? 'X' : 'O') + ' turn';
        }
    }

    function changeMovesOrder() {
        if (!props.isGameStart) {
            props.setXisNext();
        }
    }

    return (
        <div className={classes.GameField}>
            <Timer {...props} />
            <div className={classes.TopMenuField}>
                <div className={classes.Moves}>{status}</div>
            </div>
            <div className={classes.CellsItems}>
                {props.cells.map((cell, index) => {
                    if (winner) {
                        if (winner.lines[0] == index || winner.lines[1] == index || winner.lines[2] == index) {
                            return (
                                <Cell
                                    isOrange={props.isOrange}
                                    win={true}
                                    key={index}
                                    value={props.cells[index]}
                                    cellClickHandler={() => cellClickHandler(index)}
                                />
                            );
                        }
                    }
                    return (
                        <Cell
                            isOrange={props.isOrange}
                            key={index}
                            value={props.cells[index]}
                            cellClickHandler={() => cellClickHandler(index)}
                        />
                    );
                })}
            </div>
            <div className={classes.BottomMenuField} onClick={changeMovesOrder}>
                Change Moves Order
            </div>
        </div>
    );
}
