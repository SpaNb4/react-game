import React from 'react';
import { connect } from 'react-redux';
import Header from './components/Header/Header';
import GameField from './components/GameField/GameField';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import classes from './App.module.scss';
import {
    changeTheme,
    startGame,
    endGame,
    setTime,
    setCells,
    setSound,
    setMusic,
    setSoundVolume,
    setMusicVolume,
    setXisNext,
    setDiagonals,
    setStats,
    newGame,
    setCounter,
    setAuth,
    setStatsFromBD,
} from './store/actions/actions';

function App(props) {
    if (props.isOrangeTheme) {
        document.getElementById('root').classList.add(classes.OrangeTheme);
        document.getElementById('root').classList.remove(classes.StandartTheme);
    } else {
        document.getElementById('root').classList.remove(classes.OrangeTheme);
        document.getElementById('root').classList.add(classes.StandartTheme);
    }

    return (
        <div className={classes.App}>
            <Sidebar {...props} />
            <Header />
            <GameField {...props} />
            <Footer />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isOrangeTheme: state.reducer.isOrangeTheme,
        isGameStart: state.reducer.isGameStart,
        isEnd: state.reducer.isEnd,
        second: state.reducer.second,
        minute: state.reducer.minute,
        timeCounter: state.reducer.timeCounter,
        cells: state.reducer.cells,
        xIsNext: state.reducer.xIsNext,
        isSound: state.reducer.isSound,
        isMusic: state.reducer.isMusic,
        soundVolume: state.reducer.soundVolume,
        musicVolume: state.reducer.musicVolume,
        isWithDiagonals: state.reducer.isWithDiagonals,
        stats: state.reducer.stats,
        isAuthenticated: state.reducer.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeTheme: () => dispatch(changeTheme()),
        startGame: () => dispatch(startGame()),
        endGame: () => dispatch(endGame()),
        setTime: (time) => dispatch(setTime(time)),
        setCells: (cells) => dispatch(setCells(cells)),
        setSound: () => dispatch(setSound()),
        setMusic: () => dispatch(setMusic()),
        setSoundVolume: (sound) => dispatch(setSoundVolume(sound)),
        setMusicVolume: (sound) => dispatch(setMusicVolume(sound)),
        setXisNext: () => dispatch(setXisNext()),
        setDiagonals: () => dispatch(setDiagonals()),
        setStats: (stats) => dispatch(setStats(stats)),
        newGame: () => dispatch(newGame()),
        setCounter: (counter) => dispatch(setCounter(counter)),
        setAuth: (auth) => dispatch(setAuth(auth)),
        setStatsFromBD: (stats) => dispatch(setStatsFromBD(stats)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
