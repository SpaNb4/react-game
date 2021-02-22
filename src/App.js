import Header from './components/Header/Header';
import GameField from './components/GameField/GameField';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import classes from './App.module.scss';

function App() {
    return (
        <div className={classes.App}>
            <Sidebar />
            <Header />
            <GameField />
            <Footer />
        </div>
    );
}

export default App;
