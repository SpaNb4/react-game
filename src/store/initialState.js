const initialState = JSON.parse(localStorage.getItem('state')) || {
    isOrangeTheme: false,
    isGameStart: false,
    isEnd: false,
    second: '00',
    minute: '00',
    timeCounter: 0,
    cells: Array(9).fill(null),
    xIsNext: true,
    isSound: true,
    isMusic: false,
    soundVolume: 1,
    musicVolume: 1,
    isWithDiagonals: true,
    isStatsOpen: false,
    stats: [],
    isAuthenticated: false,
};

export default initialState;
