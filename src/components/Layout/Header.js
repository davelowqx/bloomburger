import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ children }) {
  const links = [
    { path: "/sectors", label: "Sectors" },
    { path: "/commodities", label: "Commodities" },
    { path: "/currencies", label: "Currencies" },
    { path: "/crypto", label: "Crypto" },
    { path: "/sentiment", label: "Sentiment" },
    { path: "/comps", label: "Comps" },
    { path: "/adr", label: "ADR" },
  ];

  return (
    <div className="bg-black">
      <Navbar variant="dark">
        <Navbar.Brand as={Link} to={"/"}>
          <div className="brand">Bloomburger</div>
        </Navbar.Brand>
        <Nav className="mr-auto">
          {links.map(({ path, label }, i) => (
            <Nav.Link as={Link} to={path}>
              {label}
            </Nav.Link>
          ))}
        </Nav>
        <Nav className="ml-auto">
          <Nav.Item>{children}</Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}
