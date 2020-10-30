import React from 'react';
import { NavLink as RRNavLink} from 'react-router-dom';
 

import { 
    Nav,
    NavItem,
    NavLink,
     }
    from 'reactstrap';

    export default function NavInvites (){
        return(
            <Nav className="navLinks-nav justify-content-center">
            <NavItem>
                <NavLink  className="navLinks" tag={RRNavLink} activeClassName="active" to={"/invitation"}>New invitations</NavLink>
            </NavItem>
            <NavItem>
                <NavLink  className="navLinks" tag={RRNavLink} activeClassName="active" to={"/invitations_declined"} >Declined invitations</NavLink>
            </NavItem>
        </Nav>

        )
    }
