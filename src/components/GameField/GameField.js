import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import Cell from './Cell/Cell';
import classes from './GameField.module.scss';
import soundX from '../../assets/audio/X_click.wav';
import soundO from '../../assets/audio/O_click.wav';
import soundWin from '../../assets/audio/win.wav';
import soundNoWinner from '../../assets/audio/no_winner.wav';
import { Timer } from './Timer/Timer';
import { backendURL } from '../../config';

const element = document.getElementById('root');

export default function GameField(props) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [isActive, setIsActive] = useState(true);
    const movesCls = [classes.Moves];

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
            const stats = {
                winner,
                time: `${props.minute}:${props.second}`,
            };
            props.setStats(stats);

            if (props.isAuthenticated) {
                const username = localStorage.getItem('username');
                fetch(`${backendURL}/save`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        stats: [...props.stats, stats],
                    }),
                });
            }
        }

        localStorage.setItem('state', JSON.stringify(props));
    });

    useHotkeys(
        'left',
        () => {
            if (activeIndex % 3) {
                setActiveIndex((prevCount) => prevCount - 1);
                setIsActive(true);
            }
        },
        [activeIndex]
    );
    useHotkeys(
        'up',
        () => {
            if (activeIndex > 9 / 3 - 1) {
                setActiveIndex((prevCount) => prevCount - 3);
                setIsActive(true);
            }
        },
        [activeIndex]
    );
    useHotkeys(
        'right',
        () => {
            if ((activeIndex + 1) % 3) {
                setActiveIndex((prevCount) => prevCount + 1);
                setIsActive(true);
            }
        },
        [activeIndex]
    );
    useHotkeys(
        'down',
        () => {
            if (activeIndex < (6 * 3) / 3) {
                setActiveIndex((prevCount) => prevCount + 3);
                setIsActive(true);
            }
        },
        [activeIndex]
    );

    useHotkeys(
        'enter',
        () => {
            if (!isAutoPlay && !props.isEnd) {
                cellClickHandler(activeIndex);
            }
        },
        [activeIndex, props.cells, props.isEnd]
    );

    useHotkeys('q', () => props.newGame());

    if (winner) {
        status = winner.winner + ' win!';
        movesCls.push(classes.Winner);
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

    function startNewGame() {
        props.newGame();
        setIsAutoPlay(false);
        setIsActive(false);
    }

    function getRandomIndex() {
        let index = Math.round(Math.random() * 8);
        if (!props.cells[index]) {
            return index;
        }
        return getRandomIndex();
    }

    function autoPlay() {
        startNewGame();
        setIsAutoPlay(true);
    }

    useEffect(() => {
        let interval;

        if (isAutoPlay && !props.isEnd) {
            interval = setInterval(() => {
                let randomIndex = getRandomIndex();
                cellClickHandler(randomIndex);
            }, 1000);
        } else {
            setIsAutoPlay(false);
        }

        return () => clearInterval(interval);
    }, [isAutoPlay, props.cells, props.isEnd, props.xIsNext]);

    useEffect(() => {
        element.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                setIsFullScreen(false);
            } else {
                setIsFullScreen(true);
            }
        });

        return () => {
            element.removeEventListener('fullscreenchange', fullScreenClickHandler);
        };
    }, []);

    function fullScreenClickHandler() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            fullScreen(element);
        }
    }

    function fullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitrequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullscreen) {
            element.mozRequestFullScreen();
        }
    }

    if (!props.cells.includes(null) && !winner) {
        movesCls.push(classes.Winner);
    }

    return (
        <div className={classes.GameField}>
            <Timer {...props} />
            <div className={classes.TopMenuField}>
                <div className={movesCls.join(' ')}>{status}</div>
                {isFullScreen ? (
                    <FontAwesomeIcon
                        icon={faExpandArrowsAlt}
                        className={classes.Icon}
                        onClick={fullScreenClickHandler}
                    />
                ) : (
                    <FontAwesomeIcon icon={faCompressAlt} className={classes.Icon} onClick={fullScreenClickHandler} />
                )}
            </div>
            <div className={classes.CellsItems}>
                {props.cells.map((cell, index) => {
                    if (winner) {
                        if (winner.lines[0] === index || winner.lines[1] === index || winner.lines[2] === index) {
                            return (
                                <Cell
                                    isOrangeTheme={props.isOrangeTheme}
                                    win={true}
                                    key={index}
                                    value={props.cells[index]}
                                />
                            );
                        }
                    }
                    if (isAutoPlay) {
                        return (
                            <Cell
                                isOrangeTheme={props.isOrangeTheme}
                                key={index}
                                number={index}
                                value={props.cells[index]}
                            />
                        );
                    } else {
                        if (isActive) {
                            return (
                                <Cell
                                    isOrangeTheme={props.isOrangeTheme}
                                    active={activeIndex}
                                    key={index}
                                    number={index}
                                    value={props.cells[index]}
                                    cellClickHandler={() => cellClickHandler(index)}
                                />
                            );
                        } else {
                            return (
                                <Cell
                                    isOrangeTheme={props.isOrangeTheme}
                                    key={index}
                                    number={index}
                                    value={props.cells[index]}
                                    cellClickHandler={() => cellClickHandler(index)}
                                />
                            );
                        }
                    }
                })}
            </div>
            <div className={classes.BottomMenuField}>
                <div onClick={changeMovesOrder}>Moves Order</div>
                <div onClick={startNewGame}>New Game</div>
                <div onClick={autoPlay}>Autoplay</div>
            </div>
        </div>
    );
}
