import React, { Component } from "react";
import Octicon, { Home as HomeIcon, Person } from "@primer/octicons-react";
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

import styles from 'personal-landing-page/styles';
import { Strings } from 'personal-landing-page/strings';

interface ProfileProps {
    onCaptcha: (token: string | null) => void;
    isHuman?: boolean;
}

export class Profile extends Component<ProfileProps, {}> {
    onCaptchaChange = (token: string | null): void => {
        this.props.onCaptcha(token);
    }

    render(): JSX.Element {
        return (
            <div>
                <div className={styles.jumbo}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.jumboBrand}>
                                <Octicon icon={Person} size='large' />
                                {/* TODO: Add better branding */}
                            </div>
                            <div className={styles.jumboText}>
                                <h1 className={styles["display-4"]}>About Me</h1>
                                <p className={styles.lead}>
                                    { /* something clever here */}
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
                        <div className={styles.row}>
                            <div className={styles['col-sm-6']}>
                                <h3> Contact Info </h3>

                                {(!this.props.isHuman) ? this.captchaBlock() : this.captchaOKBlock()}
                            </div>
                            <div className={styles['col-sm-6']}>
                                <h3> Who am I? </h3>
                                <p>
                                    I&apos;m a 20-something nerd looking to code
                                    interesting stuff, and perhaps make the
                                    world a better place while I&apos;m at it.
                                    I am a United States citizen, and am excited
                                    about both private industry and contracting
                                    projects.
                                </p>
                                <h3> What do I do? </h3>
                                <p>
                                    I have ample experience with full stack software
                                    development. From coding well-structured front-ends
                                    for single page applications, to building
                                    secure and performant backends (microservice or
                                    monolithic), to continuous integration/deployment,
                                    and beyond... I love working with complex systems,
                                    understanding them deeply, and using that knowledge
                                    to improve them.
                                </p>
                                <h3> Why this site? </h3>
                                <p>
                                    Why not?
                                </p>
                            </div>
                        </div>
                        <div className={styles.contentMargin}></div>
                    </div>

                </div>
            </div>
        );
    }

    captchaBlock = (): JSX.Element => (<div>
        <p> Please verify that you&apos;re not a web crawler to see this.</p>
        <ReCAPTCHA sitekey={Strings.ReCAPTCHASiteKey.getValue(false)}
            onChange={this.onCaptchaChange} 
            size="normal" />
    </div>);

    captchaOKBlock = (): JSX.Element => (<div>
        <address>
            <strong> Email: </strong>
            {Strings.EmailAddress.getValue(!!this.props.isHuman)} <br />
            <strong> Phone: </strong>
            {Strings.PhoneNumber.getValue(!!this.props.isHuman)} <br />
        </address>
    </div>)
}