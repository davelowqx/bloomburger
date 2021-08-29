import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ children }) {
  return (
    <>
      <Navbar variant="dark" bg="dark">
        <Navbar.Brand as={Link} to={"/"}>
          BLOOMBURGER
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={"/comps"}>
            Comps
          </Nav.Link>
          <Nav.Link as={Link} to={"/adr"}>
            ADR
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Item>{children}</Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}
