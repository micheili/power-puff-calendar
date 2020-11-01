import React, { useContext } from "react";
import { NavItem, NavLink, Nav, Badge } from "reactstrap";
import classNames from "classnames";
import { NavLink as RRNavLink, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,   
  faInbox,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import { Context } from "../App";

export default function Sidebar({ logout, isOpen}) {
  const [context] = useContext(Context);
  

  return (    
      <div className={classNames("sidebar", { "is-open": isOpen })}>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            <h3 className="text-info">
              {context.user ? `Welcome ${context.user.firstName}` : "Calendar"}
            </h3>
            <NavItem>
              <NavLink tag={RRNavLink} activeClassName="active" to={"/home"}>
                <FontAwesomeIcon className="sidebar-icon mr-2" icon={faHome} />
                <strong>Home</strong>
              </NavLink>
            </NavItem>                   
            <NavItem>
              <NavLink tag={RRNavLink} activeClassName="active" to={"/invitation"}>
                <FontAwesomeIcon className="sidebar-icon mr-2" icon={faInbox} />
                <strong>Invitation</strong>
                {context.allInvites.length > 0 ? (
                  <Badge className="ml-2" color="danger">{context.allInvites.length}</Badge>
                ) : (
                  <></>
                )}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link}
            to="/"
            onClick={logout}>    
            <FontAwesomeIcon className="sidebar-icon mr-2" icon={faSignOutAlt}/>            
                <strong>Log Out</strong>               
              </NavLink>
            </NavItem>           
          </Nav>
        </div>      
      </div>    
  );
}

//export default Sidebar;
