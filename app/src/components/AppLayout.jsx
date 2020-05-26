import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Persons from "./persons/Persons";
import Insurance from "./insurance/Insurance";
import {Route, BrowserRouter, Switch, withRouter} from "react-router-dom";
import Home from "./Home";



class AppLayout extends React.Component {
    isOpen = () => useState(false);


    render() {
        let isOpen = () => {
            return false;
        };

        let toggle = () => {

        };
        return(
            <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">ZADANIE3</NavbarBrand>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/persons">Persons</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/insurance">Insurance</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>

                <BrowserRouter>
                    <Switch>
                        <Route path="/persons" extact={true} component={Persons} />
                        <Route path="/insurance" extact={true} component={Insurance} />
                        <Route path="/" extact={true} component={Persons} />
                    </Switch>
                </BrowserRouter>

            </div>
        )
    }
}

export default AppLayout;