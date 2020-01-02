import React from "react";

import styles from 'personal-landing-page/styles';
import { NavLink, useRouteMatch } from "react-router-dom";
import { pathsForBasePath } from "./paths";

export function SkillsNav() {
    const paths = pathsForBasePath(useRouteMatch().path);

    return (<ul className={styles.skillsNav}>
        <li className={styles['nav-item']}>
            <NavLink
                to={paths.languages}
                className={styles['nav-link']}
                activeClassName={styles.skillsActiveTab}>
                Languages
                </NavLink>
        </li>
        <li className={styles['nav-item']}>
            <NavLink
                to={paths.frontends}
                className={styles['nav-link']}
                activeClassName={styles.skillsActiveTab}>
                Front-ends
              </NavLink>
        </li>
        <li className={styles['nav-item']}>
            <NavLink
                to={paths.backends}
                className={styles['nav-link']}
                activeClassName={styles.skillsActiveTab}>
                Back-ends
              </NavLink>
        </li>
        <li className={styles['nav-item']}>
            <NavLink
                to={paths.databases}
                className={styles['nav-link']}
                activeClassName={styles.skillsActiveTab}>
                Databases
            </NavLink>
        </li>
        <li className={styles['nav-item']}>
            <NavLink
                to={paths.cicd}
                className={styles['nav-link']}
                activeClassName={styles.skillsActiveTab}>
                CI/CD
            </NavLink>
        </li>
    </ul>);
}