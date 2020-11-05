import React, { useContext } from "react";
import classNames from "classnames";
import { Container, Row } from "reactstrap";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import CalendarMonth from "../calendar/CalendarMonth";
import CalendarWeek from "../calendar/CalendarWeek";
import CalendarDay from "../calendar/CalendarDay";
import Invitation from "./Invitation";
import ThemeChanger from "./ThemeChanger";

import Invitations_declined from "./Invitations_declined";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { Button } from "reactstrap";
import { Context } from "../App";

export default function Content({ sidebarIsOpen, toggleSidebar, logout }) {
  const [context] = useContext(Context);
 if(!window.userFetch){ return null}
 
  return (
    <Container
      fluid={true}
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
      <Row className="justify-content-between mb-3">
        {context.user ? (
          <Button className={`toogleSidebarButton ${context.colorTheme} ml-4`} onClick={toggleSidebar}>
            <FontAwesomeIcon className="icon" icon={faBars} />
          </Button>
        ) : (
          <></>
        )}
      </Row>

      <ThemeChanger />

      <Switch>
        <Route exact path="/" component={Login}>
          {context.user ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route exact path="/register" component={Register}>
          {" "}
          {context.user ? <Redirect to="/home" /> : <Register />}
        </Route>
        <ProtectedRoute exact path="/calendar" component={CalendarMonth} />
        <ProtectedRoute exact path="/calendarweek" component={CalendarWeek} />
        <ProtectedRoute exact path="/calendarday" component={CalendarDay} />
        <ProtectedRoute exact path="/invitation" component={Invitation} />
        <ProtectedRoute exact path="/home" component={CalendarMonth} />
        <ProtectedRoute
          exact
          path="/invitations_declined"
          component={Invitations_declined}
        />
      </Switch>
    </Container>
  );
}
