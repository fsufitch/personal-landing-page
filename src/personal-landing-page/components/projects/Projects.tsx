import React, { Component } from "react";
import Octicon, { Home as HomeIcon, Rocket, MarkGithub, LinkExternal } from "@primer/octicons-react";
import { Link } from "react-router-dom";

import styles from 'personal-landing-page/styles';
import { ProjectRow } from "./ProjectRow";

import DiscordBoarBotIcon from 'personal-landing-page/icons/discord-boar-bot.png';
import MDPIcon from 'personal-landing-page/icons/mdp.png';
import ShipSpinningIcon from 'personal-landing-page/icons/ship-spinning.png';

export class Projects extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }
    
    render(): JSX.Element {
        return (
            <div>
                <div className={styles.jumbo}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.jumboBrand}>
                                <Octicon icon={Rocket} size='large' />
                                {/* TODO: Add better branding */}
                            </div>
                            <div className={styles.jumboText}>
                                <h1 className={styles["display-4"]}>Projects</h1>
                                <p className={styles.lead}>
                                    Coding stuff is both a career and a hobby. As such, I tend to
                                    accumulate free-time projects in various stages of completion.
                                    This is a sampling of some of the more interesting/complete ones.
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
                        <ProjectRow image={DiscordBoarBotIcon} title="Discord Boar Bot">
                            <p>
                                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
                                    Discord <Octicon icon={LinkExternal} />
                                </a>
                                {' '} is a VoIP platform oriented
                                towards providing text/voice communication to groups of video gamers
                                who connnect with each other online. In order to aid with moderation
                                and to add some useful functionality shortcuts to the group that my
                                friends and I belong to, I used its 3<sup>rd</sup> party API to build
                                a bot. Features include custom &quot;usergroups&quot;, canned responses,
                                automated ACL, and more.
                            </p>
                            <p>
                                The bot was originally built using Python 2.6 (making use of the asyncio
                                API), is backed by a Postgres database, and runs in a continuous
                                deployment cloud environment on Heroku. Migration of the codebase to
                                Go is in progress.
                            </p>
                            <p>
                                <a href="https://github.com/fsufitch/discord-boar-bot">
                                    <Octicon icon={MarkGithub} /> Check it out on Github! <Octicon icon={LinkExternal} />
                                </a>
                            </p>
                        </ProjectRow>
                        <ProjectRow image={MDPIcon} title="Preztweeting.com">
                            <p>
                                As a quick coding exercise to refresh myself on building webpages using
                                Angular, I decided to create a simple web UI allowing side-by-side comparison
                                of two Twitter feeds &mdash; in this case, two US presidents&apos;. The UI
                                allows individual manipulation of each feed, or a &quot;synchronized&quot;
                                time, alternating which feed scrolls back to keep the displayed tweets as
                                contemporaneous as possible.
                            </p>
                            <p>
                                The user interface is coded using Angular and styled using Bootstrap. It 
                                is backed by a lightweight Go-based webserver that uses a Postgres database
                                for indexing tweets, and runs regular crawls to keep the index up to date.
                                It runs on Heroku and is deployed in a way that allows for seamless horizontal
                                scaling in case of going viral.
                            </p>
                            <p>
                                <a href="https://github.com/fsufitch/prez-tweet">
                                    <Octicon icon={MarkGithub} /> Check it out on Github! <Octicon icon={LinkExternal} />
                                </a>
                            </p>
                        </ProjectRow>
                        <ProjectRow image={ShipSpinningIcon} title="Ship Spinning Inc.">
                            <p>
                                Ship Spinning Inc. was a web based slot machine game built around {' '}
                                <a href="https://eveonline.com" target="_blank" rel="noopener noreferrer">
                                    Eve Online <Octicon icon={LinkExternal} />
                                </a>, a massively-multiplayer online game. Ship Spinning connected with Eve
                                via a complex XML API and created a system in which Eve Online players could
                                use their in-game &quot;credits&quot; currency to activate a web-based 
                                animated slot machine, with which they could win in-game items prizes. The
                                system integrated with other APIs, in order to measure and ensure good
                                payouts and to better engage players. Over its lifetime, it provided 
                                entertainment for over 1000 players, and distributed prizes worth thousands
                                of dollars.
                            </p>
                            <p>
                                While it has no longer been maintained, its source code is still available 
                                online. Its user interface was a custom jQuery-based site. The server was built in 
                                Python, using the web2py framework and a SQLite database, and it was deployed
                                on a virtual private server.
                            </p>
                            <p>
                                <a href="https://github.com/fsufitch/eve-shipspinning">
                                    <Octicon icon={MarkGithub} /> Check it out on Github! <Octicon icon={LinkExternal} />
                                </a>
                            </p>
                        </ProjectRow>
                    </div>
                    <div className={styles.contentMargin}></div>
                </div>

            </div>
        );
    }
}