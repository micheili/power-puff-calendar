import React, {useContext} from 'react';
import { NavLink as RRNavLink} from 'react-router-dom';
import { Context } from "../App";
 

import { 
    Nav,
    NavItem,
    NavLink,
     }
    from 'reactstrap';

    export default function NavInvites (){
        const [context] = useContext(Context);
        return(
            <Nav className="navLinks-nav justify-content-center">
            <NavItem>
                <NavLink  className={`navLinks ${context.colorTheme}`} tag={RRNavLink} activeClassName={`active ${context.colorTheme}`} to={"/invitation"}>New invitations</NavLink>
            </NavItem>
            <NavItem>
                <NavLink  className={`navLinks ${context.colorTheme}`} tag={RRNavLink} activeClassName={`active ${context.colorTheme}`} to={"/invitations_declined"} >Declined invitations</NavLink>
            </NavItem>
        </Nav>

        )
    }
