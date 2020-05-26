import {Route, Switch, withRouter} from "react-router-dom";
import Persons from "./persons/Persons";
import Insurance from "./insurance/Insurance";
import React from "react";

class Home extends React.Component {
    render() {
        return(
            <Switch>
                <Route path="/" extact={true} component={Persons} />
                <Route path="/persons" extact={true} component={Persons} />
                <Route path="/insurance" extact={true} component={Insurance} />
            </Switch>
        )
    }
}

export default withRouter(Home);