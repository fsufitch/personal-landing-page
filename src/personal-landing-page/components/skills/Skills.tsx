import React, { Component } from "react";
import Octicon, { Home as HomeIcon, Tools } from "@primer/octicons-react";
import { Link } from "react-router-dom";

import styles from 'personal-landing-page/styles';
import { SkillsNav } from "./SkillsNav";
import { SkillsSubrouter } from './subpages';


export class Skills extends Component {
    render(): JSX.Element {
        return (
            <div>
                <div className={styles.jumbo}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.jumboBrand}>
                                <Octicon icon={Tools} size='large' />
                                {/* TODO: Add better branding */}
                            </div>
                            <div className={styles.jumboText}>
                                <h1 className={styles["display-4"]}>Skills</h1>
                                <p className={styles.lead}>
                                    I am fascinated not by any single technology
                                    or piece of a stack, but by the complex interactions,
                                    data/logic flows, and overall architecture of cloud
                                    systems (and other networked software). To this end,
                                    I try to maintain a wide base of experience across
                                    many types of technology, in order to best gain
                                    a holistic understanding of what I&apos;m working on.
                                    Below is a sampling of the tech I have worked with in this endeavor.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.contentMargin}>
                        <Link to="/" className={styles.contentHomeLink}>
                            <Octicon icon={HomeIcon} size='medium' />
                        </Link>
                    </div>
                    <div className={styles.contentMain}>
                        <SkillsNav />
                        <SkillsSubrouter />
                    </div>
                    <div className={styles.contentMargin}></div>
                </div>

            </div>
        );
    }
}