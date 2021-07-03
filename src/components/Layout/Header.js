import React from "react";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Navbar variant="dark" bg="dark">
        <Navbar.Brand as={Link} to={"/"}>
          BLOOMBURGER
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={"/financials"}>
            Financials
          </Nav.Link>
          <Nav.Link as={Link} to={"/adr"}>
            ADR
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
