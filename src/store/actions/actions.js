import {
    CHANGE_THEME,
    END_GAME,
    OPEN_STATS,
    SET_CELLS,
    SET_DIAGONALS,
    SET_MUSIC,
    SET_MUSIC_VOLUME,
    SET_SOUND,
    SET_SOUND_VOLUME,
    SET_STATS,
    SET_TIME,
    SET_X_IS_NEXT,
    START_GAME,
    NEW_GAME,
    SET_COUNTER,
} from './actionTypes';

export function changeTheme() {
    return {
        type: CHANGE_THEME,
    };
}

export function startGame() {
    return {
        type: START_GAME,
    };
}

export function endGame() {
    return {
        type: END_GAME,
    };
}

export function setTime(time) {
    return {
        type: SET_TIME,
        payload: time,
    };
}

export function setCells(cells) {
    return {
        type: SET_CELLS,
        payload: cells,
    };
}

export function setSound() {
    return {
        type: SET_SOUND,
    };
}

export function setMusic() {
    return {
        type: SET_MUSIC,
    };
}

export function setSoundVolume(sound) {
    return {
        type: SET_SOUND_VOLUME,
        payload: sound,
    };
}

export function setMusicVolume(sound) {
    return {
        type: SET_MUSIC_VOLUME,
        payload: sound,
    };
}

export function setXisNext() {
    return {
        type: SET_X_IS_NEXT,
    };
}

export function setDiagonals() {
    return {
        type: SET_DIAGONALS,
    };
}

export function openStats(open) {
    return {
        type: OPEN_STATS,
        payload: open,
    };
}

export function setStats(stats) {
    return {
        type: SET_STATS,
        payload: stats,
    };
}

export function newGame() {
    return {
        type: NEW_GAME,
    };
}

export function setCounter(counter) {
    return {
        type: SET_COUNTER,
        payload: counter,
    };
}
