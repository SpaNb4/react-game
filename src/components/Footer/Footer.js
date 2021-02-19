import React from 'react';
import classes from './Footer.module.scss';
import githubImg from './images/github.png';
import rsSchoolImg from './images/rs_school.svg';

export default function Footer() {
    return (
        <div className={classes.Footer}>
            <a href="https://github.com/spanb4">
                <img className={classes.GithubIcon} src={githubImg} />
            </a>
            <div className={classes.Copyright}>© 2021</div>
            <a href="https://rs.school/js/">
                <img className={classes.RsSchoolIcon} src={rsSchoolImg} />
            </a>
        </div>
    );
}
