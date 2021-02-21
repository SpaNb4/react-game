import React, { useState } from 'react';
import Cell from './Cell/Cell';
import classes from './GameField.module.scss';
import soundX from './audio/X_click.wav';
import soundO from './audio/O_click.wav';
import soundWin from './audio/win.wav';
import soundNoWinner from './audio/no_winner.wav';
import soundBackground from './audio/back_music.mp3';

const music = new Audio(soundBackground);
music.loop = true;

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
            return {
                winner: cells[a],
                lines: lines[i],
            };
        }
    }

    return null;
}

export default function GameField() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const [isSound, setSound] = useState(true);
    const [isMusic, setMusic] = useState(false);
    const [soundVolume, setSoundVolume] = useState(1);
    const [musicVolume, setMusicVolume] = useState(1);
    const [isEnd, setIsEnd] = useState(false);

    function cellClickHandler(index) {
        const cellsCopy = cells.slice();

        if (calculateWinner(cells) || cells[index]) {
            return;
        }

        cellsCopy[index] = xIsNext ? 'X' : 'O';
        setCells(cellsCopy);
        setXisNext(!xIsNext);

        if (isSound) {
            const audio = new Audio(xIsNext ? soundX : soundO);
            audio.volume = soundVolume;
            audio.play();
        }
    }

    let status;
    const winner = calculateWinner(cells);

    if (!cells.includes(null) && !winner && !isEnd) {
        status = 'Nobody wins! Try again';

        if (isSound) {
            const audioNoWinner = new Audio(soundNoWinner);
            audioNoWinner.volume = soundVolume;
            audioNoWinner.play();
        }
        setIsEnd(true);
    } else if (winner && !isEnd) {
        if (isSound) {
            const audioWin = new Audio(soundWin);
            audioWin.volume = soundVolume;
            audioWin.play();
        }
        setIsEnd(true);
    }

    if (!status) {
        winner ? (status = winner.winner + ' win!') : (status = `It's player ` + (xIsNext ? 'X' : 'O') + ' turn');
    }

    function musicClick() {
        setMusic(!isMusic);
        isMusic ? music.pause() : music.play();
    }

    function changeSoundVolume(event) {
        setSoundVolume(event.target.value / 100);
    }

    function changeMusicVolume(event) {
        setMusicVolume(event.target.value / 100);
        music.volume = musicVolume;
    }

    return (
        <div className={classes.GameField}>
            <div className={classes.TopMenuField}>
                <div className={classes.Moves}>{status}</div>
                {isSound ? (
                    <div className={classes.VolumeControl}>
                        <i className="material-icons" onClick={() => setSound(!isSound)}>
                            notifications_active
                        </i>
                        <input type="range" value={soundVolume * 100} onChange={changeSoundVolume}></input>
                    </div>
                ) : (
                    <i className="material-icons" onClick={() => setSound(!isSound)}>
                        notifications_off
                    </i>
                )}

                {isMusic ? (
                    <div className={classes.VolumeControl}>
                        <i className="material-icons" onClick={musicClick}>
                            pause
                        </i>
                        <input type="range" value={musicVolume * 100} onChange={changeMusicVolume}></input>
                    </div>
                ) : (
                    <div className={classes.VolumeControl}>
                        <i className="material-icons" onClick={musicClick}>
                            play_arrow
                        </i>
                        <p>Play music</p>
                    </div>
                )}
            </div>
            <div className={classes.CellsItems}>
                {cells.map((cell, index) => {
                    if (winner) {
                        if (winner.lines[0] == index || winner.lines[1] == index || winner.lines[2] == index) {
                            return (
                                <Cell
                                    win={true}
                                    key={index}
                                    value={cells[index]}
                                    cellClickHandler={() => cellClickHandler(index)}
                                />
                            );
                        }
                    }
                    return <Cell key={index} value={cells[index]} cellClickHandler={() => cellClickHandler(index)} />;
                })}
            </div>
        </div>
    );
}
