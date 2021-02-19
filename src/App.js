import Header from './components/Header/Header';
import GameField from './components/GameField/GameField';
import Footer from './components/Footer/Footer';
import classes from './App.module.scss';

function App() {
    return (
        <div className={classes.App}>
            <Header />
            <GameField />
            <Footer />
        </div>
    );
}

export default App;
