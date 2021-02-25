import {
    CHANGE_THEME,
    END_GAME,
    SET_TIME,
    START_GAME,
    SET_CELLS,
    SET_SOUND,
    SET_MUSIC,
    SET_SOUND_VOLUME,
    SET_MUSIC_VOLUME,
    SET_X_IS_NEXT,
    SET_DIAGONALS,
    OPEN_STATS,
    SET_STATS,
    NEW_GAME,
    SET_COUNTER,
} from '../actions/actionTypes';
import initialState from '../initialState';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return { ...state, isOrangeTheme: !state.isOrangeTheme };
        case START_GAME:
            return { ...state, isGameStart: true, isEnd: false };
        case END_GAME:
            return { ...state, isGameStart: false, isEnd: true };
        case SET_TIME:
            return { ...state, second: action.payload.second, minute: action.payload.minute };
        case SET_CELLS:
            return { ...state, cells: action.payload };
        case SET_SOUND:
            return { ...state, isSound: !state.isSound };
        case SET_MUSIC:
            return { ...state, isMusic: !state.isMusic };
        case SET_SOUND_VOLUME:
            return { ...state, soundVolume: action.payload };
        case SET_MUSIC_VOLUME:
            return { ...state, musicVolume: action.payload };
        case SET_X_IS_NEXT:
            return { ...state, xIsNext: !state.xIsNext };
        case SET_DIAGONALS:
            return { ...state, isWithDiagonals: !state.isWithDiagonals };
        case OPEN_STATS:
            return { ...state, isStatsOpen: action.payload };
        case SET_STATS:
            return { ...state, stats: [...state.stats, action.payload] };
        case NEW_GAME:
            return {
                ...state,
                isGameStart: false,
                isEnd: false,
                cells: Array(9).fill(null),
                second: '00',
                minute: '00',
            };
        case SET_COUNTER:
            return { ...state, timeCounter: action.payload };
        default:
            return state;
    }
}
