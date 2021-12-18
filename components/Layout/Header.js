import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

export default function Header({ children }) {
  const charts = [
    { path: "/lists/globalindices", label: "Global Indices" },
    { path: "/lists/usindices", label: "US Indices" },
    { path: "/lists/ussectors", label: "US Sectors" },
    { path: "/lists/ussectorsdominance", label: "US Sectors Dominance" },
    { path: "/lists/credit", label: "Credit" },
    { path: "/lists/commodities", label: "Commodities" },
    { path: "/lists/currencies", label: "Currencies" },
    { path: "/lists/crypto", label: "Crypto" },
    { path: "/lists/ratios", label: "Ratios" },
  ];

  return (
    <div className="bg-black px-3">
      <Navbar variant="dark">
        <Navbar.Brand href={"/"}>
          <div className="brand d-flex align-items-center">
            <img src="/icon.png" alt="brand logo" style={{ width: "1.5rem" }} />
            loomburger
          </div>
        </Navbar.Brand>
        <Nav>
          <NavDropdown
            title="Charts"
            id="basic-nav-dropdown"
            menuvariant="dark"
          >
            {charts.map(({ path, label }, i) => (
              <NavDropdown.Item key={i} href={path}>
                {label}
              </NavDropdown.Item>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item href={"/lists/custom"}>Custom</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href={"/comps"}>Comps</Nav.Link>
          <Nav.Link href={"/adr"}>ADR</Nav.Link>
        </Nav>
        <div className="flex-grow-1" />
        <Nav.Item>{children}</Nav.Item>
      </Navbar>
    </div>
  );
}
