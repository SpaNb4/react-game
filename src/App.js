import React, { useState } from 'react';
import Header from './components/Header/Header';
import GameField from './components/GameField/GameField';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import classes from './App.module.scss';

function App() {
    const [isOrangeTheme, setOrangeTheme] = useState(false);

    function changeTheme() {
        document.body.classList.toggle('OrangeTheme');
        setOrangeTheme(!isOrangeTheme);
    }

    return (
        <div className={classes.App}>
            <Sidebar isOrange={isOrangeTheme} changeTheme={changeTheme} />
            <Header />
            <GameField isOrange={isOrangeTheme} />
            <Footer />
        </div>
    );
}

export default App;
