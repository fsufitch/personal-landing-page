import React, { Fragment } from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";

import { pathsForBasePath } from "./paths";
import styles from 'personal-landing-page/styles';

import pythonIcon from 'personal-landing-page/icons/python.png';
import golangIcon from 'personal-landing-page/icons/golang.png';
import javaIcon from 'personal-landing-page/icons/java.png';
import kotlinIcon from 'personal-landing-page/icons/kotlin.png';
import nodejsIcon from 'personal-landing-page/icons/nodejs.png';
import typescriptIcon from 'personal-landing-page/icons/typescript.png';
import sqlIcon from 'personal-landing-page/icons/postgres.png';

import html5Icon from 'personal-landing-page/icons/html5.png';
import jsIcon from 'personal-landing-page/icons/js.png';
import css3Icon from 'personal-landing-page/icons/css3.png';
import angularIcon from 'personal-landing-page/icons/angular.png';
import reactIcon from 'personal-landing-page/icons/react.png';
import jqueryIcon from 'personal-landing-page/icons/jquery.png';
import bootstrapIcon from 'personal-landing-page/icons/bootstrap.png';
import reduxIcon from 'personal-landing-page/icons/redux.png';

import djangoIcon from 'personal-landing-page/icons/django.png';
import springMVCIcon from 'personal-landing-page/icons/spring-mvc.png';
import flaskIcon from 'personal-landing-page/icons/flask.png';
import web2pyIcon from 'personal-landing-page/icons/web2py.png';
import grpcIcon from 'personal-landing-page/icons/grpc.png';
const postgresIcon = sqlIcon;
import mongoIcon from 'personal-landing-page/icons/mongodb.png';

import linuxIcon from 'personal-landing-page/icons/tux.png';
import awsIcon from 'personal-landing-page/icons/aws.png';
import herokuIcon from 'personal-landing-page/icons/heroku.png';
import jenkinsIcon from 'personal-landing-page/icons/jenkins.png';
import cfIcon from 'personal-landing-page/icons/cloud-foundry.png';



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
                    {!item.text ? '' :
                        <div className={styles.skillsDisplayCardBody}>
                            {item.text}
                        </div>
                    }
                </div>
            </div>
        ))}
    </div>)
}

// Uncomment to use for placeholder images
// const placeholder = (text: string) => `https://via.placeholder.com/512x512.png?text=${encodeURIComponent(text)}`

function Languages() {
    return (<SkillGrid items={[
        { text: 'Python 2.x/3.x', image: pythonIcon },
        { text: 'Go', image: golangIcon },
        { text: '', image: javaIcon },
        { text: 'Kotlin', image: kotlinIcon },
        { text: 'Javascript/NodeJS', image: nodejsIcon },
        { text: '', image: typescriptIcon },
        { text: 'SQL (PostgreSQL, SQLite, etc)', image: sqlIcon },
        // { text: 'PHP', image: placeholder('php') },
        // { text: 'Ruby', image: placeholder('ruby') },
    ]} />);
}

function FrontEnd() {
    return (<SkillGrid items={[
        { text: 'HTML 5', image: html5Icon },
        { text: 'CSS 3', image: css3Icon },
        { text: 'Javascript/DOM', image: jsIcon },
        { text: 'Angular 2+', image: angularIcon },
        { text: 'ReactJS', image: reactIcon },
        { text: '', image: jqueryIcon },
        { text: 'Bootstrap', image: bootstrapIcon },
        { text: '', image: reduxIcon },
    ]} />);
}
function BackEnd() {
    return (<SkillGrid items={[
        { text: '', image: djangoIcon },
        { text: 'Spring MVC', image: springMVCIcon },
        { text: '', image: flaskIcon },
        { text: '', image: web2pyIcon },
        { text: '', image: grpcIcon },
        { text: 'PostgreSQL', image: postgresIcon },
        { text: '', image: mongoIcon },
    ]} />);
}
function Cloud() {
    return (<SkillGrid items={[
        { text: 'Linux (Debian/RedHat)', image: linuxIcon },
        { text: '', image: awsIcon },
        { text: 'Heroku', image: herokuIcon },
        { text: 'Jenkins', image: jenkinsIcon },
        { text: '', image: cfIcon }, 
    ]} />);
}