import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutUserMutation } from '../services/apiSlice';
import {useNavigate} from "react-router-dom";

function Navigation() {
    const { user } = useSelector(state => state.user);
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        logoutUser();
        navigate("/");
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">.BLOG</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && (
                            <NavDropdown title={user.email} id="basic-nav-dropdown">
                                <LinkContainer to="/new_blog">
                                    <NavDropdown.Item>New Blog</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/my_blogs">
                                    <NavDropdown.Item>My Blogs</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Button variant="btn btn-danger" onClick={handleLogout}>Logout</Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;