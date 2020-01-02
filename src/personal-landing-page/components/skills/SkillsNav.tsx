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
                to={paths.frontend}
                className={styles['nav-link']}
                activeClassName={styles.skillsActiveTab}>
                Front-end Development
              </NavLink>
        </li>
        <li className={styles['nav-item']}>
            <NavLink
                to={paths.backend}
                className={styles['nav-link']}
                activeClassName={styles.skillsActiveTab}>
                Back-end Development
              </NavLink>
        </li>
        <li className={styles['nav-item']}>
            <NavLink
                to={paths.cloud}
                className={styles['nav-link']}
                activeClassName={styles.skillsActiveTab}>
                Cloud Infrastructure/Deployment
            </NavLink>
        </li>
    </ul>);
}