import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function Header({ children }) {
  const indices = [{ path: "/indices/ndx", label: "Nasdaq 100" }];
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
    <div className="bg-black">
      <Navbar variant="dark">
        <Navbar.Brand href={"/"}>
          <div className="brand">Bloomburger</div>
        </Navbar.Brand>
        <Nav className="mr-auto">
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
          <NavDropdown
            title="Indices"
            id="basic-nav-dropdown"
            menuvariant="dark"
          >
            {indices.map(({ path, label }, i) => (
              <NavDropdown.Item key={i} href={path}>
                {label}
              </NavDropdown.Item>
            ))}
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
