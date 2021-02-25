import React, { useEffect } from 'react';
import classes from './Timer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export function Timer(props) {
    useEffect(() => {
        let intervalId;

        if (props.isGameStart) {
            intervalId = setInterval(() => {
                const secondCounter = props.timeCounter % 60;
                const minuteCounter = Math.floor(props.timeCounter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                props.setTime({ second: computedSecond, minute: computedMinute });

                props.setCounter(props.timeCounter + 1);
            }, 1000);
        } else {
            stopTimer();
        }

        return () => clearInterval(intervalId);
    }, [props.isGameStart, props.timeCounter]);

    function stopTimer() {
        props.setCounter(0);
    }

    return (
        <div className={classes.Timer}>
            <FontAwesomeIcon icon={faClock} />
            {props.minute}:{props.second}
        </div>
    );
}
