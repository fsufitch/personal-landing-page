import React, { Component } from "react";

import Octicon, { MarkGithub } from '@primer/octicons-react';

import styles from 'personal-landing-page/styles';

import { Strings } from 'personal-landing-page/strings';

export class Footer extends Component {
    private githubPHUrl = Strings.GithubPersonalLandingPageUrl.getValue(false);

    render(): JSX.Element {
        if (!!VERSION_DATA) {
            return (<div className={styles.footer}>
                &copy; {new Date().getFullYear()} Filip Sufitchi.
                Built {VERSION_DATA.version} at: {VERSION_DATA.createdAt}. 
                {' '}
                <a href={this.githubPHUrl}>
                    Check me out on Github <Octicon icon={MarkGithub} />
                </a>
                {' '}
                (<a href={`${this.githubPHUrl}/tree/${VERSION_DATA.commit}`}>{VERSION_DATA.commit}</a>)
            </div>);
        }
        return (<div className={styles.footer}>
            <span>&copy; {new Date().getFullYear()} Filip Sufitchi.</span>
            {' '}
            <a href={this.githubPHUrl}>
                Check me out on Github <Octicon icon={MarkGithub} />
            </a>
        </div>);

    }
}