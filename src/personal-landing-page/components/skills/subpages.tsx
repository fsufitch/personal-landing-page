import React, { Fragment } from "react";

import { pathsForBasePath } from "./paths";
import { Route, Redirect, useRouteMatch } from "react-router-dom";

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
            <Route path={paths.frontends}>
                <FrontEnds />
            </Route>
            <Route path={paths.backends}>
                <BackEnds />
            </Route>
            <Route path={paths.databases}>
                <Databases />
            </Route>
            <Route path={paths.cicd}>
                <CICD />
            </Route>
        </Fragment>
    );
}

function Languages() {
    return (<div>
        languages
    </div>);
}

function FrontEnds() {
    return (<div>
        Front-ends
    </div>);
}
function BackEnds() {
    return (<div>
        Back-ends
    </div>);
}
function Databases() {
    return (<div>
        Databases
    </div>);
}
function CICD() {
    return (<div>
        CI/CD
    </div>);
}
