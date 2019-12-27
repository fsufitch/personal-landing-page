import React, { Component } from "react";

import Octicon, { Home as HomeIcon, MarkGithub, Person, Rocket, Tools, File, LinkExternal } from "@primer/octicons-react";

import styles from 'personal-landing-page/styles';
import { Link } from "react-router-dom";
import MEDIUM_LOGO from './medium-logo.png';

import {Strings} from 'personal-landing-page/strings';

export class Home extends Component {
    render(): JSX.Element {

        return (
            <div>
                <div className={styles.jumbo}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.jumboBrand}>
                                <Octicon icon={HomeIcon} size='large' />
                                {/* TODO: Add better branding */}
                            </div>
                            <div className={styles.jumboText}>
                                <h1 className={styles["display-4"]}>Welcome!</h1>
                                <p className={styles.lead}>
                                    You have found the web &quot;business card&quot; of Filip Sufitchi.
                                    This is currently a work in progress.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.homeCol}>
                        <Link to="/profile">
                            <Octicon icon={Person} size='large' />
                            About Me
                        </Link>
                    </div>
                    <div className={styles.homeCol}>
                        <Link to="/skills">
                            <Octicon icon={Tools} size='large' />
                            Skills
                        </Link>
                    </div>
                    <div className={styles.homeCol}>
                        <Link to="/projects">
                            <Octicon icon={Rocket} size='large' />
                            Projects
                        </Link>
                    </div>
                    <div className={styles.homeCol}>
                        <a href={Strings.ResumeUrl.getValue(false)}>
                            <Octicon icon={File} size='large' />
                            <span>
                                Résumé {' '}
                                <Octicon icon={LinkExternal} size='small' />
                            </span>
                        </a>
                    </div>
                    <div className={styles.homeCol}>
                        <a href={Strings.MediumUrl.getValue(false)}>
                            <img src={MEDIUM_LOGO} />
                            <span>
                                Blog {' '}
                                <Octicon icon={LinkExternal} size='small' />
                            </span>
                        </a>
                    </div>
                    <div className={styles.homeCol}>
                        <a href={Strings.GithubUrl.getValue(false)}>
                            <Octicon icon={MarkGithub} size='large' />
                            <span>
                                Github {' '}
                                <Octicon icon={LinkExternal} size='small' />
                            </span>
                        </a>
                    </div>
                </div>
            </div>);
    }
}