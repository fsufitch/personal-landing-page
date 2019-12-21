import React, { Component } from "react";

import Octicon, { Rocket, MortarBoard, Home as HomeIcon, MarkGithub, FileDirectory, Bell } from "@primer/octicons-react";

import styles from 'personal-landing-page/styles';
import { Link } from "react-router-dom";

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
                        <Link to="/">
                            <Octicon icon={Rocket} size='large' />
                            Rocket
                        </Link>
                    </div>
                    <div className={styles.homeCol}>
                        <Link to="/">

                            <Octicon icon={MortarBoard} size='large' />
                            Mortar Board
                        </Link>
                    </div>
                    <div className={styles.homeCol}>
                        <Link to="/">

                            <Octicon icon={HomeIcon} size='large' />
                            Home
                        </Link>
                    </div>
                    <div className={styles.homeCol}>
                        <Link to="/">
                            <Octicon icon={MarkGithub} size='large' />
                            Github
                        </Link>
                    </div>
                    <div className={styles.homeCol}>
                        <Link to="/">
                            <Octicon icon={FileDirectory} size='large' />
                            File
                        </Link>
                    </div>
                    <div className={styles.homeCol}>
                        <Link to="/">
                            <Octicon icon={Bell} size='large' />
                            Bell
                        </Link>
                    </div>
                </div>
            </div>);
    }
}