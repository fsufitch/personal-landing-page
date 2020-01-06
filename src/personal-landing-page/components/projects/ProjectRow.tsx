import React, { PropsWithChildren, Fragment } from 'react';

import styles from 'personal-landing-page/styles';

interface RowProps {
    image: string;
    title: string;
}

export function ProjectRow(props: PropsWithChildren<RowProps>) {
    return (
        <Fragment>
            <div className={styles.projectRow}>
                <div className={styles.projectThumbnail}>
                    <img src={props.image} />
                </div>
                <div className={styles.projectContent}>
                    <h3>{props.title}</h3>
                    <div>{props.children}</div>
                </div>
            </div>
            <hr className={styles.projectDivider} />
        </Fragment>);
}