import React, { Component } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import styles from 'personal-landing-page/styles';
import { Home } from "./Home";
import { Footer } from "./Footer";

export class Root extends Component {

    render(): JSX.Element {
        return (<div className={styles.container}>
            <Router>
                <Switch>
                    <Route path="/about">
                        About
                    </Route>
                    <Route path="/users">
                        Users
                    </Route>
                    <Route path="/home">
                        <Home></Home>
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