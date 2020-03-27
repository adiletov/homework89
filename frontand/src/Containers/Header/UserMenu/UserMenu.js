import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem className="mr-4">
                <span className="mr-2 text-light">Hello, {user.fullName}</span>
                {user.image
                    ? <img src={user.image} alt="" className="avatar-image"/>
                    : null
                }
            </NavItem>
            <NavItem>
                <UncontrolledDropdown>
                    <DropdownToggle nav caret>
                        Add new
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={RouterNavLink} to="/artists/add">
                            Artist
                        </DropdownItem>
                        <DropdownItem tag={RouterNavLink} to="/albums/add">
                            Album
                        </DropdownItem>
                        <DropdownItem tag={RouterNavLink} to="/tracks/add">
                            Track
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
            <NavItem>
                <NavLink tag={RouterNavLink} to="/track_history">Track history</NavLink>
            </NavItem>
            <NavItem>
                <span className="nav-link" onClick={logout}>Logout</span>
            </NavItem>
        </Nav>
    );
};

export default UserMenu;