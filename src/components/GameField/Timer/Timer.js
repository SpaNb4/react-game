import React from 'react';
import classes from './Timer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            isOn: false,
            start: 0,
        };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time,
        });

        this.timer = setInterval(
            () =>
                this.setState({
                    time: Date.now() - this.state.start,
                }),
            1000
        );
    }

    stopTimer() {
        this.setState({ isOn: false });
        clearInterval(this.timer);
    }

    resetTimer() {
        this.setState({ time: 0, isOn: false });
    }

    componentDidMount() {
        if (!this.props.isGameStart) {
            this.startTimer();
        }
    }

    render() {
        return (
            <div className={classes.Timer}>
                <FontAwesomeIcon icon={faClock} /> {Math.round(this.state.time / 1000)} sec
            </div>
        );
    }
}
