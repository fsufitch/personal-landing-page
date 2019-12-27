import React, { Component } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import styles from 'personal-landing-page/styles';
import { Home } from "./home";
import { Footer } from "./Footer";
import { Profile } from "./profile";
import { Projects } from "./projects";
import { Skills } from "./skills";

interface RootState {
    captchaToken: string|null;
}
export class Root extends Component<{}, RootState> {
    state = { captchaToken: null };

    onCaptchaChange = (token: string|null): void => {
        this.setState({captchaToken: token});
    }

    render(): JSX.Element {
        return (<div className={styles.container}>
            <Router>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/profile">
                        <Profile onCaptcha={this.onCaptchaChange} isHuman={!!this.state.captchaToken}/>
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