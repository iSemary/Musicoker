import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeadphones,faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";

library.add(faHeadphones,faSignInAlt);
function Header() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand> <Link to="/" className="text-light m-1"><FontAwesomeIcon icon="headphones" /> Musicoker</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/login" className="text-light m-1"><FontAwesomeIcon icon="sign-in-alt" /> Login</Link>
            <Link to="/register" className="text-light m-1">Register</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
