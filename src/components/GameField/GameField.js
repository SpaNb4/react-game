import React from 'react';
import classes from './GameField.module.scss';

export default function GameField() {
    return (
        <div className={classes.GameField}>
            <div className={classes.CellsItems}>
                <div className={classes.CellsItem}></div>
                <div className={classes.CellsItem}></div>
                <div className={classes.CellsItem}></div>
                <div className={classes.CellsItem}></div>
                <div className={classes.CellsItem}></div>
                <div className={classes.CellsItem}></div>
                <div className={classes.CellsItem}></div>
                <div className={classes.CellsItem}></div>
                <div className={classes.CellsItem}></div>
            </div>
        </div>
    );
}
