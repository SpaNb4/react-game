import {
    CHANGE_THEME,
    END_GAME,
    SET_CELLS,
    SET_MUSIC,
    SET_MUSIC_VOLUME,
    SET_SOUND,
    SET_SOUND_VOLUME,
    SET_TIME,
    SET_X_IS_NEXT,
    START_GAME,
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
