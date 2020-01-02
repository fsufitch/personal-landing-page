import React, { Fragment } from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";

import { pathsForBasePath } from "./paths";
import styles from 'personal-landing-page/styles';

export function SkillsSubrouter() {
    const paths = pathsForBasePath(useRouteMatch().path);
    return (
        <Fragment>
            <Route exact path={useRouteMatch().path}>
                <Redirect to={paths.languages} />
            </Route>
            <Route path={paths.languages}>
                <Languages />
            </Route>
            <Route path={paths.frontend}>
                <FrontEnd />
            </Route>
            <Route path={paths.backend}>
                <BackEnd />
            </Route>
            <Route path={paths.cloud}>
                <Cloud />
            </Route>
        </Fragment>
    );
}

interface SkillGridItem {
    image: string;
    text: string;
}

function SkillGrid(props: { items: SkillGridItem[] }) {
    return (<div className={styles.skillsDisplayRow}>
        {props.items.map((item, i) => (
            <div key={i} className={styles.skillsDisplayColumn}>
                <div className={styles.skillsDisplayCard}>
                    <img src={item.image} className={styles.skillsDisplayCardImg} />
                    <div className={styles.skillsDisplayCardBody}>
                        
                        {item.text}
                    </div>
                </div>
            </div>
        ))}
    </div>)
}

const placeholder = (text: string) => `https://via.placeholder.com/512x512.png?text=${encodeURIComponent(text)}`

function Languages() {
    return (<SkillGrid items={[
        { text: 'Python 2.x/3.x', image: placeholder('python') },
        { text: 'Go', image: placeholder('go') },
        { text: 'Java', image: placeholder('java') },
        { text: 'Kotlin', image: placeholder('kt') },
        { text: 'Javascript/NodeJS', image: placeholder('js') },
        { text: 'Typescript', image: placeholder('ts') },
        { text: 'SQL (PostgreSQL, SQLite, etc)', image: placeholder('sql') },
        // { text: 'PHP', image: placeholder('php') },
        // { text: 'Ruby', image: placeholder('ruby') },
    ]} />);
}

function FrontEnd() {
    return (<SkillGrid items={[
        { text: 'HTML 5', image: placeholder('html5') },
        { text: 'Javascript/DOM', image: placeholder('js/dom') },
        { text: 'CSS 3', image: placeholder('css3') },
        { text: 'Angular 2+', image: placeholder('ng2') },
        { text: 'ReactJS', image: placeholder('react') },
        { text: 'jQuery', image: placeholder('jq') },
        { text: 'Bootstrap', image: placeholder('bs') },
        { text: 'Redux', image: placeholder('redux') },
    ]} />);
}
function BackEnd() {
    return (<SkillGrid items={[
        { text: 'Django', image: placeholder('django') },
        { text: 'Spring MVC', image: placeholder('spring') },
        { text: 'Flask', image: placeholder('flask') },
        { text: 'web2py', image: placeholder('web2py') },
        { text: 'gRPC', image: placeholder('grpc') },
        { text: 'PostgreSQL', image: placeholder('psql') },
        { text: 'MongoDB', image: placeholder('mongo') },
    ]} />);
}
function Cloud() {
    return (<SkillGrid items={[
        { text: 'Linux (Debian/RedHat)', image: placeholder('linux') },
        { text: 'AWS', image: placeholder('aws') },
        { text: 'Heroku', image: placeholder('heroku') },
        { text: 'Jenkins', image: placeholder('jenkins') },
        { text: 'Twelve factor methodology', image: placeholder('12') },
    ]} />);
}