import React, { Component } from "react";

import Octicon, { Home as HomeIcon, MarkGithub, Person, Rocket, Tools, File, LinkExternal } from "@primer/octicons-react";

import styles from 'personal-landing-page/styles';
import { Link } from "react-router-dom";
import MEDIUM_LOGO from 'personal-landing-page/resources/medium-logo.png';

const RESUME_URL = `https://drive.google.com/open?id=16zpkvHbJF9cVp5u56MnsDBIVBk-Fuk6riZLXBhrElnc`;
const MEDIUM_URL = `https://medium.com/@fsufitch`;
const GITHUB_URL = `https://github.com/fsufitch`;

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
                        <a href={RESUME_URL} target="_blank" rel="noreferrer noopener">
                            <Octicon icon={File} size='large' />
                            <span>
                                Résumé {' '}
                                <Octicon icon={LinkExternal} size='small' />
                            </span>
                        </a>
                    </div>
                    <div className={styles.homeCol}>
                        <a href={MEDIUM_URL} target="_blank" rel="noreferrer noopener">
                            <img src={MEDIUM_LOGO} />
                            <span>
                                Blog {' '}
                                <Octicon icon={LinkExternal} size='small' />
                            </span>
                        </a>
                    </div>
                    <div className={styles.homeCol}>
                        <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
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