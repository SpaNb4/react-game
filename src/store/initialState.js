const initialState = {
    isOrangeTheme: false,
    isGameStart: false,
    isEnd: false,
    second: '00',
    minute: '00',
    cells: Array(9).fill(null),
    xIsNext: true,
    isSound: true,
    isMusic: false,
    soundVolume: 1,
    musicVolume: 1,
    isWithDiagonals: true,
};

export default initialState;
