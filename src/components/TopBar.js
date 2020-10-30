import React, { useState , useContext } from "react";
import {  Collapse,
    Navbar,
    NavbarToggler,    
    Nav,
    NavItem,
    NavLink, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { Context } from "../App";
export default function TopBar({logout}) {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [context] = useContext(Context);
    

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
                LogOut               
              </NavLink>
        </NavItem> 
        </Nav>
      </Collapse>
    </Navbar>
  </div>
  );
}