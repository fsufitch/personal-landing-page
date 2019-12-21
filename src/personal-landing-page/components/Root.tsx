import React, { Component } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import styles from 'personal-landing-page/styles';
import { Home } from "./Home";
import { Footer } from "./Footer";
import { Profile } from "./Profile";
import { Projects } from "./Projects";
import { Skills } from "./Skills";

export class Root extends Component {

    render(): JSX.Element {
        return (<div className={styles.container}>
            <Router>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/skills">
                        <Skills />
                    </Route>
                    <Route path="/projects">
                        <Projects />
                    </Route>
                   
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route path="*">
                        404
                    </Route>
                </Switch>
            </Router>
            <Footer></Footer>
        </div>);
    }
}