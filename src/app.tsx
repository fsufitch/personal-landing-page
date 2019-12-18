import 'jquery';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import * as styles from "style.scss";

const wrapper = document.getElementById('app-wrapper');

const resumeUrl = 'https://drive.google.com/open?id=16zpkvHbJF9cVp5u56MnsDBIVBk-Fuk6riZLXBhrElnc';

const appPlaceholder = (<div className={styles.container}>
    <h1> It works!
        <small className={styles['text-muted']}>
            You are technically looking at a ReactJS app right now.
        </small>
    </h1>
    <p>
        Since this site is a work in progress,
        why not just check out <a href={resumeUrl}>my resume</a> for now?
    </p>
</div>);

if (wrapper) {
    ReactDOM.render(appPlaceholder, wrapper);
} else {
    console.error("No wrapper element found");
}