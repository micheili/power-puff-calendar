import React, { useState, useContext } from "react";
import {  Collapse,
    Navbar,
    NavbarToggler,    
    Nav,
    NavItem,
    NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";
export default function TopBar({logout}) {

    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    

  return (
    
    <div className="my-topbar">
    <Navbar color="light" light expand="md">      
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
        <NavItem>
              <NavLink tag={Link} to={"/home"}>               
                Home
              </NavLink>
        </NavItem>
        <NavItem>
              <NavLink tag={Link} to={"/invitation"}>                
                Invitation                
              </NavLink>
        </NavItem>         
        <NavItem>
              <NavLink tag={Link}
            to="/"
            onClick={logout}>                
                LogOut               
              </NavLink>
        </NavItem> 
        </Nav>
      </Collapse>
    </Navbar>
  </div>
  );
}