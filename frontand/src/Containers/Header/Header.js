import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';
import UserMenu from "./UserMenu/UserMenu";

const Header = ({user, logout}) => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>MusikOffline</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/">Playlist</NavLink>
                </NavItem>
                {user ?
                    user.role === 'admin' ?
                    <>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/track_history">Track history</NavLink>
                        </NavItem>
                            <button onClick={logout}>Logout</button>
                    </> :
                        <UserMenu
                        user={user}
                        logout={logout}
                        />
                    : <>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/register">Sign up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/login">Sign in</NavLink>
                        </NavItem>
                    </>
                }
            </Nav>
        </Navbar>
    );
};

export default Header;

