import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ children }) {
  const charts = [
    { path: "/indices", label: "Indices" },
    { path: "/sectors", label: "Sectors" },
    { path: "/commodities", label: "Commodities" },
    { path: "/currencies", label: "Currencies" },
    { path: "/crypto", label: "Crypto" },
    { path: "/sentiment", label: "Sentiment" },
  ];

  return (
    <div className="bg-black">
      <Navbar variant="dark">
        <Navbar.Brand as={Link} to={"/"}>
          <div className="brand">Bloomburger</div>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Lists" id="basic-nav-dropdown" menuVariant="dark">
            {charts.map(({ path, label }) => (
              <NavDropdown.Item as={Link} id={path} to={path}>
                {label}
              </NavDropdown.Item>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/personal"}>
              Personal
            </NavDropdown.Item>
          </NavDropdown>
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
