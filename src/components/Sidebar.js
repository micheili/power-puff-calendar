import React, { useContext } from "react";
import { NavItem, NavLink, Nav, Badge } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, 
  faCalendar,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";

import { Context } from "../App";

export default function Sidebar({ isOpen, toggle }) {
  const [context] = useContext(Context);
  console.log("sidebar: ", context.user);

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <h3 className="text-info">
            {context.user ? `Welcome ${context.user.firstName}` : "Calendar"}
          </h3>

          <NavItem>
            <NavLink tag={Link} to={"/"}>
              <FontAwesomeIcon className="sidebar-icon mr-2" icon={faHome} />
              Home
            </NavLink>
          </NavItem> 
          <NavItem>
            <NavLink tag={Link} to={"/calendarpage"}>
              <FontAwesomeIcon className="sidebar-icon mr-2" icon={faCalendar} />
              Calendar
            </NavLink>
          </NavItem>        
          <NavItem>
            <NavLink tag={Link} to={"/invitation"}>
              <FontAwesomeIcon className="sidebar-icon mr-2" icon={faInbox} />
              Invitation
              {context.allInvites.length > 0 ? (
                <Badge color="danger">{context.allInvites.length}</Badge>
              ) : (
                <></>
              )}
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
}

//export default Sidebar;
