import React from 'react';
import {  Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../Dashboard/logo.png';
import { Link } from 'react-router-dom';

const NavbarHome = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Your Logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/send-delete-request">DELETE REQUEST</Nav.Link>
            <Nav.Link as={Link} to="/privacy-policy">PRIVACY POLICY</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHome;
