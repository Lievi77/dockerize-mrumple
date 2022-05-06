import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header() {
  return (
    <Navbar
      expand="lg"
      style={{
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#e65100",
      }}
    >
      <Navbar.Brand style={{ fontSize: "25px", fontWeight: "bold" }}>
        Reddit Analyzer
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/" style={{ fontSize: "20px" }}>
          Home
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
