import React, { useState, useEffect } from 'react';
import classes from './Timer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export function Timer(props) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let intervalId;

        if (props.isGameStart) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                props.setTime({ second: computedSecond, minute: computedMinute });

                setCounter((counter) => counter + 1);
            }, 1000);
        } else {
            stopTimer();
        }

        return () => clearInterval(intervalId);
    }, [props.isGameStart, counter]);

    function stopTimer() {
        setCounter(0);
    }

    return (
        <div className={classes.Timer}>
            <FontAwesomeIcon icon={faClock} />
            {props.minute}:{props.second}
        </div>
    );
}
