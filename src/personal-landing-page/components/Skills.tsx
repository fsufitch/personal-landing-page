import React, { Component } from "react";
import Octicon, { Home as HomeIcon, Tools } from "@primer/octicons-react";
import { LoremIpsum } from "lorem-ipsum";
import { Link } from "react-router-dom";

import styles from 'personal-landing-page/styles';

const leadLipsum = new LoremIpsum({
    sentencesPerParagraph: {min: 2, max: 4},
    wordsPerSentence: {min: 4, max: 16},
}).generateParagraphs(1);

const bodyLipsum = new LoremIpsum({
    sentencesPerParagraph: { min: 4, max: 6 },
    wordsPerSentence: { min: 4, max: 16 },
}).generateParagraphs(3).split('\n');

export class Skills extends Component {
    render(): JSX.Element {
        return (
            <div>
                <div className={styles.jumbo}>
                    <Link to="/" className={styles.jumboHome}>
                        <Octicon icon={HomeIcon} size='medium'/>
                    </Link>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.jumboBrand}>
                                <Octicon icon={Tools} size='large' />
                                {/* TODO: Add better branding */}
                            </div>
                            <div className={styles.jumboText}>
                                <h1 className={styles["display-4"]}>Skills</h1>
                                <p className={styles.lead}>
                                    {leadLipsum}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {bodyLipsum.map((paragraph, i) => (<p key={i}>{paragraph}</p>))}
            </div>
        );
    }
}