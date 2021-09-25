import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ children }) {
  return (
    <div className="bg-black">
      <Navbar variant="dark">
        <Navbar.Brand as={Link} to={"/"}>
          <div className="brand">Bloomburger</div>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={"/sentiment"}>
            Sentiment
          </Nav.Link>
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
    </div>
  );
}
