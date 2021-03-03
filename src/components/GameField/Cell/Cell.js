import React, { useRef, useEffect } from 'react';
import classes from './Cell.module.scss';

export default function Cell(props) {
    const cls = [classes.Cell];
    const cellCls = [classes.Marker];
    const cellRef = useRef(null);

    if (props.win) {
        if (props.isOrangeTheme) {
            cls.push(classes.OrangeThemeWin);
        } else {
            cls.push(classes.Win);
        }
    }

    if (props.active === props.number && !props.win) {
        cls.push(classes.Active);
    }

    if (props.isOrangeTheme) {
        cls.push(classes.OrangeTheme);
        cellCls.push(classes.OrangeTheme);
    }

    if (props.value) {
        cls.push(classes.Filled);
    }

    function markerClickHandler() {
        cellRef.current.classList.add(classes.Shake);

        setTimeout(() => {
            cellRef.current.classList.remove(classes.Shake);
        }, 1000);
    }

    return (
        <div ref={cellRef} className={cls.join(' ')} onClick={props.cellClickHandler}>
            {props.value ? (
                <span className={cellCls.join(' ')} onClick={markerClickHandler}>
                    {props.value}
                </span>
            ) : null}
        </div>
    );
}
