import React, { Component } from "react";

import Octicon, { MarkGithub } from '@primer/octicons-react';

import styles from 'personal-landing-page/styles';

const GITHUB_URL = 'https://github.com/fsufitch/personal-landing-page';

export class Footer extends Component {
    render(): JSX.Element {
        if (!!VERSION_DATA) {
            return (<div className={styles.footer}>
                &copy; {new Date().getFullYear()} Filip Sufitchi.
                Built {VERSION_DATA.version} at: {VERSION_DATA.createdAt}. 
                {' '}
                <a href={GITHUB_URL}>
                    Check me out on Github <Octicon icon={MarkGithub} />
                </a>
                {' '}
                (<a href={`${GITHUB_URL}/tree/${VERSION_DATA.commit}`}>{VERSION_DATA.commit}</a>)
            </div>);
        }
        return (<div className={styles.footer}>
            <span>&copy; {new Date().getFullYear()} Filip Sufitchi.</span>
            <a href={GITHUB_URL}>
                Check me out on Github!
            </a>
        </div>);

    }
}