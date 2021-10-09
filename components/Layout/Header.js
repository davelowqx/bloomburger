import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";

export default function Header({ children }) {
  const charts = [
    { path: "/lists/globalindices", label: "Global Indices" },
    { path: "/lists/usindices", label: "US Indices" },
    { path: "/lists/ussectors", label: "US Sectors" },
    { path: "/lists/commodities", label: "Commodities" },
    { path: "/lists/currencies", label: "Currencies" },
    { path: "/lists/crypto", label: "Crypto" },
    { path: "/lists/complex", label: "Complex" },
  ];

  return (
    <div className="bg-black">
      <Navbar variant="dark">
        <Navbar.Brand href={"/"}>
          <div className="brand">Bloomburger</div>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Lists" id="basic-nav-dropdown" menuvariant="dark">
            {charts.map(({ path, label }) => (
              <NavDropdown.Item href={path}>{label}</NavDropdown.Item>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item href={"/lists/custom"}>Custom</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href={"/comps"}>Comps</Nav.Link>
          <Nav.Link href={"/adr"}>ADR</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Item>{children}</Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}