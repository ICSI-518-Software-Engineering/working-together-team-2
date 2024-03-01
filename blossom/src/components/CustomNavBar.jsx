// CustomNavBar.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CustomNavBar.css';

function CustomNavBar() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">Florist</Navbar.Brand> {/* Replace anchor tag with Link */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/VendorLogin">Vendor</Nav.Link> {/* Replace anchor tag with Link */}
              <Nav.Link as={Link} to="/CustomerLogin">Customer</Nav.Link> {/* Replace anchor tag with Link */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavBar;